import React, { memo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Rows, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';

export default memo(function ProductsViewport({ 
  products, 
  onAddToCart, 
  onQuickView,
  wishlistIds = new Set(),
  onToggleWishlist 
}) {
  const [viewMode, setViewMode] = useState('grid');
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-6 pt-2 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.07] pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#D2F827]">
            FULL ARCHIVE // INTERACTIVE VAULT
          </span>
          <h2 className="font-syne text-xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Complete Catalog
          </h2>
          <p className="text-[11px] font-mono text-[#8E8E98] mt-0.5">
            Tap cards to view specs & select finishes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono text-[#71717A] hidden sm:inline mr-2">
            {products.length} ITEMS ACTIVE
          </span>

          <div className="flex items-center gap-1 p-1 bg-[#141419] rounded-2xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#D2F827] text-[#09090B]' : 'text-[#8E8E98]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'carousel' ? 'bg-[#D2F827] text-[#09090B]' : 'text-[#8E8E98]'
              }`}
              title="Slider View"
            >
              <Rows className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {products.map((prod, index) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.has(prod.id)}
              onToggleWishlist={onToggleWishlist}
              isFloating={true}
              floatDelay={index * 0.4}
            />
          ))}
        </div>
      ) : (
        /* Relative Wrapper with Premium Side-Mounted Floating Arrows */
        <div className="relative group/slider w-full">
          
          {/* Left Floating Neon Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => scrollCarousel('left')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-[#0E0E14]/95 border border-[#D2F827]/40 text-white hover:text-[#D2F827] hover:border-[#D2F827] shadow-[0_10px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all"
            title="Slide Left"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </motion.button>

          {/* Right Floating Neon Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => scrollCarousel('right')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-[#0E0E14]/95 border border-[#D2F827]/40 text-white hover:text-[#D2F827] hover:border-[#D2F827] shadow-[0_10px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all"
            title="Slide Right"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </motion.button>

          {/* Smooth Carousel Track */}
          <div 
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((prod, index) => (
              <div key={prod.id} className="min-w-[260px] sm:min-w-[300px] max-w-[300px] snap-center flex-shrink-0">
                <ProductCard
                  product={prod}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isWishlisted={wishlistIds.has(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                  isFloating={true}
                  floatDelay={index * 0.4}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});