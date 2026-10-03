import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Clean helper style for rendering an Apple-like vinyl sticker.
 * Combines 8 crisp white drop-shadows to create a solid die-cut border,
 * followed by a realistic soft ambient lift shadow.
 */
const STICKER_FILTER =
  "drop-shadow(2px 2px 0px #ffffff) " +
  "drop-shadow(-2px -2px 0px #ffffff) " +
  "drop-shadow(0px 10px 20px rgba(0,0,0,0.15))";

type StickerProps = {
  className?: string;
  scrollProgress?: MotionValue<number>;
};

function useStickerParallax(scrollProgress: MotionValue<number> | undefined, output: [string, string]) {
  const fallback = useMotionValue(0);
  return useTransform(scrollProgress ?? fallback, [0, 1], output);
}

/**
 * 3D Cinema Camera Sticker.
 */
export function Camera3D({ className = "", scrollProgress }: StickerProps) {
  const y = useStickerParallax(scrollProgress, ["0px", "-60px"]);

  return (
    <motion.div
      style={{ y, filter: STICKER_FILTER }}
      animate={{
        y: [0, -5, 0],
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute select-none pointer-events-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${className}`}
    >
      <svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="camBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3d4e" />
            <stop offset="40%" stopColor="#252533" />
            <stop offset="100%" stopColor="#111117" />
          </linearGradient>
          <linearGradient id="camLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55556d" />
            <stop offset="40%" stopColor="#2c2c3d" />
            <stop offset="100%" stopColor="#171721" />
          </linearGradient>
          <linearGradient id="camChromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e2ec" />
            <stop offset="70%" stopColor="#8c8ca3" />
            <stop offset="100%" stopColor="#4a4a5a" />
          </linearGradient>
          <linearGradient id="camLensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="camAccentRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#b30000" />
          </linearGradient>
          <radialGradient id="camLensReflect" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#221DF2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 3D Camera Body */}
        <path d="M 40,80 L 140,50 L 140,150 L 40,180 Z" fill="url(#camBodyGrad)" />
        <path d="M 140,50 L 180,65 L 180,165 L 140,150 Z" fill="#1b1b24" />

        {/* Top Handle */}
        <path d="M 60,80 L 60,40 L 130,20 L 130,53 Z" fill="none" stroke="url(#camChromeGrad)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 80,45 L 150,30" fill="none" stroke="url(#camBodyGrad)" strokeWidth="18" strokeLinecap="round" />
        
        {/* Tally Light */}
        <circle cx="155" cy="45" r="6" fill="url(#camAccentRed)" />
        <circle cx="155" cy="45" r="10" stroke="url(#camAccentRed)" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" style={{ transformOrigin: "155px 45px" }} />

        {/* Lens System */}
        <ellipse cx="165" cy="110" rx="22" ry="32" fill="url(#camChromeGrad)" />
        <path d="M 165,80 L 210,95 L 210,155 L 165,140 Z" fill="url(#camLensGrad)" />
        
        {/* Matte Box Hood */}
        <path d="M 205,93 L 225,85 L 225,165 L 205,153 Z" fill="url(#camChromeGrad)" />
        <ellipse cx="220" cy="125" rx="9" ry="36" fill="url(#camLensGlass)" />
        <ellipse cx="218" cy="125" rx="6" ry="26" fill="url(#camLensReflect)" />

        {/* Buttons and controls */}
        <rect x="55" y="90" width="18" height="14" rx="3" transform="skewY(16.7)" fill="url(#camChromeGrad)" />
        <circle cx="64" cy="116" r="5" transform="skewY(16.7)" fill="url(#camAccentRed)" />
        <circle cx="82" cy="121" r="6" transform="skewY(16.7)" fill="url(#camChromeGrad)" />

        {/* Microphone */}
        <path d="M 90,15 L 170,-5 L 170,10 L 90,30 Z" fill="url(#camLensGrad)" />
        <line x1="105" y1="18" x2="105" y2="28" stroke="#000" strokeWidth="2.5" />
        <line x1="115" y1="16" x2="115" y2="26" stroke="#000" strokeWidth="2.5" />
        <line x1="125" y1="13" x2="125" y2="23" stroke="#000" strokeWidth="2.5" />

        {/* Cable details */}
        <path d="M 50,155 Q 30,170 35,190 T 70,210" fill="none" stroke="#252533" strokeWidth="7" strokeLinecap="round" />

        {/* Glossy Diagonal Reflection Sheet on top of everything for 3D sticker effect */}
        <path d="M 0,0 L 240,240" stroke="rgba(255,255,255,0.15)" strokeWidth="28" strokeLinecap="round" className="pointer-events-none" />
      </svg>
    </motion.div>
  );
}

/**
 * 3D Studio Spotlight Sticker.
 */
export function StudioLight3D({ className = "", scrollProgress }: StickerProps) {
  const y = useStickerParallax(scrollProgress, ["0px", "-50px"]);

  return (
    <motion.div
      style={{ y, filter: STICKER_FILTER }}
      animate={{
        y: [0, -4, 0],
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute select-none pointer-events-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${className}`}
    >
      <svg width="190" height="190" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lightMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55556d" />
            <stop offset="60%" stopColor="#2c2c3d" />
            <stop offset="100%" stopColor="#12121c" />
          </linearGradient>
          <linearGradient id="lightDoor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3d4e" />
            <stop offset="100%" stopColor="#111117" />
          </linearGradient>
          <linearGradient id="lightBeam" x1="50" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#221DF2" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#8280ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#221DF2" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lightBracket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#444455" />
          </linearGradient>
        </defs>

        {/* Visual Light Beam cone */}
        <path d="M 45,45 L 290,190 L 190,290 Z" fill="url(#lightBeam)" />

        {/* Swivel Bracket */}
        <path d="M 12,65 Q 22,22 65,12" fill="none" stroke="url(#lightBracket)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="65" cy="12" r="9" fill="url(#lightMetal)" stroke="#000" strokeWidth="1" />
        <rect x="60" y="4" width="10" height="16" rx="3" fill="url(#lightBracket)" />

        {/* Angled Light Head */}
        <g transform="rotate(45 50 50)">
          <rect x="15" y="32" width="25" height="36" rx="5" fill="#121217" />
          <rect x="40" y="30" width="40" height="40" rx="3" fill="url(#lightMetal)" />
          <line x1="48" y1="30" x2="48" y2="70" stroke="#121217" strokeWidth="3" />
          <line x1="58" y1="30" x2="58" y2="70" stroke="#121217" strokeWidth="3" />
          <line x1="68" y1="30" x2="68" y2="70" stroke="#121217" strokeWidth="3" />

          {/* Lens border */}
          <rect x="80" y="26" width="14" height="48" rx="3" fill="#252533" stroke="url(#lightBracket)" strokeWidth="1.5" />
          <rect x="87" y="29" width="5" height="42" fill="#a3a1ff" />

          {/* Barndoors */}
          <path d="M 88,26 L 128,4 L 143,19 L 92,26 Z" fill="url(#lightDoor)" stroke="#0a0a0f" strokeWidth="1.5" />
          <path d="M 88,74 L 128,96 L 143,81 L 92,74 Z" fill="url(#lightDoor)" stroke="#0a0a0f" strokeWidth="1.5" />

          <path d="M 25,68 L 10,85" stroke="url(#lightMetal)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="10" cy="85" r="5" fill="#121217" />
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * 3D Telescopic Studio Tripod Sticker.
 */
export function Tripod3D({ className = "", scrollProgress }: StickerProps) {
  const y = useStickerParallax(scrollProgress, ["0px", "-55px"]);

  return (
    <motion.div
      style={{ y, filter: STICKER_FILTER }}
      animate={{
        y: [0, -5, 0],
        rotate: [0.5, -0.5, 0.5],
      }}
      transition={{
        y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute select-none pointer-events-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${className}`}
    >
      <svg width="150" height="195" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tripodCarbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e4e5e" />
            <stop offset="50%" stopColor="#2c2c38" />
            <stop offset="100%" stopColor="#171721" />
          </linearGradient>
          <linearGradient id="tripodChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#adadb8" />
            <stop offset="100%" stopColor="#555566" />
          </linearGradient>
        </defs>

        {/* Head Mount */}
        <rect x="90" y="20" width="20" height="16" rx="4" fill="url(#tripodCarbon)" stroke="#000" strokeWidth="1" />
        <rect x="85" y="36" width="30" height="9" rx="2" fill="url(#tripodChrome)" />
        <path d="M 85,26 L 45,15 L 35,25" fill="none" stroke="url(#tripodCarbon)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="20" width="10" height="12" rx="2" fill="#111" />

        {/* Column Shaft */}
        <rect x="96" y="45" width="8" height="58" fill="url(#tripodChrome)" />
        <rect x="92" y="72" width="16" height="9" rx="2" fill="url(#tripodCarbon)" />
        <circle cx="112" cy="76" r="4" fill="url(#tripodChrome)" />

        {/* Spider Crown */}
        <path d="M 82,103 L 118,103 L 110,118 L 90,118 Z" fill="url(#tripodCarbon)" stroke="#111" strokeWidth="1" />

        {/* Telescopic Legs */}
        {/* Center Leg */}
        <line x1="100" y1="118" x2="100" y2="245" stroke="url(#tripodCarbon)" strokeWidth="7" strokeLinecap="round" />
        <rect x="96" y="170" width="8" height="7" fill="url(#tripodChrome)" />
        <circle cx="100" cy="248" r="5" fill="#111" />

        {/* Left Leg */}
        <line x1="93" y1="116" x2="50" y2="235" stroke="url(#tripodCarbon)" strokeWidth="6.5" strokeLinecap="round" />
        <g transform="translate(68, 170) rotate(45)">
          <rect x="-4" y="-3.5" width="8" height="7" fill="url(#tripodChrome)" />
        </g>
        <circle cx="48" cy="238" r="5" fill="#111" />

        {/* Right Leg */}
        <line x1="107" y1="116" x2="150" y2="235" stroke="url(#tripodCarbon)" strokeWidth="6.5" strokeLinecap="round" />
        <g transform="translate(132, 170) rotate(-45)">
          <rect x="-4" y="-3.5" width="8" height="7" fill="url(#tripodChrome)" />
        </g>
        <circle cx="152" cy="238" r="5" fill="#111" />

        {/* Support Struts */}
        <path d="M 100,160 L 73,180" stroke="url(#tripodChrome)" strokeWidth="3" />
        <path d="M 100,160 L 127,180" stroke="url(#tripodChrome)" strokeWidth="3" />
      </svg>
    </motion.div>
  );
}

/**
 * 3D Clapperboard Sticker.
 */
export function Clapperboard3D({ className = "", scrollProgress }: StickerProps) {
  const y = useStickerParallax(scrollProgress, ["0px", "-40px"]);

  return (
    <motion.div
      style={{ y, filter: STICKER_FILTER }}
      animate={{
        y: [0, 4, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute select-none pointer-events-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${className}`}
    >
      <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="clapperWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e2e3a" />
            <stop offset="50%" stopColor="#1a1a24" />
            <stop offset="100%" stopColor="#0a0a0f" />
          </linearGradient>
          <linearGradient id="clapperMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a3a3c2" />
          </linearGradient>
          <linearGradient id="clapperAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#221DF2" />
            <stop offset="100%" stopColor="#0a0780" />
          </linearGradient>
        </defs>

        {/* Board Body */}
        <path d="M 30,75 L 170,75 L 170,165 L 30,165 Z" fill="url(#clapperWood)" />

        {/* Slate lines & Text simulation */}
        <rect x="42" y="90" width="116" height="6" rx="1" fill="#ffffff" fillOpacity="0.25" />
        <rect x="42" y="105" width="50" height="4" rx="1" fill="#ffffff" fillOpacity="0.25" />
        <rect x="100" y="105" width="58" height="4" rx="1" fill="#ffffff" fillOpacity="0.25" />
        <rect x="42" y="120" width="30" height="4" rx="1" fill="#ffffff" fillOpacity="0.25" />
        <rect x="80" y="120" width="30" height="4" rx="1" fill="#ffffff" fillOpacity="0.25" />
        <rect x="118" y="120" width="40" height="4" rx="1" fill="#ffffff" fillOpacity="0.25" />

        {/* Dynamic Clapper Accent (Color stripe) */}
        <rect x="42" y="138" width="116" height="15" rx="3" fill="url(#clapperAccent)" />
        <circle cx="55" cy="145.5" r="3" fill="#ffffff" />
        <rect x="66" y="143" width="75" height="5" rx="1.5" fill="#ffffff" />

        {/* Fixed Top Clapper Bar */}
        <rect x="30" y="55" width="140" height="16" fill="url(#clapperWood)" />
        <path d="M 40,55 L 55,55 L 43,71 L 30,71 Z" fill="url(#clapperMetal)" />
        <path d="M 70,55 L 85,55 L 73,71 L 58,71 Z" fill="url(#clapperMetal)" />
        <path d="M 100,55 L 115,55 L 103,71 L 88,71 Z" fill="url(#clapperMetal)" />
        <path d="M 130,55 L 145,55 L 133,71 L 118,71 Z" fill="url(#clapperMetal)" />
        <path d="M 160,55 L 170,55 L 163,71 L 148,71 Z" fill="url(#clapperMetal)" />

        {/* Hinge Connection */}
        <circle cx="34" cy="56" r="6" fill="url(#clapperMetal)" />

        {/* Clapped Bar (Open slightly) */}
        <g transform="rotate(-15 34 56)">
          <rect x="30" y="34" width="140" height="16" fill="url(#clapperWood)" />
          <path d="M 40,34 L 55,34 L 43,50 L 30,50 Z" fill="url(#clapperMetal)" />
          <path d="M 70,34 L 85,34 L 73,50 L 58,50 Z" fill="url(#clapperMetal)" />
          <path d="M 100,34 L 115,34 L 103,50 L 88,50 Z" fill="url(#clapperMetal)" />
          <path d="M 130,34 L 145,34 L 133,50 L 118,50 Z" fill="url(#clapperMetal)" />
          <path d="M 160,34 L 170,34 L 163,50 L 148,50 Z" fill="url(#clapperMetal)" />
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * 3D Retro/Studio Microphone Sticker.
 */
export function Microphone3D({ className = "", scrollProgress }: StickerProps) {
  const y = useStickerParallax(scrollProgress, ["0px", "-45px"]);

  return (
    <motion.div
      style={{ y, filter: STICKER_FILTER }}
      animate={{
        y: [0, -4, 0],
        rotate: [1, -1, 1],
      }}
      transition={{
        y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 13, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute select-none pointer-events-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10 ${className}`}
    >
      <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="micMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cccccc" />
            <stop offset="75%" stopColor="#7a7a99" />
            <stop offset="100%" stopColor="#3d3d4d" />
          </linearGradient>
          <linearGradient id="micGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#221DF2" />
            <stop offset="100%" stopColor="#080554" />
          </linearGradient>
        </defs>

        {/* Stand Base & Shaft */}
        <rect x="94" y="110" width="12" height="60" fill="url(#micMetal)" />
        <rect x="88" y="125" width="24" height="8" rx="2" fill="url(#micMetal)" />
        <path d="M 65,165 Q 100,160 135,165 L 125,175 Q 100,172 75,175 Z" fill="url(#micMetal)" stroke="#111" strokeWidth="0.5" />

        {/* Swivel Bracket */}
        <path d="M 72,75 Q 72,112 100,112 Q 128,112 128,75" fill="none" stroke="url(#micMetal)" strokeWidth="9" strokeLinecap="round" />
        <circle cx="100" cy="111" r="7" fill="#111" />

        {/* Vintage Capsule Housing */}
        <rect x="78" y="32" width="44" height="60" rx="22" fill="url(#micGlow)" stroke="url(#micMetal)" strokeWidth="6.5" />

        {/* Metal Grill Ribs */}
        <path d="M 82,50 L 118,50" stroke="url(#micMetal)" strokeWidth="3" />
        <path d="M 80,62 L 120,62" stroke="url(#micMetal)" strokeWidth="3" />
        <path d="M 82,74 L 118,74" stroke="url(#micMetal)" strokeWidth="3" />

        <line x1="100" y1="34" x2="100" y2="90" stroke="url(#micMetal)" strokeWidth="3" />
        <line x1="91" y1="36" x2="91" y2="88" stroke="url(#micMetal)" strokeWidth="1.5" />
        <line x1="109" y1="36" x2="109" y2="88" stroke="url(#micMetal)" strokeWidth="1.5" />

        {/* Horizontal Center Band */}
        <rect x="74" y="58" width="52" height="8" fill="url(#micMetal)" stroke="#111" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}
