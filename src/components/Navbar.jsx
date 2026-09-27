import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Bell, Heart } from 'lucide-react';

export default memo(function Navbar({ 
  activeTab = 'HOME', 
  onTabChange, 
  cartCount = 0, 
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist
}) {
  const navTabs = ['HOME', 'PRODUCTS', 'ABOUT', 'SUPPORT'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#070709]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.9)] px-4 sm:px-8 xl:px-12 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand */}
        <div 
          onClick={() => onTabChange('HOME')}
          className="flex items-center gap-2 select-none cursor-pointer flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-[#D2F827] text-[#070709] font-black text-lg flex items-center justify-center shadow-[0_0_20px_rgba(210,248,39,0.35)]">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-black text-lg tracking-tight text-white leading-none">
              VOLTIX
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-[#D2F827] font-bold uppercase mt-0.5">
              STUDIO GEAR
            </span>
          </div>
        </div>

        {/* Center Viewport Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#101015] p-1.5 rounded-full border border-white/[0.08]">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#070709] font-black shadow-sm'
                    : 'text-[#8E8E98] hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Right Action Suite */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          
          {/* Wishlist Trigger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-2xl bg-[#101015] border border-white/[0.08] hover:border-[#D2F827] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            title="Saved Vault"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#D2F827] text-[#D2F827]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#D2F827] text-[#070709] font-black text-[9px] flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Notifications */}
          <button 
            type="button" 
            className="relative p-2.5 rounded-2xl bg-[#101015] border border-white/[0.08] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D2F827]" />
          </button>

          {/* Cart Trigger */}
          <motion.button 
            whileTap={{ scale: 0.94 }}
            type="button" 
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#101015] border border-white/[0.08] hover:border-[#D2F827] text-white transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#D2F827] text-[#070709] font-black text-[9px] flex items-center justify-center font-mono">
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