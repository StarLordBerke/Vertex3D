import React, { useState, useId } from 'react';
import { PrintModelViewer, ModelStats } from './PrintModelViewer';
import {
  Upload,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  ArrowRight,
  Printer,
  Scale,
  FileCheck,
  Zap,
  Info,
  Maximize2,
  RotateCcw,
  Wrench,
  Award,
  Truck,
  Activity,
  FileSpreadsheet,
  Check,
} from 'lucide-react';

interface ProjectCalculatorProps {
  onStartWithEstimate: (details: {
    service: string;
    complexity: string;
    delivery: string;
    estimatedCost: string;
    extras: string[];
  }) => void;
}

interface TechnologyOption {
  id: string;
  name: string;
  shortTag: string;
  accuracy: string;
  desc: string;
  basePerHour: number;
  setupFee: number;
}

interface MaterialOption {
  id: string;
  techId: string;
  name: string;
  density: number; // g/cm3
  costPerGram: number; // TL
  tensileStrength: string;
  heatDeflection: string;
  features: string;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ onStartWithEstimate }) => {
  // Mode: 'print' (3D Print & Upload Model) vs 'cad' (Custom CAD Design Service)
  const [calculatorMode, setCalculatorMode] = useState<'print' | 'cad'>('print');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDemoKey, setSelectedDemoKey] = useState<string>('bracket');
  const [modelScale, setModelScale] = useState<number>(1.0); // 0.5 to 2.0

  // 3D Printing Technology & Material Selections
  const [selectedTech, setSelectedTech] = useState<string>('sla');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('tough_resin');
  const [layerHeight, setLayerHeight] = useState<number>(0.05); // mm
  const [infill, setInfill] = useState<number>(40); // %
  const [quantity, setQuantity] = useState<number>(1);
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express' | 'urgent'>('standard');
  const [colorOption, setColorOption] = useState<string>('matte_black');

  // Post-processing Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'support_cure',
    'quality_report',
  ]);

  // Model Real-Time Physical Statistics
  const [stats, setStats] = useState<ModelStats>({
    width: 70,
    height: 35,
    depth: 50,
    volumeCm3: 36.4,
    weightGrams: 42,
    triangles: 42800,
    fileName: 'Mekanik_Braket_01.stl',
  });

  // Technologies
  const technologies: TechnologyOption[] = [
    {
      id: 'sla',
      name: 'SLA / DLP Endüstriyel Reçine',
      shortTag: 'Hassas & Pürüzsüz',
      accuracy: '±0.025 mm',
      desc: 'Fotopolimer sıvı reçine ile 8K pürüzsüz yüzey, görsel prototip ve hassas montaj parçaları.',
      basePerHour: 180,
      setupFee: 350,
    },
    {
      id: 'sls',
      name: 'SLS Naylon Sinterleme (PA12)',
      shortTag: 'Desteksiz & Yüksek Darbe',
      accuracy: '±0.05 mm',
      desc: 'Lazerle toz eritme. Destek yapısına ihtiyaç duymaz, karmaşık geometriler ve nihai ürünler için idealdir.',
      basePerHour: 240,
      setupFee: 500,
    },
    {
      id: 'fdm',
      name: 'FDM Endüstriyel Termoplastik',
      shortTag: 'Ekonomik & Dayanıklı',
      accuracy: '±0.1 mm',
      desc: 'PLA+, ABS-ESD, PETG ve Karbon Fiber filamentler ile büyük ölçekli ve hızlı fonksiyonel prototipler.',
      basePerHour: 90,
      setupFee: 200,
    },
    {
      id: 'slm',
      name: 'SLM Metal 3D Baskı (DMLS)',
      shortTag: 'Titanyum & 316L Çelik',
      accuracy: '±0.01 mm',
      desc: 'Doğrudan metal lazer sinterleme. Havacılık, medikal implant ve ekstrem mukavemet gerektiren mekanizmalar.',
      basePerHour: 650,
      setupFee: 1800,
    },
  ];

  // Materials Library
  const materials: MaterialOption[] = [
    // SLA
    {
      id: 'tough_resin',
      techId: 'sla',
      name: 'Tough Mühendislik Reçinesi (ABS Benzeri)',
      density: 1.18,
      costPerGram: 18,
      tensileStrength: '55 MPa',
      heatDeflection: '75 °C',
      features: 'Darbe emici, elastik mekanik tırnaklar ve fonksiyonel muhafaza kutuları.',
    },
    {
      id: 'standard_resin',
      techId: 'sla',
      name: 'Standart Yüksek Çözünürlüklü 8K Reçine',
      density: 1.15,
      costPerGram: 14,
      tensileStrength: '45 MPa',
      heatDeflection: '60 °C',
      features: 'Ayna gibi pürüzsüz dış yüzey, mikro detaylar ve boyamaya hazır yüzey.',
    },
    {
      id: 'dental_resin',
      techId: 'sla',
      name: 'Biyouyumlu Medikal / Dental Reçine',
      density: 1.22,
      costPerGram: 32,
      tensileStrength: '68 MPa',
      heatDeflection: '90 °C',
      features: 'ISO 10993 sertifikalı, sterilize edilebilir, biyouyumlu cerrahi kılavuzlar.',
    },
    // SLS
    {
      id: 'nylon_pa12',
      techId: 'sls',
      name: 'Endüstriyel PA12 Naylon (SLS)',
      density: 1.01,
      costPerGram: 22,
      tensileStrength: '48 MPa',
      heatDeflection: '163 °C',
      features: 'Yorulma direnci yüksek, kimyasal dayanımlı, seri üretime uygun nihai parça.',
    },
    {
      id: 'pa12_cf',
      techId: 'sls',
      name: 'Karbon Fiber Takviyeli Naylon (PA12-CF)',
      density: 1.05,
      costPerGram: 38,
      tensileStrength: '80 MPa',
      heatDeflection: '175 °C',
      features: 'Havacılık sınıfı rijitlik, aşırı sertlik ve hafiflik oranı.',
    },
    // FDM
    {
      id: 'pla_pro',
      techId: 'fdm',
      name: 'Endüstriyel PLA+ / Tough Termoplastik',
      density: 1.25,
      costPerGram: 8,
      tensileStrength: '40 MPa',
      heatDeflection: '55 °C',
      features: 'Hızlı prototipleme, düşük maliyet, boyutsal kararlılık.',
    },
    {
      id: 'abs_esd',
      techId: 'fdm',
      name: 'ABS-ESD (Antistatik & Darbe Dayanımlı)',
      density: 1.07,
      costPerGram: 16,
      tensileStrength: '45 MPa',
      heatDeflection: '95 °C',
      features: 'Elektronik laboratuvarları, elektrostatik koruma ve otomotiv parçaları.',
    },
    // SLM Metal
    {
      id: 'metal_316l',
      techId: 'slm',
      name: 'Paslanmaz Çelik 316L (DMLS Metal)',
      density: 7.95,
      costPerGram: 65,
      tensileStrength: '550 MPa',
      heatDeflection: '850 °C',
      features: 'Korozyon direnci, basınçlı sıvı/gaz hatları ve gıda standardı parçalar.',
    },
    {
      id: 'metal_ti64',
      techId: 'slm',
      name: 'Titanyum Ti6Al4V Grade 23 (DMLS Metal)',
      density: 4.43,
      costPerGram: 140,
      tensileStrength: '950 MPa',
      heatDeflection: '400 °C',
      features: 'Ekstrem güç/ağırlık oranı, havacılık gövde parçaları ve medikal kemik protezleri.',
    },
  ];

  // Available Post-Processing Add-ons
  const postProcessingAddons = [
    {
      id: 'support_cure',
      name: 'Destek Temizleme & Termal UV Kürleme',
      cost: 0,
      desc: 'Her siparişte standart ve ücretsiz olarak uygulanır.',
    },
    {
      id: 'vapor_smoothing',
      name: 'Buharlı Pürüzsüzleştirme (Vapor Smoothing / Kumlama)',
      cost: 450,
      desc: 'Katman çizgilerini tamamen yok eden enjeksiyon kalıbı parlaklığı.',
    },
    {
      id: 'threaded_inserts',
      name: 'Pirinç Helicoil Dişli İnsert Montajı (M3/M4/M5)',
      cost: 350,
      desc: 'Vidaların aşınmadan yüzlerce kez takılıp sökülebilmesi için ısıl montaj.',
    },
    {
      id: 'custom_coating',
      name: 'Elektrostatik Mat / Özel Kurumsal Renk Boyama',
      cost: 650,
      desc: 'UV dayanımlı poliüretan endüstriyel son kat boya.',
    },
    {
      id: 'quality_report',
      name: '0.01 mm CMM Boyutsal Ölçüm ve Kalite Raporu',
      cost: 750,
      desc: 'Optik tarama ile orijinal CAD modelinin sapma haritası ve sertifika.',
    },
  ];

  // Filter materials based on current technology
  const availableMaterials = materials.filter((m) => m.techId === selectedTech);
  const currentMaterial =
    availableMaterials.find((m) => m.id === selectedMaterial) || availableMaterials[0] || materials[0];
  const currentTech = technologies.find((t) => t.id === selectedTech) || technologies[0];

  // Handle file drop / change
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  };

  const toggleAddon = (id: string) => {
    if (id === 'support_cure') return; // Cannot toggle free base step
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Switch technology and auto-pick appropriate default material
  const handleSelectTech = (techId: string) => {
    setSelectedTech(techId);
    const firstMat = materials.find((m) => m.techId === techId);
    if (firstMat) {
      setSelectedMaterial(firstMat.id);
    }
  };

  // Compute Print Price with engineering formulas
  const computePriceBreakdown = () => {
    // 1. Material cost
    const materialCostPerUnit = stats.weightGrams * currentMaterial.costPerGram;

    // 2. Machine Print Time (approx calculation: height mm / layer height * layer time seconds)
    const totalLayers = Math.max(100, Math.round(stats.height / layerHeight));
    const hoursPerPiece = Math.max(0.8, Math.round(((totalLayers * 22) / 3600) * 10) / 10);
    const machineCostPerUnit = hoursPerPiece * currentTech.basePerHour;

    // 3. Post processing addons cost
    const addonsCostPerUnit = selectedAddons.reduce((sum, aId) => {
      const found = postProcessingAddons.find((item) => item.id === aId);
      return sum + (found ? found.cost : 0);
    }, 0);

    // 4. Raw Unit Price
    const rawUnitPrice = currentTech.setupFee + materialCostPerUnit + machineCostPerUnit + addonsCostPerUnit;

    // 5. Volume Quantity Discount Curve
    let discountRate = 0;
    if (quantity >= 50) discountRate = 0.35;
    else if (quantity >= 20) discountRate = 0.25;
    else if (quantity >= 10) discountRate = 0.18;
    else if (quantity >= 5) discountRate = 0.10;

    const discountedUnitPrice = Math.round(rawUnitPrice * (1 - discountRate));

    // 6. Urgency Multiplier
    let urgencyMultiplier = 1.0;
    if (deliverySpeed === 'express') urgencyMultiplier = 1.25;
    if (deliverySpeed === 'urgent') urgencyMultiplier = 1.55;

    const finalUnitPrice = Math.round(discountedUnitPrice * urgencyMultiplier);
    const totalNetPrice = finalUnitPrice * quantity;
    const vatAmount = Math.round(totalNetPrice * 0.20);
    const totalWithVat = totalNetPrice + vatAmount;

    return {
      materialCostPerUnit: Math.round(materialCostPerUnit),
      machineCostPerUnit: Math.round(machineCostPerUnit),
      addonsCostPerUnit,
      hoursPerPiece,
      totalLayers,
      discountRate: Math.round(discountRate * 100),
      finalUnitPrice,
      totalNetPrice,
      vatAmount,
      totalWithVat,
    };
  };

  const pricing = computePriceBreakdown();

  const handleTransferToContact = () => {
    const summaryText = `[3D BASKI SİPARİŞİ]
Model: ${stats.fileName}
Boyutlar: ${stats.width}x${stats.depth}x${stats.height} mm (Ölçek: %${Math.round(modelScale * 100)})
Hacim: ${stats.volumeCm3} cm³ | Ağırlık: ${stats.weightGrams} gr
Teknoloji: ${currentTech.name}
Malzeme: ${currentMaterial.name}
Katman Kalınlığı: ${layerHeight} mm (${layerHeight * 1000} Mikron)
Doluluk: %${infill}
Adet: ${quantity} Adet
Teslimat: ${deliverySpeed === 'standard' ? 'Standart (3-5 Gün)' : deliverySpeed === 'express' ? 'Hızlı Express (48 Saat)' : 'Acil Üretim (24 Saat)'}
Seçilen Son İşlemler: ${selectedAddons.map((id) => postProcessingAddons.find((a) => a.id === id)?.name).join(', ')}
Birim Fiyat: ${pricing.finalUnitPrice.toLocaleString('tr-TR')} ₺/adet
Toplam Tutar (KDV Dahil): ${pricing.totalWithVat.toLocaleString('tr-TR')} ₺`;

    onStartWithEstimate({
      service: 'Endüstriyel Uygulamalar (3D Baskı & Prototip)',
      complexity: `${currentTech.shortTag} - ${currentMaterial.name}`,
      delivery: deliverySpeed === 'standard' ? '3-5 Gün' : deliverySpeed === 'express' ? '48 Saat' : '24 Saat',
      estimatedCost: `${pricing.totalWithVat.toLocaleString('tr-TR')} ₺ (KDV Dahil, ${quantity} Adet)`,
      extras: selectedAddons.map((id) => postProcessingAddons.find((a) => a.id === id)?.name || id),
    });
  };

  return (
    <section id="hesaplayici" className="py-24 bg-[#0A0A0A] bg-grid-pattern relative overflow-hidden scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0B1F44]/40 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#2E7DFF]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F44]/80 border border-[#00C6FF]/40 text-xs font-bold text-[#00C6FF] tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(0,198,255,0.3)]">
            <Printer className="w-4 h-4" />
            ENDÜSTRİYEL 3D BASKI & CAD LABORATUVARI
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-black text-white tracking-tight mb-4">
            3D Modelini Yükle,{' '}
            <span className="text-[#00C6FF] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] bg-clip-text text-transparent">
              Anında Fiyat & Analiz Al
            </span>
          </h2>
          <p className="text-[#C4C8D0] text-sm sm:text-base max-w-2xl mx-auto">
            STL veya OBJ dosyanızı yükleyin; 0.01mm hassasiyetle parça hacmini, ağırlığını, üretim süresini ve maliyetini gerçek zamanlı inceleyin.
          </p>
        </div>

        {/* Mode Toggle Bar: 3D Printing vs Custom CAD Design */}
        <div className="flex justify-center mb-10 w-full">
          <div className="flex flex-col sm:inline-flex sm:flex-row w-full sm:w-auto p-1.5 rounded-2xl bg-[#0B1F44]/70 border border-[#2E7DFF]/40 backdrop-blur-xl shadow-xl gap-1">
            <button
              type="button"
              onClick={() => setCalculatorMode('print')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                calculatorMode === 'print'
                  ? 'bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] text-[#0A0A0A] shadow-[0_0_20px_rgba(0,198,255,0.5)]'
                  : 'text-[#C4C8D0] hover:text-white'
              }`}
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">3D Baskı & Prototipleme (Model Yükleme)</span>
              <span className="sm:hidden">3D Baskı & Prototip</span>
            </button>
            <button
              type="button"
              onClick={() => setCalculatorMode('cad')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                calculatorMode === 'cad'
                  ? 'bg-[#2E7DFF] text-white shadow-[0_0_20px_rgba(46,125,255,0.6)]'
                  : 'text-[#C4C8D0] hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Sıfırdan CAD Modelleme & Tasarım</span>
              <span className="sm:hidden">CAD Modelleme & Tasarım</span>
            </button>
          </div>
        </div>

        {calculatorMode === 'print' ? (
          /* ========================================================
             3D PRINTING & LIVE MODEL VIEWER CALCULATOR
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Columns: Interactive 3D Model Viewport & File Dropper */}
            <div className="lg:col-span-6 space-y-5">
              {/* File Upload Box */}
              <div className="glass-card rounded-2xl p-5 border border-[#2E7DFF]/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#00C6FF]" />
                      3D Model Dosyanızı Yükleyin (.STL, .OBJ, .STEP)
                    </span>
                    <span className="text-[11px] text-[#C4C8D0]">
                      Tarayıcı içinde anında 3D olarak görüntülenir; dosyanız gizli tutulur.
                    </span>
                  </div>

                  {uploadedFile && (
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="text-xs text-[#00C6FF] hover:underline flex items-center gap-1 self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3 h-3" /> Demolara Dön
                    </button>
                  )}
                </div>

                {/* Upload Zone */}
                <label className="relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-[#2E7DFF]/40 bg-[#0B1F44]/30 hover:bg-[#0B1F44]/60 hover:border-[#00C6FF] transition-all cursor-pointer group">
                  <Upload className="w-8 h-8 text-[#00C6FF] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white text-center">
                    {uploadedFile ? uploadedFile.name : 'Dosyayı buraya sürükleyin veya bilgisayarınızdan seçin'}
                  </span>
                  <span className="text-[10px] text-[#C4C8D0] mt-1">
                    Desteklenenler: .STL, .OBJ, .STEP, .3MF (Maks 150MB)
                  </span>
                  <input
                    type="file"
                    accept=".stl,.obj,.step,.stp,.3mf,.ply"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Or Quick Pick Demo Models */}
                {!uploadedFile && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-semibold text-[#C4C8D0] uppercase tracking-wider block mb-2">
                      Veya Hazır Endüstriyel Demo Modelleri Deneyin:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'bracket', label: 'Mekanik Braket' },
                        { key: 'gear', label: 'Hassas Dişli' },
                        { key: 'turbine', label: 'Türbin Kanadı' },
                        { key: 'crystal', label: 'Vertex Amblem' },
                      ].map((demo) => (
                        <button
                          key={demo.key}
                          type="button"
                          onClick={() => setSelectedDemoKey(demo.key)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all text-center ${
                            selectedDemoKey === demo.key
                              ? 'bg-[#2E7DFF] text-white border-[#00C6FF] shadow-[0_0_12px_rgba(46,125,255,0.5)]'
                              : 'bg-[#0B1F44]/50 text-[#C4C8D0] border-white/5 hover:border-white/20'
                          }`}
                        >
                          {demo.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Real-Time Three.js 3D Viewer */}
              <PrintModelViewer
                modelFile={uploadedFile}
                demoModelKey={selectedDemoKey}
                scale={modelScale}
                infillPercent={infill}
                materialDensity={currentMaterial.density}
                technology={selectedTech}
                onStatsCalculated={setStats}
              />

              {/* Physical Metrics Grid & Model Scaling */}
              <div className="glass-card rounded-2xl p-5 border border-[#2E7DFF]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#00C6FF]" />
                    Model Boyutlandırma & Ölçek
                  </span>
                  <span className="text-xs font-mono font-bold text-[#00C6FF]">
                    %{Math.round(modelScale * 100)} ({modelScale.toFixed(2)}x)
                  </span>
                </div>

                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={modelScale}
                  onChange={(e) => setModelScale(parseFloat(e.target.value))}
                  className="w-full accent-[#00C6FF] cursor-ew-resize"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5">
                    <span className="text-[#C4C8D0] block text-[11px]">Hacim (Volume)</span>
                    <strong className="text-white text-base font-mono font-bold mt-0.5 block">
                      {stats.volumeCm3} <span className="text-[10px] text-[#00C6FF]">cm³</span>
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5">
                    <span className="text-[#C4C8D0] block text-[11px]">Malzeme Ağırlığı</span>
                    <strong className="text-white text-base font-mono font-bold mt-0.5 block">
                      {stats.weightGrams} <span className="text-[10px] text-[#00C6FF]">gram</span>
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5">
                    <span className="text-[#C4C8D0] block text-[11px]">Baskı Yüksekliği</span>
                    <strong className="text-white text-base font-mono font-bold mt-0.5 block">
                      {stats.height} <span className="text-[10px] text-[#2E7DFF]">mm</span>
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5">
                    <span className="text-[#C4C8D0] block text-[11px]">Katman Sayısı</span>
                    <strong className="text-white text-base font-mono font-bold mt-0.5 block">
                      {pricing.totalLayers.toLocaleString()} <span className="text-[10px] text-[#2E7DFF]">katman</span>
                    </strong>
                  </div>
                </div>
              </div>

              {/* DfAM & İmalat Uygunluğu Teşhis Paneli */}
              <div className="glass-card rounded-2xl p-5 border border-[#2E7DFF]/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00C6FF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      DfAM & İmalat Uygunluğu Analizi
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00C6FF]/15 text-[#00C6FF] border border-[#00C6FF]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF] animate-pulse" />
                    UYGUN (PASSED)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00C6FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold block">Su Sızdırmaz Manifold</span>
                      <span className="text-[11px] text-[#C4C8D0]">Mesh yüzeyinde açık kenar veya delik tespit edilmedi.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00C6FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold block">Min. Et Kalınlığı: 0.8mm</span>
                      <span className="text-[11px] text-[#C4C8D0]">Kritik kırılgan ince duvar sınırı güvenli bölgede.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7DFF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold block">Destek Hacmi: ~%12</span>
                      <span className="text-[11px] text-[#C4C8D0]">Optimize oryantasyonla minimum yüzey izi.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1F44]/40 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7DFF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold block">Termal Çekme: %0.12</span>
                      <span className="text-[11px] text-[#C4C8D0]">±0.01mm geometrik tolerans aralığında.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aktif Endüstriyel Üretim İstasyonu & Parkur */}
              <div className="glass-card rounded-2xl p-5 border border-[#2E7DFF]/30 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#2E7DFF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Aktif Üretim İstasyonu & Parkur
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00C6FF]">
                    {selectedTech === 'sla'
                      ? 'Formlabs Form 4L (8K SLA)'
                      : selectedTech === 'sls'
                      ? 'EOS Formiga P 110 (SLS)'
                      : selectedTech === 'slm'
                      ? 'EOS M 290 (DMLS Metal)'
                      : 'Intamsys FUNMAT PRO 410'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1F44]/50 border border-[#2E7DFF]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#C4C8D0] block text-[11px]">Maksimum Üretim Hacmi</span>
                    <strong className="text-white font-mono">
                      {selectedTech === 'sla'
                        ? '353 × 196 × 350 mm'
                        : selectedTech === 'sls'
                        ? '200 × 250 × 330 mm'
                        : selectedTech === 'slm'
                        ? '250 × 250 × 325 mm'
                        : '305 × 305 × 406 mm'}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[#C4C8D0] block text-[11px]">Işın / Lazer Çapı</span>
                    <strong className="text-[#00C6FF] font-mono">
                      {selectedTech === 'sla'
                        ? '85 µm Lazer Spot'
                        : selectedTech === 'sls'
                        ? '0.45 mm CO₂ Spot'
                        : selectedTech === 'slm'
                        ? '100 µm Yb-Fiber'
                        : '0.40 mm Nozzle'}
                    </strong>
                  </div>
                </div>

                {/* Sertifikasyon Rozetleri */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-lg bg-[#0A0A0A]/60 border border-white/5 text-[10px]">
                    <span className="text-[#00C6FF] font-bold block">ISO 9001:2015</span>
                    <span className="text-[#C4C8D0]">Kalite Yönetimi</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A0A0A]/60 border border-white/5 text-[10px]">
                    <span className="text-[#2E7DFF] font-bold block">AS9100D</span>
                    <span className="text-[#C4C8D0]">Havacılık & Savunma</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A0A0A]/60 border border-white/5 text-[10px]">
                    <span className="text-[#00C6FF] font-bold block">0.01 mm CMM</span>
                    <span className="text-[#C4C8D0]">Optik Doğrulama</span>
                  </div>
                </div>
              </div>

              {/* Vertex 3D Üretim & Müşteri Güvencesi */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B1F44]/80 to-[#0A0A0A] border border-[#2E7DFF]/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#00C6FF] shrink-0" />
                  <div>
                    <strong className="text-white text-[11px] block">Baskı Garantisi</strong>
                    <span className="text-[10px] text-[#C4C8D0]">Tolerans dışı parçada 24s ücretsiz yenileme</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#2E7DFF] shrink-0" />
                  <div>
                    <strong className="text-white text-[11px] block">Hukuki NDA Koruması</strong>
                    <span className="text-[10px] text-[#C4C8D0]">CAD verileriniz gizlilik sözleşmesi altında</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#00C6FF] shrink-0" />
                  <div>
                    <strong className="text-white text-[11px] block">ESD Özel Paketleme</strong>
                    <span className="text-[10px] text-[#C4C8D0]">Darbe emici köpükle güvenli kargo teslimatı</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: In-depth Technical Specs & Price Configurator */}
            <div className="lg:col-span-6 space-y-6">
              {/* Step 1: Technology Selection */}
              <div className="glass-card rounded-2xl p-6 border border-[#2E7DFF]/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center justify-between">
                  <span>1. 3D Baskı Teknolojisi</span>
                  <span className="text-[#00C6FF] text-[11px] font-normal">Hassasiyet: {currentTech.accuracy}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {technologies.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => handleSelectTech(tech.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        selectedTech === tech.id
                          ? 'bg-[#2E7DFF]/25 border-[#00C6FF] text-white shadow-[0_0_18px_rgba(46,125,255,0.4)]'
                          : 'bg-[#0B1F44]/40 border-white/5 text-[#C4C8D0] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{tech.name.split('(')[0]}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C6FF]/20 text-[#00C6FF]">
                          {tech.accuracy}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C4C8D0] line-clamp-2">{tech.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Material Selection */}
              <div className="glass-card rounded-2xl p-6 border border-[#2E7DFF]/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-3">
                  2. Malzeme & Mukavemet Sınıfı
                </label>
                <div className="space-y-2.5">
                  {availableMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedMaterial === mat.id
                          ? 'bg-[#0B1F44]/80 border-[#00C6FF] text-white shadow-[0_0_15px_rgba(0,198,255,0.3)]'
                          : 'bg-[#0A0A0A]/40 border-white/5 text-[#C4C8D0] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full border ${
                              selectedMaterial === mat.id ? 'bg-[#00C6FF] border-[#00C6FF]' : 'border-white/40'
                            }`}
                          />
                          <span className="text-xs font-bold text-white">{mat.name}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#00C6FF]">
                          {mat.costPerGram} ₺ / gr
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-[#C4C8D0]">
                        <span>Çekme Mukavemeti: <strong className="text-white">{mat.tensileStrength}</strong></span>
                        <span>Isıl Direnç: <strong className="text-white">{mat.heatDeflection}</strong></span>
                      </div>
                      <p className="text-[11px] text-[#C4C8D0]/80 mt-1 italic">{mat.features}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Layer Height & Infill Resolution */}
              <div className="glass-card rounded-2xl p-6 border border-[#2E7DFF]/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Katman Kalınlığı */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Katman Kalınlığı (Z-Hassasiyeti)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 0.025, label: '0.025 mm (Ultra)' },
                        { val: 0.05, label: '0.05 mm (Hassas)' },
                        { val: 0.1, label: '0.10 mm (Standart)' },
                        { val: 0.2, label: '0.20 mm (Taslak)' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setLayerHeight(item.val)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            layerHeight === item.val
                              ? 'bg-[#2E7DFF] text-white border-[#00C6FF] shadow-[0_0_12px_#2E7DFF]'
                              : 'bg-[#0B1F44]/40 border-white/5 text-[#C4C8D0] hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Doluluk (Infill) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center justify-between">
                      <span>İç Doluluk (Infill)</span>
                      <span className="text-[#00C6FF] font-mono">%{infill}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[20, 40, 70, 100].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setInfill(val)}
                          className={`py-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                            infill === val
                              ? 'bg-[#00C6FF] text-[#0A0A0A] font-bold border-[#00C6FF] shadow-[0_0_12px_#00C6FF]'
                              : 'bg-[#0B1F44]/40 border-white/5 text-[#C4C8D0] hover:text-white'
                          }`}
                        >
                          %{val}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#C4C8D0] mt-1.5 block">
                      {infill === 100 ? 'Tam Masif (Ağır Yük Mukavemeti)' : infill >= 70 ? 'Yüksek Mukavemetli' : 'Hafif & Optimize'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 4: Post-Processing & Quality Inspections */}
              <div className="glass-card rounded-2xl p-6 border border-[#2E7DFF]/30">
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-3">
                  4. Son İşlem & Metroloji Kalite Sertifikaları
                </label>
                <div className="space-y-2">
                  {postProcessingAddons.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          checked
                            ? 'bg-[#0B1F44]/80 border-[#00C6FF]/50 text-white'
                            : 'bg-[#0A0A0A]/40 border-white/5 text-[#C4C8D0] hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              checked ? 'bg-[#00C6FF] border-[#00C6FF] text-[#0A0A0A]' : 'border-white/30'
                            }`}
                          >
                            {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="font-semibold block">{addon.name}</span>
                            <span className="text-[10px] text-[#C4C8D0]">{addon.desc}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#00C6FF] whitespace-nowrap pl-2">
                          {addon.cost === 0 ? 'Dahil' : `+${addon.cost} ₺`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Quantity & Delivery Speed */}
              <div className="glass-card rounded-2xl p-6 border border-[#2E7DFF]/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center justify-between">
                      <span>Sipariş Adedi</span>
                      {pricing.discountRate > 0 && (
                        <span className="text-[#00C6FF] text-[10px] font-bold bg-[#00C6FF]/10 px-2 py-0.5 rounded border border-[#00C6FF]/30">
                          %{pricing.discountRate} Seri İndirimi!
                        </span>
                      )}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/40 text-white font-bold hover:bg-[#2E7DFF] transition-all"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center py-2 rounded-xl bg-[#0A0A0A] border border-[#2E7DFF]/30 text-white font-mono font-bold text-base focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-[#0B1F44] border border-[#2E7DFF]/40 text-white font-bold hover:bg-[#2E7DFF] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Teslimat Hızı
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { key: 'standard', label: 'Standart (3-5G)' },
                        { key: 'express', label: 'Express (48S)' },
                        { key: 'urgent', label: 'Acil (24S)' },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setDeliverySpeed(item.key as any)}
                          className={`py-2 px-1 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                            deliverySpeed === item.key
                              ? 'bg-[#2E7DFF] text-white border-[#00C6FF] shadow-[0_0_10px_#2E7DFF]'
                              : 'bg-[#0B1F44]/40 border-white/5 text-[#C4C8D0] hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6: Engineering Cost Breakdown Summary */}
              <div className="rounded-3xl bg-gradient-to-br from-[#0B1F44] via-[#0A0A0A] to-[#0A0A0A] p-7 border-2 border-[#00C6FF]/60 shadow-[0_0_50px_rgba(0,198,255,0.3)]">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#00C6FF] tracking-widest block uppercase">
                      RESMİ PROFORMA TEKLİF DÖKÜMÜ
                    </span>
                    <h4 className="text-xl font-bold font-['Montserrat'] text-white">
                      3D Baskı İmalat Maliyeti
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00C6FF] text-[#0A0A0A] shadow-[0_0_12px_#00C6FF]">
                    Hemen Başlatılabilir
                  </span>
                </div>

                <div className="space-y-2 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#C4C8D0]">Birim Parça Ağırlığı:</span>
                    <span className="text-white font-mono">{stats.weightGrams} gram</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C4C8D0]">Tahmini Makine İmalat Süresi:</span>
                    <span className="text-white font-mono">{pricing.hoursPerPiece} saat / parça</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C4C8D0]">Birim Fiyat:</span>
                    <span className="text-white font-bold font-mono">
                      {pricing.finalUnitPrice.toLocaleString('tr-TR')} ₺ / adet
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C4C8D0]">Sipariş Miktarı:</span>
                    <span className="text-white font-mono">{quantity} Adet</span>
                  </div>
                </div>

                {/* Final Total Box */}
                <div className="p-4 rounded-2xl bg-[#0A0A0A]/90 border border-[#2E7DFF]/40 mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-[#C4C8D0] block">Toplam Tutar (KDV Dahil)</span>
                      <div className="text-3xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
                        {pricing.totalWithVat.toLocaleString('tr-TR')}{' '}
                        <span className="text-[#00C6FF] text-2xl font-bold">₺</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-[#C4C8D0]">
                      <div>Net: {pricing.totalNetPrice.toLocaleString('tr-TR')} ₺</div>
                      <div>KDV (%20): {pricing.vatAmount.toLocaleString('tr-TR')} ₺</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={handleTransferToContact}
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:from-white hover:to-[#00C6FF] transition-all duration-300 shadow-[0_0_25px_rgba(0,198,255,0.6)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>3D Baskı Siparişini Başlat & Teklif Formuna Aktar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             CUSTOM CAD & 3D DESIGN SERVICE ESTIMATOR
             ======================================================== */
          <div className="max-w-4xl mx-auto glass-card rounded-3xl border border-[#2E7DFF]/30 p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2">
                Sıfırdan 3D Modelleme & Tasarım Hizmeti
              </h3>
              <p className="text-xs text-[#C4C8D0]">
                Elinizde hazır 3D dosya yoksa, fikirlerinizi ve eskizlerinizi 0.01mm hassasiyetle biz modelliyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Endüstriyel Parça CAD', price: '18.000 ₺ - 35.000 ₺', days: '5-7 Gün' },
                { title: 'Mimari Görselleştirme', price: '15.000 ₺ - 28.000 ₺', days: '4-6 Gün' },
                { title: '3D Billboard CGI & Reklam', price: '25.000 ₺ - 45.000 ₺', days: '7-10 Gün' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#0B1F44]/40 border border-white/5 text-center">
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <div className="text-lg font-bold text-[#00C6FF] font-mono my-2">{item.price}</div>
                  <span className="text-xs text-[#C4C8D0]">Teslim: {item.days}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,198,255,0.4)]"
              >
                <span>Tasarım Projesi İçin Teklif İste</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
