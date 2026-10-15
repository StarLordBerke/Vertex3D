# 💎 Vertex 3D — Ideas Into Reality 

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Express](https://img.shields.io/badge/Backend-Express_Server-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

<br />

**Endüstriyel 3D Baskı, CAD Modelleme, Fotogerçekçi Render ve Google Gemini Destekli Yeni Nesil AI Tasarım & Mühendislik Ajansı Web Platformu**

[🚀 Hızlı Başlangıç](#-hızlı-başlangıç) • [🤖 Gemini AI Asistanı](#-gemini-ai-asistanı) • [📐 Akıllı Hesaplayıcı](#-akıllı-maliyet--süre-hesaplayıcı) • [🛠️ Teknoloji Yığını](#%EF%B8%8F-teknoloji-yığını) • [📁 Proje Yapısı](#-proje-dizin-yapısı)

</div>

---

## 📖 Proje Hakkında

**Vertex 3D**, fikirleri dijital konsept aşamasından fiziksel, endüstriyel kalitede prototiplere dönüştüren yeni nesil bir 3D tasarım ve katmanlı üretim (additive manufacturing) stüdyosunun vitrinidir.

Sıradan bir kurumsal web sitesinin ötesinde; **Three.js** ile güçlendirilmiş interaktif 3D modelleme sahneleri, fotogerçekçi render ile tel kafes (wireframe) karşılaştırma kaydırıcıları, gerçek zamanlı bütçe ve süre hesaplama motoru ve doğrudan **Google Gemini** model ailesiyle beslenen akıllı bir **3D Baskı & Malzeme Danışmanı Yapay Zeka Botu** barındırır.

---

## ✨ Temel Özellikler

### 🤖 1. Gemini AI 3D Baskı & Marka Danışmanı (`AIAssistantBot.tsx` & `server.ts`)
- **Resmi `@google/genai` Entegrasyonu:** Sunucu tarafında (`/api/chat`) API anahtarı gizlenmiş güvenli proxy mimarisi.
- **Akıllı Model Fallback Mekanizması:** En güncel `gemini-3.8-flash` modeli öncelikli olarak çalışır; talep dalgalanması veya kotada otomatik olarak `gemini-3.1-flash-lite` ve `gemini-flash-latest` modellerine geçiş yapar.
- **Mühendislik & Malzeme Rehberliği:** PLA, PETG, ABS, TPU, Reçine (SLA) ve PA12 (SLS) mukavemet, sıcaklık direnci, tolerans karşılaştırmaları.
- **Hızlı Konu Butonları (Quick Chips):** "Fiyat Hesaplama Nasıl Yapılır?", "PLA vs PETG Farkı", "CAD Dosyası Hazırlama", "Marka Felsefesi".
- **İnteraktif Navigasyon Bağlantıları:** AI asistanının önerdiği bağlantılara tıklandığında sayfa ilgili bölüme (`#hesaplayici`, `#iletisim`, `#hizmetler`) pürüzsüzce kayar.

### 🧊 2. İnteraktif 3D & WebGL Deneyimi (`Three.js`)
- **İnteraktif 3D Parça & Mesh Görselleştirici:** Kullanıcı fare veya dokunmatik ekranla 3D geometriyi 360° döndürebilir, yakınlaştırabilir ve inceleyebilir.
- **Wireframe / Fotogerçekçi Render Karşılaştırma:** Portfolyo bölümünde CAD tel kafes tasarımı ile son işlenmiş render arasındaki farkı gösteren interaktif sürükleme çubuğu.
- **Dinamik Arka Plan Efektleri:** Modern neon cyan ve kobalt mavi partikül animasyonları.

### 📐 3. Akıllı Maliyet & Süre Hesaplayıcı (`ProjectCalculator.tsx`)
- **Gerçek Zamanlı Fiyat Tahmini:** Hizmet türü (FDM, SLA, 3D Modelleme, Render), model karmaşıklığı, teslimat aciliyeti ve ekstralar (yüzey zımparalama, boyama, tolerans sertifikası).
- **Otomatik İletişim Formu Entegrasyonu:** "Bu Teklifle Projeyi Başlat" tıklandığında seçilen tüm parametreler teklif formuna otomatik yazılır ve form alanına kaydırılır.
- **Kutlama Efekti:** Başarılı hesaplama ve gönderimlerde `canvas-confetti` patlaması.

### 🎨 4. Kurumsal Marka & Logo Sistemi (`Logo.tsx` & `About.tsx`)
- **Piksel Uyumlu Çift Tema:** Orijinal Beyaz (Light) ve Koyu (Dark) modlarda kesinlikle boyut kayması yapmayan `inline-flex` kristal geometrik logo tasarımı.
- **SVG Tabanlı Kristal V Monogramı:** 4K ekranlarda dahi jilet gibi keskin degrade ve neon ışımaları.

### 📚 5. Katmanlı Üretim & Tasarım Bilgi Bankası (`BlogSection.tsx`)
- 3D baskı teknolojileri rehberleri (FDM vs. SLA, Havacılıkta Katmanlı İmalat, Fotogerçekçi Ürün Render İpuçları).
- Filtrelenebilir kategoriler ve blog yazılarından doğrudan projeye başlama köprüleri.

### 📱 6. %100 Duyarlı (Responsive) Mobil & Tablet Deneyimi
- Hamburger menü, yumuşak backdrop animasyonları, Escape tuşu ve dışarı tıklama ile menü kapatma.
- Sticky Navbar (`backdrop-blur-md`) ve `scroll-mt-24` ile başlıkların navbar altında kalmasını önleyen akıllı navigasyon.

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji / Kütüphane | Açıklama |
| :--- | :--- | :--- |
| **Frontend UI** | **React 19** (`react`, `react-dom`) | En son React özellikleri ve concurrent render kabiliyeti |
| **Dil** | **TypeScript 7** | Tam tip güvenliği, katı tip tanımları ve arayüzler |
| **Derleyici / Sunucu** | **Vite 8** + **TSX** | Yıldırım hızında HMR ve full-stack Express desteği |
| **Stil & Tasarım** | **Tailwind CSS v4** | Modern CSS değişkenleri tabanlı util sınıfları |
| **Yapay Zeka (AI)** | **@google/genai (v2.4.0)** | Resmi Google GenAI SDK'sı, Gemini Flash modelleri |
| **3D & Grafikler** | **Three.js** (`three`) | WebGL donanım hızlandırmalı 3D model sahnesi |
| **Animasyonlar** | **Motion** (`motion/react`) | Akıcı giriş ve geçiş animasyonları |
| **İkon Seti** | **Lucide React** | Optimize edilmiş modern SVG ikon seti |
| **Efektler** | **canvas-confetti** | Başarı ve kutlama parçacık efektleri |
| **Backend API** | **Express.js 4** | Güvenli REST proxy rotaları ve statik dosya sunumu |

---

## 🏗️ Mimari Şema

```text
┌────────────────────────────────────────────────────────┐
│               Kullanıcı Arayüzü (React 19 SPA)         │
│  Navbar • Hero (Three.js) • Services • Portfolio       │
│  ProjectCalculator • About • Blog • ContactSection     │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      [UI Etkileşimleri]          [AIAssistantBot]
      - 3D Model İnceleme         - Chat Arayüzü
      - Hesaplama Motoru          - Hızlı Öneri Butonları
      - Teklif Formu İletişim     - Markdown Formatlayıcı
                                         │
                                         ▼ (POST /api/chat)
┌────────────────────────────────────────────────────────┐
│            Express Full-Stack Server (server.ts)       │
│  - Güvenli Ortam Değişkenleri (GEMINI_API_KEY)         │
│  - Özel 3D Baskı & Vertex Marka Sistem Prompt'u       │
│  - Otomatik Çoklu Model Fallback Stratejisi            │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            Google Gemini API (Official SDK)            │
│  1. gemini-3.8-flash (Birincil yüksek performans)      │
│  2. gemini-3.1-flash-lite (Hızlı düşük gecikme)        │
│  3. gemini-flash-latest (Yedek kararlı servis)         │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Proje Dizin Yapısı

```text
vertex3d/
├── .env.example              # Örnek ortam değişkenleri şablonu
├── .gitignore                # Git dışı tutulacak dosyalar (node_modules, dist)
├── index.html                # Ana HTML kabuğu ve Montserrat font tanımları
├── metadata.json             # AI Studio meta verileri ve yetki tanımları
├── package.json              # Bağımlılıklar ve npm scriptleri
├── server.ts                 # Express + Vite middleware + Gemini API backend
├── tsconfig.json             # TypeScript yapılandırması
├── vite.config.ts            # Vite eklenti ve port yapılandırması
└── src/
    ├── App.tsx               # Ana uygulama bileşeni ve durum yönetimi
    ├── main.tsx              # React DOM render başlangıç noktası
    ├── index.css             # Tailwind v4 importları ve global CSS stilleri
    └── components/
        ├── AIAssistantBot.tsx     # Gemini destekli yüzen AI danışman botu
        ├── About.tsx              # Stüdyo hikayesi ve interaktif logo vitrini
        ├── BlogSection.tsx        # 3D baskı teknolojileri makaleleri
        ├── ContactSection.tsx     # Akıllı teklif ve iletişim formu
        ├── Footer.tsx             # Alt bilgi, hızlı linkler ve telif hakları
        ├── Hero.tsx               # Manşet, CTA ve 3D sahne entegrasyonu
        ├── Logo.tsx               # Kristal geometrik çift temalı logo sistemi
        ├── Navbar.tsx             # Responsive gezinme çubuğu ve mobil menü
        ├── Portfolio.tsx          # CAD tel kafes / render karşılaştırma vitrini
        ├── PrintModelViewer.tsx   # Three.js 3D interaktif model izleyici
        ├── ProjectCalculator.tsx  # Fiyat ve süre hesaplama motoru
        ├── Services.tsx           # Hizmet kartları ve detay modalları
        ├── SponsorsMarquee.tsx    # Kesintisiz akan teknoloji partnerleri bandı
        ├── ThreeCanvas.tsx        # WebGL sahne bileşeni
        └── WhyUs.tsx              # Değer önerisi ve kurumsal avantajlar
```

---

## 🚀 Hızlı Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/kullanici-adiniz/vertex-3d.git
cd vertex-3d
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya yarn / pnpm / bun
```

### 3. Ortam Değişkenlerini Tanımlayın
Kök dizinde `.env` adında bir dosya oluşturun:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyerek Google AI Studio üzerinden aldığınız ücretsiz API anahtarını ekleyin:
```env
GEMINI_API_KEY="AIzaSy..."
PORT=3000
```
> 💡 *Gemini API anahtarınızı [Google AI Studio](https://aistudio.google.com/) adresinden saniyeler içinde ücretsiz alabilirsiniz.*

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda açın:
```text
http://localhost:3000
```

---

## 📦 Komutlar (NPM Scripts)

| Komut | Açıklama |
| :--- | :--- |
| `npm run dev` | `tsx server.ts` ile hem backend `/api/chat` hem de frontend Vite HMR sunucusunu başlatır. |
| `npm run build` | Vite ile üretim (production) için optimize edilmiş statik dosyaları `dist/` klasörüne derler. |
| `npm run start` | Derlenmiş uygulamayı Node.js üretim sunucusunda çalıştırır. |
| `npm run lint` | TypeScript tip kontrollerini (`tsc --noEmit`) gerçekleştirir. |
| `npm run preview` | Oluşturulan `dist/` klasörünü yerel olarak önizler. |
| `npm run clean` | Geçici derleme çıktılarını (`dist`, vb.) temizler. |

---

## 🌐 API Dokümantasyonu

### Chat Endpoint'i (`POST /api/chat`)

Gemini yapay zeka asistanı ile iletişim kuran güvenli proxy ucu:

#### İstek (Request)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "FDM baskıda PETG ile PLA arasındaki temel farklar nelerdir?",
    "history": []
  }'
```

#### Yanıt (Response)
```json
{
  "reply": "PETG ve PLA arasındaki temel farklar şunlardır:\n\n1. **Sıcaklık ve Dayanım:** PLA ~60°C'de yumuşarken, PETG 75-80°C'ye kadar dayanıklıdır.\n2. **Mekanik Direnç:** PETG daha yüksek darbe emilimine sahiptir...\n\nProjenizin gereksinimlerine göre [Hesaplayıcı](#hesaplayici) üzerinden bütçe çıkarabilir veya doğrudan [Teklif Formu](#iletisim) iletebilirsiniz.",
  "model": "gemini-3.8-flash"
}
```

---

## 🚢 Yayınlama (Deployment)

Bu proje hem frontend hem de Express API içerdiği için full-stack Node.js ortamlarında sorunsuz çalışır:

### 1. Docker ile Dağıtım (Örnek Dockerfile)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
```

### 2. Cloud Run / Render / Railway / Heroku
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Ortam Değişkeni:** `GEMINI_API_KEY` değişkenini servis sağlayıcınızın kontrol panelinden tanımlayın.

---

## 🤝 Katkıda Bulunma (Contributing)

Katkılarınızı memnuniyetle kabul ediyoruz! Bir hata bildirmek veya yeni bir özellik eklemek isterseniz:

1. Bu depoyu Fork edin (`Fork` butonuna tıklayın).
2. Yeni bir özellik dalı oluşturun:
   ```bash
   git checkout -b feature/harika-ozellik
   ```
3. Değişikliklerinizi commit edin:
   ```bash
   git commit -m 'feat: Yeni özellik eklendi'
   ```
4. Dalınızı uzak depoya gönderin:
   ```bash
   git push origin feature/harika-ozellik
   ```
5. Bir **Pull Request (PR)** açın.

---

## 📄 Lisans

Bu proje **Apache License 2.0** altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına göz atabilirsiniz.

---

<div align="center">

**Vertex 3D Design & Additive Manufacturing Studio**  
*Turning complex engineering challenges into tangible reality.*  

Made with ❤️, ☕ and ⚡ by Vertex 3D Team

</div>

