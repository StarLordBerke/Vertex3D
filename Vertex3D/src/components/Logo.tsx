import React from 'react';

export interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  theme?: 'dark' | 'light';
  className?: string;
  showSlogan?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'dark',
  className = '',
  showSlogan = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
    '2xl': 'w-36 h-36',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl sm:text-5xl',
    '2xl': 'text-5xl sm:text-6xl',
  };

  const sloganSizes = {
    sm: 'text-[7px] sm:text-[8px] tracking-[0.25em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.3em]',
    lg: 'text-[11px] sm:text-xs tracking-[0.32em]',
    xl: 'text-xs sm:text-sm tracking-[0.35em]',
    '2xl': 'text-sm sm:text-base tracking-[0.38em]',
  };

  const isLight = theme === 'light';

  // Exact 3D Beveled V Model from Hero 3D ThreeCanvas shown in Screenshot_3.jpg:
  // - Left angled beveled prism arm with glowing cyan wireframe edges
  // - Right angled beveled prism arm with glowing cyan wireframe edges
  // - Central foreground inverted triangular wedge with razor-sharp downward apex and wireframe chamfers
  const CrystalVIcon = (
    <svg
      viewBox="0 0 300 300"
      className={`${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105 filter ${
        isLight
          ? 'drop-shadow-[0_8px_20px_rgba(0,102,255,0.25)]'
          : 'drop-shadow-[0_0_25px_rgba(0,198,255,0.5)]'
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow Filter for Wireframe Edges */}
        <filter id="neonWireGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Front Face of Left & Right Arms (Deep Metallic Royal Blue) */}
        <linearGradient id="armFrontFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B3CB0" />
          <stop offset="50%" stopColor="#093096" />
          <stop offset="100%" stopColor="#062272" />
        </linearGradient>

        {/* Top Chamfer Cap of Arms (Reflective Light Blue) */}
        <linearGradient id="armTopBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="50%" stopColor="#0080FF" />
          <stop offset="100%" stopColor="#0B3CB0" />
        </linearGradient>

        {/* Outer Flank Bevels (Darker Shadow) */}
        <linearGradient id="armOuterBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#07256E" />
          <stop offset="100%" stopColor="#03133D" />
        </linearGradient>

        {/* Inner Flank Bevels */}
        <linearGradient id="armInnerBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E3FA8" />
          <stop offset="100%" stopColor="#051C55" />
        </linearGradient>

        {/* Central Triangle Wedge - Front Face */}
        <linearGradient id="wedgeFrontFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0D3EA6" />
          <stop offset="60%" stopColor="#082A7C" />
          <stop offset="100%" stopColor="#041648" />
        </linearGradient>

        {/* Central Triangle Wedge - Top Bevel */}
        <linearGradient id="wedgeTopBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="60%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#0B3CB0" />
        </linearGradient>

        {/* Central Triangle Wedge - Side Bevels */}
        <linearGradient id="wedgeSideBevelLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#062058" />
          <stop offset="100%" stopColor="#020E2C" />
        </linearGradient>
        <linearGradient id="wedgeSideBevelRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A3696" />
          <stop offset="100%" stopColor="#041846" />
        </linearGradient>
      </defs>

      {/* --- BACKGROUND SHADOW / OCCLUSION --- */}
      {/* Arms Meeting Bridge at Base */}
      <polygon
        points="132,204 168,204 150,238"
        fill="#04143D"
        stroke="#00C6FF"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* ============================================================ */}
      {/* 1. LEFT ANGLED PRISM ARM                                    */}
      {/* ============================================================ */}
      {/* Outer Left Flank Bevel */}
      <polygon
        points="30,76 76,40 68,30 20,66"
        fill="url(#armTopBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />
      <polygon
        points="20,66 30,76 86,236 74,244"
        fill="url(#armOuterBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.4"
      />

      {/* Inner Right Flank Bevel */}
      <polygon
        points="76,40 88,48 138,208 126,220"
        fill="url(#armInnerBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.4"
      />

      {/* Bottom Cap of Left Arm */}
      <polygon
        points="74,244 86,236 126,220 120,230"
        fill="#031032"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />

      {/* Left Arm Main Front Face */}
      <polygon
        points="30,76 76,40 126,220 86,236"
        fill="url(#armFrontFaceGrad)"
        stroke="#00C6FF"
        strokeWidth="1.8"
        filter="url(#neonWireGlow)"
      />

      {/* Inner Chamfer Ridge line inside Left Arm Face */}
      <polygon
        points="38,82 72,52 118,214 88,228"
        fill="none"
        stroke="#00C6FF"
        strokeWidth="0.8"
        strokeOpacity="0.65"
      />

      {/* ============================================================ */}
      {/* 2. RIGHT ANGLED PRISM ARM (SYMMETRIC TO LEFT)                */}
      {/* ============================================================ */}
      {/* Outer Right Flank Bevel */}
      <polygon
        points="224,40 270,76 280,66 232,30"
        fill="url(#armTopBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />
      <polygon
        points="270,76 280,66 226,244 214,236"
        fill="url(#armOuterBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.4"
      />

      {/* Inner Left Flank Bevel */}
      <polygon
        points="212,48 224,40 174,220 162,208"
        fill="url(#armInnerBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.4"
      />

      {/* Bottom Cap of Right Arm */}
      <polygon
        points="214,236 226,244 180,230 174,220"
        fill="#031032"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />

      {/* Right Arm Main Front Face */}
      <polygon
        points="224,40 270,76 214,236 174,220"
        fill="url(#armFrontFaceGrad)"
        stroke="#00C6FF"
        strokeWidth="1.8"
        filter="url(#neonWireGlow)"
      />

      {/* Inner Chamfer Ridge line inside Right Arm Face */}
      <polygon
        points="228,52 262,82 212,228 182,214"
        fill="none"
        stroke="#00C6FF"
        strokeWidth="0.8"
        strokeOpacity="0.65"
      />

      {/* ============================================================ */}
      {/* 3. CENTRAL FOREGROUND INVERTED TRIANGULAR APEX WEDGE         */}
      {/* ============================================================ */}
      {/* Top Bevel Cap of Triangle Wedge */}
      <polygon
        points="114,166 186,166 180,154 120,154"
        fill="url(#wedgeTopBevelGrad)"
        stroke="#00C6FF"
        strokeWidth="1.4"
      />

      {/* Left Chamfer Bevel of Triangle */}
      <polygon
        points="114,166 150,274 142,274 104,166"
        fill="url(#wedgeSideBevelLeft)"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />

      {/* Right Chamfer Bevel of Triangle */}
      <polygon
        points="186,166 150,274 158,274 196,166"
        fill="url(#wedgeSideBevelRight)"
        stroke="#00C6FF"
        strokeWidth="1.2"
      />

      {/* Central Triangle Main Front Face (Prominent Inverted Arrowhead) */}
      <polygon
        points="114,166 186,166 150,274"
        fill="url(#wedgeFrontFaceGrad)"
        stroke="#00C6FF"
        strokeWidth="2.2"
        filter="url(#neonWireGlow)"
      />

      {/* Inner Chamfer Contour inside Triangle Face */}
      <polygon
        points="122,172 178,172 150,258"
        fill="none"
        stroke="#00C6FF"
        strokeWidth="1.0"
        strokeOpacity="0.8"
      />

      {/* Specular White Vertex Gleams */}
      {/* Left Arm Top Vertex */}
      <circle cx="76" cy="40" r="2.5" fill="#FFFFFF" opacity="0.95" />
      <circle cx="30" cy="76" r="2" fill="#E0F7FF" opacity="0.8" />

      {/* Right Arm Top Vertex */}
      <circle cx="224" cy="40" r="2.5" fill="#FFFFFF" opacity="0.95" />
      <circle cx="270" cy="76" r="2" fill="#E0F7FF" opacity="0.8" />

      {/* Triangle Top Corners */}
      <circle cx="114" cy="166" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="186" cy="166" r="2" fill="#FFFFFF" opacity="0.9" />

      {/* Bottom Apex Sharp Point Glint */}
      <circle cx="150" cy="274" r="3" fill="#FFFFFF" filter="url(#neonWireGlow)" />
    </svg>
  );

  // If icon-only is requested
  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{CrystalVIcon}</div>;
  }

  // The 3-bar stylized 'E' matching the logo branding:
  // Top bar: Cyan (#00C6FF)
  // Middle bar: Royal Blue (#0066FF / #2E7DFF)
  // Bottom bar: Deep Navy (#081736 in light, or vibrant deep blue in dark mode)
  const StylizedE = (
    <span
      className="inline-flex flex-col justify-between items-stretch w-[0.7em] h-[0.72em] mx-[0.05em] relative shrink-0"
      aria-label="E"
    >
      {/* Bar 1: Cyan */}
      <span className="w-full h-[22%] bg-[#00C6FF] rounded-[2px] shadow-[0_0_8px_rgba(0,198,255,0.7)]" />
      {/* Bar 2: Vivid Royal Blue */}
      <span className="w-full h-[22%] bg-[#0066FF] rounded-[2px] shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
      {/* Bar 3: Deep Navy / Contrast Blue */}
      <span
        className={`w-full h-[22%] rounded-[2px] ${
          isLight
            ? 'bg-[#081736]'
            : 'bg-[#0E3A8C] border border-[#2E7DFF]/40'
        }`}
      />
    </span>
  );

  // Text color classes based on theme
  const textColor = isLight ? 'text-[#081736]' : 'text-white';
  const sloganTextColor = isLight ? 'text-[#081736]' : 'text-[#C4C8D0]';
  const ruleGradientLeft = isLight
    ? 'bg-gradient-to-r from-transparent via-[#00C6FF] to-[#0066FF]'
    : 'bg-gradient-to-r from-transparent via-[#00C6FF] to-[#2E7DFF]';
  const ruleGradientRight = isLight
    ? 'bg-gradient-to-l from-transparent via-[#00C6FF] to-[#0066FF]'
    : 'bg-gradient-to-l from-transparent via-[#00C6FF] to-[#2E7DFF]';

  // Badge layout: complete card like the brand asset (supports both light and dark themes with identical dimensions)
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center w-full h-[320px] sm:h-[360px] p-6 sm:p-8 rounded-3xl transition-all duration-300 box-border ${
          isLight
            ? 'bg-white text-[#081736] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200'
            : 'bg-[#0A0A0A] text-white shadow-[0_20px_50px_rgba(11,31,68,0.8)] border border-[#2E7DFF]/40'
        } ${className}`}
      >
        <div className="mb-3">{CrystalVIcon}</div>
        <div className="flex flex-col items-center text-center">
          <div
            className={`font-['Montserrat',sans-serif] font-black tracking-wider flex items-center text-2xl sm:text-3xl ${
              isLight ? 'text-[#081736]' : 'text-white'
            }`}
          >
            <span>V</span>
            {StylizedE}
            <span>RTEX</span>
            <span
              className={`ml-1.5 font-black ${
                isLight ? 'text-[#0066FF]' : 'text-[#00C6FF]'
              }`}
            >
              3D
            </span>
          </div>
          {showSlogan && (
            <div className="flex items-center gap-2 mt-2 w-full justify-center">
              <div className="h-[2px] w-6 sm:w-10 bg-[#00C6FF]" />
              <span
                className={`font-['Montserrat',sans-serif] font-bold uppercase text-[9px] sm:text-[11px] tracking-[0.3em] whitespace-nowrap ${
                  isLight ? 'text-[#081736]' : 'text-white'
                }`}
              >
                IDEAS INTO REALITY
              </span>
              <div className="h-[2px] w-6 sm:w-10 bg-[#00C6FF]" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard Horizontal or Vertical Logo
  return (
    <div
      className={`inline-flex ${
        variant === 'vertical'
          ? 'flex-col items-center text-center gap-3'
          : 'flex-row items-center gap-3 sm:gap-4'
      } group select-none ${className}`}
    >
      {CrystalVIcon}

      <div
        className={`flex flex-col ${
          variant === 'vertical' ? 'items-center' : 'items-start'
        } justify-center leading-none`}
      >
        {/* Main Wordmark: V [≡] R T E X   3D */}
        <div
          className={`font-['Montserrat',sans-serif] font-black tracking-wider flex items-center ${textColor} ${textSizes[size]}`}
        >
          <span>V</span>
          {StylizedE}
          <span>RTEX</span>
          <span className="text-[#0066FF] dark:text-[#00C6FF] ml-1.5 sm:ml-2 font-black drop-shadow-[0_0_15px_rgba(0,198,255,0.7)]">
            3D
          </span>
        </div>

        {/* Slogan with Left and Right Lines */}
        {showSlogan && (
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5 w-full justify-center">
            <div className={`h-[1.5px] sm:h-[2px] flex-1 ${ruleGradientLeft}`} />
            <span
              className={`font-['Montserrat',sans-serif] font-bold ${sloganTextColor} uppercase ${sloganSizes[size]} whitespace-nowrap`}
            >
              IDEAS INTO REALITY
            </span>
            <div className={`h-[1.5px] sm:h-[2px] flex-1 ${ruleGradientRight}`} />
          </div>
        )}
      </div>
    </div>
  );
};
