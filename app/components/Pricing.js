"use client";

import React, { useState } from 'react';
import { Check, Minus, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalPlan, hospitalPlans, featureGroups } from '../lib/pricingData';
import { PricingCard } from './newcomponents/PricingCardShared';

const Pricing = () => {
  const [isHospital, setIsHospital] = useState(false);
  const [activeTabPlan, setActiveTabPlan] = useState('starter'); // For mobile category switch

  const plansList = [personalPlan, ...hospitalPlans];

  const getFeatureValue = (planId, feature) => {
    const plan = plansList.find(p => p.id === planId);
    if (!plan) return false;

    if (feature === 'Target Audience') return plan.target;
    if (feature === 'Patients Covered') return plan.patients;
    if (feature === 'Additional Patient Rate') return plan.additionalRate || 'N/A';
    
    return plan.features.some(f => f.includes(feature.split(' (')[0]));
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#f8fafc] overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#27A3951A] text-[#27A395] px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Pricing Plans
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6 tracking-tight"
          >
            Flexible Solutions for <span className="text-[#27A395]">Every Need</span>
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the core plan that fits your needs and compare features below.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
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

        {/* Cards Display */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            {!isHospital ? (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full max-w-4xl mx-auto"
              >
                <PricingCard plan={personalPlan} />
              </motion.div>
            ) : (
              <motion.div
                key="hospital"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {hospitalPlans.map((plan) => (
                  <PricingCard key={plan.id} plan={plan} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      
      </div>
    </section>
  );
};

export default Pricing;
