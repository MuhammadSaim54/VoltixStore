import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Mic, Flame, ShieldCheck, Zap, Radio, Activity } from 'lucide-react';

export default memo(function HeroBanner({ searchQuery, onSearchChange, onExplore }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] bg-[#0A0A0E] border border-white/[0.1] p-4 sm:p-10 xl:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.9)] w-full">
      
      {/* Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[clamp(240px,40vw,600px)] h-[clamp(240px,40vw,600px)] bg-[#D2F827] rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          
          {/* Badge Responsive: Normal Wrap on 320px Screens */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D2F827]/10 border border-[#D2F827]/30 text-[#D2F827] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2F827] animate-ping flex-shrink-0" />
            <Flame className="w-3 h-3 fill-[#D2F827] flex-shrink-0" />
            <span className="break-words">APEX SERIES // ESPORTS EDITION</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-syne font-black text-white tracking-tight leading-[1.05] text-[clamp(1.75rem,5vw,4.5rem)]"
          >
            DOMINATE SOUND. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2F827] via-[#F4FF99] to-white drop-shadow-[0_0_35px_rgba(210,248,39,0.35)]">
              UNLEASH APEX.
            </span>
          </motion.h1>

          <p className="text-xs sm:text-sm lg:text-base text-[#8E8E98] max-w-xl leading-relaxed">
            Ultra-low latency 2.4GHz wireless matrix, planar magnetic 50mm acoustic drivers, and spatial biometrics engineered for competitive studio audio.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-white">
              <Zap className="w-3 h-3 text-[#D2F827]" />
              <span className="font-bold">&lt; 15MS LATENCY</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#A1A1AA]">
              <Radio className="w-3 h-3 text-[#D2F827]" />
              <span>7.1 SPATIAL HUD</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#A1A1AA]">
              <ShieldCheck className="w-3 h-3 text-[#D2F827]" />
              <span>2-YR VOLTIX CARE</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Transparent Audio Hardware */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[260px] sm:max-w-[360px] aspect-square flex items-center justify-center">
            
            <div className="absolute inset-4 bg-radial from-[#D2F827]/20 via-transparent to-transparent rounded-full blur-2xl" />

            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-2 left-0 z-20 px-2.5 py-1.5 rounded-xl bg-[#0E0E14]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-2"
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
              alt="Voltix Apex Headset" 
              className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)] z-10"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop";
              }}
            />

            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute bottom-2 right-0 z-20 px-3 py-1.5 rounded-xl bg-[#0E0E14]/90 backdrop-blur-xl border border-[#D2F827]/40 shadow-2xl flex items-center gap-2 font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-[#D2F827] shadow-[0_0_8px_#D2F827]" />
              <span className="text-[11px] font-bold text-[#D2F827]">60-HR BATTERY</span>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Bottom Search Deck */}
      <div className="mt-6 sm:mt-10 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#111116]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search audio, watches, backpacks..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#17171F] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#71717A] outline-none focus:border-[#D2F827]/70 transition-all shadow-inner"
          />
          <Mic className="w-3.5 h-3.5 text-[#71717A] absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#71717A] font-bold">Trending:</span>
            {['Apex Audio', 'Titanium Chrono', 'EDC Sling'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearchChange(tag)}
                className="px-2.5 py-1 rounded-lg bg-[#17171F] border border-white/[0.06] text-[11px] text-white hover:border-[#D2F827] transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onExplore}
            className="px-4 py-2 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-black text-xs transition-all shadow-[0_0_15px_rgba(210,248,39,0.35)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap ml-auto"
          >
            <span>Show Drops</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>

    </section>
  );
});