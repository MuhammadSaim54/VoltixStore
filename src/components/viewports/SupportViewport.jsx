import React, { memo } from 'react';

export default memo(function SupportViewport() {
  return (
    <section className="p-8 sm:p-14 rounded-[36px] bg-[#121217] border border-white/[0.08] space-y-4 max-w-2xl mx-auto shadow-2xl text-center">
      <span className="text-xs font-mono font-bold uppercase text-[#D2F827]">
        CONCIERGE // 24/7 SUPPORT
      </span>
      <h2 className="font-syne text-2xl sm:text-4xl font-black text-white">
        Studio Client Assistance
      </h2>
      <p className="text-xs sm:text-sm text-[#8E8E98] leading-relaxed">
        All Voltix hardware drops include 2-year express replacement warranty and worldwide insured logistics.
      </p>
      <div className="pt-2">
        <button 
          type="button"
          onClick={() => alert('Priority support ticket raised!')}
          className="px-6 py-3.5 rounded-2xl bg-[#D2F827] text-[#09090B] font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(210,248,39,0.35)]"
        >
          Open Priority Ticket
        </button>
      </div>
    </section>
  );
});