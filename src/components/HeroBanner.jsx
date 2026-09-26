import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Mic, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  SlidersHorizontal,
  Activity,
  Radio
} from 'lucide-react';

export default memo(function HeroBanner({ 
  searchQuery, 
  onSearchChange,
  onExplore 
}) {
  return (
    <section className="relative overflow-hidden rounded-[36px] sm:rounded-[56px] bg-[#0A0A0E] border border-white/[0.1] p-6 sm:p-12 xl:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
      
      {/* 1. DYNAMIC BACKGROUND ANIMATIONS & NEON AURA */}
      {/* Primary Pulsing Electric Lime Core */}
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 25, 0],
          y: [0, -20, 0]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[clamp(320px,42vw,750px)] h-[clamp(320px,42vw,750px)] bg-[#D2F827] rounded-full blur-[160px] pointer-events-none" 
      />

      {/* Secondary Deep Cyan Cyber Orb */}
      <motion.div 
        animate={{ 
          scale: [1.2, 0.95, 1.2],
          opacity: [0.1, 0.22, 0.1],
          x: [0, -30, 0],
          y: [0, 25, 0]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-10 w-[clamp(280px,35vw,600px)] h-[clamp(280px,35vw,600px)] bg-[#10B981] rounded-full blur-[150px] pointer-events-none" 
      />

      {/* Futuristic Isometric Cyber Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0E]/60 to-[#0A0A0E] pointer-events-none" />

      {/* 2. MAIN SHOWCASE: EDITORIAL COPY & 3D GAMING ASSET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        
        {/* Left Column: Bold Typography & Performance Metrics */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D2F827]/10 border border-[#D2F827]/30 text-[#D2F827] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D2F827] animate-ping" />
            <Flame className="w-3.5 h-3.5 fill-[#D2F827]" />
            <span>APEX SERIES // ULTIMATE ESPORTS EDITION</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-syne hero-headline font-black text-white tracking-tight"
          >
            DOMINATE SOUND. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2F827] via-[#F4FF99] to-white drop-shadow-[0_0_45px_rgba(210,248,39,0.4)]">
              UNLEASH APEX.
            </span>
          </motion.h1>

          <p className="text-xs sm:text-base xl:text-lg text-[#8E8E98] max-w-xl leading-relaxed">
            Ultra-low latency 2.4GHz wireless matrix, planar magnetic 50mm acoustic drivers, and spatial biometrics engineered for competitive studio audio and elite gaming rigs.
          </p>

          {/* Quick Hardware Spec Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white backdrop-blur-md shadow-inner">
              <Zap className="w-3.5 h-3.5 text-[#D2F827]" />
              <span className="font-bold">&lt; 15MS LOW LATENCY</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#A1A1AA] backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-[#D2F827]" />
              <span>7.1 SPATIAL HUD</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#A1A1AA] backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D2F827]" />
              <span>2-YR VOLTIX CARE</span>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Transparent Gaming Cutout + Floating Interactive Badges */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[clamp(280px,32vw,460px)] aspect-square flex items-center justify-center">
            
            {/* Glowing Backdrop Ring behind Product */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#D2F827]/25 pointer-events-none"
            />
            <div className="absolute inset-4 bg-radial from-[#D2F827]/25 via-transparent to-transparent rounded-full blur-2xl" />

            {/* Floating Top Left Spec HUD */}
            <motion.div 
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-2 left-0 sm:left-2 z-20 px-4 py-2.5 rounded-2xl bg-[#0E0E14]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-[#D2F827]" />
              <div>
                <span className="text-[9px] font-mono text-[#71717A] uppercase block">Response</span>
                <span className="text-xs font-mono font-black text-white">96kHz / 24-BIT</span>
              </div>
            </motion.div>

            {/* 3D High-End Matte Black Transparent Gaming Headset (Verified Clean Cutout) */}
            <motion.img 
              animate={{ 
                y: [0, -14, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src="https://pngimg.com/d/headphones_PNG101980.png" 
              alt="Voltix Apex Pro Wireless Gaming Headset" 
              className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.98)] z-10"
              onError={(e) => {
                e.target.onerror = null;
                // High-res secondary fallback
                e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=900&auto=format&fit=crop";
              }}
            />

            {/* Floating Bottom Right Battery/Price Pill */}
            <motion.div 
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-2 right-0 sm:right-2 z-20 px-4 py-2.5 rounded-2xl bg-[#0E0E14]/90 backdrop-blur-xl border border-[#D2F827]/40 shadow-2xl flex items-center gap-3 font-mono"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#D2F827] shadow-[0_0_10px_#D2F827]" />
              <div>
                <span className="text-[9px] text-[#8E8E98] uppercase block">Apex Battery</span>
                <span className="text-xs font-extrabold text-[#D2F827]">60-HR PLAYTIME</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* 3. SHOPLY-STYLE BOTTOM SEARCH DECK (Clean Glassmorphic Card Deck) */}
      <div className="mt-8 sm:mt-12 p-3 sm:p-5 rounded-3xl bg-[#111116]/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-4">
        
        {/* Search Bar Input */}
        <div className="relative w-full">
          <Search className="w-5 h-5 text-[#71717A] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search high-end wireless gear, titanium chronos, tactical packs..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#17171F] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-[#71717A] outline-none focus:border-[#D2F827]/70 transition-all shadow-inner"
          />
          <Mic className="w-4 h-4 text-[#71717A] absolute right-4 top-1/2 -translate-y-1/2 hover:text-white cursor-pointer" />
        </div>

        {/* Quick Tag Pills + Show All Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-bold text-[#71717A]">
              Trending:
            </span>
            {['Apex Gaming Audio', 'Titanium Chrono', 'Tactical EDC Sling', 'Low Latency Earbuds'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearchChange(tag)}
                className="px-3.5 py-2 rounded-xl bg-[#17171F] border border-white/[0.06] text-xs text-white hover:border-[#D2F827] transition-all cursor-pointer"
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
            className="px-7 py-3 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#09090B] font-black text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(210,248,39,0.35)] flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Show All Drops</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>

      </div>

    </section>
  );
});