import React from 'react';
import {
  Plane,
  Atom,
  Boxes,
  Zap,
  Activity,
  Cpu,
  ShieldCheck,
  Scan,
  Sparkles,
  Layers,
  CircleDot,
} from 'lucide-react';

interface SponsorBrand {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
  highlight: string;
}

export const SponsorsMarquee: React.FC = () => {
  // 10 Fictional High-Tech / Industrial Brands
  const sponsors: SponsorBrand[] = [
    {
      id: 'aeroforge',
      name: 'AEROMESH DYNAMICS',
      category: 'Havacılık & İleri İmalat',
      icon: <Plane className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'SLM Titanyum Gövde',
    },
    {
      id: 'nanosynthetix',
      name: 'NANOSYNTHETIX',
      category: 'Biyouyumlu İleri Polimer',
      icon: <Atom className="w-5 h-5 text-[#2E7DFF]" />,
      accentColor: '#2E7DFF',
      highlight: 'Medikal ISO 10993',
    },
    {
      id: 'hypermesh',
      name: 'HYPERMESH CAD',
      category: 'Generatif Tasarım Yazılımları',
      icon: <Boxes className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'Topoloji Optimizasyonu',
    },
    {
      id: 'quantumalloy',
      name: 'QUANTUM ALLOY CORP',
      category: 'Metal Toz Sinterleme & DMLS',
      icon: <Zap className="w-5 h-5 text-[#2E7DFF]" />,
      accentColor: '#2E7DFF',
      highlight: 'Inconel 718 Alaşımları',
    },
    {
      id: 'veloce',
      name: 'VELOCE EV MOTORS',
      category: 'Elektrikli Hiper Mobilite',
      icon: <CircleDot className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'Batarya Sıvı Soğutma',
    },
    {
      id: 'titanbio',
      name: 'TITANBIO IMPLANTS',
      category: 'Trabeküler Kemik Protezleri',
      icon: <Activity className="w-5 h-5 text-[#2E7DFF]" />,
      accentColor: '#2E7DFF',
      highlight: 'Ti6Al4V Trabecular',
    },
    {
      id: 'kinetix',
      name: 'KINETIX ROBOTICS',
      category: 'Endüstriyel 6-Eksen Otomasyon',
      icon: <Cpu className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'SLS Naylon Gripper',
    },
    {
      id: 'apexpolymer',
      name: 'APEX POLYMER LABS',
      category: 'Ultra Mukavemetli PEEK & CF',
      icon: <ShieldCheck className="w-5 h-5 text-[#2E7DFF]" />,
      accentColor: '#2E7DFF',
      highlight: '250°C Isı Dayanımı',
    },
    {
      id: 'omniscan',
      name: 'OMNISCAN METROLOGY',
      category: '0.005mm Optik 3D Tarama',
      icon: <Scan className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'CMM Doğrulama Raporu',
    },
    {
      id: 'cyberlumen',
      name: 'CYBERLUMEN VFX',
      category: '8K Anamorfik Billboard & CGI',
      icon: <Sparkles className="w-5 h-5 text-[#00C6FF]" />,
      accentColor: '#00C6FF',
      highlight: 'Fotogerçekçi CGI Stüdyo',
    },
  ];

  // Triplicate the list for an uninterrupted, seamless infinite loop
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-14 bg-[#080808] border-y border-[#2E7DFF]/20 relative overflow-hidden select-none">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[150px] bg-[#2E7DFF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[150px] bg-[#00C6FF]/10 blur-[120px] pointer-events-none" />

      {/* Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44]/60 border border-[#2E7DFF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase shadow-[0_0_15px_rgba(46,125,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#00C6FF] animate-pulse" />
          <span>TEKNOLOJİ ÇÖZÜM ORTAKLARI & GLOBAL SPONSORLAR</span>
        </div>
      </div>

      {/* Marquee Outer Container with Left and Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-28 md:w-36 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent z-20" />

        {/* Right Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-28 md:w-36 bg-gradient-to-l from-[#080808] via-[#080808]/80 to-transparent z-20" />

        {/* Sliding Infinite Track (Moves left-to-right continuously) */}
        <div className="animate-marquee-ltr flex items-center gap-3.5 sm:gap-5 py-2">
          {marqueeItems.map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="group shrink-0 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl glass-card border border-[#2E7DFF]/20 hover:border-[#00C6FF]/60 hover:shadow-[0_0_25px_rgba(0,198,255,0.35)] transition-all duration-300 flex items-center gap-3 sm:gap-4 bg-[#0A0A0A]/90 backdrop-blur-md cursor-default"
            >
              {/* Brand Icon Badge */}
              <div
                className="w-11 h-11 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#00C6FF] transition-all shadow-md"
                style={{
                  boxShadow: `0 0 15px ${sponsor.accentColor}25`,
                }}
              >
                {sponsor.icon}
              </div>

              {/* Brand Details */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-['Montserrat'] tracking-wide text-white group-hover:text-[#00C6FF] transition-colors whitespace-nowrap">
                    {sponsor.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF]/60" />
                  <span className="text-[10px] font-mono text-[#00C6FF] bg-[#00C6FF]/10 px-1.5 py-0.2 rounded border border-[#00C6FF]/20 whitespace-nowrap">
                    {sponsor.highlight}
                  </span>
                </div>
                <span className="text-xs text-[#C4C8D0] whitespace-nowrap font-medium mt-0.5">
                  {sponsor.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Micro Status Hint */}
      <div className="text-center mt-6 text-[11px] text-[#C4C8D0]/60">
        Endüstriyel 3D yazıcı parkuru ve Ar-Ge laboratuvarımızda onaylanmış küresel teknoloji konsorsiyumu.
      </div>
    </section>
  );
};
