import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Boxes,
  Gamepad2,
  Lightbulb,
  ScanLine,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tag: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  sampleImage: string;
  stat: string;
}

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const services: ServiceItem[] = [
    {
      id: 'tasarim-modelleme',
      title: 'Tasarım & Modelleme',
      subtitle: '3D modelleme, render ve fotogerçekçi görselleştirme çözümleri.',
      icon: <Code2 className="w-7 h-7 text-[#00C6FF]" />,
      tag: 'Poligon & NURBS',
      description:
        'Konsept tasarımdan son render aşamasına kadar yüksek poligonlu ve hassas parametrik yüzey modelleme. Ürün lansmanları, pazarlama materyalleri ve interaktif kataloglar için fotogerçekçi görsel çıktılar sunuyoruz.',
      deliverables: [
        'Yüksek poligonlu ve Subdivision yüzey modelleri',
        '8K Ultra-HD Fotogerçekçi V-Ray / Corona / Octane Renderlar',
        '360° Dönen interaktif web ürün görselleştirmeleri',
        'PBR Fiziksel doğruluğa sahip materyal kütüphanesi',
      ],
      techStack: ['Rhino 3D', 'Autodesk Maya', 'Blender', 'Cinema 4D', 'Substance 3D'],
      sampleImage:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      stat: '0.01 mm Yüzey Sürekliliği (G2/G3)',
    },
    {
      id: 'endustriyel-uygulamalar',
      title: 'Endüstriyel Uygulamalar',
      subtitle: 'Prototip, ürün geliştirme, tersine mühendislik ve üretim süreçleri.',
      icon: <Cpu className="w-7 h-7 text-[#2E7DFF]" />,
      tag: '0.01mm Hassasiyet',
      description:
        'Fiziksel üretime doğrudan hazır CAD modelleri, fonksiyonel prototipleme ve seri üretime geçiş öncesi tolerans analizleri. SLA, SLS, FDM ve metal 3D yazıcılar ile CNC frezeleme tezgahları için optimize edilmiş mühendislik dosyaları.',
      deliverables: [
        'STEP, IGES, Parasolid ve STL üretim çıktıları',
        'Montaj patlatma (Exploded view) ve tolerans analizleri',
        'Tersine mühendislik (3D Optik Tarama verisi işleme)',
        'Fonksiyonel mekanik parça testi ve prototip üretimi',
      ],
      techStack: ['SolidWorks', 'Autodesk Fusion 360', 'PTC Creo', 'Geomagic Design X'],
      sampleImage:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      stat: '±0.01mm Tolerans Garantisi',
    },
    {
      id: 'mimarlik-insaat',
      title: 'Mimarlık & İnşaat',
      subtitle: 'Mimari görselleştirme, planlama, çevre tasarımı ve sanal sunumlar.',
      icon: <Boxes className="w-7 h-7 text-[#00C6FF]" />,
      tag: 'BIM & CGI',
      description:
        'Konut, ticari ve mega altyapı projeleri için gerçekçi ışık simülasyonları, gün ışığı etütleri ve sanal tur deneyimleri. Projelerinizi henüz temel atılmadan müşterilerinize birebir yaşatın.',
      deliverables: [
        'Dış cephe & iç mekan fotogerçekçi mimari renderlar',
        'Unreal Engine 5 ile gerçek zamanlı interaktif mimari turlar',
        'Peyzaj ve kentsel dönüşüm ölçekli 3D masterplanlar',
        'BIM ve Revit modelleriyle entegre görselleştirme',
      ],
      techStack: ['Unreal Engine 5', '3ds Max', 'Lumion', 'SketchUp Pro', 'Revit'],
      sampleImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      stat: 'Gerçek Zamanlı 60 FPS VR / Web Deneyimi',
    },
    {
      id: 'oyun-eglence',
      title: 'Oyun & Eğlence',
      subtitle: 'Oyun dünyaları, fütüristik karakter ve çevre (environment) tasarımları.',
      icon: <Gamepad2 className="w-7 h-7 text-[#2E7DFF]" />,
      tag: 'AAA Game Assets',
      description:
        'Unity ve Unreal Engine motorlarına optimize edilmiş oyun hazır (Game-Ready) varlıklar. ZBrush ile detaylı karakter heykelleme, optimize edilmiş UV haritaları ve animasyona hazır iskelet (rigging) sistemleri.',
      deliverables: [
        'Optimize edilmiş Low-Poly ve High-Poly oyun varlıkları',
        'PBR 4K/8K doku setleri (Albedo, Normal, Roughness, Metalness)',
        'Karakter rigging, blendshape yüz mimikleri ve animasyon hazırlığı',
        'Oyun motorlarına doğrudan aktarılabilir FBX / GLTF paketleri',
      ],
      techStack: ['ZBrush', 'Houdini', 'Marvelous Designer', 'Unreal Engine 5', 'Unity'],
      sampleImage:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      stat: 'AAA Standardında Düşük Poligon Optimizasyonu',
    },
    {
      id: 'kreatif-cozumler',
      title: 'Kreatif Çözümler',
      subtitle: 'Marka kimliği, 3D reklam filmleri, motion CGI ve özel proje tasarımları.',
      icon: <Lightbulb className="w-7 h-7 text-[#00C6FF]" />,
      tag: 'Motion & CGI',
      description:
        'Sıradanlığı yıkan fütüristik 3D ürün lansman videoları, 3D billboard ve anamorfik ekran tasarımları, soyut sanatsal animasyonlar ve yenilikçi marka deneyimleri.',
      deliverables: [
        'Anamorfik 3D Dijital Açık Hava (DOOH / Billboard) videoları',
        'Ürün patlatma ve kinematik hareket animasyonları',
        'Metaverse ve WebGL için interaktif 3D deneyimler',
        'Fütüristik marka kimliği ve hareketli 3D logolar',
      ],
      techStack: ['After Effects', 'Cinema 4D', 'Redshift', 'Houdini FX', 'Octane'],
      sampleImage:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      stat: 'Viral 3D Reklam & Anamorfik Ekran Uyumu',
    },
    {
      id: 'tersine-muhendislik-tarama',
      title: 'Tersine Mühendislik & 3D Tarama',
      subtitle: 'Optik ve lazer 3D tarama, dijital ikiz modelleme ve metroloji.',
      icon: <ScanLine className="w-7 h-7 text-[#00C6FF]" />,
      tag: '0.005mm Tarama',
      description:
        'Fiziksel parçaların, aşınmış kalıpların veya teknik çizimi bulunmayan makine bileşenlerinin 3D optik mavi ışık ve lazer tarayıcılarla mikron seviyesinde taranarak parametrik CAD modeline dönüştürülmesi.',
      deliverables: [
        '0.005 mm hassasiyetli 3D lazer ve optik tarama verisi',
        'Nokta bulutundan parametrik STEP, IGES ve Solid CAD rekonstrüksiyonu',
        'Orijinal CAD modeline kıyasla renkli sapma (Color Map) analizi',
        'Seri üretim öncesi İlk Parça Muayenesi (FAI) ve CMM metroloji raporu',
      ],
      techStack: ['Geomagic Design X', 'GOM Inspect Pro', 'Creaform HandySCAN', 'Zeiss CMM', 'SolidWorks'],
      sampleImage:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      stat: '±0.005 mm Metroloji ve CMM Rapor Garantisi',
    },
  ];

  return (
    <section id="hizmetler" className="py-24 bg-[#0A0A0A] relative overflow-hidden scroll-mt-24">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B1F44]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2E7DFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44]/60 border border-[#2E7DFF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            HİZMET ALANLARIMIZ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight mb-4">
            Fikirden Gerçeğe:{' '}
            <span className="text-[#2E7DFF] bg-gradient-to-r from-[#2E7DFF] to-[#00C6FF] bg-clip-text text-transparent">
              Uçtan Uca 3D Çözümler
            </span>
          </h2>
          <p className="text-[#C4C8D0] text-base sm:text-lg">
            Vertex 3D olarak sanayi standartlarında mühendislik hassasiyeti ile kreatif sanatı buluşturuyor; her sektör için özel 3D altyapısı geliştiriyoruz.
          </p>
        </div>

        {/* Services Grid (6 cards in balanced 3x2 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="group relative glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 border border-[#2E7DFF]/20 hover:border-[#00C6FF]/60 hover:shadow-[0_15px_35px_-10px_rgba(46,125,255,0.4)]"
              >
                {/* Top Corner Glow Line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00C6FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F44] border border-[#2E7DFF]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00C6FF] group-hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0B1F44]/90 text-[#00C6FF] border border-[#2E7DFF]/30">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white group-hover:text-[#00C6FF] transition-colors mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2E7DFF] mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-[#C4C8D0] leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>

                  {/* Quick Feature Bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {service.deliverables.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#C4C8D0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C6FF] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-white group-hover:text-[#00C6FF] flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 active:scale-95"
                  >
                    <span>Detayları Gör</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#0A0A0A] bg-[#00C6FF] hover:bg-white active:scale-95 transition-all shadow-[0_0_12px_rgba(0,198,255,0.4)] cursor-pointer"
                  >
                    Teklif Al
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-[#2E7DFF]/50 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(46,125,255,0.4)] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl bg-[#0B1F44] text-[#C4C8D0] hover:text-white hover:bg-[#2E7DFF] active:scale-95 transition-all cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-4 mb-4 pr-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B1F44] border border-[#2E7DFF] flex items-center justify-center shrink-0">
                {selectedService.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-[#00C6FF] uppercase tracking-wider">
                  {selectedService.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#C4C8D0] leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Key Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C6FF]" />
                Teslim Edilecek Çıktılar & Süreç
              </h4>
              <div className="space-y-2 bg-[#0B1F44]/30 rounded-2xl p-4 border border-white/5">
                {selectedService.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#C4C8D0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF] mt-1.5 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Toolchain */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#2E7DFF]" />
                Kullanılan Yazılım & Teknoloji Altyapısı
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#0B1F44] border border-[#2E7DFF]/30 text-xs font-medium text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#00C6FF] font-semibold text-center sm:text-left">
                Standart: {selectedService.stat}
              </div>
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectService(serviceName);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:from-white hover:to-[#00C6FF] transition-all shadow-[0_0_20px_rgba(0,198,255,0.5)] cursor-pointer active:scale-95"
              >
                Bu Hizmet İçin Proje Başlat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
