import React, { useState } from 'react';
import { Logo } from './Logo';
import { Target, Lightbulb, Users, CheckCircle, ArrowRight, ShieldCheck, Microscope, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  const [logoTheme, setLogoTheme] = useState<'dark' | 'light'>('light');
  const steps = [
    {
      num: '01',
      title: 'Konsept & Teknik Analiz',
      desc: 'Projenizin teknik gereksinimleri, tolerans aralıkları ve kullanım amacına göre 3D mimarisini planlıyoruz.',
    },
    {
      num: '02',
      title: 'Parametrik 3D Modelleme',
      desc: 'NURBS yüzey sürekliliği ve optimize poligon yapılarıyla 0.01mm hassasiyette dijital ikizini üretiyoruz.',
    },
    {
      num: '03',
      title: 'Simülasyon & Doğrulama',
      desc: 'Mukavemet, hava akışı ve montaj tolerans simülasyonları ile modelin hatasız çalıştığını test ediyoruz.',
    },
    {
      num: '04',
      title: 'Üretim / Fotogerçekçi Render',
      desc: 'SLA/SLS 3D baskı numunesi, CNC tezgah verisi veya 8K fotorealistik CGI materyallerini eksiksiz teslim ediyoruz.',
    },
  ];

  return (
    <section id="hakkimizda" className="py-24 bg-[#0A0A0A] relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0B1F44]/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44] border border-[#2E7DFF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-4">
              <Users className="w-3.5 h-3.5" />
              VERTEX 3D HİKAYESİ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight mb-6 leading-tight">
              3D Teknolojilerinde <br />
              <span className="text-[#2E7DFF] bg-gradient-to-r from-[#2E7DFF] to-[#00C6FF] bg-clip-text text-transparent">
                Fikirlerinizi Gerçeğe Dönüştürüyoruz
              </span>
            </h2>
            <p className="text-base text-[#C4C8D0] leading-relaxed mb-6">
              Vertex 3D; endüstriyel tasarım, yüksek hassasiyetli modelleme, fotogerçekçi görselleştirme ve katmanlı üretim teknolojileri alanında faaliyet gösteren yeni nesil bir 3D teknoloji ajansıdır.
            </p>
            <p className="text-sm text-[#C4C8D0] leading-relaxed mb-8">
              Mühendislik disiplini ile sanatsal vizyonu tek bir potada eritiyoruz. Otomotivden havacılığa, mimarlıktan tüketici elektroniğine ve oyun dünyalarına kadar global standartlarda 3D altyapı çözümleri üretiyoruz.
            </p>

            {/* Studio Capabilities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Optik 3D Lazer Tarama Laboratuvarı',
                'Endüstriyel SLA / SLS Katmanlı Üretim',
                'Özel Çoklu GPU Render Kümesi (Render Farm)',
                'Class-A Yüzey & Parametrik CAD Uzmanlığı',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-white">
                  <div className="w-5 h-5 rounded-md bg-[#00C6FF]/20 flex items-center justify-center shrink-0 border border-[#00C6FF]/40 text-[#00C6FF]">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Brand Showcase Visual */}
          <div className="lg:col-span-5 relative w-full">
            <div className="p-4 sm:p-8 rounded-3xl glass-card border border-[#2E7DFF]/40 shadow-[0_0_50px_rgba(11,31,68,0.8)] flex flex-col items-center text-center">
              {/* Logo View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B1F44]/80 border border-white/10 mb-6 text-xs font-semibold max-w-full">
                <button
                  onClick={() => setLogoTheme('dark')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs ${
                    logoTheme === 'dark'
                      ? 'bg-[#2E7DFF] text-white shadow-[0_0_10px_#2E7DFF]'
                      : 'text-[#C4C8D0] hover:text-white'
                  }`}
                >
                  Koyu Tema
                </button>
                <button
                  onClick={() => setLogoTheme('light')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs ${
                    logoTheme === 'light'
                      ? 'bg-white text-[#081736] font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                      : 'text-[#C4C8D0] hover:text-white'
                  }`}
                >
                  Orijinal Kılavuz (Beyaz)
                </button>
              </div>

              <div className="w-full flex justify-center items-center mb-6">
                <Logo
                  variant="badge"
                  size="xl"
                  theme={logoTheme}
                  className="w-full max-w-sm"
                />
              </div>

              <div className="w-full p-4 rounded-2xl bg-[#0B1F44]/60 border border-white/5 mb-6 text-left">
                <div className="text-xs font-mono text-[#00C6FF] mb-1 flex items-center justify-between">
                  <span>MİSYON BİLDİRGESİ:</span>
                  <span className="text-[10px] text-white/50">RESMİ MARKA STANDARDI</span>
                </div>
                <div className="text-xs text-[#C4C8D0] italic leading-relaxed">
                  "Dünyanın en zorlu geometrilerini, 0.01 mm hassasiyet ve estetik mükemmellikle fiziksel ve dijital evrene kazandırmak."
                </div>
              </div>

              {/* Slogan highlight */}
              <div className="text-2xl sm:text-3xl text-[#00C6FF] font-handwriting tracking-wide">
                3D ile Daha Fazlası Mümkün
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="mt-8 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#2E7DFF] uppercase tracking-wider">
              ÇALIŞMA METODOLOJİMİZ
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] text-white mt-1">
              4 Adımda Fikirden Gerçeğe
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="relative p-6 rounded-2xl glass-card border border-[#2E7DFF]/20 hover:border-[#00C6FF]/50 transition-all hover:-translate-y-1"
              >
                <div className="text-3xl font-black font-['Montserrat'] text-[#00C6FF]/30 mb-3 font-mono">
                  {st.num}
                </div>
                <h4 className="text-base font-bold font-['Montserrat'] text-white mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-[#C4C8D0] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
