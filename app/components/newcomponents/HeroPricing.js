"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalPlan, hospitalPlans } from "../../lib/pricingData";
import { PricingCard } from "./PricingCardShared";

export default function HeroPricing() {
  const [isHospital, setIsHospital] = useState(false);
  const [isPersonalExpanded, setIsPersonalExpanded] = useState(false);
  const [activeHospitalIdx, setActiveHospitalIdx] = useState(1);

  const faqs = [
    {
      q: "How do I sign up for the Personal Protection Plan?",
      a: "Signing up is simple! Click the \"GET STARTED\" button above to create your account and choose your payment method.",
    },
    {
      q: "Can I add family members to my plan?",
      a: "Yes, you can! Our Personal Protection Plan covers you and your immediate family members.",
    },
    {
      q: "What if I need assistance with an existing claim?",
      a: "Our experts are here to help. Once you sign up, you can upload your claim documents for immediate review and assistance.",
    },
  ];

  return (
    <section className="pt-16 md:pt-24 pb-0 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-[#27A395]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-[#33A8D3]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27A395]/10 border border-[#27A395]/20 mb-4">
            <span className="text-[#27A395] text-[10px] md:text-xs font-extrabold uppercase tracking-widest">
              Pricing & Plans
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e3347] mb-4 tracking-tight">
            Flexible Solutions for <span className="text-[#27A395]">Every Need</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg font-medium">
            From protecting your family's future to scaling your hospital's operations — choose the plan that connects you to seamless healthcare.
          </p>
        </div>

        {/* Professional Toggle Switch */}
        <div className="flex justify-center mb-16 md:mb-20">
          <div className="relative p-1.5 bg-gray-100/50 backdrop-blur-sm rounded-2xl flex items-center border border-gray-200 shadow-inner w-full max-w-[440px]">
            <motion.div
              initial={false}
              animate={{ x: isHospital ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md border border-gray-100"
            />
            <button
              onClick={() => setIsHospital(false)}
              className={`relative flex-1 py-3 text-sm font-bold transition-colors duration-300 z-10 ${
                !isHospital ? "text-[#27A395]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Personal & Family
            </button>
            <button
              onClick={() => setIsHospital(true)}
              className={`relative flex-1 py-3 text-sm font-bold transition-colors duration-300 z-10 ${
                isHospital ? "text-[#27A395]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Hospital & Clinic
            </button>
          </div>
        </div>

        {/* Pricing Content */}
        <div className="flex flex-col items-center mb-16">
          <AnimatePresence mode="wait">
            {!isHospital ? (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl"
              >
                {/* We use a specialized layout for Personal Card as it usually has a split grid on desktop */}
                <PricingCard plan={personalPlan} isMobile={false} />
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="relative">
                  {/* Desktop Only Grid */}
                  <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {hospitalPlans.map((plan, idx) => (
                      <PricingCard key={idx} plan={plan} />
                    ))}
                  </div>

                  {/* Mobile Only Carousel */}
                  <div className="lg:hidden w-full max-w-sm mx-auto px-2 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeHospitalIdx}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.x < -100 && activeHospitalIdx < hospitalPlans.length - 1) {
                            setActiveHospitalIdx(activeHospitalIdx + 1);
                          } else if (offset.x > 100 && activeHospitalIdx > 0) {
                            setActiveHospitalIdx(activeHospitalIdx - 1);
                          }
                        }}
                      >
                        <PricingCard plan={hospitalPlans[activeHospitalIdx]} isMobile />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons for Mobile */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none">
                      <button
                        onClick={() => setActiveHospitalIdx(Math.max(0, activeHospitalIdx - 1))}
                        disabled={activeHospitalIdx === 0}
                        className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto transition-all ${
                          activeHospitalIdx === 0 ? "opacity-0 scale-50" : "opacity-100 scale-100"
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5 text-[#354B62]" />
                      </button>
                      <button
                        onClick={() => setActiveHospitalIdx(Math.min(hospitalPlans.length - 1, activeHospitalIdx + 1))}
                        disabled={activeHospitalIdx === hospitalPlans.length - 1}
                        className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto transition-all ${
                          activeHospitalIdx === hospitalPlans.length - 1 ? "opacity-0 scale-50" : "opacity-100 scale-100"
                        }`}
                      >
                        <ChevronRight className="w-5 h-5 text-[#354B62]" />
                      </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                      {hospitalPlans.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveHospitalIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeHospitalIdx === idx
                              ? "w-8 bg-[#27A395]"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
