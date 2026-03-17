"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Zap, 
  Clock, 
  TrendingUp, 
  Search, 
  LayoutGrid, 
  Globe, 
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Database,
  BarChart3,
  Stethoscope,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CloudinaryImage from './newcomponents/CloudinaryImage';
import { hospitalPlans } from '../lib/pricingData';
import { PricingCard } from './newcomponents/PricingCardShared';

const HospitalProtectionDetails = ({ heroImageUrl }) => {
  const [activeHospitalIdx, setActiveHospitalIdx] = useState(1);

  const benefits = [
    { 
      title: "Reduced Rejection Rates", 
      icon: <ShieldAlert className="w-8 h-8" />,
      desc: "Documented reduction in rejections by 40–60%. Pre-submission reviews ensure files meet insurer standards before they leave your desk."
    },
    { 
      title: "Improved Compliance", 
      icon: <Search className="w-8 h-8" />,
      desc: "Standardised checklists eliminate inconsistencies. Audit-ready record management supports regulatory and quality reviews effortlessly."
    },
    { 
      title: "Operational Efficiency", 
      icon: <Zap className="w-8 h-8" />,
      desc: "Centralised file management reduces administrative time. Digital portals eliminate paper handling and courier delays."
    },
    { 
      title: "Faster Reimbursements", 
      icon: <Clock className="w-8 h-8" />,
      desc: "Average processing time reduced by 30–40%. Compliant files accelerate insurer processing and improve your cash flow cycles."
    }
  ];

  const onboardingSteps = [
    { title: "Setup & Integration", week: "Week 1-2", items: ["Credentials Provision", "System Configuration", "HMS Integration", "Role Assignment"] },
    { title: "Training", week: "Week 2-3", items: ["Staff Training Sessions", "Workflow Setup", "Template Customisation", "Practice Sessions"] },
    { title: "Go-Live", week: "Week 4+", items: ["Live Claim Processing", "Dedicated Support", "Regular Check-ins", "Optimization"] }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 
          1. PROFESSIONAL HERO 
      */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CloudinaryImage 
            src={heroImageUrl || "/hospital-hero.png"} 
            alt="Hospital Hallway" 
            width={1920}
            height={1080}
            className="w-full h-full brightness-[0.35] lg:brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3347] via-[#1e3347]/80 lg:from-white lg:via-white/70 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#27A395]/10 border border-[#27A395]/20 mb-8"
            >
              <Building2 className="w-4 h-4 text-[#27A395]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#27A395]">Provider Solutions</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] text-white lg:text-[#1e3347] tracking-tight"
            >
              Maximize Your <br className="hidden md:block" /> 
              Hospital Revenue <br />
              <span className="text-[#27A395]">With Zero Error</span> <br />
              Claim Management
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg text-white/80 lg:text-slate-500 mb-12 leading-relaxed font-medium max-w-xl"
            >
              Transform your claim documentation from a bottleneck into a competitive advantage. 40–60% reduction in rejection rates guaranteed.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full px-12 py-5 bg-[#1e3347] text-white rounded-2xl font-black text-lg transition-all hover:bg-[#27A395] shadow-xl shadow-[#1e3347]/20 flex items-center justify-center gap-3">
                  Empanel Your Hospital
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
          2. IMPACT STATS 
      */}
      <section className="py-20 bg-[#1e3347] text-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Rejection Reduction", val: "60%", icon: <TrendingUp className="w-5 h-5" /> },
                { label: "Faster Settlements", val: "40%", icon: <Clock className="w-5 h-5" /> },
                { label: "Patient Satisfaction", val: "95%", icon: <Users className="w-5 h-5" /> },
                { label: "Network Growth", val: "2x", icon: <Globe className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start p-6 rounded-3xl bg-white/5 border border-white/10">
                   <div className="text-[#27A395] mb-4">{stat.icon}</div>
                   <div className="text-4xl font-black mb-1">{stat.val}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 
          3. PLAN SELECTION (Bento Grid)
      */}
      <section className="py-32 bg-[#fcfdfe]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 md:mb-6 tracking-tight px-4">Enterprise-Grade Plans</h2>
            <p className="text-slate-500 font-medium px-6 text-sm md:text-base">Scalable solutions for clinics and multi-specialty hospitals.</p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Desktop Only Grid (lg and above) */}
            <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
               {hospitalPlans.map((plan) => (
                 <PricingCard key={plan.id} plan={plan} />
               ))}
            </div>

            {/* Mobile Only Carousel Switcher (matches landing page) */}
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
                  onDragEnd={(e, { offset }) => {
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

              {/* Side Navigation Arrows for Mobile */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-6 -right-6 flex justify-between pointer-events-none">
                <button
                  onClick={() => setActiveHospitalIdx(Math.max(0, activeHospitalIdx - 1))}
                  disabled={activeHospitalIdx === 0}
                  className={`w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center pointer-events-auto transition-all ${
                    activeHospitalIdx === 0 ? "opacity-0 scale-50" : "opacity-100 scale-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 text-[#1e3347]" />
                </button>
                <button
                  onClick={() => setActiveHospitalIdx(Math.min(hospitalPlans.length - 1, activeHospitalIdx + 1))}
                  disabled={activeHospitalIdx === hospitalPlans.length - 1}
                  className={`w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center pointer-events-auto transition-all ${
                    activeHospitalIdx === hospitalPlans.length - 1 ? "opacity-0 scale-50" : "opacity-100 scale-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5 text-[#1e3347]" />
                </button>
              </div>

              {/* Dots Indicator for Mobile */}
              <div className="flex justify-center gap-2 mt-10">
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
      </section>

      {/* 
          4. KEY BENEFITS (Modern Grid)
      */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 tracking-tight">The Hospital Advantage</h2>
             <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Operational Excellence Built-in</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
             {benefits.map((benefit, i) => (
               <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group text-center md:text-left items-center md:items-start">
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-white text-[#27A395] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                     {React.cloneElement(benefit.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
                  </div>
                  <div>
                     <h3 className="text-xl md:text-2xl font-black text-[#1e3347] mb-3 md:mb-4">{benefit.title}</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 
          5. EMPANELMENT SECTION (Premium Deep Blue)
      */}
      <section className="py-20 md:py-32 bg-[#1e3347] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <Database className="w-full h-full text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
             <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex px-4 py-2 rounded-full bg-[#27A395]/20 text-[#27A395] text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
                  Enterprise Exclusive
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-6 md:mb-8 italic leading-tight">Mastering <br />Empanelment.</h2>
                <p className="text-lg md:text-xl text-white/50 font-medium mb-10 md:mb-12">Expand your network to reach 10x more patients. We handle the bureaucracy, so you can handle the treatments.</p>
                
                <div className="space-y-4 md:space-y-6">
                   {[
                     { t: "Application Assistance", d: "End-to-end guidance on applying for network partnerships." },
                     { f: "Insurance Liaison", d: "Dedicated coordination with insurance companies on your behalf." },
                     { s: "Success-Based Structure", d: "No implementation cost—pay only upon successful empanelment." }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-4 p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 text-left items-start md:items-center">
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#27A395] shrink-0" />
                        <p className="text-[13px] md:text-sm font-bold text-white/80">{Object.values(item)[0]} – <span className="text-white/40">{Object.values(item)[1]}</span></p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
                <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-[#1e3347] shadow-4xl">
                   <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 border-b border-slate-100 pb-4 md:pb-6 text-center md:text-left">Success-Based Fee</h3>
                   <div className="space-y-6 md:space-y-8">
                      <div className="flex justify-between items-center bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                         <div className="text-[11px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Monthly Cost</div>
                         <div className="text-xl md:text-2xl font-black">₹0 EXTRA</div>
                      </div>
                      <div className="flex justify-between items-center bg-[#27A395]/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#27A395]/20">
                         <div className="text-[11px] md:text-sm font-bold text-[#27A395] uppercase tracking-widest">Post-Approval Fee</div>
                         <div className="text-xl md:text-2xl font-black text-[#27A395]">₹9,999*</div>
                      </div>
                      <p className="text-[9px] md:text-[10px] text-slate-400 font-bold italic leading-relaxed text-center md:text-left">*Success-based fee applicable per insurance company. Initial prep takes 2-4 weeks.</p>
                      <Link href="/contact" className="block text-center mt-4 md:mt-6">
                        <button className="w-full py-4 md:py-5 bg-[#1e3347] text-white rounded-xl md:rounded-[1.5rem] font-black transition-all hover:bg-[#27A395] flex items-center justify-center gap-3">
                           Download Application Guide
                           <Briefcase className="w-4 h-4 hidden md:block" />
                        </button>
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 
          6. IMPLEMENTATION JOURNEY 
      */}
      <section className="py-20 md:py-32 bg-[#fcfdfe]">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 md:mb-6 tracking-tighter italic">From Onboarding to Go-Live</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">A comprehensive 4-week transition</p>
           </div>

           <div className="relative flex flex-col md:flex-row gap-12 lg:gap-16">
              <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-slate-100 lg:top-14" />
              
              {onboardingSteps.map((step, i) => (
                <div key={i} className="relative text-center flex-1">
                   <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white border-8 border-slate-100 flex flex-col items-center justify-center mx-auto mb-8 md:mb-10 z-10 relative shadow-xl">
                      <span className="text-[10px] md:text-xs font-black text-[#27A395] uppercase mb-1">{step.week}</span>
                      <span className="text-[8px] md:text-xs font-bold text-slate-300 uppercase">Phase {i+1}</span>
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-[#1e3347] mb-4 md:mb-6">{step.title}</h3>
                   <div className="flex flex-col gap-2">
                      {step.items.map((item, j) => (
                        <div key={j} className="text-xs md:text-sm font-bold text-slate-500 py-1.5 md:py-2 border-b border-slate-50 w-fit mx-auto">{item}</div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 
          7. FINAL CORPORATE CTA 
      */}
      <section className="py-20 md:py-40 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
           <div className="bg-gradient-to-br from-[#1e3347] to-[#12202b] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 text-center relative overflow-hidden text-white">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,#ffffff11_1px,transparent_0)] bg-[size:40px_40px] opacity-20" />
              <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">Scale Your Hospital's <br /><span className="text-[#27A395]">Claim Efficiency.</span></h2>
                 <p className="text-white/50 text-base md:text-xl font-medium mb-10 md:mb-16 max-w-2xl mx-auto px-4">Join the digital documentation revolution. Organize, verify, and settle claims faster than ever before.</p>
                 <div className="flex flex-col items-center justify-center gap-6">
                    <Link href="/contact" className="w-full sm:w-auto">
                       <button className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-[#27A395] text-white rounded-2xl md:rounded-[2rem] font-black text-lg md:text-2xl hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(39,163,149,0.3)] transition-all duration-500">
                          BOOK FREE DEMO
                       </button>
                    </Link>
                    <div className="flex flex-col items-center md:items-start gap-1">
                       <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#27A395]">Emergency Onboarding?</span>
                       <span className="text-xs md:text-sm font-bold text-white/40">Ready within 48 hours for critical needs.</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalProtectionDetails;
