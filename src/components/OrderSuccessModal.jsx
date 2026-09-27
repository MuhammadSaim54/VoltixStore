import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Printer } from 'lucide-react';

export default memo(function OrderSuccessModal({ orderData, onClose, onResetCart }) {
  if (!orderData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
        
        {/* Hologram Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          className="relative w-full max-w-lg rounded-[32px] bg-[#08080C] border border-[#D2F827]/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(210,248,39,0.25)] text-center my-auto z-10 space-y-5"
        >
          {/* Animated Neon Check */}
          <div className="w-16 h-16 rounded-3xl bg-[#D2F827] text-[#050507] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(210,248,39,0.5)]">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#D2F827] uppercase tracking-widest block">
              AUTHORIZATION COMPLETE // DROP VERIFIED
            </span>
            <h2 className="font-syne font-black text-2xl sm:text-3xl text-white">
              DISPATCH CONFIRMED
            </h2>
            <p className="text-xs text-[#8E8E98] max-w-xs mx-auto leading-relaxed">
              Your hardware package is being calibrated and packed in an anti-static vault capsule.
            </p>
          </div>

          {/* Tracking Telemetry Box */}
          <div className="p-4 rounded-2xl bg-[#0D0D14] border border-white/[0.08] space-y-2.5 font-mono text-xs text-left">
            <div className="flex justify-between items-center text-[#71717A]">
              <span>MANIFEST ID:</span>
              <span className="text-[#D2F827] font-bold">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between items-center text-[#71717A]">
              <span>RECIPIENT:</span>
              <span className="text-white font-bold">{orderData.customer?.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-[#71717A]">
              <span>TOTAL VALUE:</span>
              <span className="text-white font-bold">${orderData.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[#71717A]">
              <span>ESTIMATED DELIVERY:</span>
              <span className="text-[#D2F827] font-bold">2 - 3 BUSINESS DAYS</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                onResetCart();
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-syne font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_25px_rgba(210,248,39,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <span>RETURN TO VAULT ARCHIVE</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT DISPATCH RECEIPT</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
});