"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const PricingCard = ({ plan, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 4);
  const isPersonal = plan.id === 'personal';

  // Personal Plan Wide Layout for Desktop
  if (isPersonal && !isMobile) {
    return (
      <div className={`relative bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
        plan.isPopular ? 'border-[#27A395] shadow-[0_32px_64px_-16px_rgba(30,51,71,0.1)]' : 'border-gray-100 shadow-xl'
      }`}>
        {plan.isPopular && (
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white text-[10px] font-black tracking-widest uppercase shadow-lg shadow-[#27A395]/20 z-20">
            MOST TRUSTED
          </div>
        )}
        
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-1.5 z-20">
          <div className="w-2 h-2 rounded-full bg-[#27A395] animate-pulse" />
          <span className="text-[10px] font-black text-[#27A395] uppercase tracking-widest">Recommended for You</span>
        </div>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] md:divide-x divide-[#27A395]/10">
          {/* Left Side: Info & Features */}
          <div className="px-8 pb-8 pt-32 md:p-12 flex flex-col">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[#27A395] text-[10px] font-black uppercase tracking-[0.2em]">{plan.target}</div>
                <span className="text-[12px] font-bold text-[#27A395] bg-[#27A395]/5 px-3 py-1.5 rounded-lg border border-[#27A395]/10 italic">
                  {plan.patients}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-[#1e3347] mb-3 leading-tight italic">
                {plan.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                {plan.subtext}
              </p>
            </div>

            <div className="flex-grow">
              <div className="space-y-4 mb-6">
                <AnimatePresence initial={false}>
                  {visibleFeatures.map((feature, fIdx) => (
                    <motion.div 
                      key={fIdx} 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#27A395]/10 flex items-center justify-center shrink-0 border border-[#27A395]/20">
                        <Check className="w-3.5 h-3.5 text-[#27A395]" strokeWidth={4} />
                      </div>
                      <span className="text-sm md:text-base font-bold text-gray-700">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {plan.features.length > 4 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1.5 text-[11px] font-black text-[#27A395] uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity"
                >
                  {isExpanded ? (
                    <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
                  ) : (
                    <><ChevronDown className="w-3.5 h-3.5" /> View More ({plan.features.length - 4} items)</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Pricing & CTA */}
          <div className="p-8 md:p-12 bg-[#27A395]/5 flex flex-col justify-center items-center text-center">
            <div className="mb-10">
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-7xl font-black text-[#1e3347] tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-xl text-gray-400 font-bold">
                  {plan.period}
                </span>
              </div>
            </div>

            <Link href="/personal-protection" className="w-full">
              <button className="w-full py-5 px-8 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white rounded-2xl font-black text-base tracking-wide hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#27A395]/30">
                {plan.buttonText}
              </button>
            </Link>
            <p className="text-[11px] text-gray-500 mt-5 font-bold flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27A395]" />
              Secure Your Health Today
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Layout (for Hospital plans and Mobile Personal plan)
  return (
    <div
      className={`relative bg-white rounded-[2rem] border transition-all duration-500 flex flex-col group ${
        plan.isPopular
          ? `border-[#27A395] shadow-[0_32px_64px_-16px_rgba(30,51,71,0.1)] ${isMobile ? "" : "scale-105 z-10"}`
          : "border-gray-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#33A8D3] text-white text-[10px] font-black py-1.5 px-4 rounded-full shadow-lg tracking-widest z-10">
          RECOMMENDED
        </div>
      )}

      <div className="p-8 md:p-10 flex-grow flex flex-col">
        <div className="mb-8">
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              plan.isPopular ? "text-[#27A395]" : "text-gray-400"
            }`}
          >
            {plan.target || (plan.title === "CUSTOM" ? "High Volume" : "SME Solutions")}
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <h3 className="text-2xl font-black text-[#1e3347] italic leading-tight">
              {plan.title}
            </h3>
            <span className="text-[12px] font-bold text-[#27A395] bg-[#27A395]/5 px-3 py-1.5 rounded-lg border border-[#27A395]/10 italic whitespace-nowrap shrink-0">
              {plan.patients}
            </span>
          </div>
        </div>

        {/* Mobile Price Display for Personal Plan */}
        {isPersonal && (
          <div className="mt-2 mb-8">
            <div className="flex items-baseline gap-1.5">
              <span className="text-6xl font-black text-[#1e3347] tracking-tighter">
                {plan.price}
              </span>
              <span className="text-lg text-gray-400 font-bold">
                {plan.period}
              </span>
            </div>
          </div>
        )}

        {/* Standard Price Display for Others */}
        {!isPersonal && (
          <div className="mb-8 min-h-[64px]">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#1e3347]">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-base text-gray-400 font-bold">
                  {plan.period}
                </span>
              )}
            </div>
            {plan.additionalRate && (
              <p className="text-[10px] font-bold text-[#27A395] mt-1 italic">
                Additional: {plan.additionalRate}
              </p>
            )}
          </div>
        )}

        <div className="flex-grow">
          <ul className="space-y-4 mb-4">
            <AnimatePresence initial={false}>
              {visibleFeatures.map((feature, fIdx) => (
                <motion.li 
                  key={fIdx} 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-4 h-4 rounded-md flex items-center justify-center ${
                      plan.isPopular
                        ? "bg-[#27A395]/10 text-[#27A395]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" strokeWidth={5} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-600 leading-tight">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {plan.features.length > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-[11px] font-black text-[#27A395] uppercase tracking-wider mb-8 hover:opacity-80 transition-opacity"
            >
              {isExpanded ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> View More ({plan.features.length - 4} items)</>
              )}
            </button>
          )}
        </div>

        {isPersonal ? (
           <Link href="/personal-protection" className="w-full">
              <button className="w-full py-4 rounded-2xl font-black text-sm tracking-wider transition-all duration-300 bg-[#27A395] text-white shadow-lg shadow-[#27A395]/20 hover:scale-[1.02]">
                {plan.buttonText}
              </button>
           </Link>
        ) : plan.id === 'custom' ? (
          <Link href="/contact" className="w-full">
            <button
              className="w-full py-4 rounded-2xl font-black text-sm tracking-wider transition-all duration-300 bg-[#1e3347] text-white hover:bg-[#27A395] shadow-lg shadow-[#1e3347]/10"
            >
              {plan.buttonText}
            </button>
          </Link>
        ) : (
          <Link href="/hospital-protection" className="w-full">
            <button
              className={`w-full py-4 rounded-2xl font-black text-sm tracking-wider transition-all duration-300 ${
                plan.isPopular
                  ? "bg-[#27A395] text-white shadow-lg shadow-[#27A395]/20 hover:scale-[1.02]"
                  : "bg-white text-[#1e3347] border border-slate-100 hover:border-[#27A395] hover:text-[#27A395] shadow-sm"
              }`}
            >
              {plan.buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
