import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'hizmetler', 'portfolyo', 'neden-biz', 'hesaplayici', 'hakkimizda', 'blog', 'iletisim'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Hizmetler', href: '#hizmetler', id: 'hizmetler' },
    { name: 'Portfolyo', href: '#portfolyo', id: 'portfolyo' },
    { name: 'Neden Biz?', href: '#neden-biz', id: 'neden-biz' },
    { name: 'Hesaplayıcı', href: '#hesaplayici', id: 'hesaplayici' },
    { name: 'Hakkımızda', href: '#hakkimizda', id: 'hakkimizda' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'İletişim', href: '#iletisim', id: 'iletisim' },
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#2E7DFF]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5'
            : 'bg-[#0A0A0A]/40 backdrop-blur-md py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavLinkClick(e, '#hero')}
            className="flex items-center group focus:outline-none"
            aria-label="Vertex 3D Ana Sayfa"
          >
            <Logo variant="horizontal" size="md" />
          </a>

          {/* Desktop Navigation Links (Visible on Large Desktops) */}
          <nav className="hidden xl:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0B1F44]/40 border border-[#2E7DFF]/20 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-[#2E7DFF]/25 shadow-[0_0_15px_rgba(46,125,255,0.4)]'
                      : 'text-[#C4C8D0] hover:text-[#00C6FF] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00C6FF] shadow-[0_0_6px_#00C6FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button & Quick Action on Desktop / Tablet */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <button
              onClick={onStartProject}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] hover:from-[#2E7DFF] hover:to-[#00C6FF] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,198,255,0.4)] hover:shadow-[0_0_30px_rgba(46,125,255,0.8)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0A0A0A] group-hover:text-white transition-colors" />
              <span>Projeye Başla</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onStartProject}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] shadow-[0_0_10px_rgba(0,198,255,0.4)] cursor-pointer active:scale-95 transition-transform"
            >
              Teklif Al
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#0B1F44]/70 border border-[#2E7DFF]/40 text-white hover:text-[#00C6FF] hover:border-[#00C6FF] transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#2E7DFF]/25 bg-[#0A0A0A]/95 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl max-h-[calc(100dvh-75px)] overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-2 max-w-lg mx-auto">
              <div className="text-[10px] uppercase tracking-wider text-[#00C6FF] font-bold px-2 py-1">
                Sayfa Menüsü
              </div>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#2E7DFF]/20 border-[#00C6FF]/60 text-white shadow-[0_0_15px_rgba(46,125,255,0.2)]'
                        : 'bg-[#0B1F44]/40 border-white/5 text-[#C4C8D0] hover:text-white hover:border-[#2E7DFF]/40 hover:bg-[#0B1F44]/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#00C6FF]" />}
                      {link.name}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#00C6FF]" />
                  </a>
                );
              })}

              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-[#0A0A0A] bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] shadow-[0_0_20px_rgba(0,198,255,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hemen Projeye Başla & Teklif Al</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 xl:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
    </>
  );
};
