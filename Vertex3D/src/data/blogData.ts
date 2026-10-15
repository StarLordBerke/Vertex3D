export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'metal' | 'medikal' | 'polimer' | 'muhendislik';
  categoryLabel: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bulletPoints?: string[];
      callout?: string;
    }[];
    takeaways: string[];
  };
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'metal-3d-baski-slm-havacilik',
    title: 'Metal 3D Baskı (SLM / DMLS): Havacılık ve Savunmada %40 Ağırlık Tasarrufu',
    summary:
      'Doğrudan metal lazer sinterleme (SLM) teknolojisiyle Inconel 718 ve Titanyum alaşımlarından üretilen karmaşık geometrili türbin nozulları ve roket motoru bileşenleri.',
    category: 'metal',
    categoryLabel: 'Metal 3D Baskı',
    readTime: '6 dk okuma',
    date: '12 Ekim 2026',
    author: {
      name: 'Dr. Mert Özkan',
      role: 'Malzeme & Havacılık Mühendisliği Lideri',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['SLM', 'DMLS', 'Titanyum Ti6Al4V', 'Inconel 718', 'Havacılık', 'Topoloji'],
    content: {
      intro:
        'Havacılık ve uzay sanayiinde her gram ağırlık tasarrufu, roket fırlatma maliyetlerinde on binlerce dolar kazanç anlamına gelir. Geleneksel talaşlı imalat (CNC freze) yöntemleriyle üretilmesi imkansız olan içten soğutmalı, organik ve kafes yapılı geometriler, SLM (Selective Laser Melting) metal 3D baskı sayesinde gerçeğe dönüşüyor.',
      sections: [
        {
          heading: '1. Parça Konsolidasyonu: 14 Parçadan Tek Parça İmalata',
          body:
            'Geleneksel roket yakıt nozulları kaynaklı flanşlar, contalar ve vidalı bağlantılar dahil 14 ayrı alt parçadan oluşurken; SLM teknolojisiyle bu mekanizma tek bir yekpare gövde olarak 0.01 mm toleransla basılabilmektedir. Bu durum hem montaj kaynaklı sızdırmazlık riskini sıfıra indirmekte hem de üretim süresini aylar yerine günlere düşürmektedir.',
          bulletPoints: [
            'Kaynak ve lehim risklerinin tamamen ortadan kalkması',
            'Basınçlı sıvı hatlarında sıfır sızıntı garantisi',
            'Helisel dahili soğutma kanallarıyla %38 daha yüksek termal verim',
          ],
          callout:
            'Vertex 3D Laboratuvarında uygulanan topoloji optimizasyonu ile yapısal rijitlik korunurken parça kütlesinde %42 net azalma sağlanmıştır.',
        },
        {
          heading: '2. Alaşım Seçimi: Inconel 718 vs Titanyum Ti6Al4V',
          body:
            'Yanma odası ve türbin gibi 700°C üzerindeki ekstrem sıcaklıklarda nikel bazlı Inconel 718 süper alaşımı tercih edilirken; uydu braketleri ve gövde yapı elemanlarında çekme mukavemeti 950 MPa olan biyouyumlu Titanyum Grade 23 alaşımı rakipsiz mukavemet/ağırlık oranı sunar.',
        },
        {
          heading: '3. Gerilme Giderme ve HIP (Hot Isostatic Pressing)',
          body:
            'Lazer sinterleme esnasında oluşan yüksek termal gradyanlar parça içerisinde artık gerilmelere yol açar. Vakum fırınlarında uygulanan gerilme giderme ve sıcak izostatik presleme (HIP) prosesiyle malzemenin iç mikro-gözenekleri tamamen yok edilerek dövme çelik seviyesinde %99.9 yoğunluk elde edilir.',
        },
      ],
      takeaways: [
        'SLM metal baskı, montaj parçalarını tek yekpare gövdeye indirger.',
        'Helisel iç kanallar yalnızca katmanlı imalat ile üretilebilir.',
        'HIP ısıl işlemi metal yoğunluğunu dövme malzeme seviyesine ulaştırır.',
      ],
    },
  },
  {
    id: 'post-2',
    slug: 'sla-dlp-recine-mikron-hassasiyeti',
    title: 'SLA ve DLP Reçine Teknolojileri: 0.025 mm Mikron Hassasiyetinin Sırrı',
    summary:
      'Fotopolimerizasyon kimyası, piksel boyutu, ışık kırılması ve enjeksiyon kalıbı pürüzsüzlüğünde parça elde etme rehberi.',
    category: 'polimer',
    categoryLabel: 'Reçine Teknolojileri',
    readTime: '5 dk okuma',
    date: '10 Ekim 2026',
    author: {
      name: 'Büşra Çelik',
      role: 'Kıdemli Polimer Kimyageri & CAD Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['SLA', 'DLP', '8K Reçine', 'Fotopolimer', 'Hassasiyet', 'Enjeksiyon'],
    content: {
      intro:
        'Sıvı fotopolimer reçinenin UV lazer veya 8K projeksiyon ışığıyla katman katman kürlenmesi prensibine dayanan SLA/DLP sistemleri, filament bazlı baskı yöntemlerinin ulaşamayacağı ayna pürüzsüzlüğünde yüzey kalitesi sunar.',
      sections: [
        {
          heading: '1. XY Optik Çözünürlüğü ve Lazer Odak Çapı',
          body:
            'Endüstriyel SLA yazıcılarımızda kullanılan 85 mikronluk ultra ince lazer ışın noktası, parça üzerindeki en keskin kenarları ve yazı detaylarını mikron seviyesinde netleştirir. DLP sistemlerinde ise 8K çözünürlüklü monokrom ışık motorları sayesinde tüm katman saniyeler içinde kürlenir.',
          bulletPoints: [
            '25 mikron (0.025 mm) Z-ekseni katman kalınlığı',
            'Gözle görülmeyen pürüzsüz katman çizgileri',
            'Optik şeffaf parçalarda akrilik berraklığı',
          ],
        },
        {
          heading: '2. Yıkama ve Termal UV Son Kürleme (Post-Curing)',
          body:
            'Baskı tablasından çıkan parçanın yüzeyinde kalan serbest reçine, ultrasonik izopropil alkol (IPA) banyolarında temizlenir. Ardından 60°C sıcaklıkta 405nm UV kürleme odasında bekletilerek polimer zincirlerinin çapraz bağlanması tamamlanır ve parçanın mekanik çekme dayanımı %40 artırılır.',
        },
      ],
      takeaways: [
        'SLA, kalıp öncesi tasarım doğrulama için altın standarttır.',
        'Termal UV kürleme parçanın nihai mekanik sertliğini belirler.',
        'Şeffaf reçineler kumlama ve vernikleme ile optik cama dönüştürülebilir.',
      ],
    },
  },
  {
    id: 'post-3',
    slug: 'sls-naylon-pa12-seri-uretim-karsilastirmasi',
    title: 'SLS Naylon PA12 ile Seri Üretim: Enjeksiyon Kalıba Karşı Başabaş Analizi',
    summary:
      'Kalıp maliyeti ödemeden 100 ile 5.000 adet arasında doğrudan fonksiyonel son kullanım parçası üretmenin ekonomik avantajları.',
    category: 'muhendislik',
    categoryLabel: 'Seri Üretim & Maliyet',
    readTime: '7 dk okuma',
    date: '8 Ekim 2026',
    author: {
      name: 'Emre Yılmaz',
      role: 'Endüstriyel Üretim Direktörü',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['SLS', 'PA12 Naylon', 'Seri Üretim', 'Kalıpsız İmalat', 'Birim Maliyet'],
    content: {
      intro:
        'Geleneksel plastik enjeksiyon kalıpları 15.000$ ile 60.000$ arasında değişen takım yatırım maliyetleri ve 8-12 haftalık bekleme süreleri gerektirir. SLS (Selective Laser Sintering) teknolojisi, bu süreci 48 saate indirirken sıfır kalıp maliyetiyle piyasaya hızlı giriş yapmayı sağlar.',
      sections: [
        {
          heading: '1. Destek Yapısına Gerek Duymayan Özgür Tasarım',
          body:
            'SLS prosesinde parça, sinterlenmemiş naylon toz yatağının içinde desteklenir. Bu sayede iç içe geçen kilitli mafsallar, iç kanallar ve montaj gerektirmeyen hareketli mekanizmalar tek seferde üretilebilir.',
          callout:
            '3.000 adede kadar olan üretim serilerinde SLS PA12, enjeksiyon kalıbına kıyasla toplam sahip olma maliyetinde %50 daha karlıdır.',
        },
        {
          heading: '2. Malzeme Karakteristiği: Yorulma ve Darbe Direnci',
          body:
            'PA12 Naylon; otomotiv kaput altı parçaları, dron kolları ve endüstriyel fikstürlerde ihtiyaç duyulan yüksek aşınma dayanımı, elastikiyet ve kimyasal yağ direnci özelliklerini eksiksiz karşılar.',
        },
      ],
      takeaways: [
        'SLS ile kalıp bekleme süresi 10 haftadan 3 güne düşer.',
        'Tasarım revizyonları sıfır ek takım maliyetiyle hemen uygulanabilir.',
        'Hacim paketleme (3D Nesting) ile fırın verimliliği maksimize edilir.',
      ],
    },
  },
  {
    id: 'post-4',
    slug: 'medikal-ve-dentalde-3d-baski-devrimi',
    title: 'Medikal ve Dentalde 3D Baskı: Kişiye Özel Biyouyumlu Trabeküler İmplantlar',
    summary:
      'BT ve Tomografi verilerinden hastaya özel kemik plakaları, titanyum eklem protezleri ve sıfır sapmalı cerrahi şablonlar.',
    category: 'medikal',
    categoryLabel: 'Medikal & Sağlık',
    readTime: '6 dk okuma',
    date: '5 Ekim 2026',
    author: {
      name: 'Dr. Selin Demir',
      role: 'Biyomedikal Mühendisliği Danışmanı',
      avatar: 'https://images.unsplash.com/photo-1594824813511-1d575799a224?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    tags: ['Medikal', 'Titanyum', 'Biyouyumlu', 'Dental', 'CBCT', 'İmplant'],
    content: {
      intro:
        'Her insanın anatomisi benzersizdir. Standart seri üretim implantlar yerine hastanın DICOM tomografi görüntülerinden 3D modellenen kişiselleştirilmiş titanyum implantlar, ameliyat süresini kısaltırken vücut uyumunu maksimuma çıkarıyor.',
      sections: [
        {
          heading: '1. Trabeküler Gözenek Mimarisi ve Hücre Tutunması',
          body:
            'SLM 3D metal yazıcılarla üretilen kalça ve kraniyal implantların yüzeyinde 300-600 mikronluk kemik dokusu benzeri gözenekler oluşturulur. Bu mikro-yapı, kemik iliği hücrelerinin implant içine doğru büyümesini sağlayarak gevşeme riskini yok eder.',
        },
        {
          heading: '2. Dental Cerrahi Kılavuzları ve Şeffaf Plaklar',
          body:
            'Ağız içi tarayıcılarla alınan ölçüler üzerinden Class-IIa biyouyumlu reçinelerle basılan cerrahi rehberler, implant vidalarının çene kemiğine milimetrenin yüzde biri hassasiyetle yerleştirilmesine olanak tanır.',
        },
      ],
      takeaways: [
        'Kişiye özel implantlar ameliyat revizyon oranlarını %75 düşürür.',
        'Trabeküler kafes mimarisi kemik kaynaşmasını hızlandırır.',
        'Dental cerrahi şablonlar 24 saat içinde kliniklere ulaştırılabilmektedir.',
      ],
    },
  },
  {
    id: 'post-5',
    slug: 'dfam-design-for-additive-manufacturing-rehberi',
    title: 'DfAM Temel İlkeleri: 3D Baskı İçin Tasarım Yapmanın 7 Altın Kuralı',
    summary:
      'Geleneksel CNC kısıtlarını geride bırakın: Desteksiz açılar, duvar kalınlığı analizi, delik toleransları ve parça oryantasyonu.',
    category: 'muhendislik',
    categoryLabel: 'Mühendislik & DfAM',
    readTime: '8 dk okuma',
    date: '3 Ekim 2026',
    author: {
      name: 'Emre Yılmaz',
      role: 'Endüstriyel Üretim Direktörü',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tags: ['DfAM', 'CAD Tasarım', 'Destek Yapısı', 'Tolerans', 'Duvar Kalınlığı'],
    content: {
      intro:
        'Bir parçanın 3D yazıcıda basılabilir olması, doğru tasarlandığı anlamına gelmez. Design for Additive Manufacturing (DfAM), katmanlı üretimin gücünü sonuna kadar kullanırken destek miktarını, süreyi ve maliyeti en aza indirme sanatıdır.',
      sections: [
        {
          heading: '1. 45 Derece Kuralı ve Kendinden Destekli Geometriler',
          body:
            'Yatay eksene göre 45 dereceden daha dik açılı yüzeyler ilave destek yapısına ihtiyaç duymaz. Tasarımlarınızdaki köşeleri radyüs ve pahlarla 45° üzerine çekerek yüzey temizleme işçiliğini tamamen ortadan kaldırabilirsiniz.',
          bulletPoints: [
            'Destek tüketiminde %65 tasarruf',
            'Baskı süresinde %30 kısalma',
            'Destek izi olmayan kusursuz alt yüzey kalitesi',
          ],
        },
        {
          heading: '2. İdeal Duvar Kalınlığı ve İç Boşaltma (Hollowing)',
          body:
            'Görsel prototiplerde parçaları masif basmak yerine 1.5 - 2.5 mm et kalınlığı ile içini boşaltıp drenaj delikleri bırakmak, SLA ve SLS proseslerinde malzeme sarfiyatını %60 oranında azaltır.',
        },
      ],
      takeaways: [
        'DfAM kuralları parça maliyetini yarı yarıya düşürebilir.',
        'Gözyaşı (teardrop) profilli yatay delikler desteksiz basılabilir.',
        'Oryantasyon hem yüzey kalitesini hem de Z-ekseni mukavemetini belirler.',
      ],
    },
  },
  {
    id: 'post-6',
    slug: 'tersine-muhendislik-ve-3d-optik-tarama',
    title: 'Tersine Mühendislik: Fiziksel Parçadan 0.01 mm CAD Modeline Adım Adım',
    summary:
      'Teknik çizimi veya CAD verisi bulunmayan eski makine parçalarının 3D mavi ışık optik tarama ile dijital ikizine dönüştürülmesi.',
    category: 'muhendislik',
    categoryLabel: 'Tersine Mühendislik',
    readTime: '6 dk okuma',
    date: '28 Eylül 2026',
    author: {
      name: 'Dr. Mert Özkan',
      role: 'Malzeme & Havacılık Mühendisliği Lideri',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tersine Mühendislik', 'Optik Tarama', 'NURBS', 'CAD', 'Metroloji'],
    content: {
      intro:
        'Yedek parçası artık üretilmeyen tarihi otomobiller, aşınmış sanayi kalıpları veya patent öncesi kil modeller; endüstriyel 3D lazer ve yapılandırılmış mavi ışık tarayıcılar ile mikron seviyesinde dijitalleştirilmektedir.',
      sections: [
        {
          heading: '1. Nokta Bulutundan (Point Cloud) Poligon Ağına',
          body:
            'Optik tarayıcı, parçanın yüzeyinden saniyede milyonlarca koordinat noktası toplar. Özel algoritmalar bu noktaları birleştirerek STL poligon ağını (Mesh) oluşturur.',
        },
        {
          heading: '2. Parametrik NURBS ve Solid CAD Rekonstrüksiyonu',
          body:
            'Aşınmış yüzeyler matematiksel düzlemler, silindirler ve serbest biçimli NURBS yüzeylerle yeniden inşa edilir. Böylece orijinal toleranslarına kavuşturulmuş, STEP/IGES formatında üretim hazır CAD modeli elde edilir.',
        },
      ],
      takeaways: [
        'Aşınma analizi ile parçanın orijinal fabrika ölçüleri tespit edilir.',
        'Fiziksel prototipler doğrudan üretime hazır CAD dosyasına dönüştürülür.',
        '0.01 mm sapma renk haritası (Color Map) ile raporlanır.',
      ],
    },
  },
  {
    id: 'post-7',
    slug: 'buharli-puruzsuzlestirme-vapor-smoothing',
    title: 'Buharlı Pürüzsüzleştirme (Vapor Smoothing): Enjeksiyon Kalıbı Parlaklığı',
    summary:
      'Kimyasal gaz buharı teknolojisi ile katman çizgilerini yok eden, sıvı sızdırmazlığı sağlayan ve bakteri tutunmasını engelleyen son işlem.',
    category: 'polimer',
    categoryLabel: 'Yüzey & Son İşlem',
    readTime: '5 dk okuma',
    date: '24 Eylül 2026',
    author: {
      name: 'Büşra Çelik',
      role: 'Kıdemli Polimer Kimyageri & CAD Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vapor Smoothing', 'Pürüzsüzleştirme', 'PA12', 'Yüzey Kalitesi', 'Kumlama'],
    content: {
      intro:
        'SLS ve FDM baskı parçaların en büyük dezavantajı gözenekli yüzey dokusu ve katman çizgileridir. Buharlı pürüzsüzleştirme (Chemical Vapor Smoothing), parça yüzeyindeki mikron ölçekli tepe noktalarını kontrollü eriterek mükemmel bir parlaklık kazandırır.',
      sections: [
        {
          heading: '1. Kapalı Devre Kimyasal Buhar Prosesi',
          body:
            'Otomatik basınçlı kabinlerde parçaya uygulanan buhar molekülleri, sadece dış yüzeydeki pürüzleri 5-10 mikron derinlikte sıvılaştırarak yeniden mühürler. Parçanın kritik iç geometrik toleransları kesinlikle bozulmaz.',
          bulletPoints: [
            'Ra yüzey pürüzlülüğünün 12µm seviyesinden 1.2µm altına düşmesi',
            'Tamamen sızdırmaz ve yıkanabilir yüzey yapısı',
            'Yorulma dayanımında mikro-çatlakların kapanması sayesinde %15 artış',
          ],
        },
      ],
      takeaways: [
        'Vapor smoothing parçayı enjeksiyon plastik kalitesine kavuşturur.',
        'Gıda ve medikal temas gerektiren parçalarda bakteri barınmasını engeller.',
        'Mat veya parlak boya uygulamaları için ideal astar yüzeyi oluşturur.',
      ],
    },
  },
  {
    id: 'post-8',
    slug: 'peek-ve-karbon-elyaf-ile-metal-ikamesi',
    title: 'PEEK ve Karbon Takviyeli Polimerler ile Metal İkamesi',
    summary:
      '250°C sıcaklığa dayanan, alüminyumdan %60 daha hafif olan süper polimerlerin motorsporları ve havacılıkta kullanımı.',
    category: 'polimer',
    categoryLabel: 'İleri Malzemeler',
    readTime: '6 dk okuma',
    date: '20 Eylül 2026',
    author: {
      name: 'Dr. Mert Özkan',
      role: 'Malzeme & Havacılık Mühendisliği Lideri',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['PEEK', 'Karbon Elyaf', 'Metal İkamesi', 'PA-CF', 'Süper Polimer'],
    content: {
      intro:
        'Metaller sağlamdır ancak ağırdır. PEEK (Polieter eter keton) ve sürekli karbon fiber takviyeli kompozit polimerler; korozyona uğramayan, manyetik olmayan ve alüminyum mukavemetini üçte bir ağırlıkta sunan yeni nesil çözümdür.',
      sections: [
        {
          heading: '1. Ekstrem Ortam Direnci: Asit, Radyasyon ve 250°C Isı',
          body:
            'PEEK, roket motoru çevresindeki agresif kimyasallardan nükleer reaktör radyasyonuna kadar hiçbir metalin dayanamayacağı korozif ortamlarda moleküler yapısını korur.',
        },
        {
          heading: '2. Otomotiv ve Drone Kollarında Ağırlık Tasarrufu',
          body:
            'Formula 1 ve elektrikli hiper araçlarda şasi braketlerinin PA12-CF ve PEEK ile üretilmesi, batarya menzilini artırırken süspansiyon tepki sürelerini iyileştirmektedir.',
        },
      ],
      takeaways: [
        'PEEK, alüminyum parçaların yerine doğrudan kullanılabilir.',
        'Hafiflik sayesinde hareketli mekanizmaların ataleti düşer.',
        'Radyoopak olmaması sayesinde cerrahi implantlarda röntgeni engellemez.',
      ],
    },
  },
  {
    id: 'post-9',
    slug: 'otomotivde-batarya-sogutma-plakalari-3d-baski',
    title: 'Elektrikli Araçlarda (EV) Batarya Sıvı Soğutma ve Katmanlı Üretim',
    summary:
      'Ultra hızlı şarj esnasında batarya hücre sıcaklığını 35°C altında sabitleyen mikro-kanal sıvı soğutma mimarisi.',
    category: 'muhendislik',
    categoryLabel: 'Otomotiv & EV',
    readTime: '7 dk okuma',
    date: '15 Eylül 2026',
    author: {
      name: 'Emre Yılmaz',
      role: 'Endüstriyel Üretim Direktörü',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    tags: ['EV Batarya', 'Soğutma Plakası', 'CFD Simülasyon', 'Alüminyum', 'Otomotiv'],
    content: {
      intro:
        'Lityum-iyon bataryaların en büyük düşmanı dengesiz sıcaklık dağılımıdır. 350kW ultra hızlı şarjda batarya ömrünü korumak için 3D baskı ile üretilen labirent tipi mikro-soğutma kanalları kritik rol oynamaktadır.',
      sections: [
        {
          heading: '1. Termo-Hidrolik Simülasyon ve Türbülans Optimizasyonu',
          body:
            'Geleneksel bükme borular yerine CFD simülasyonları ile optimize edilen değişken kesitli kanallar, soğutma sıvısının hücre yüzeyine homojen temas etmesini sağlayarak sıcaklık farkını 2°C tolerans aralığında tutar.',
        },
      ],
      takeaways: [
        'Homojen soğutma batarya çevrim ömrünü %28 uzatır.',
        'Hafifletilmiş alüminyum soğutma blokları menzil kazandırır.',
        'Lazer kaynak öncesi kaçak testiyle sıfır sızıntı garanti edilir.',
      ],
    },
  },
];
