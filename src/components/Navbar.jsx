import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Bell } from 'lucide-react';

export default memo(function Navbar({ cartCount = 2, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-2xl border-b border-white/[0.06] px-4 sm:px-8 xl:px-12 py-3.5 transition-all">
      <div className="app-container flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 select-none cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#D2F827] text-[#09090B] font-black text-lg sm:text-xl flex items-center justify-center shadow-[0_0_20px_rgba(210,248,39,0.35)]">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-black text-lg sm:text-xl tracking-tight text-white leading-none">
              VOLTIX
            </span>
            <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#D2F827] font-bold mt-1 uppercase">
              STUDIO GEAR
            </span>
          </div>
        </div>

        {/* Center Minimal Nav Links (Image Reference) */}
        <nav className="hidden md:flex items-center gap-2 bg-[#141419] p-1.5 rounded-full border border-white/[0.08]">
          {['HOME', 'PRODUCTS', 'ABOUT', 'SUPPORT'].map((link, idx) => (
            <button
              key={link}
              type="button"
              className={`px-5 py-2 rounded-full text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${
                idx === 0
                  ? 'bg-white text-[#09090B] font-black shadow-sm'
                  : 'text-[#8E8E98] hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right Actions: Notification + Cart */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button 
            type="button" 
            className="relative p-2.5 rounded-2xl bg-[#141417] border border-white/[0.08] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D2F827] ring-2 ring-[#141417]" />
          </button>

          <motion.button 
            whileTap={{ scale: 0.94 }}
            type="button" 
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[#141417] border border-white/[0.08] hover:border-[#D2F827] text-white transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#D2F827] text-[#09090B] font-black text-[9px] flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold font-mono tracking-wide">
              {cartCount > 0 ? `${cartCount} ITEMS` : 'CART'}
            </span>
          </motion.button>
        </div>

      </div>
    </header>
  );
});