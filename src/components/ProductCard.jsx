import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import SafeImage from './SafeImage';

export default memo(function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  isWishlisted = false,
  onToggleWishlist,
  isFloating = false, 
  floatDelay = 0 
}) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay: floatDelay * 0.15, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      animate={
        isFloating && !isHovered
          ? {
              y: [-6, 8, -6],
              rotate: [-0.5, 0.5, -0.5],
              transition: {
                repeat: Infinity,
                duration: 5.5 + floatDelay,
                ease: 'easeInOut'
              }
            }
          : {
              y: isHovered ? -10 : 0,
              rotate: 0,
              scale: isHovered ? 1.02 : 1,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
            }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-[28px] bg-gradient-to-b from-[#0D0D12] via-[#09090D] to-[#050507] border border-white/[0.06] hover:border-[#D2F827]/60 p-3.5 sm:p-5 flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.95)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.99),0_0_25px_rgba(210,248,39,0.14)] transition-all duration-500 w-full will-change-transform"
    >
      <div>
        {/* Clickable Image Box with Safe Image Loader */}
        <div 
          onClick={() => onQuickView(product, selectedVariantIndex)}
          className="relative aspect-square w-full rounded-2xl bg-[#040406] overflow-hidden flex items-center justify-center p-3 border border-white/[0.04] cursor-pointer"
        >
          <div 
            className="absolute inset-4 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: activeVariant?.color || '#D2F827' }}
          />

          {product.tag && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-lg bg-[#08080C]/95 backdrop-blur-md border border-[#D2F827]/30 text-[9px] font-mono font-bold uppercase tracking-wider text-[#D2F827]">
              {product.tag}
            </span>
          )}

          {/* Interactive Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.75 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-xl backdrop-blur-md border transition-all flex items-center justify-center cursor-pointer ${
              isWishlisted 
                ? 'bg-[#D2F827]/15 border-[#D2F827]/60 shadow-[0_0_15px_rgba(210,248,39,0.3)]' 
                : 'bg-[#08080C]/95 border-white/[0.08] hover:border-[#D2F827]/50 text-[#71717A]'
            }`}
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-colors ${
                isWishlisted ? 'fill-[#D2F827] text-[#D2F827]' : 'text-[#71717A] hover:text-white'
              }`} 
            />
          </motion.button>

          {/* Quick View Button for Desktop */}
          <div className="absolute inset-x-6 bottom-3 z-10 py-2 rounded-xl bg-[#0A0A0E]/95 backdrop-blur-md border border-white/[0.12] text-[11px] font-mono font-bold text-white hidden sm:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </div>

          <SafeImage 
            key={activeVariant?.image}
            src={activeVariant?.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105" 
          />
        </div>

        {/* Content Details */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {product.variants?.map((v, idx) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setSelectedVariantIndex(idx)}
                  title={v.name}
                  className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                    selectedVariantIndex === idx 
                      ? 'scale-125 ring-2 ring-[#D2F827] ring-offset-2 ring-offset-[#08080C]' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
            <span className="text-[9.5px] font-mono text-[#71717A] truncate max-w-[100px]">
              {activeVariant?.name}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 pt-0.5">
            <h3 
              onClick={() => onQuickView(product, selectedVariantIndex)}
              className="font-syne font-black text-xs sm:text-sm text-white truncate flex-1 hover:text-[#D2F827] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#D2F827] flex-shrink-0">
              <Star className="w-3 h-3 fill-[#D2F827]" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-[11px] text-[#71717A] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Add Action */}
      <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-2">
        <div>
          <span className="text-[8.5px] font-mono uppercase text-[#52525B] block">PRICE</span>
          <span className="text-sm sm:text-base font-black font-mono text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onAddToCart(product, activeVariant)}
          className="px-3.5 py-2 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(210,248,39,0.3)] transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add</span>
        </motion.button>
      </div>
    </motion.div>
  );
});