import React from 'react';
import { Logo } from './Logo';
import {
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  ArrowUp,
  Layers,
  Heart,
  Palette,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#2E7DFF]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C6FF]/60 to-transparent shadow-[0_0_15px_#00C6FF]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#0B1F44]/25 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Slogans */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Logo variant="horizontal" size="md" className="mb-4" />
              <p className="text-sm text-[#C4C8D0] max-w-sm leading-relaxed mb-6">
                Fikirlerinizi en yüksek teknolojiyle, 0.01mm hassasiyetle gerçeğe dönüştüren endüstriyel ve kreatif 3D ajansı.
              </p>
            </div>

            {/* Handwritten Signature Slogan from Brand Guide */}
            <div className="p-4 rounded-2xl bg-[#0B1F44]/40 border border-[#2E7DFF]/30 inline-block max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#C4C8D0] block mb-1">
                MARKA VİZYONUMUZ:
              </span>
              <div className="text-2xl sm:text-3xl text-[#00C6FF] font-handwriting leading-tight font-bold glow-text-cyan">
                3D ile Daha Fazlası Mümkün
              </div>
            </div>
          </div>

          {/* Col 2: Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Hizmet Alanları
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4C8D0]">
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Tasarım & Modelleme (NURBS / SubD)
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Endüstriyel Uygulamalar (Prototip)
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Mimarlık & İnşaat (BIM / CGI)
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Oyun & Eğlence (Game-Ready 3D)
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Kreatif Çözümler & 3D Motion
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="hover:text-[#00C6FF] transition-colors">
                  Tersine Mühendislik & 3D Tarama
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4C8D0]">
              <li>
                <a href="#hero" className="hover:text-[#00C6FF] transition-colors">
                  Giriş (Hero)
                </a>
              </li>
              <li>
                <a href="#portfolyo" className="hover:text-[#00C6FF] transition-colors">
                  İnteraktif Portfolyo
                </a>
              </li>
              <li>
                <a href="#neden-biz" className="hover:text-[#00C6FF] transition-colors">
                  Neden Vertex 3D?
                </a>
              </li>
              <li>
                <a href="#hesaplayici" className="hover:text-[#00C6FF] transition-colors">
                  Maliyet Hesaplayıcı
                </a>
              </li>
              <li>
                <a href="#hakkimizda" className="hover:text-[#00C6FF] transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#00C6FF] transition-colors">
                  3D Baskı Blogu
                </a>
              </li>
              <li>
                <a href="#iletisim" className="hover:text-[#00C6FF] transition-colors">
                  İletişim & Teklif
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Color Palette & Standards Reference */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Kurumsal Renkler
            </h4>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#2E7DFF] border border-white/20" />
                <span className="text-[#C4C8D0]">#2E7DFF Ana Mavi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#00C6FF] border border-white/20" />
                <span className="text-[#C4C8D0]">#00C6FF Açık Mavi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#0B1F44] border border-white/20" />
                <span className="text-[#C4C8D0]">#0B1F44 Koyu Lacivert</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A] border border-white/20" />
                <span className="text-[#C4C8D0]">#0A0A0A Siyah</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#C4C8D0] border border-white/20" />
                <span className="text-[#C4C8D0]">#C4C8D0 Gri</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-[#C4C8D0]">
              Tolerans: <strong>0.01 mm ISO 9001</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#C4C8D0] text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-white font-semibold">Vertex 3D</strong>. Tüm hakları saklıdır. Ideas Into Reality.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Linkedin className="w-4 h-4" />, name: 'LinkedIn', href: '#' },
              { icon: <Instagram className="w-4 h-4" />, name: 'Instagram', href: '#' },
              { icon: <Twitter className="w-4 h-4" />, name: 'X', href: '#' },
              { icon: <Palette className="w-4 h-4" />, name: 'ArtStation', href: '#' },
              { icon: <Globe className="w-4 h-4" />, name: 'Behance', href: '#' },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                aria-label={soc.name}
                className="w-8 h-8 rounded-lg bg-[#0B1F44]/50 border border-[#2E7DFF]/20 flex items-center justify-center text-[#C4C8D0] hover:text-[#00C6FF] hover:border-[#00C6FF] hover:bg-[#0B1F44] transition-all"
              >
                {soc.icon}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="ml-2 p-2 rounded-lg bg-[#2E7DFF]/20 border border-[#2E7DFF]/40 text-[#00C6FF] hover:bg-[#2E7DFF] hover:text-white transition-all cursor-pointer"
              aria-label="Yukarı Kaydır"
              title="Başa Dön"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
