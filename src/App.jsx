import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

import LandingPage from './components/LandingPage';
import CyberIllustrations from './components/CyberIllustrations';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import QuickViewModal from './components/QuickViewModal';
import WishlistDrawer from './components/WishlistDrawer';
import CartDrawer from './components/CartDrawer';

import HomeViewport from './components/viewports/HomeViewport';
import ProductsViewport from './components/viewports/ProductsViewport';
import AboutViewport from './components/viewports/AboutViewport';
import SupportViewport from './components/viewports/SupportViewport';

import { PRODUCTS } from './data/products';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeViewport, setActiveViewport] = useState('HOME');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart & Wishlist & Promo State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewData, setQuickViewData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [showLanding, activeViewport]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cart]);

  const handleAddToCart = useCallback((product, variant, qty = 1) => {
    const activeVar = variant || product.variants?.[0];
    
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedVariant?.name === activeVar.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: (next[existingIndex].quantity || 1) + qty
        };
        return next;
      }

      return [
        ...prev,
        {
          ...product,
          selectedVariant: activeVar,
          quantity: qty,
          cartId: Date.now() + Math.random()
        }
      ];
    });

    setToastMessage(`⚡ Added ${qty > 1 ? `${qty}x ` : ''}"${product.name}" to cart!`);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleUpdateCartQuantity = useCallback((cartId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQty } : item
        )
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    setToastMessage('🗑️ Item removed from cart');
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleToggleWishlist = useCallback((product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        setToastMessage(`🤍 "${product.name}" removed from wishlist`);
      } else {
        next.add(product.id);
        setToastMessage(`⚡ "${product.name}" saved to wishlist!`);
      }
      setTimeout(() => setToastMessage(null), 3000);
      return next;
    });
  }, []);

  // Promo card claim triggers coupon inside cart automatically
  const handleClaimOffer = () => {
    setAppliedCoupon('VOLT40');
    setIsCartOpen(true);
    setToastMessage('🎉 VOLT40 applied! 40% discount activated in cart.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (showLanding) {
    return <LandingPage onEnterStore={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans selection:bg-[#D2F827]/30 selection:text-[#D2F827] pb-28 sm:pb-16 relative overflow-x-hidden pt-20">
      
      <CyberIllustrations />

      {/* Rock-Solid Fixed Navbar */}
      <Navbar
        activeTab={activeViewport}
        onTabChange={setActiveViewport}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 xl:px-8 py-4 sm:py-8 space-y-10 sm:space-y-14 relative z-10">
        {activeViewport === 'HOME' && (
          <HomeViewport
            products={PRODUCTS}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveViewport('PRODUCTS');
            }}
            onNavigateToProducts={() => {
              setSelectedCategory('All');
              setActiveViewport('PRODUCTS');
            }}
            onAddToCart={handleAddToCart}
            onQuickView={(p, idx) => setQuickViewData({ product: p, variantIndex: idx })}
            onClaimOffer={handleClaimOffer}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeViewport === 'PRODUCTS' && (
          <ProductsViewport
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p, idx) => setQuickViewData({ product: p, variantIndex: idx })}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeViewport === 'ABOUT' && <AboutViewport />}
        {activeViewport === 'SUPPORT' && <SupportViewport />}
      </main>

      <MobileBottomNav
        activeTab={activeViewport}
        onTabChange={setActiveViewport}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Spacious Studio Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onCheckout={() => alert('Proceeding to 256-Bit Encrypted Checkout Gateway!')}
      />

      {/* Responsive PDP QuickView Modal */}
      <QuickViewModal
        product={quickViewData?.product}
        initialVariantIndex={quickViewData?.variantIndex}
        isWishlisted={quickViewData?.product ? wishlistIds.has(quickViewData.product.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setQuickViewData(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-[110] bg-[#0E0E14]/95 backdrop-blur-2xl border border-[#D2F827]/60 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-3.5 rounded-2xl flex items-center gap-3 text-white max-w-sm"
          >
            <div className="w-7 h-7 rounded-xl bg-[#D2F827] text-[#050507] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <p className="text-xs font-mono font-medium text-white leading-snug">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}