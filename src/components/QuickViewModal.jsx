import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  Plus, 
  Minus, 
  Cpu, 
  Layers, 
  Box 
} from 'lucide-react';

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
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSpecTab, setActiveSpecTab] = useState('acoustic');

  useEffect(() => {
    setSelectedVariantIndex(initialVariantIndex);
    setSelectedGalleryIndex(0);
    setQuantity(1);
    setActiveSpecTab('acoustic');
  }, [product, initialVariantIndex]);

  const activeVariant = product.variants?.[selectedVariantIndex] || {
    color: '#18181B',
    name: 'Standard',
    image: product.gallery?.[0]
  };

  const displayImage = product.gallery?.[selectedGalleryIndex] || activeVariant.image;
  const totalPrice = product.price * quantity;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        
        {/* Backdrop Dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[32px] sm:rounded-[36px] bg-[#09090D] border border-white/[0.12] p-4 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.99)] overflow-y-auto my-auto z-10"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08] flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#D2F827] px-2.5 py-1 rounded-lg bg-[#D2F827]/10 border border-[#D2F827]/30">
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
                    ? 'bg-[#D2F827]/15 border-[#D2F827]/60 text-[#D2F827]' 
                    : 'bg-white/[0.05] border-white/[0.08] text-[#8E8E98] hover:text-white'
                }`}
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl bg-[#040406] overflow-hidden flex items-center justify-center p-4 border border-white/[0.08]">
                <div 
                  className="absolute inset-6 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: activeVariant.color }}
                />

                {product.stock && (
                  <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-[#0E0E14]/90 backdrop-blur-md border border-[#D2F827]/30 text-[8.5px] font-mono text-[#D2F827] font-bold uppercase">
                    ONLY {product.stock} PIECES REMAINING
                  </span>
                )}

                <AnimatePresence mode="wait">
                  <motion.img 
                    key={displayImage}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.25 }}
                    src={displayImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain rounded-xl filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] z-10" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://pngimg.com/d/headphones_PNG101980.png';
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Multi-Angle Gallery Thumbnails (Fixed Inset Glow & No Cut) */}
              <div className="flex items-center gap-2.5 overflow-x-auto p-1 no-scrollbar">
                {product.gallery?.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedGalleryIndex(idx)}
                    className={`relative w-14 h-14 rounded-2xl bg-[#040406] p-1.5 transition-all flex-shrink-0 cursor-pointer ${
                      selectedGalleryIndex === idx 
                        ? 'ring-2 ring-inset ring-[#D2F827] shadow-[0_0_15px_rgba(210,248,39,0.35)] scale-105' 
                        : 'border border-white/[0.08] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="Angle Preview" 
                      className="w-full h-full object-contain rounded-lg" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://pngimg.com/d/headphones_PNG101980.png';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Spec & Buy Column */}
            <div className="lg:col-span-6 space-y-3.5">
              <div>
                <h2 className="font-syne text-lg sm:text-2xl font-black text-white leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-[#8E8E98] leading-relaxed mt-1.5">
                  {product.description}
                </p>
              </div>

              {/* Swatches */}
              <div className="space-y-1.5 pt-1 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase text-[#71717A] font-bold">FINISH:</span>
                  <span className="text-[#D2F827] font-bold">{activeVariant.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.variants?.map((v, idx) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        setSelectedGalleryIndex(0);
                      }}
                      title={v.name}
                      className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        selectedVariantIndex === idx 
                          ? 'scale-115 ring-2 ring-[#D2F827] ring-offset-2 ring-offset-[#09090D]' 
                          : 'opacity-65 hover:opacity-100'
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

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between py-1.5 border-y border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase text-[#71717A] font-bold">
                  QUANTITY
                </span>

                <div className="flex items-center gap-2.5 bg-[#111116] border border-white/[0.08] rounded-xl px-2 py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-[#8E8E98] hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="font-mono text-xs font-black text-white w-5 text-center">
                    {String(quantity).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                    className="p-1 text-[#8E8E98] hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Spec Tabs */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 bg-[#101015] p-1 rounded-xl border border-white/[0.06]">
                  {[
                    { id: 'acoustic', label: 'Matrix', icon: Cpu },
                    { id: 'materials', label: 'Material', icon: Layers },
                    { id: 'box', label: 'Box', icon: Box }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSpecTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSpecTab(tab.id)}
                        className={`flex-1 py-1 rounded-lg text-[9.5px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isActive
                            ? 'bg-[#1C1C24] text-[#D2F827] border border-[#D2F827]/30 shadow-sm'
                            : 'text-[#71717A] hover:text-white'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-xl bg-[#050507] border border-white/[0.04] text-[10.5px] font-mono text-[#8E8E98] min-h-[42px] flex items-center">
                  {activeSpecTab === 'acoustic' && (
                    <span>⚡ {product.specs?.acoustic || 'High-performance architecture'}</span>
                  )}
                  {activeSpecTab === 'materials' && (
                    <span>🛡️ {product.specs?.materials || 'Aerospace grade chassis'}</span>
                  )}
                  {activeSpecTab === 'box' && (
                    <span>📦 {product.specs?.boxContents || 'Official Voltix studio gear included'}</span>
                  )}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-2 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[9px] font-mono uppercase text-[#71717A]">TOTAL VALUE</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      onAddToCart(product, activeVariant, quantity);
                      onClose();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#050507] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(210,248,39,0.35)]"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>Add {quantity > 1 ? `(${quantity})` : ''} To Cart</span>
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, activeVariant, quantity);
                      onClose();
                    }}
                    className="px-5 py-3 rounded-xl bg-[#14141E] hover:bg-[#1E1E2A] text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/[0.1] transition-colors cursor-pointer"
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