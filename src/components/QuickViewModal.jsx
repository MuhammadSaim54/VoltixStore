import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check } from 'lucide-react';

export default memo(function QuickViewModal({ 
  product, 
  initialVariantIndex = 0, 
  onClose, 
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist 
}) {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(initialVariantIndex);

  useEffect(() => {
    setSelectedVariantIndex(initialVariantIndex);
  }, [initialVariantIndex]);

  const activeVariant = product.variants?.[selectedVariantIndex] || {
    color: '#18181B',
    name: 'Standard',
    image: product.image
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-2xl rounded-[32px] bg-[#0A0A0E] border border-white/[0.12] p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.98)] overflow-hidden my-auto"
        >
          {/* Top Bar Header with Separated Rating & Action Buttons */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#D2F827] px-2.5 py-1 rounded-lg bg-[#D2F827]/10 border border-[#D2F827]/25">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-[#D2F827]">
                <Star className="w-3.5 h-3.5 fill-[#D2F827]" />
                <span>{product.rating}</span>
                <span className="text-[#71717A]">({product.reviewsCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted 
                    ? 'bg-[#D2F827]/15 border-[#D2F827]/50 text-[#D2F827]' 
                    : 'bg-white/[0.05] border-white/[0.08] text-[#8E8E98] hover:text-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D2F827]' : ''}`} />
              </motion.button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#8E8E98] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-center">
            
            <div className="relative aspect-square w-full rounded-2xl bg-[#040406] overflow-hidden flex items-center justify-center p-4 border border-white/[0.08]">
              <div 
                className="absolute inset-4 rounded-full blur-3xl opacity-25 transition-colors duration-500"
                style={{ backgroundColor: activeVariant.color }}
              />

              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeVariant.image}
                  initial={{ opacity: 0.5, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.25 }}
                  src={activeVariant.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] z-10" 
                />
              </AnimatePresence>
            </div>

            <div className="space-y-3.5">
              <h2 className="font-syne text-lg sm:text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#8E8E98] leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="uppercase text-[#71717A] font-bold">VARIANT:</span>
                  <span className="text-white font-bold">{activeVariant.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.variants?.map((v, idx) => (
                    <button
                      key={v.color}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        selectedVariantIndex === idx 
                          ? 'scale-110 ring-2 ring-[#D2F827] ring-offset-2 ring-offset-[#0A0A0E]' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: v.color }}
                    >
                      {selectedVariantIndex === idx && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#71717A]">TOTAL VALUE</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      onAddToCart(product, activeVariant);
                      onClose();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(210,248,39,0.35)]"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>Add To Cart</span>
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, activeVariant);
                      onClose();
                    }}
                    className="px-4 py-3 rounded-xl bg-[#14141E] hover:bg-[#1E1E2A] text-white font-bold text-xs border border-white/[0.1] transition-colors cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});