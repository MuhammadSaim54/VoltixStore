import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  CreditCard, 
  Wallet, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default memo(function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  subtotal = 0, 
  discountAmount = 0, 
  shipping = 0, 
  grandTotal = 0,
  onOrderComplete 
}) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full legal name required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid operational email required';
    if (!formData.address.trim()) errors.address = 'Physical delivery address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 12) errors.cardNumber = 'Valid 16-digit card required';
      if (!formData.cardExpiry.trim()) errors.cardExpiry = 'MM/YY required';
      if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) errors.cardCvc = 'CVC required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onOrderComplete({
          orderId: `VTX-${Math.floor(100000 + Math.random() * 900000)}`,
          customer: formData,
          items: cartItems,
          total: grandTotal,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
      }, 1600);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        
        {/* Backdrop Dismiss */}
        <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[28px] sm:rounded-[36px] bg-[#08080C] border border-white/[0.1] shadow-[0_30px_100px_rgba(0,0,0,0.99)] overflow-hidden my-auto z-10"
        >
          {/* Header */}
          <div className="px-5 sm:px-8 py-4 border-b border-white/[0.07] bg-[#0A0A10] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D2F827] text-[#050507] flex items-center justify-center font-black">
                <Lock className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-syne font-black text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                  <span>ENCRYPTED CHECKOUT</span>
                  <span className="text-[9px] font-mono text-[#D2F827] px-2 py-0.5 rounded bg-[#D2F827]/10 border border-[#D2F827]/30">
                    256-BIT SSL
                  </span>
                </h3>
                <span className="text-[10px] font-mono text-[#71717A] block">
                  STAGE {step} OF 2 // {step === 1 ? 'TACTICAL DISPATCH DETAILS' : 'PAYMENT MATRIX'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#8E8E98] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="w-full bg-[#12121A] h-1 flex-shrink-0">
            <motion.div
              animate={{ width: step === 1 ? '50%' : '100%' }}
              className="h-full bg-[#D2F827] shadow-[0_0_10px_#D2F827]"
            />
          </div>

          {/* Main Grid */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start no-scrollbar">
            
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-5">
              {step === 1 ? (
                <form onSubmit={handleNext} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D2F827] uppercase tracking-wider block">STEP 01</span>
                    <h4 className="font-syne font-black text-lg text-white">Shipping & Tactical Dispatch</h4>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Full Legal Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Johnathan Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                      />
                      {formErrors.fullName && <p className="text-[10px] text-red-400 mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Encrypted Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@operative-network.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                      />
                      {formErrors.email && <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Cyber Suite 404, Sector 7G"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                      />
                      {formErrors.address && <p className="text-[10px] text-red-400 mt-1">{formErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-[#71717A] mb-1 block">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Neo Tokyo"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                        />
                        {formErrors.city && <p className="text-[10px] text-red-400 mt-1">{formErrors.city}</p>}
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="90210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                        />
                        {formErrors.postalCode && <p className="text-[10px] text-red-400 mt-1">{formErrors.postalCode}</p>}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#040407] font-syne font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(210,248,39,0.35)] mt-4"
                  >
                    <span>Proceed To Payment Matrix</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D2F827] uppercase tracking-wider block">STEP 02</span>
                    <h4 className="font-syne font-black text-lg text-white">Payment Method & Authorization</h4>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'crypto', label: 'Web3 Wallet', icon: Wallet },
                      { id: 'cod', label: 'Vault COD', icon: ShieldCheck }
                    ].map((m) => {
                      const Icon = m.icon;
                      const isActive = paymentMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#151522] border-[#D2F827] text-[#D2F827] shadow-[0_0_15px_rgba(210,248,39,0.2)]'
                              : 'bg-[#0E0E15] border-white/[0.06] text-[#71717A] hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[10px] font-mono font-bold">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 font-mono text-xs pt-2">
                      <div>
                        <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="4532 •••• •••• 8891"
                          maxLength={19}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                        />
                        {formErrors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Expiry</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                          />
                          {formErrors.cardExpiry && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardExpiry}</p>}
                        </div>

                        <div>
                          <label className="text-[10px] uppercase text-[#71717A] mb-1 block">Security CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111118] border border-white/[0.08] text-white placeholder-[#52525B] outline-none focus:border-[#D2F827]/70"
                          />
                          {formErrors.cardCvc && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardCvc}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="p-4 rounded-xl bg-[#111118] border border-white/[0.08] text-xs font-mono space-y-2 text-[#A1A1AA]">
                      <p className="text-white font-bold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#D2F827]" />
                        USDT / SOL Decentralized Settlement
                      </p>
                      <p className="text-[11px] text-[#71717A]">
                        Order will be authorized upon 1 network confirmation.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 rounded-xl bg-[#111118] border border-white/[0.08] text-xs font-mono space-y-2 text-[#A1A1AA]">
                      <p className="text-white font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D2F827]" />
                        Vault Cash on Delivery
                      </p>
                      <p className="text-[11px] text-[#71717A]">
                        Authenticate parcel physical seal upon priority courier delivery.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                    >
                      Back
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-3.5 rounded-xl bg-[#D2F827] hover:bg-[#c2e822] text-[#040407] font-syne font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(210,248,39,0.35)] disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>CRYPTOGRAPHIC PROCESSING...</span>
                      ) : (
                        <>
                          <span>AUTHORIZE ${grandTotal.toFixed(2)}</span>
                          <Lock className="w-3.5 h-3.5 stroke-[3]" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Review Column */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#0C0C12] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Order Telemetry ({cartItems.length})
                </h4>
                <span className="text-[10px] font-mono text-[#D2F827]">PRIORITY DISPATCH</span>
              </div>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-48 overflow-y-auto no-scrollbar pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center gap-3 text-xs font-mono">
                    <div className="w-10 h-10 rounded-lg bg-[#040406] p-1 flex items-center justify-center flex-shrink-0 border border-white/[0.04]">
                      <img 
                        src={item.selectedVariant?.image || item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate text-[11px]">{item.name}</p>
                      <p className="text-[10px] text-[#71717A]">{item.quantity}x • {item.selectedVariant?.name || 'Standard'}</p>
                    </div>
                    <span className="text-[#D2F827] font-bold text-xs flex-shrink-0">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-mono border-t border-white/[0.06] pt-3 text-[#8E8E98]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D2F827]">
                    <span>VIP Voucher (40%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Logistics</span>
                  <span className="text-white">{shipping === 0 ? 'FREE EXPRESS' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/[0.06]">
                  <span>Total Due</span>
                  <span className="text-[#D2F827]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[10px] font-mono text-[#71717A] space-y-1">
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-[#D2F827]" />
                  Global Express Courier
                </p>
                <p>Dispatched in custom anti-static vault enclosure with signature authentication.</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});