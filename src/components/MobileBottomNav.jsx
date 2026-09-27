import React, { memo } from 'react';
import { Home, Layers, Info, Headphones } from 'lucide-react';

export default memo(function MobileBottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'PRODUCTS', label: 'Products', icon: Layers },
    { id: 'ABOUT', label: 'About', icon: Info },
    { id: 'SUPPORT', label: 'Support', icon: Headphones },
  ];

  return (
    <nav className="sm:hidden fixed bottom-3 left-4 right-4 z-40">
      <div className="bg-[#070709]/95 backdrop-blur-2xl border border-white/[0.08] rounded-3xl px-3 py-2 flex items-center justify-around shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all cursor-pointer ${
                isActive ? 'text-[#D2F827]' : 'text-[#71717A] hover:text-[#A1A1AA]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] font-bold font-mono tracking-tight uppercase">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});