import React, { memo, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Volume2, 
  ShieldCheck
} from 'lucide-react';

const EDITIONS = [
  {
    name: 'Obsidian Black',
    color: '#18181B',
    glow: '#D2F827',
    image: 'https://pngimg.com/d/headphones_PNG101980.png',
    code: 'SPEC-01 // NOCTURNAL'
  },
  {
    name: 'Volt Lime',
    color: '#D2F827',
    glow: '#D2F827',
    image: 'https://pngimg.com/d/headphones_PNG101979.png',
    code: 'SPEC-02 // HYPERKINETIC'
  },
  {
    name: 'Ghost Slate',
    color: '#94A3B8',
    glow: '#38BDF8',
    image: 'https://pngimg.com/d/headphones_PNG101982.png',
    code: 'SPEC-03 // CRYPTIC'
  }
];

export default memo(function LandingPage({ onEnterStore }) {
  const [activeEdition, setActiveEdition] = useState(0);
  const [systemTime, setSystemTime] = useState('');

  // Mouse tilt physics for desktop/laptop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const { clientWidth, clientHeight } = document.documentElement;
    const x = e.clientX / clientWidth - 0.5;
    const y = e.clientY / clientHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const updateClock = () => {
      const d = new Date();
      setSystemTime(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')} UTC`
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentGear = EDITIONS[activeEdition];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#040407] text-white flex flex-col justify-between relative overflow-x-hidden selection:bg-[#D2F827]/30 selection:text-[#D2F827]"
    >
      
      {/* 1. Dynamic Reactive Ambient Glow */}
      <motion.div 
        style={{ 
          x: bgTranslateX, 
          y: bgTranslateY, 
          backgroundColor: currentGear.glow 
        }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(260px,50vw,1100px)] h-[clamp(260px,50vw,1100px)] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Cyber Grid Vector Layer */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #D2F827 1.5px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Corner Technical Reticles (Desktop / Laptop Only) */}
      <div className="absolute top-3 left-6 text-[9px] font-mono text-white/20 select-none hidden lg:block">
        + [MIL-STD 810H] // APEX_CORE_09
      </div>
      <div className="absolute top-3 right-6 text-[9px] font-mono text-white/20 select-none hidden lg:block">
        {systemTime}
      </div>

      {/* 2. Top Header (Mobile 320px Safe) */}
      <header className="relative z-30 w-full px-3.5 sm:px-8 lg:px-12 py-3 sm:py-4 border-b border-white/[0.07] backdrop-blur-xl bg-[#040407]/80 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-2 select-none min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#D2F827] text-[#040407] font-black text-base flex items-center justify-center shadow-[0_0_15px_rgba(210,248,39,0.35)] flex-shrink-0">
              V
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-syne font-black text-sm sm:text-base tracking-tight text-white block leading-none truncate">
                  VOLTIX
                </span>
                <span className="text-[7px] font-mono font-bold uppercase px-1 py-0.5 rounded bg-white/[0.08] text-[#D2F827] border border-[#D2F827]/30 flex-shrink-0">
                  APEX
                </span>
              </div>
              <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.18em] text-[#71717A] uppercase mt-0.5 block truncate">
                STUDIO GEAR
              </span>
            </div>
          </div>

          {/* Right Header Status + Skip */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D14] border border-white/[0.08] text-[11px] font-mono text-[#8E8E98]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2F827] animate-ping" />
              <span>&lt; 15MS 2.4GHZ</span>
            </div>

            <button
              type="button"
              onClick={onEnterStore}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#D2F827] hover:text-[#040407] border border-white/[0.1] text-[11px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
            >
              Skip →
            </button>
          </div>

        </div>
      </header>

      {/* 3. Hero Showcase Container */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-8 lg:px-12 py-5 sm:py-8 lg:py-10 my-auto flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* Main Column */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
            
            {/* Top Micro-Tag (Safe Wrap on 320px) */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D0D14] border border-[#D2F827]/35 text-[#D2F827] text-[9.5px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2F827] shadow-[0_0_8px_#D2F827] flex-shrink-0" />
              <Sparkles className="w-3 h-3 fill-[#D2F827] flex-shrink-0" />
              <span className="truncate">APEX MILITARY SPEC // DROP 01</span>
            </div>

            {/* Headline: Mobile 320px Zero Cut Fix */}
            <h1 className="font-syne font-black text-white tracking-tight leading-[1.08] text-[1.65rem] xs:text-[1.85rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] w-full break-words">
              DOMINATE REALITY. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2F827] via-[#F3FFA6] to-white drop-shadow-[0_0_30px_rgba(210,248,39,0.35)] block">
                UNLEASH APEX.
              </span>
            </h1>

            <p className="text-[11.5px] sm:text-sm lg:text-base text-[#8E8E98] max-w-xl leading-relaxed px-1 sm:px-0">
              Aerospace Grade-5 titanium chrono wearables, 15ms ultra-low latency planar acoustics, and tactical weatherproof everyday carry engineered for elite creators.
            </p>

            {/* Mobile / Tablet ONLY: Compact 3D Centerpiece */}
            <div className="w-full flex lg:hidden justify-center py-1">
              <div className="relative w-full max-w-[210px] sm:max-w-[280px] aspect-square flex items-center justify-center">
                <div className="absolute inset-3 rounded-full border border-dashed border-[#D2F827]/25 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-8 bg-radial from-[#D2F827]/25 via-transparent to-transparent rounded-full blur-xl pointer-events-none" />
                <img 
                  src={currentGear.image} 
                  alt="Voltix Gear" 
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] z-20"
                />
              </div>
            </div>

            {/* Hardware Finish Switcher (Mobile Responsive Wrap) */}
            <div className="space-y-1.5 w-full max-w-sm flex flex-col items-center lg:items-start pt-1">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono w-full px-1">
                <span className="text-[#71717A] uppercase font-bold">FINISH:</span>
                <span className="text-[#D2F827] font-bold">{currentGear.name}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full">
                {EDITIONS.map((ed, idx) => (
                  <button
                    key={ed.name}
                    type="button"
                    onClick={() => setActiveEdition(idx)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      activeEdition === idx 
                        ? 'bg-[#14141E] border border-[#D2F827] shadow-[0_0_10px_rgba(210,248,39,0.25)]' 
                        : 'bg-[#0A0A0F] border border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ed.color, border: '1px solid rgba(255,255,255,0.2)' }}
                    />
                    <span className="text-[10px] font-mono text-[#D4D4D8]">
                      {ed.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Stats Matrix */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-white/[0.07] w-full max-w-md">
              <div className="text-center lg:text-left">
                <span className="text-sm sm:text-lg lg:text-2xl font-black font-mono text-[#D2F827] block">&lt; 15MS</span>
                <span className="text-[8px] sm:text-[10px] font-mono text-[#71717A] uppercase mt-0.5 block">Latency</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-sm sm:text-lg lg:text-2xl font-black font-mono text-white block">GRADE-5</span>
                <span className="text-[8px] sm:text-[10px] font-mono text-[#71717A] uppercase mt-0.5 block">Titanium</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-sm sm:text-lg lg:text-2xl font-black font-mono text-[#D2F827] block">60-HR</span>
                <span className="text-[8px] sm:text-[10px] font-mono text-[#71717A] uppercase mt-0.5 block">Battery</span>
              </div>
            </div>

            {/* Live Audio Frequency Spectrum (Compact on Mobile) */}
            <div className="w-full max-w-md p-2.5 sm:p-3 rounded-2xl bg-[#09090E] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A]">
                <span className="flex items-center gap-1.5 text-white">
                  <Volume2 className="w-3 h-3 text-[#D2F827]" />
                  SPECTRUM SCAN
                </span>
                <span>24-BIT / 96KHZ</span>
              </div>
              <div className="flex items-end gap-1 h-6 sm:h-7 pt-1">
                {[35, 70, 50, 90, 55, 80, 40, 85, 65, 95, 45, 75, 60, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{ repeat: Infinity, duration: 1.2 + (i % 5) * 0.2, ease: 'easeInOut' }}
                    className="flex-1 bg-gradient-to-t from-transparent to-[#D2F827] rounded-full opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-1.5 w-full max-w-xs flex justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onEnterStore}
                className="w-full py-3.5 rounded-xl bg-[#D2F827] hover:bg-[#c4ea21] text-[#040407] font-syne font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(210,248,39,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Store →</span>
              </motion.button>
            </div>

          </div>

          {/* Right Column: Desktop Large / Laptop 3D Showcase */}
          <div className="hidden lg:flex lg:col-span-5 justify-center relative perspective-[1000px]">
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-[340px] xl:max-w-[420px] aspect-square flex items-center justify-center"
            >
              
              <div className="absolute inset-4 rounded-full border border-dashed border-[#D2F827]/25 pointer-events-none animate-spin-slow" />
              <div className="absolute inset-10 border border-white/[0.05] rounded-full pointer-events-none" />
              <div className="absolute inset-14 bg-radial from-[#D2F827]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Top Left HUD Tag */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
                className="absolute top-2 left-0 z-30 px-3 py-1.5 rounded-xl bg-[#08080C]/95 border border-white/[0.1] backdrop-blur-xl shadow-xl flex items-center gap-2"
              >
                <Activity className="w-3.5 h-3.5 text-[#D2F827]" />
                <div>
                  <span className="text-[7.5px] font-mono text-[#71717A] uppercase block">Response</span>
                  <span className="text-[11px] font-mono font-black text-white">96kHz / 24-BIT</span>
                </div>
              </motion.div>

              {/* Headset Image */}
              <motion.img 
                key={currentGear.image}
                initial={{ opacity: 0.4, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                src={currentGear.image} 
                alt="Voltix Gear" 
                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] z-20 pointer-events-none select-none"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=700&auto=format&fit=crop";
                }}
              />

              {/* Bottom Right Battery Tag */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
                className="absolute bottom-2 right-0 z-30 px-3 py-1.5 rounded-xl bg-[#08080C]/95 border border-[#D2F827]/40 backdrop-blur-xl shadow-xl flex items-center gap-1.5 font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-[#D2F827] shadow-[0_0_8px_#D2F827]" />
                <span className="text-[11px] font-bold text-[#D2F827]">60-HR PLAYTIME</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <footer className="relative z-30 w-full px-3.5 sm:px-8 lg:px-12 py-3 border-t border-white/[0.06] backdrop-blur-md bg-[#040407]/40 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#71717A]">
          <div>© 2026 VOLTIX INC. MIL-SPEC STUDIO ARCHIVE.</div>
          <div className="flex items-center gap-3 text-[#D2F827]">
            <span className="flex items-center gap-1 text-white">
              <ShieldCheck className="w-3 h-3 text-[#D2F827]" />
              256-BIT ENCRYPTED
            </span>
            <span>•</span>
            <span className="text-[#8E8E98]">GLOBAL EXPRESS</span>
          </div>
        </div>
      </footer>

    </div>
  );
});