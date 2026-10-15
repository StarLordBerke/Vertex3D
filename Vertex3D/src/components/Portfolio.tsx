import React, { useState } from 'react';
import {
  Layers,
  Sliders,
  Sparkles,
  Eye,
  X,
  ZoomIn,
  Search,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Filter,
  RefreshCw,
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category:
    | 'havacilik-savunma'
    | 'medikal-dental'
    | 'otomotiv'
    | 'endustriyel'
    | 'mimari'
    | 'oyun'
    | 'kreatif';
  categoryLabel: string;
  client: string;
  year: string;
  wireframeImg: string;
  renderImg: string;
  polygons: string;
  tolerance: string;
  materials: string;
  description: string;
  impact: string;
  tools: string[];
}

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [heroProjectId, setHeroProjectId] = useState<string>('aero-drone');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'havacilik-savunma', label: 'Havacılık & Savunma' },
    { id: 'medikal-dental', label: 'Medikal & Dental 3D' },
    { id: 'otomotiv', label: 'Otomotiv & EV' },
    { id: 'endustriyel', label: 'Endüstriyel & CAD' },
    { id: 'mimari', label: 'Mimarlık & BIM' },
    { id: 'oyun', label: 'Oyun & CGI' },
    { id: 'kreatif', label: '3D Reklam & DOOH' },
  ];

  const projects: Project[] = [
    {
      id: 'aero-drone',
      title: 'Aero-X Hibrit VTOL Drone Monokok Gövdesi',
      category: 'havacilik-savunma',
      categoryLabel: 'Havacılık & Savunma',
      client: 'Savunma Sanayii Ar-Ge',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
      polygons: '2.4M (NURBS Class-A)',
      tolerance: '±0.008 mm',
      materials: 'Prepreg Karbon Fiber & SLA Prototip',
      description:
        'Askeri ve sivil gözetleme görevleri için aerodinamik rüzgar tüneli CFD hava akışı simülasyonları, ağırlık optimizasyonu ve fonksiyonel 1:1 ölçekli montaj prototipi.',
      impact: '%32 Ağırlık Tasarrufu ve 85 Dk Kesintisiz Uçuş Süresi',
      tools: ['SolidWorks', 'Rhino 3D', 'Ansys Fluent', 'KeyShot'],
    },
    {
      id: 'bone-implant',
      title: 'Trabeküler Titanyum Kalça Protezi İmplantı',
      category: 'medikal-dental',
      categoryLabel: 'Medikal & Dental 3D',
      client: 'BioMedical Ortho Implants',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      polygons: '4.8M Kafes Hücre (Lattice)',
      tolerance: '±0.005 mm (SLM DMLS)',
      materials: 'Titanyum Ti6Al4V Grade 23 ELI',
      description:
        'İnsan süngerimsi kemik yapısını birebir taklit eden gözenekli hücresel yapı (Lattice). Kemik dokusu entegrasyonunu hızlandıran SLM metal 3D baskı geometrisi.',
      impact: 'Kemik Kaynamasında %45 Hızlanma ve Sıfır Gevşeme',
      tools: ['Materialise Magics', 'nTopology', 'Creo Parametric', 'SLM 280'],
    },
    {
      id: 'electric-hypercar',
      title: 'Apex-GT Saf Elektrikli Hiper Otomobil',
      category: 'otomotiv',
      categoryLabel: 'Otomotiv & EV',
      client: 'NextGen EV Motors Tech',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      polygons: '14M Poligon (Class-A Yüzey)',
      tolerance: '0.01 mm Kalıp Toleransı',
      materials: 'Karbon Kompozit & CNC Alüminyum',
      description:
        'Aktif aerodinamik venturi tünelleri, sürtünme katsayısı (Cd=0.21) optimizasyonu, Class-A yüzey modelleme ve 1:1 ölçekli VR sürücü kabini ergonomi analizi.',
      impact: '0-100 km/s 1.8 Saniye & %18 Menzil Artışı',
      tools: ['Autodesk Alias', 'V-Ray', 'Blender', 'KeyShot Pro'],
    },
    {
      id: 'turbine-nozzle',
      title: 'Generatif Tasarımlı Türbin Yanma Nozulu',
      category: 'havacilik-savunma',
      categoryLabel: 'Havacılık & Savunma',
      client: 'AeroJet Propulsion Systems',
      year: '2024',
      wireframeImg:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      polygons: '3.6M Poligon',
      tolerance: '±0.01 mm',
      materials: 'Inconel 718 Süper Alaşım (SLM Metal)',
      description:
        'İç içe geçmiş helisel mikro soğutma kanalları barındıran, geleneksel talaşlı imalatla üretilemeyen, doğrudan SLM 3D metal yazıcıda üretilen tek parça roket nozulu.',
      impact: 'Parça Sayısı 14’ten 1’e İndirildi, %40 Isıl Verim Artışı',
      tools: ['PTC Creo', 'Siemens NX', 'Ansys Thermal', 'DMLS Metal'],
    },
    {
      id: 'cyber-tower',
      title: 'Nova Helix Kültür & İş Merkezi',
      category: 'mimari',
      categoryLabel: 'Mimarlık & BIM',
      client: 'Metropol Mimarlık Grubu',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      polygons: '22M Poligon (BIM LOD 400)',
      tolerance: 'LOD 400 & Revit Entegre',
      materials: 'Kinetik Titanyum Cephe & Akıllı Cam',
      description:
        'Parametrik kinetik dış cephe panelleri, gün ışığı gölge etütleri ve Unreal Engine 5 gerçek zamanlı Lumen dinamik ışıklandırmalı sanal yürüyüş turu.',
      impact: 'Yeşil Bina LEED Platin Sertifikası & 60 FPS VR Deneyimi',
      tools: ['Revit', 'Rhino Grasshopper', '3ds Max', 'Unreal Engine 5'],
    },
    {
      id: 'mech-warrior',
      title: 'Sentinel-09 Siber Savaşçı Karakter Modeli',
      category: 'oyun',
      categoryLabel: 'Oyun & CGI',
      client: 'CyberPulse Studios',
      year: '2024',
      wireframeImg:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      polygons: '68K Triangles (Optimize Game-Ready)',
      tolerance: '8K UDIM PBR Dokulandırma',
      materials: 'Metahuman Shading & Karbon Kompozit',
      description:
        'AAA aksiyon oyunu için ZBrush high-poly heykelleme, retopoloji, Unreal Engine Metahuman yüz iskeleti ve kinematik kemik sistemleri.',
      impact: 'Oyun Konsollarında 120 FPS Kararlı Render Performansı',
      tools: ['ZBrush', 'Substance 3D Painter', 'Maya', 'Marvelous Designer'],
    },
    {
      id: 'luxury-timepiece',
      title: 'Chrono-Vertex Tourbillon Mekanizması',
      category: 'kreatif',
      categoryLabel: '3D Reklam & DOOH',
      client: 'İsviçre Haute Horlogerie',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      polygons: '5.6M Poligon',
      tolerance: '0.003 mm Dişli Uyumu',
      materials: 'Platin, Safir Kristal, Rose Gold',
      description:
        '280 adet mikro mekanik parçadan oluşan tourbillon saatin patlatma (exploded) animasyonu ve New York Times Square 3D Anamorfik Billboard CGI filmi.',
      impact: '12 Milyon Global Sosyal Medya & Billboard Görüntülenmesi',
      tools: ['Cinema 4D', 'Redshift', 'After Effects', 'Houdini FX'],
    },
    {
      id: 'dental-guide',
      title: 'Mikron Hassasiyetli Dental Cerrahi Rehberi',
      category: 'medikal-dental',
      categoryLabel: 'Medikal & Dental 3D',
      client: 'MedDent Global Ağız Sağlığı',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      polygons: '1.9M Poligon',
      tolerance: '0.01 mm Dental SLA',
      materials: 'Class-IIa Biyouyumlu Reçine & Çelik Kovan',
      description:
        'Tomografi (CBCT) ve 3D optik ağız taramasının birleştirilmesiyle implant yuvasının sinir hattına sıfır hata ile açılmasını sağlayan kılavuz plak.',
      impact: 'Operasyon Süresinde %60 Azalma, %100 Cerrahi Başarı',
      tools: ['3Shape Dental', 'Geomagic', 'Formlabs Form 4B'],
    },
    {
      id: 'robot-gripper',
      title: '6 Eksenli Endüstriyel Robot Kol Gripper & Fikstür',
      category: 'endustriyel',
      categoryLabel: 'Endüstriyel & CAD',
      client: 'RoboTech Otomasyon Sistemleri',
      year: '2024',
      wireframeImg:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      polygons: '2.1M Poligon',
      tolerance: '±0.01 mm (CNC & SLS PA12)',
      materials: 'Naylon PA12 & Havacılık Alüminyumu 7075',
      description:
        'Otomotiv montaj hattında yüksek ivmelenmeli hareketler için ağırlık tasarrufu sağlayan topolojik vakumlu tutucu el ve pnömatik bağlantılar.',
      impact: 'Robot Çevrim Süresinde %24 Hızlanma',
      tools: ['SolidWorks Simulation', 'Fusion 360 Generative', 'KeyShot'],
    },
    {
      id: 'battery-cooling',
      title: 'Elektrikli Araç Batarya Sıvı Soğutma Bloğu',
      category: 'otomotiv',
      categoryLabel: 'Otomotiv & EV',
      client: 'VoltDrive Battery Technologies',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      polygons: '3.1M Poligon',
      tolerance: '0.01 mm Basınç Sızdırmazlığı',
      materials: 'Alüminyum 3003-O & Lazer Kaynak',
      description:
        'Ultra hızlı şarj esnasında batarya hücre sıcaklığını 35°C altında sabitleyen mikro kanal sıvı akış labirentleri ve termo-hidrolik simülasyonu.',
      impact: 'Batarya Ömründe %28 Artış & Termal Kaçak Önleme',
      tools: ['Siemens Star-CCM+', 'SolidWorks Flow', 'AutoCAD Plant'],
    },
    {
      id: 'luxury-perfume',
      title: 'Lüks Kozmetik Amorf Şişe & Akışkan CGI Lansmanı',
      category: 'kreatif',
      categoryLabel: '3D Reklam & DOOH',
      client: 'Maison De Parfum Paris',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
      polygons: '3.8M Poligon',
      tolerance: 'Optik Cam Kırılma (IOR 1.52)',
      materials: 'K9 Kristal Cam & PVD Altın Kaplama',
      description:
        'Karmaşık amorf organik cam kütlesi içinde ışık kırılmaları, Houdini FLIP akışkan simülasyonları ve interaktif 360 derece WebGL e-ticaret deneyimi.',
      impact: 'Lansman Döneminde %340 Ön Sipariş Artışı',
      tools: ['Houdini', 'Octane Render', 'Cinema 4D', 'DaVinci Resolve'],
    },
    {
      id: 'bionic-leg',
      title: 'Bionic-X Karbon Fiber Dinamik Koşu Protezi',
      category: 'medikal-dental',
      categoryLabel: 'Medikal & Dental 3D',
      client: 'OrtoFlex Biyonik Teknolojiler',
      year: '2025',
      wireframeImg:
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      renderImg:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      polygons: '2.8M Poligon',
      tolerance: 'Dinamik Yay Dayanımı (ISO 10328)',
      materials: 'Otoklav Karbon Elyaf & SLS Naylon Soket',
      description:
        'Paralimpik atletler için topoloji optimize edilmiş bükülme geometrisi, kişiye özel 3D optik bacak taraması ve dinamik darbe emme analizi.',
      impact: 'Enerji Geri Kazanımında %88 Verimlilik',
      tools: ['Geomagic Design X', 'Altair OptiStruct', 'SolidWorks'],
    },
  ];

  // Filter projects by category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const heroProject =
    projects.find((p) => p.id === heroProjectId) || projects[0];

  return (
    <section id="portfolyo" className="py-24 bg-[#0B1F44]/25 relative overflow-hidden scroll-mt-24">
      {/* Background Neon Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-[#2E7DFF]/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00C6FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F44] border border-[#00C6FF]/30 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(0,198,255,0.3)]">
              <Layers className="w-3.5 h-3.5" />
              REFERANS PROJELER & 3D ARŞİV
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight">
              Hassasiyetin{' '}
              <span className="text-[#00C6FF] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] bg-clip-text text-transparent">
                Görsel ve Mühendislik Kanıtı
              </span>
            </h2>
            <p className="text-[#C4C8D0] text-sm sm:text-base max-w-2xl mt-2">
              Havacılıktan medikale, otomotivden lüks CGI reklamlarına; 0.01 mm toleransla gerçeğe dönüştürdüğümüz projeler.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#00C6FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Proje, malzeme veya teknoloji ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0A]/90 border border-[#2E7DFF]/30 text-white text-xs placeholder:text-[#C4C8D0]/60 focus:outline-none focus:border-[#00C6FF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C4C8D0] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Specialized Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 p-2 rounded-2xl bg-[#0A0A0A]/80 border border-[#2E7DFF]/25 backdrop-blur-md">
          {categories.map((tab) => {
            const count =
              tab.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === tab.id).length;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#2E7DFF] text-white shadow-[0_0_15px_rgba(46,125,255,0.6)] font-bold'
                    : 'text-[#C4C8D0] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#0B1F44] text-[#00C6FF]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            FEATURED INTERACTIVE SLIDER (WIREFRAME vs RENDER)
            ======================================================== */}
        <div className="mb-16 rounded-3xl glass-card border border-[#2E7DFF]/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(11,31,68,0.8)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00C6FF] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>İnteraktif Karşılaştırma: Tel Kafes CAD vs 8K Final Render</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white">
                {heroProject.title}
              </h3>
              <p className="text-xs text-[#C4C8D0] mt-1 max-w-xl">
                {heroProject.description}
              </p>
            </div>

            {/* Quick Metrics Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C4C8D0]">
              <span className="px-3 py-1.5 rounded-full bg-[#0B1F44] border border-[#2E7DFF]/30 font-mono">
                {heroProject.polygons}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#0B1F44] border border-[#00C6FF]/40 text-[#00C6FF] font-semibold">
                Tolerans: {heroProject.tolerance}
              </span>
            </div>
          </div>

          {/* Slicing / Comparison Interactive Frame */}
          <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/10 group">
            {/* Background Layer: Final Photorealistic Render */}
            <img
              src={heroProject.renderImg}
              alt="Final 8K Render"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-[#00C6FF] border border-[#00C6FF]/40 shadow-lg">
              <span className="hidden sm:inline">8K Final Fotogerçekçi </span>Render
            </div>

            {/* Foreground Clipped Layer: 3D CAD Wireframe Mesh */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <img
                src={heroProject.wireframeImg}
                alt="CAD Wireframe Mesh"
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50"
              />
              <div className="absolute inset-0 bg-[#0B1F44]/40 mix-blend-multiply" />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0B1F44]/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-white border border-[#2E7DFF]/40 shadow-lg">
                <span className="hidden sm:inline">0.01mm </span>CAD Kafes
              </div>
            </div>

            {/* Neon Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#00C6FF] shadow-[0_0_20px_#00C6FF] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0A0A0A] border-2 border-[#00C6FF] shadow-[0_0_20px_#00C6FF] flex items-center justify-center">
                <Sliders className="w-4 h-4 text-[#00C6FF]" />
              </div>
            </div>

            {/* Input Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Karşılaştırma Sürgüsü"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#C4C8D0] mt-3">
            <span>← Sola Kaydır (Render Önceliği)</span>
            <span className="text-[#00C6FF] font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Çizgiyi sağa-sola sürükleyerek mesh kafesini inceleyin
            </span>
            <span>Sağa Kaydır (CAD Kafes Önceliği) →</span>
          </div>
        </div>

        {/* ========================================================
            PORTFOLIO GRID (12 Comprehensive Projects)
            ======================================================== */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/10">
            <Filter className="w-10 h-10 text-[#00C6FF] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">Aramanızla Eşleşen Proje Bulunamadı</h3>
            <p className="text-xs text-[#C4C8D0] mb-4">Lütfen farklı bir anahtar kelime veya kategori seçin.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2E7DFF] text-white"
            >
              Tüm Projeleri Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden glass-card border border-[#2E7DFF]/20 hover:border-[#00C6FF]/60 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative h-60 w-full overflow-hidden"
                  >
                    <img
                      src={project.renderImg}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#0B1F44]/95 text-[#00C6FF] border border-[#2E7DFF]/40 backdrop-blur-md">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Inspect Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                      <div className="px-4 py-2 rounded-xl bg-[#2E7DFF] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_#2E7DFF]">
                        <ZoomIn className="w-4 h-4" />
                        <span>Detaylı Raporu İncele</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#00C6FF] font-semibold mb-1.5">
                      <span className="truncate max-w-[200px]">{project.client}</span>
                      <span className="text-[#C4C8D0] font-mono">{project.year}</span>
                    </div>
                    <h4
                      onClick={() => setSelectedProject(project)}
                      className="text-lg font-bold font-['Montserrat'] text-white group-hover:text-[#00C6FF] transition-colors mb-2 line-clamp-1"
                    >
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#C4C8D0] line-clamp-2 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Material & Impact Highlights */}
                    <div className="p-2.5 rounded-xl bg-[#0B1F44]/40 border border-white/5 mb-4 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#C4C8D0]">Malzeme:</span>
                        <span className="text-white font-medium truncate max-w-[170px]">{project.materials}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#C4C8D0]">Hassasiyet:</span>
                        <span className="text-[#00C6FF] font-mono font-bold">{project.tolerance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeroProjectId(project.id);
                      const el = document.getElementById('portfolyo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-[#00C6FF] hover:underline flex items-center gap-1 cursor-pointer"
                    title="Bu modeli yukarıdaki karşılaştırma sürgüsüne yükle"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sürgüde İncele</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-white hover:text-[#00C6FF] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Detaylar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          DETAILED PROJECT INSPECTION MODAL
          ======================================================== */}
      {selectedProject && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full max-w-4xl bg-[#0A0A0A] border border-[#2E7DFF]/50 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(46,125,255,0.4)] max-h-[92vh] overflow-y-auto">
            {/* Modal Header Image */}
            <div className="relative h-72 sm:h-96 w-full">
              <img
                src={selectedProject.renderImg}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 text-white hover:bg-[#2E7DFF] transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 -mt-16 relative z-10">
              <span className="text-xs font-bold text-[#00C6FF] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#0B1F44] border border-[#2E7DFF]/40 shadow-lg">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] text-white mt-3 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-[#C4C8D0] mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Manufacturing Impact Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B1F44] to-[#0A0A0A] border border-[#00C6FF]/40 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#00C6FF] shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-[#00C6FF] uppercase tracking-wider block">
                    Mühendislik & Üretim Çıktısı:
                  </span>
                  <span className="text-xs text-white font-semibold">
                    {selectedProject.impact}
                  </span>
                </div>
              </div>

              {/* Key Technical Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0B1F44]/40 border border-white/5 mb-6 text-xs">
                <div>
                  <div className="text-[#C4C8D0]">Sektör / Müşteri</div>
                  <div className="text-white font-bold mt-0.5">{selectedProject.client}</div>
                </div>
                <div>
                  <div className="text-[#C4C8D0]">Teslim Yılı</div>
                  <div className="text-white font-bold mt-0.5">{selectedProject.year}</div>
                </div>
                <div>
                  <div className="text-[#C4C8D0]">Poligon Yoğunluğu</div>
                  <div className="text-[#00C6FF] font-bold font-mono mt-0.5">{selectedProject.polygons}</div>
                </div>
                <div>
                  <div className="text-[#C4C8D0]">Üretim Toleransı</div>
                  <div className="text-[#2E7DFF] font-bold font-mono mt-0.5">{selectedProject.tolerance}</div>
                </div>
              </div>

              {/* Material & Stack */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
                    Malzeme Özellikleri:
                  </span>
                  <span className="text-xs text-[#C4C8D0] bg-[#0B1F44]/60 px-3 py-1.5 rounded-lg border border-white/5 inline-block">
                    {selectedProject.materials}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1.5">
                    Kullanılan 3D Yazılım & Laboratuvar Donanımları:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-lg bg-[#0B1F44] border border-[#2E7DFF]/30 text-xs text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#00C6FF] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Resmi NDA ve Fikri Mülkiyet Korumalı Proje</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-semibold text-[#C4C8D0] hover:text-white bg-[#0B1F44]/50 border border-white/10"
                  >
                    Kapat
                  </button>
                  <a
                    href="#iletisim"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-[#0A0A0A] bg-[#00C6FF] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,198,255,0.4)] text-center cursor-pointer"
                  >
                    Benzer Proje İçin Teklif Al
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
