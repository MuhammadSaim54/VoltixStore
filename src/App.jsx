import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

import LandingPage from './components/LandingPage';
import CyberIllustrations from './components/CyberIllustrations';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import QuickViewModal from './components/QuickViewModal';
import WishlistDrawer from './components/WishlistDrawer';

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
  const [cart, setCart] = useState([]);
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

  // Wishlist products array
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  const handleAddToCart = useCallback((product, variant) => {
    const activeVar = variant || product.variants?.[0];
    setCart((prev) => [...prev, { ...product, selectedVariant: activeVar, cartId: Date.now() }]);
    setToastMessage(`⚡ "${product.name}" added to cart!`);
    setTimeout(() => setToastMessage(null), 3500);
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

  const handleClaimOffer = () => {
    navigator.clipboard?.writeText('VOLT40');
    setToastMessage('🎉 Code VOLT40 Copied! 40% discount applied to checkout.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (showLanding) {
    return <LandingPage onEnterStore={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans selection:bg-[#D2F827]/30 selection:text-[#D2F827] pb-28 sm:pb-16 relative overflow-x-hidden">
      
      <CyberIllustrations />

      {/* Global Navbar */}
      <Navbar
        activeTab={activeViewport}
        onTabChange={setActiveViewport}
        onOpenLanding={() => setShowLanding(true)}
        cartCount={cart.length}
        onOpenCart={() => alert(`Cart items: ${cart.length}. Cart Drawer opens in Phase 4!`)}
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

      {/* Mobile Bottom Nav */}
      <MobileBottomNav
        activeTab={activeViewport}
        onTabChange={setActiveViewport}
      />

      {/* Dedicated Wishlist Drawer Viewer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewData?.product}
        initialVariantIndex={quickViewData?.variantIndex}
        isWishlisted={quickViewData?.product ? wishlistIds.has(quickViewData.product.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setQuickViewData(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#0E0E14]/95 backdrop-blur-2xl border border-[#D2F827]/60 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-3.5 rounded-2xl flex items-center gap-3 text-white max-w-sm"
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