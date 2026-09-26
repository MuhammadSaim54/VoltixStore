import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    id: 'Wearables',
    title: 'Precision Chrono',
    tag: 'TITANIUM HUD',
    count: '28 Drops',
    accent: '#D2F827',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Audio',
    title: 'Studio Acoustics',
    tag: 'PLANAR ANC',
    count: '19 Drops',
    accent: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Sneakers',
    title: 'Tactical Kicks',
    tag: 'ENERGY FOAM',
    count: '34 Drops',
    accent: '#F43F5E',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'EDC',
    title: 'Weatherproof EDC',
    tag: 'BALLISTIC PACKS',
    count: '16 Drops',
    accent: '#A855F7',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
  }
];

export default memo(function PopularCategories({ onSelectCategory }) {
  return (
    <section className="space-y-6 sm:space-y-8">
      
      {/* Header with Dual Tone Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.07] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D2F827]/10 border border-[#D2F827]/30 text-[#D2F827] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>DISCOVERY PROTOCOL // LEVEL 01</span>
          </div>
          <h2 className="font-syne text-2xl sm:text-4xl font-black text-white tracking-tight">
            Explore Popular Categories
          </h2>
        </div>
        <p className="text-xs font-mono text-[#71717A] tracking-wider uppercase">
          CURATED VAULT // 97 SIGNATURE PIECES
        </p>
      </div>

      {/* Grid: Capsule Window Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORY_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.01 }}
            onClick={() => onSelectCategory(item.id)}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#16161D] via-[#111116] to-[#0A0A0D] border border-white/[0.08] hover:border-[#D2F827]/60 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group cursor-pointer transition-all duration-300"
          >
            {/* Hover Background Radial Glow */}
            <div 
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: item.accent }}
            />

            <div className="flex items-center justify-between gap-4 relative z-10">
              
              {/* Category Details */}
              <div className="space-y-3 min-w-0 flex-1">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[9.5px] font-mono font-bold text-[#A1A1AA] tracking-wider uppercase">
                  {item.tag}
                </span>

                <div>
                  <h3 className="font-syne font-black text-base sm:text-lg text-white group-hover:text-[#D2F827] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-[#71717A] block mt-1">
                    {item.count}
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#D2F827] transition-colors">
                  <span>ENTER VAULT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Capsule Curved Picture Window (image_88ebb7.png Reference) */}
              <div className="relative w-20 sm:w-24 h-32 sm:h-36 rounded-[28px] overflow-hidden border border-white/[0.12] flex-shrink-0 group-hover:scale-105 group-hover:border-[#D2F827]/70 transition-all duration-500 shadow-xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-0 flex justify-center">
                  <span className="w-6 h-1 rounded-full bg-white/40 group-hover:bg-[#D2F827] transition-colors" />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
});