import React, { memo } from 'react';

export default memo(function AboutViewport() {
  return (
    <section className="p-8 sm:p-16 rounded-[40px] bg-gradient-to-b from-[#14141A] to-[#0A0A0D] border border-white/[0.08] space-y-6 max-w-4xl mx-auto text-center shadow-2xl">
      <span className="text-xs font-mono font-bold uppercase text-[#D2F827] tracking-widest px-3 py-1.5 rounded-full bg-[#D2F827]/10 border border-[#D2F827]/30">
        MANIFESTO // VOLTIX
      </span>
      <h2 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-tight">
        Engineered For The Relentless.
      </h2>
      <p className="text-sm sm:text-lg text-[#8E8E98] leading-relaxed max-w-2xl mx-auto">
        Voltix merges military-grade aerospace titanium, studio-grade planar acoustics, and cutting-edge urban everyday carry into one cyber-luxury ecosystem.
      </p>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-lg mx-auto">
        <div>
          <span className="text-2xl font-black font-mono text-[#D2F827]">99.8%</span>
          <span className="text-[10px] font-mono text-[#71717A] uppercase block">Acoustic Clarity</span>
        </div>
        <div>
          <span className="text-2xl font-black font-mono text-white">GRADE-5</span>
          <span className="text-[10px] font-mono text-[#71717A] uppercase block">Titanium Purity</span>
        </div>
        <div>
          <span className="text-2xl font-black font-mono text-[#D2F827]">100%</span>
          <span className="text-[10px] font-mono text-[#71717A] uppercase block">Carbon Offset</span>
        </div>
      </div>
    </section>
  );
});