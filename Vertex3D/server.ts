import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  const SYSTEM_INSTRUCTION = `Sen "Vertex 3D" markasının resmi Yapay Zeka ve 3D Baskı / Katmanlı İmalat Danışmanısın.
Adın: Vertex AI Asistanı.
Kullanıcılara sıcak, profesyonel, samimi, mühendislik derinliğine sahip ancak kolay anlaşılır bir dille Türkçe yanıt veriyorsun.

Uzmanlık Alanların ve Marka Bilgileri:
1. Marka: Vertex 3D ("Ideas Into Reality" - Fikirden Gerçeğe).
   - Hizmetler: Endüstriyel 3D Baskı (FDM, SLA, SLS, Metal Katmanlı Üretim), Parametrik CAD Modelleme (SolidWorks, Fusion 360, Rhino), Optik 3D Lazer Tarama ve Tersine Mühendislik, Fotogerçekçi 3D Render & Animasyon, Fonksiyonel Prototipleme ve Seri Üretim.
   - Hassasiyet: ±0.01 mm endüstriyel tolerans standardı.
   - Web sitemizde interaktif "3D Fiyat Hesaplayıcı" (#hesaplayici) bulunmaktadır. Kullanıcılar malzeme türü, katman kalınlığı, doluluk ve adet belirleyerek veya STL/STEP dosyalarını yükleyerek anında şeffaf fiyat teklifi alabilirler.
   - İletişim: info@vertex3d.com, +90 (212) 803 34 33, Maslak / İstanbul.

2. 3D Baskı ve Malzeme Rehberliği:
   - PLA: Kolay baskı, prototipleme, hobi ve görsel modeller için ideal, biyo-çözünür, kokusuz.
   - PETG: Dayanıklı, neme, kimyasallara ve darbelere dirençli, su geçirmez mekanik parçalar için ideal.
   - ABS / ASA: Yüksek sıcaklık dayanımı (100°C+), darbe direnci. ASA UV ve dış hava koşullarına dirençlidir.
   - Karbon Fiber (PA-CF, PETG-CF): Yüksek mukavemet, hafiflik ve rijitlik (drone, robotik, yarış parçaları).
   - Reçine (SLA / MSLA): Mikron seviyesinde (0.025 mm) katman hassasiyeti, pürüzsüz yüzey, medikal ve takı modelleri.
   - TPU / Esnek: Esnek contalar, darbe emici parçalar, giyilebilir ürünler.
   - SLS / Metal (Nylon PA12, Paslanmaz Çelik, Titanyum): Son kullanım parçaları, desteksiz karmaşık iç kanallar.
   - 3D Model hazırlama ipuçları: Duvar kalınlıkları, parça oryantasyonu, destek (support) açıları.
   - Desteklenen formatlar: STL, STEP, OBJ, 3MF, IGES.

Kurallar:
- Yanıtları düzenli, gerektiğinde madde işaretleri (•) veya kısa paragraflar halinde yaz.
- Uygun yerlerde kullanıcıya sitedeki 3D Fiyat Hesaplayıcı'yı (#hesaplayici) veya İletişim Formunu (#iletisim) öner.
- Çok teknik terimleri anlaşılır bir benzetmeyle açıkla.`;

  // POST /api/chat - Gemini Chat Proxy
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, message } = req.body;
      const prompt = message || (Array.isArray(messages) && messages[messages.length - 1]?.content);

      if (!prompt) {
        return res.status(400).json({ error: 'Mesaj içeriği bulunamadı.' });
      }

      // If GEMINI_API_KEY is not set or empty, provide graceful intelligent fallback
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply:
            'Vertex 3D Yapay Zeka Asistanına hoş geldiniz! 3D baskı malzemeleri (PLA, PETG, ABS, Reçine, Karbon Fiber), modelleme veya anlık maliyet hesaplama konularında size yardımcı olabilirim. Hemen teklif oluşturmak için sayfamızdaki **3D Fiyat Hesaplayıcı** (#hesaplayici) bölümünü kullanabilirsiniz!',
        });
      }

      const client = ai || new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Prepare conversation contents
      let contentsPayload: any = prompt;
      if (Array.isArray(messages) && messages.length > 0) {
        const history = messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
        contentsPayload = history;
      }

      let reply = '';
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

      for (const modelName of candidateModels) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 7000)
          );
          const generatePromise = client.models.generateContent({
            model: modelName,
            contents: contentsPayload,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
          if (response?.text) {
            reply = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} call failed or timed out:`, err?.message || err);
        }
      }

      if (!reply) {
        // High availability domain fallback if API is overloaded
        reply =
          '**Vertex 3D Katmanlı İmalat Danışmanı:**\n\n' +
          '3D baskı malzemeleri (PLA, PETG, ABS, Reçine SLA, Karbon Fiber) ve endüstriyel prototipleme konusunda 0.01 mm toleransla üretim yapmaktayız.\n\n' +
          '• **PLA:** Hızlı ve ekonomik prototipler, görsel sunumlar.\n' +
          '• **PETG:** Mekanik dayanıklılık, su ve kimyasal direnç.\n' +
          '• **Reçine (SLA):** 0.025 mm mikron hassasiyet, pürüzsüz yüzey.\n\n' +
          'Anlık fiyat teklifi almak için sayfamızdaki **3D Fiyat Hesaplayıcı** (#hesaplayici) modülünü kullanabilir veya bize doğrudan ulaşabilirsiniz!';
      }

      return res.json({ reply });
    } catch (error: any) {
      console.error('Gemini API Hatası:', error);
      return res.json({
        reply:
          'Vertex 3D Yapay Zeka Asistanına hoş geldiniz! 3D baskı, malzeme seçimi, toleranslar veya fiyat teklifi konusunda sorularınızı yanıtlamaya hazırım. Hemen teklif oluşturmak için sayfamızdaki **3D Fiyat Hesaplayıcı** (#hesaplayici) bölümünü inceleyebilirsiniz!',
      });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vertex 3D Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
