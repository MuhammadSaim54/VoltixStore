import React, { memo } from 'react';
import { Home, Compass, Bookmark, ShoppingBag } from 'lucide-react';

export default memo(function MobileBottomNav({ activeTab, onTabChange, cartCount = 2 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
  ];

  return (
    <nav className="sm:hidden fixed bottom-3 left-4 right-4 z-40">
      <div className="bg-[#101015]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl px-3 py-2 flex items-center justify-around shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors cursor-pointer ${
                isActive ? 'text-[#D2F827]' : 'text-[#71717A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#D2F827] text-[#09090B] font-black text-[9px] flex items-center justify-center font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold font-mono tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});