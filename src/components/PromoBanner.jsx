import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Tag, Gift, Check, ShieldPercent, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default memo(function PromoBanner({ onClaimOffer }) {
  const [copied, setCopied] = useState(false);

  const triggerSprinklesAndClaim = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 110,
      spread: 85,
      origin: { x, y: y - 0.05 },
      colors: ['#D2F827', '#ffffff', '#10B981', '#38BDF8', '#F59E0B'],
      ticks: 240,
      gravity: 1.1,
      scalar: 1.2
    });

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    if (onClaimOffer) {
      onClaimOffer();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-gradient-to-r from-[#171722] via-[#101015] to-[#14141B] border border-white/[0.1] p-6 sm:p-10 xl:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
      
      {/* Background Holographic Glow Ring */}
      <div className="absolute top-0 right-1/3 w-[clamp(280px,30vw,550px)] h-[clamp(280px,30vw,550px)] bg-[#D2F827]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Voucher Info (8 Cols) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D2F827]/15 border border-[#D2F827]/35 text-[#D2F827] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Gift className="w-3.5 h-3.5 animate-bounce" />
            <span>SEASON FINALE // LIMITED VIP ALLOCATION</span>
          </div>

          <h3 className="font-syne text-2xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
            UNLOCK <span className="text-[#D2F827] underline decoration-[#D2F827]/30 decoration-wavy">40% OFF</span> ALL <br />
            SIGNATURE GEAR.
          </h3>

          <p className="text-xs sm:text-base text-[#8E8E98] max-w-2xl leading-relaxed">
            Instant privilege discount applies across planar acoustics, sapphire chrono watches, and ballistic tactical packs. Auto-applied at checkout.
          </p>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#71717A] pt-1">
            <span className="flex items-center gap-1.5 text-white">
              <ShieldPercent className="w-4 h-4 text-[#D2F827]" />
              ZERO HIDDEN SURCHARGES
            </span>
            <span>•</span>
            <span>VALID UNTIL MIDNIGHT DROP</span>
          </div>
        </div>

        {/* Right Interactive Ticket Action (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3.5 w-full">
          
          {/* Coupon Stub Box */}
          <div className="w-full px-5 py-4 rounded-2xl bg-[#09090D]/90 border border-dashed border-[#D2F827]/40 flex items-center justify-between gap-3 text-white shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#D2F827]" />
              <div>
                <span className="text-[9px] font-mono text-[#71717A] uppercase block">PROMO VOUCHER</span>
                <span className="text-sm font-mono font-black text-[#D2F827] tracking-wider">VOLT40</span>
              </div>
            </div>
            
            <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.05] text-[#A1A1AA] border border-white/[0.08]">
              {copied ? 'COPIED!' : 'CLICK TO CLAIM'}
            </span>
          </div>

          {/* Sprinkles Action Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerSprinklesAndClaim}
            className="w-full py-4 px-8 rounded-2xl bg-[#D2F827] hover:bg-[#c4ea21] text-[#09090B] font-black text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(210,248,39,0.4)] flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>CODE APPLIED & COPIED</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-[#09090B]" />
                <span>Claim 40% Voucher</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </motion.button>

        </div>

      </div>
    </section>
  );
});