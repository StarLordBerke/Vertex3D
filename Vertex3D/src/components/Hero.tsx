import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { ArrowRight, Layers, ShieldCheck, Cpu, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#0A0A0A] bg-grid-pattern scroll-mt-24"
    >
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#0B1F44]/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#2E7DFF]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-[#00C6FF]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-160px)]">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Top Pill: Agency Motto & Tech Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0B1F44]/70 border border-[#2E7DFF]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(46,125,255,0.25)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C6FF] animate-ping" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">
                IDEAS INTO REALITY
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C4C8D0]/40" />
              <span className="text-xs text-[#00C6FF] font-semibold">
                Yeni Nesil 3D & Prototip Stüdyosu
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-['Montserrat'] font-black text-white tracking-tight leading-[1.1] mb-6">
              Hayalindeki Projeyi <br className="hidden xs:inline" />
              <span className="bg-gradient-to-r from-white via-[#00C6FF] to-[#2E7DFF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(46,125,255,0.5)]">
                Kağıt Üzerinde
              </span>{' '}
              Bırakma.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#C4C8D0] max-w-2xl font-normal leading-relaxed mb-8">
              <strong className="text-white font-semibold">Ideas Into Reality.</strong> Fikirlerinizi en yüksek teknolojiyle,{' '}
              <span className="text-[#00C6FF] font-semibold border-b border-[#00C6FF]/40 pb-0.5">0.01 mm</span> hassasiyetle gerçeğe dönüştüren endüstriyel ve kreatif 3D çözüm ortağınız.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
              {/* Primary Button */}
              <a
                href="#hizmetler"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7DFF] to-[#104AC7] hover:from-[#00C6FF] hover:to-[#2E7DFF] hover:text-[#0A0A0A] transition-all duration-300 shadow-[0_0_25px_rgba(46,125,255,0.5)] hover:shadow-[0_0_35px_rgba(0,198,255,0.7)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
              >
                <span>Hizmetlerimizi Keşfet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary Button */}
              <a
                href="#portfolyo"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#0B1F44]/50 border border-[#2E7DFF]/40 hover:border-[#00C6FF] hover:bg-[#0B1F44] hover:shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all duration-300 backdrop-blur-md text-center"
              >
                <Layers className="w-4 h-4 text-[#00C6FF]" />
                <span>Portfolyoyu İncele</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/10 w-full max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-['Montserrat']">
                  0.01<span className="text-[#00C6FF] text-sm sm:text-lg font-bold">mm</span>
                </div>
                <div className="text-[11px] sm:text-xs text-[#C4C8D0] mt-0.5">Üretim Toleransı</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-['Montserrat']">
                  500<span className="text-[#2E7DFF] text-sm sm:text-lg font-bold">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-[#C4C8D0] mt-0.5">Teslim Proje</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-['Montserrat']">
                  8K<span className="text-[#00C6FF] text-sm sm:text-lg font-bold">CGI</span>
                </div>
                <div className="text-[11px] sm:text-xs text-[#C4C8D0] mt-0.5">Fotogerçekçi Render</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Live Interactive Experience */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2E7DFF]/20 to-[#00C6FF]/20 rounded-3xl blur-2xl -z-10" />

            <div className="w-full relative">
              <ThreeCanvas className="h-[340px] sm:h-[460px] md:h-[500px] lg:h-[560px]" />

              {/* Floating Tech Annotations - Responsive safe positioning */}
              <div className="hidden sm:flex absolute -bottom-5 left-4 p-3.5 rounded-2xl glass-panel border border-[#00C6FF]/40 shadow-2xl items-center gap-3 backdrop-blur-xl animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-[#00C6FF]/15 flex items-center justify-center text-[#00C6FF] border border-[#00C6FF]/40 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Parametrik 3D Mesh</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C6FF]" />
                  </div>
                  <div className="text-[11px] text-[#C4C8D0]">SLA & CNC Üretime Hazır</div>
                </div>
              </div>

              <div className="absolute top-2 right-2 sm:-top-4 sm:right-4 p-2 sm:p-3 rounded-2xl glass-panel border border-[#2E7DFF]/40 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E7DFF] shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-white">
                  NDA Korumalı & Özel Veri
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
