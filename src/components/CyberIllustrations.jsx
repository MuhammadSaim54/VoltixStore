import React, { memo } from 'react';
import { motion } from 'framer-motion';

export default memo(function CyberIllustrations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Primary Deep Core Aura (Electric Lime & Emerald Blend) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[clamp(350px,50vw,850px)] h-[clamp(350px,50vw,850px)] bg-gradient-to-br from-[#D2F827] via-[#10B981] to-transparent rounded-full blur-[170px]" 
      />

      {/* 2. Secondary Atmospheric Blue Core (Bottom Left) */}
      <motion.div 
        animate={{ 
          scale: [1.1, 0.95, 1.1],
          opacity: [0.05, 0.12, 0.05],
          x: [0, -25, 0],
          y: [0, 20, 0]
        }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute -bottom-28 -left-20 w-[clamp(300px,45vw,700px)] h-[clamp(300px,45vw,700px)] bg-gradient-to-tr from-[#38BDF8] via-[#6366F1] to-transparent rounded-full blur-[160px]" 
      />

      {/* 3. Orbiting Telemetry HUD Radar Ring (Top Right) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
        className="absolute -top-36 -right-36 w-[clamp(420px,55vw,850px)] h-[clamp(420px,55vw,850px)] opacity-[0.2]"
      >
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <circle cx="300" cy="300" r="280" stroke="#D2F827" strokeWidth="1" strokeDasharray="6 10" fill="none" />
          <circle cx="300" cy="300" r="220" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="18 14" fill="none" opacity="0.4" />
          <circle cx="300" cy="300" r="150" stroke="#D2F827" strokeWidth="1.2" strokeDasharray="4 16" fill="none" />
          <circle cx="300" cy="300" r="70" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.6" />
          <line x1="20" y1="300" x2="580" y2="300" stroke="#D2F827" strokeWidth="0.6" strokeDasharray="8 8" opacity="0.3" />
          <line x1="300" y1="20" x2="300" y2="580" stroke="#D2F827" strokeWidth="0.6" strokeDasharray="8 8" opacity="0.3" />
          <circle cx="300" cy="80" r="4.5" fill="#D2F827" />
          <circle cx="520" cy="300" r="4" fill="#38BDF8" />
          <circle cx="300" cy="520" r="4.5" fill="#D2F827" />
          <circle cx="80" cy="300" r="4" fill="#38BDF8" />
        </svg>
      </motion.div>

      {/* 4. Sine-Wave Acoustic Matrix Vector (Center Background) */}
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 right-0 w-full h-64 opacity-[0.14]"
      >
        <svg viewBox="0 0 1440 240" fill="none" className="w-full h-full">
          <path 
            d="M 0 120 C 240 40, 480 200, 720 120 C 960 40, 1200 200, 1440 120" 
            stroke="#D2F827" 
            strokeWidth="1.2" 
            strokeDasharray="6 8" 
          />
          <path 
            d="M 0 140 C 260 220, 500 60, 720 140 C 940 220, 1180 60, 1440 140" 
            stroke="#38BDF8" 
            strokeWidth="0.9" 
            opacity="0.6" 
          />
        </svg>
      </motion.div>

      {/* 5. Isometric HUD Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)',
          backgroundSize: '38px 38px'
        }}
      />

    </div>
  );
});