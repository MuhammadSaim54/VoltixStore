import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Heart } from 'lucide-react';

export default memo(function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlistProducts = [], 
  onAddToCart, 
  onRemoveFromWishlist 
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
        
        {/* Backdrop Click Close */}
        <div className="flex-1" onClick={onClose} />

        {/* Slide-over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-[#09090D] border-l border-white/[0.1] h-full flex flex-col justify-between p-6 shadow-2xl relative z-10"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-[#D2F827] text-[#D2F827]" />
                <h3 className="font-syne font-black text-lg text-white">
                  SAVED VAULT ({wishlistProducts.length})
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#8E8E98] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="mt-5 space-y-3 overflow-y-auto max-h-[68vh] pr-1">
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Heart className="w-12 h-12 text-[#3F3F46] mx-auto stroke-[1]" />
                  <p className="text-xs font-mono text-[#71717A]">
                    YOUR WISHLIST IS EMPTY
                  </p>
                </div>
              ) : (
                wishlistProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-[#111116] border border-white/[0.06] flex items-center justify-between gap-3"
                  >
                    <img 
                      src={prod.variants?.[0]?.image || prod.image} 
                      alt={prod.name} 
                      className="w-14 h-14 object-cover rounded-xl bg-[#050507]"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-syne font-bold text-xs text-white truncate">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#D2F827] block mt-0.5">
                        ${prod.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => onAddToCart(prod, prod.variants?.[0])}
                        className="p-2 rounded-xl bg-[#D2F827] text-[#050507] font-bold cursor-pointer"
                        title="Add To Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(prod)}
                        className="p-2 rounded-xl bg-white/[0.05] text-[#71717A] hover:text-red-400 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Close */}
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              CONTINUE BROWSING
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
});