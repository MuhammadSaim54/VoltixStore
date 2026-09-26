import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { NAV_CATEGORIES } from '../data/categories';

export default memo(function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2.5 pill-scroll-container">
        {NAV_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#D2F827] text-[#09090B] font-extrabold shadow-[0_0_20px_rgba(210,248,39,0.45)]'
                  : 'bg-[#141417] text-[#71717A] border border-white/[0.06] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});