import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import HeroBanner from '../HeroBanner';
import PopularCategories from '../PopularCategories';
import PromoBanner from '../PromoBanner';
import ProductCard from '../ProductCard';

const sectionMotion = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default memo(function HomeViewport({
  products,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onNavigateToProducts,
  onAddToCart,
  onQuickView,
  onClaimOffer,
  wishlistIds = new Set(),
  onToggleWishlist
}) {
  const featured = products.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* 1. Hero Banner */}
      <motion.div {...sectionMotion}>
        <HeroBanner 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onExplore={onNavigateToProducts}
        />
      </motion.div>

      {/* 2. Popular Categories */}
      <motion.div {...sectionMotion}>
        <PopularCategories onSelectCategory={onSelectCategory} />
      </motion.div>

      {/* 3. Featured Drops */}
      <motion.section {...sectionMotion} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.07] pb-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#D2F827]">
              CURATED VAULT // SELECTION 01
            </span>
            <h2 className="font-syne text-2xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
              Featured Drops
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigateToProducts}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D2F827] hover:underline cursor-pointer"
          >
            <span>EXPLORE FULL ARCHIVE ({products.length} PIECES)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((prod, index) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.has(prod.id)}
              onToggleWishlist={onToggleWishlist}
              isFloating={false}
              floatDelay={index * 0.2}
            />
          ))}
        </div>
      </motion.section>

      {/* 4. Luxury Specs Matrix */}
      <motion.section {...sectionMotion} className="rounded-[36px] bg-gradient-to-r from-[#121218] via-[#0E0E14] to-[#121218] border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <Cpu className="w-6 h-6 text-[#D2F827]" />
            <h4 className="font-syne font-black text-white text-base">Planar Acoustic Radar</h4>
            <p className="text-xs text-[#8E8E98]">Ultra-low 15ms wireless latency with custom 50mm planar diaphragm.</p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <Layers className="w-6 h-6 text-[#D2F827]" />
            <h4 className="font-syne font-black text-white text-base">Grade-5 Titanium</h4>
            <p className="text-xs text-[#8E8E98]">Aerospace-spec CNC milled bezel casing with scratch-proof sapphire crystal.</p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <ShieldCheck className="w-6 h-6 text-[#D2F827]" />
            <h4 className="font-syne font-black text-white text-base">Voltix Care Warranty</h4>
            <p className="text-xs text-[#8E8E98]">Official 2-year no-questions express hardware replacement guarantee.</p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <Zap className="w-6 h-6 text-[#D2F827]" />
            <h4 className="font-syne font-black text-white text-base">Priority Logistics</h4>
            <p className="text-xs text-[#8E8E98]">Tracked courier dispatch with 30-day trial refund guarantee.</p>
          </div>
        </div>
      </motion.section>

      {/* 5. VIP Voucher Banner */}
      <motion.div {...sectionMotion}>
        <PromoBanner onClaimOffer={onClaimOffer} />
      </motion.div>

    </div>
  );
});