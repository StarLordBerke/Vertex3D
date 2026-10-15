import React, { useState } from 'react';
import { ShieldCheck, Cpu, Award, Zap, CheckCircle, Crosshair, Sparkles, Scale } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [toleranceVal, setToleranceVal] = useState<number>(0.01);

  const pillars = [
    {
      id: 'guven',
      title: 'Güven (Trust)',
      colorCode: '#2E7DFF',
      colorName: 'Ana Mavi (#2E7DFF)',
      badge: 'Zamanında Teslim & Gizlilik',
      icon: <ShieldCheck className="w-6 h-6 text-[#2E7DFF]" />,
      summary:
        'Tüm projeleriniz kurumsal Gizlilik Sözleşmesi (NDA) ile hukuki güvence altına alınır. Endüstriyel sırlar ve ticari patentler en üst düzeyde korunur.',
      details: [
        'Resmi NDA ve fikri mülkiyet koruma taahhüdü',
        'Milimetrik zaman planlaması ve şeffaf revizyon süreci',
        'ISO standartlarında şifrelenmiş proje veri depolama',
      ],
    },
    {
      id: 'teknoloji',
      title: 'Teknoloji (Technology)',
      colorCode: '#00C6FF',
      colorName: 'Açık Mavi (#00C6FF)',
      badge: '0.01 mm Mikron Hassasiyet',
      icon: <Cpu className="w-6 h-6 text-[#00C6FF]" />,
      summary:
        'Parametrik NURBS CAD motorları, hibrit GPU render çiftlikleri ve yüksek çözünürlüklü 3D lazer tarayıcılar ile 0.01 mm toleransla üretim uyumlu modeller.',
      details: [
        '±0.01 mm üretim toleransı garantili CAD tasarımları',
        '8K HDR fotorealistik ışık simülasyonları',
        'SLA, SLS ve Metal CNC tezgahlara doğrudan uyumluluk',
      ],
    },
    {
      id: 'profesyonellik',
      title: 'Profesyonellik (Stability)',
      colorCode: '#2E7DFF',
      colorName: 'Koyu Lacivert (#0B1F44)',
      badge: '12+ Yıllık Tecrübe',
      icon: <Award className="w-6 h-6 text-[#2E7DFF]" />,
      summary:
        'Otomotiv, savunma sanayii, medikal ve mimarlık sektörlerinde 12 yılı aşkın süredir 500’den fazla projeyi başarıyla teslim etmiş kıdemli mühendis ve 3D sanatçı ekibi.',
      details: [
        'Kıdemli endüstriyel tasarımcılar ve CGI direktörleri',
        'BIM, CAD ve Unreal Engine sertifikalı uzman kadro',
        'Her aşamada şeffaf raporlama ve birebir proje yöneticisi',
      ],
    },
    {
      id: 'inovasyon',
      title: 'İnovasyon (Innovation)',
      colorCode: '#00C6FF',
      colorName: 'Açık Neon (#00C6FF)',
      badge: 'Generatif Tasarım & VR',
      icon: <Zap className="w-6 h-6 text-[#00C6FF]" />,
      summary:
        'Yapay zeka destekli topoloji optimizasyonu, generatif ağırlık azaltma teknikleri ve gerçek zamanlı WebGL/VR sanal deneyimleriyle geleceğin standartlarını belirliyoruz.',
      details: [
        'Topoloji optimizasyonu ile %40 malzeme tasarrufu',
        'İnteraktif WebGL ve Apple Vision Pro uyumlu 3D modeller',
        'Sürekli güncellenen küresel render teknolojileri',
      ],
    },
  ];

  return (
    <section id="neden-biz" className="py-24 bg-[#0A0A0A] relative overflow-hidden scroll-mt-24">
      {/* Background radial blurs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0B1F44]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#2E7DFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44]/70 border border-[#2E7DFF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            DEĞER ÖNERİMİZ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight mb-4">
            Neden{' '}
            <span className="text-[#2E7DFF] bg-gradient-to-r from-[#2E7DFF] via-[#00C6FF] to-white bg-clip-text text-transparent">
              Vertex 3D?
            </span>
          </h2>
          <p className="text-[#C4C8D0] text-base sm:text-lg">
            Kurumsal kimliğimizin temel taşları olan <span className="text-white font-semibold">Güven, Teknoloji, Profesyonellik</span> ve <span className="text-white font-semibold">İnovasyon</span> prensipleriyle projelerinizi hayata geçiriyoruz.
          </p>
        </div>

        {/* Content Layout: Left Pillars, Right Futuristic Interactive Blueprint Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 4 Brand Pillars (Pillars accordion / cards) */}
          <div className="lg:col-span-7 space-y-4">
            {pillars.map((pillar, idx) => {
              const isSelected = activeTab === idx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0B1F44]/90 to-[#0A0A0A] border-[#00C6FF]/60 shadow-[0_0_25px_rgba(46,125,255,0.25)]'
                      : 'bg-[#0B1F44]/25 border-white/5 hover:border-[#2E7DFF]/30 hover:bg-[#0B1F44]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#2E7DFF]/25 border border-[#00C6FF] shadow-[0_0_15px_rgba(0,198,255,0.4)]'
                            : 'bg-[#0A0A0A] border border-white/10'
                        }`}
                      >
                        {pillar.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold font-['Montserrat'] text-white">
                            {pillar.title}
                          </h3>
                        </div>
                        <span className="text-xs font-semibold text-[#00C6FF]">
                          {pillar.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#C4C8D0] mt-3.5 leading-relaxed">
                    {pillar.summary}
                  </p>

                  {/* Expanded Checklist */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-fade-in">
                      {pillar.details.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-white">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00C6FF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Futuristic 3D Precision Blueprint Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-[#2E7DFF]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(11,31,68,0.7)]">
              {/* Corner Sci-Fi Bracket Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00C6FF]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00C6FF]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00C6FF]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00C6FF]" />

              {/* Graphic Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-[#00C6FF] animate-spin [animation-duration:12s]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    VERTEX-3D // HASSASİYET MATRİSİ
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#00C6FF]/20 text-[#00C6FF] border border-[#00C6FF]/40">
                  KALİBRE EDİLDİ
                </span>
              </div>

              {/* Central Futuristic Visualization */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-[#2E7DFF]/30 mb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Futuristic CAD Precision Blueprint"
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0B1F44]/50 mix-blend-color" />
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />

                {/* Laser Scanning Line Animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00C6FF] to-transparent shadow-[0_0_15px_#00C6FF] animate-bounce [animation-duration:3s]" />

                {/* Overlay Measurement Callouts */}
                <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00C6FF]/40 text-xs text-white">
                  <span className="text-[#C4C8D0]">Ölçüm Sapması:</span>{' '}
                  <span className="text-[#00C6FF] font-mono font-bold">±{toleranceVal.toFixed(3)} mm</span>
                </div>
              </div>

              {/* Interactive Precision Controller Slider */}
              <div className="bg-[#0B1F44]/40 p-4 rounded-xl border border-white/5 mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#C4C8D0] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#2E7DFF]" />
                    Tolerans Kalibratörü:
                  </span>
                  <span className="font-mono text-[#00C6FF] font-bold">
                    {toleranceVal.toFixed(2)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.005"
                  value={toleranceVal}
                  onChange={(e) => setToleranceVal(parseFloat(e.target.value))}
                  className="w-full accent-[#00C6FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#C4C8D0]/60 mt-1">
                  <span>0.005mm (Ultra Hassas)</span>
                  <span>0.01mm (Vertex Standardı)</span>
                  <span>0.05mm (Genel)</span>
                </div>
              </div>

              {/* Key Quantitative Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0B1F44]/50 border border-white/5">
                  <div className="text-[#C4C8D0]">Teslim Başarısı</div>
                  <div className="text-lg font-bold text-white font-['Montserrat'] mt-0.5">
                    %99.4 <span className="text-[#00C6FF] text-xs font-normal">Zamanında</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B1F44]/50 border border-white/5">
                  <div className="text-[#C4C8D0]">Global İhracat</div>
                  <div className="text-lg font-bold text-white font-['Montserrat'] mt-0.5">
                    18+ <span className="text-[#2E7DFF] text-xs font-normal">Ülke</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
