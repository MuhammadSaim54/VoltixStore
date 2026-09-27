import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  ArrowRight, 
  Tag 
} from 'lucide-react';

export default memo(function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout,
  appliedCoupon = '',
  onApplyCoupon
}) {
  const [promoInput, setPromoInput] = useState(appliedCoupon);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (appliedCoupon) {
      setPromoInput(appliedCoupon);
    }
  }, [appliedCoupon]);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const isDiscountActive = appliedCoupon === 'VOLT40';
  const discountAmount = isDiscountActive ? subtotal * 0.4 : 0;
  const freeShippingThreshold = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 15.0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'VOLT40') {
      onApplyCoupon('VOLT40');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try VOLT40');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex justify-end bg-black/80 backdrop-blur-sm">
        
        {/* Backdrop Dismiss */}
        <div className="flex-1 cursor-pointer" onClick={onClose} />

        {/* Minimal Luxury Cart Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-[440px] bg-[#0A0A0D] border-l border-white/[0.08] h-full flex flex-col justify-between shadow-2xl relative z-10 select-none"
        >
          {/* 1. Header (Clean English) */}
          <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/[0.06] flex-shrink-0">
            <h2 className="font-syne font-bold text-xl text-white tracking-tight">
              Shopping Cart
              {cartItems.length > 0 && (
                <span className="text-xs font-mono text-[#71717A] font-normal ml-2">
                  ({cartItems.length})
                </span>
              )}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#71717A] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* 2. Free Delivery Banner */}
          <div className="px-6 pt-4 flex-shrink-0">
            <div className="py-2.5 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center gap-2 text-xs font-mono text-[#A1A1AA]">
              <Truck className="w-4 h-4 text-[#D2F827]" />
              {isFreeShipping ? (
                <span className="text-[#D2F827] font-semibold">Free Express Shipping Unlocked!</span>
              ) : (
                <span>
                  Add <strong className="text-white">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong className="text-[#D2F827]">Free Shipping</strong>
                </span>
              )}
            </div>
          </div>

          {/* 3. Product Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-3 divide-y divide-white/[0.06] no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="text-center py-32 space-y-3">
                <p className="text-sm font-mono text-[#71717A]">Your cart is empty</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-mono text-[#D2F827] hover:underline cursor-pointer"
                >
                  Continue Shopping →
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId || `${item.id}-${item.selectedVariant?.name}`}
                  className="py-5 flex gap-4 items-center group"
                >
                  {/* Image Square Container */}
                  <div className="w-[72px] h-[72px] rounded-xl bg-[#050508] p-2 flex items-center justify-center flex-shrink-0 border border-white/[0.05]">
                    <img 
                      src={item.selectedVariant?.image || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain filter drop-shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://pngimg.com/d/headphones_PNG101980.png';
                      }}
                    />
                  </div>

                  {/* Info + Stepper + Price Grid */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-[72px]">
                    
                    {/* Top Row: Title + Trash Icon */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm text-white truncate leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#71717A] mt-0.5 block truncate">
                          {item.selectedVariant?.name || 'Standard'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-[#52525B] hover:text-red-400 transition-colors p-0.5 cursor-pointer flex-shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Row: Stepper Left, Price Right */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="inline-flex items-center border border-white/[0.12] rounded-md bg-[#050508]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartId, (item.quantity || 1) - 1)}
                          className="px-2 py-0.5 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-white min-w-[20px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartId, (item.quantity || 1) + 1)}
                          className="px-2 py-0.5 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer Breakdown & Action */}
          {cartItems.length > 0 && (
            <div className="px-6 py-5 border-t border-white/[0.08] bg-[#07070A] space-y-3.5 flex-shrink-0">
              
              {/* Minimal Coupon Toggle */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowPromoInput(!showPromoInput)}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#A1A1AA] hover:text-[#D2F827] transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3" />
                  <span>{isDiscountActive ? 'Discount Applied (VOLT40)' : 'Add Coupon Code +'}</span>
                </button>

                {showPromoInput && (
                  <form onSubmit={handleApplyPromo} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="VOLT40"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#111116] border border-white/[0.1] text-xs font-mono text-white uppercase placeholder-[#52525B] outline-none focus:border-[#D2F827]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-[#D2F827] hover:text-black text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[10px] font-mono text-red-400">{promoError}</p>
                )}
              </div>

              {/* Price Rows */}
              <div className="space-y-1.5 text-xs text-[#A1A1AA] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                </div>

                {isDiscountActive && (
                  <div className="flex justify-between text-[#D2F827]">
                    <span>Discount (40%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-mono">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.06]">
                  <span className="font-syne">Total</span>
                  <span className="font-mono text-lg text-[#D2F827]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Clean Checkout CTA Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#0A0A0D] font-syne font-black text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(210,248,39,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
});