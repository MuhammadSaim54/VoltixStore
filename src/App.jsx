import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PopularCategories from './components/PopularCategories';
import PromoBanner from './components/PromoBanner';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);

  const handleClaimOffer = () => {
    navigator.clipboard?.writeText('VOLT40');
    setToastMessage('🎉 Code VOLT40 Copied! 40% discount applied to checkout.');
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleExplore = () => {
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans selection:bg-[#D2F827]/30 selection:text-[#D2F827] pb-32 sm:pb-16 relative">
      
      {/* 1. Global Minimalist Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => alert('Cart drawer opens in Phase 5!')}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 app-container px-4 sm:px-8 xl:px-12 py-6 sm:py-10 space-y-10 sm:space-y-14">
        
        {/* Hero Section: Editorial Headline + Features + Floating Search Deck */}
        <HeroBanner 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExplore={handleExplore}
        />

        {/* 2. Explore Popular Categories (Pill Windows Layout from image_88ebb7.png) */}
        <PopularCategories 
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 3. VIP Promo Voucher Card (With colorful confetti sprinkles) */}
        <PromoBanner onClaimOffer={handleClaimOffer} />

      </main>

      {/* Floating Mobile Bottom 4-Tab Dock */}
      <MobileBottomNav
        activeTab={activeMobileTab}
        onTabChange={setActiveMobileTab}
        cartCount={cartCount}
      />

      {/* Animated Luxury Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#16161D]/95 backdrop-blur-2xl border border-[#D2F827]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 rounded-2xl flex items-center gap-3 text-white max-w-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-[#D2F827] text-[#09090B] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Check className="w-4 h-4 stroke-[3]" />
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