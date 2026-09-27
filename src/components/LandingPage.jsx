import React, { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export default memo(function LandingPage({ onEnterStore }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex flex-col justify-between relative overflow-x-hidden selection:bg-[#D2F827]/30 selection:text-[#D2F827]">
      
      {/* Dynamic Background Neon Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[ clamp(320px,50vw,800px) ] h-[ clamp(320px,50vw,800px) ] bg-[#D2F827]/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header */}
      <header className="relative z-20 w-full px-4 sm:px-8 xl:px-16 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#D2F827] text-[#050507] font-black text-lg flex items-center justify-center shadow-[0_0_20px_rgba(210,248,39,0.35)]">
              V
            </div>
            <div>
              <span className="font-syne font-black text-lg tracking-tight text-white block leading-none">
                VOLTIX
              </span>
              <span className="text-[8px] font-mono tracking-[0.2em] text-[#D2F827] font-bold uppercase mt-0.5 block">
                LABS ARCHIVE
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onEnterStore}
            className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#D2F827] hover:text-[#050507] border border-white/[0.1] text-[11px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
          >
            Skip To Store
          </button>
        </div>
      </header>

      {/* Hero Showcase (Centered, Responsive, No Screen Cut) */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 xl:px-16 py-6 sm:py-10 my-auto flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0B10] border border-[#D2F827]/40 text-[#D2F827] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
              <Sparkles className="w-3.5 h-3.5 fill-[#D2F827] flex-shrink-0" />
              <span className="break-words">CYBERNETIC LUXURY HARDWARE</span>
            </div>

            <h1 className="font-syne font-black text-white tracking-tight leading-[1.08] text-[clamp(2rem,4.5vw,4.5rem)]">
              DOMINATE REALITY. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2F827] via-[#E8FFA1] to-white drop-shadow-[0_0_30px_rgba(210,248,39,0.35)]">
                UNLEASH APEX.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-[#8E8E98] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Aerospace Grade-5 titanium chrono wearables, 15ms ultra-low latency planar acoustics, and tactical weatherproof everyday carry.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onEnterStore}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-syne font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(210,248,39,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENTER STORE</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>

              <button
                type="button"
                onClick={onEnterStore}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0E0E14] hover:bg-[#14141E] border border-white/[0.08] text-xs font-mono font-bold uppercase text-[#A1A1AA] transition-colors cursor-pointer"
              >
                Explore 8 Drops
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/[0.06] max-w-md mx-auto lg:mx-0">
              <div>
                <span className="text-sm sm:text-lg font-black font-mono text-[#D2F827] block">&lt; 15MS</span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#71717A] uppercase">Latency</span>
              </div>
              <div>
                <span className="text-sm sm:text-lg font-black font-mono text-white block">GRADE-5</span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#71717A] uppercase">Titanium</span>
              </div>
              <div>
                <span className="text-sm sm:text-lg font-black font-mono text-[#D2F827] block">60-HR</span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#71717A] uppercase">Battery</span>
              </div>
            </div>

          </div>

          {/* Right 3D Visual */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] aspect-square flex items-center justify-center">
              
              <div className="absolute inset-4 rounded-full border border-dashed border-[#D2F827]/25 pointer-events-none animate-spin-slow" />
              <div className="absolute inset-10 bg-radial from-[#D2F827]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
                className="absolute top-2 left-0 z-20 px-2.5 py-1.5 rounded-xl bg-[#09090E]/95 border border-white/[0.1] backdrop-blur-xl shadow-2xl flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#D2F827]" />
                <div>
                  <span className="text-[7.5px] font-mono text-[#71717A] uppercase block">Response</span>
                  <span className="text-[11px] font-mono font-black text-white">96kHz / 24-BIT</span>
                </div>
              </motion.div>

              <motion.img 
                animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                src="https://pngimg.com/d/headphones_PNG101980.png" 
                alt="Apex Acoustics" 
                className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.98)] z-10"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop";
                }}
              />

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="absolute bottom-2 right-0 z-20 px-3 py-1.5 rounded-xl bg-[#09090E]/95 border border-[#D2F827]/40 backdrop-blur-xl shadow-2xl flex items-center gap-1.5 font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-[#D2F827] shadow-[0_0_8px_#D2F827]" />
                <span className="text-[11px] font-black text-[#D2F827]">60-HR BATTERY</span>
              </motion.div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full px-4 sm:px-8 xl:px-16 py-3 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-xs font-mono text-[#71717A] text-center sm:text-left">
          <div>© 2026 VOLTIX INC. MIL-SPEC PERFORMANCE.</div>
          <div className="flex items-center gap-3 text-[#D2F827]">
            <span>ENCRYPTED 256-BIT DISPATCH</span>
            <span>•</span>
            <span className="text-white">SHIPPED WORLDWIDE</span>
          </div>
        </div>
      </footer>

    </div>
  );
});