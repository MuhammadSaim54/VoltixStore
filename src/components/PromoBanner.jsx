import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Tag, Gift, Check, Verified, ArrowRight } from 'lucide-react';
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
    <section className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-[#171722] via-[#101015] to-[#14141B] border border-white/[0.1] p-5 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] w-full">
      
      <div className="absolute top-0 right-1/3 w-[ clamp(200px,30vw,500px) ] h-[ clamp(200px,30vw,500px) ] bg-[#D2F827]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10 w-full">
        
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
          
          {/* Responsive Badge: Wraps properly on small 320px screens */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2F827]/15 border border-[#D2F827]/35 text-[#D2F827] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md max-w-full">
            <Gift className="w-3.5 h-3.5 flex-shrink-0 animate-bounce" />
            <span className="break-words">SEASON FINALE // LIMITED VIP ALLOCATION</span>
          </div>

          <h3 className="font-syne text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.1]">
            UNLOCK <span className="text-[#D2F827] underline decoration-[#D2F827]/30 decoration-wavy">40% OFF</span> ALL <br className="hidden sm:inline" />
            SIGNATURE GEAR.
          </h3>

          <p className="text-xs sm:text-sm text-[#8E8E98] max-w-2xl leading-relaxed">
            Instant privilege discount applies across planar acoustics, sapphire chrono watches, and ballistic tactical packs.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#71717A] pt-1">
            <span className="flex items-center gap-1.5 text-white">
              <Verified className="w-3.5 h-3.5 text-[#D2F827]" />
              ZERO HIDDEN SURCHARGES
            </span>
            <span>•</span>
            <span>VALID UNTIL MIDNIGHT</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center gap-3 w-full">
          <div className="w-full px-4 py-3 rounded-xl bg-[#09090D]/90 border border-dashed border-[#D2F827]/40 flex items-center justify-between gap-2 text-white shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#D2F827]" />
              <div>
                <span className="text-[8px] font-mono text-[#71717A] uppercase block">PROMO VOUCHER</span>
                <span className="text-xs sm:text-sm font-mono font-black text-[#D2F827] tracking-wider">VOLT40</span>
              </div>
            </div>
            
            <span className="text-[9px] font-mono px-2 py-1 rounded bg-white/[0.05] text-[#A1A1AA] border border-white/[0.08]">
              {copied ? 'COPIED!' : 'CLICK TO CLAIM'}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerSprinklesAndClaim}
            className="w-full py-3.5 px-6 rounded-xl bg-[#D2F827] hover:bg-[#c4ea21] text-[#09090B] font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(210,248,39,0.35)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>CODE APPLIED & COPIED</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-[#09090B]" />
                <span>Claim 40% Voucher</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </>
            )}
          </motion.button>
        </div>

      </div>
    </section>
  );
});