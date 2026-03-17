"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Wallet, 
  HeartHandshake, 
  FileCheck, 
  Search, 
  UploadCloud, 
  Smile, 
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  ShieldAlert,
  Zap,
  ArrowRight,
  UserPlus,
  Activity,
  Box,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CloudinaryImage from './newcomponents/CloudinaryImage';

const PersonalProtectionDetails = ({ heroImageUrl }) => {
  const steps = [
    {
      title: "Quick Enrollment",
      description: "A quick start to a year of security. Join thousands already protected.",
      points: ["Online Form", "₹499 Membership", "Welcome Kit"],
      icon: <UserPlus className="w-6 h-6" />
    },
    {
      title: "Claim Initiation",
      description: "When the unexpected happens, we're your first call. No more office jumping.",
      points: ["Expert Checklist", "Document Audit", "Special Senior Support"],
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Precision Processing",
      description: "Our experts dive deep into the paperwork to ensure your story is told correctly.",
      points: ["Secure Portal", "Proactive Review", "Max Approval Audit"],
      icon: <Box className="w-6 h-6" />
    },
    {
      title: "Guaranteed Guidance",
      description: "Track progress with total transparency. We fight for every rupee you deserve.",
      points: ["Real-time Status", "Query Handling", "Resubmission Guarantee"],
      icon: <Fingerprint className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-[#fcfdfe] overflow-hidden">
      {/* 
          1. REFINED HERO SECTION 
      */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Mobile Background Image (Visible only on mobile) */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <CloudinaryImage 
            src={heroImageUrl || "/personal_protection_hero_1773672193039.png"} 
            alt="Protected Family" 
            width={800}
            height={1200}
            className="w-full h-full brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3347]/80 to-[#1e3347]/40" />
        </div>

        {/* Desktop Image Layout (Maintained) */}
        <div className="absolute top-0 right-0 w-[45%] h-full hidden lg:block z-0">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-[#fcfdfe] z-10" />
          <CloudinaryImage 
            src={heroImageUrl || "/personal_protection_hero_1773672193039.png"} 
            alt="Protected Family" 
            width={1200}
            height={1600}
            className="w-full h-full"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#27A395]/10 border border-[#27A395]/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27A395] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27A395]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#27A395]">Most Trusted Protection Plan</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] text-white lg:text-[#1e3347] tracking-tight"
            >
              Protecting Your <span className="text-[#27A395]">Health,</span> <br />
              Simplifying Your Stress.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base md:text-lg text-white/80 lg:text-slate-500 mb-10 leading-relaxed font-medium max-w-xl"
            >
              Expert insurance claim assistance for you and your family. We audit every bill, verify every policy, and manage every document—for just ₹499/year.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="group relative w-full px-10 py-5 bg-[#1e3347] text-white rounded-2xl font-black text-base transition-all hover:bg-[#27A395] shadow-xl shadow-[#1e3347]/10 flex items-center justify-center gap-3 overflow-hidden">
                  <span className="relative z-10">GET SECURED — ₹499</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
          2. THE STRUGGLE SECTION (TIGHTER SPACING)
      */}
      <section className="py-20 bg-[#1e3347] relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Claim Rejection is <span className="text-red-400">Heartbreaking.</span>
              </h2>
              <p className="text-lg text-white/60 font-medium mb-6">70% of rejections happen due to minor documentation errors made during stressful times. We're here to change that.</p>
              <p className="text-lg text-[#27A395] font-bold italic">"We handle the fighting. You handle the healing."</p>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { label: "Errors Found", val: "70%", sub: "In manual filings" },
                { label: "Our Success", val: "98%+", sub: "Verified Rate" },
                { label: "Savings", val: "30%", sub: "Membership Perk" },
                { label: "Priority", val: "24/7", sub: "Member Support" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <div className="text-2xl font-black text-white mb-0.5 tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#27A395] mb-1">{stat.label}</div>
                  <div className="text-[9px] text-white/40 font-bold uppercase">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
          3. RE-DESIGNED WHY CLAIMTRUE (MODERN GRID COMPARISON)
      */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 tracking-tight">The Proactive Difference</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Why thousands choose ClaimTrue over traditional models</p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Proactive Choice */}
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-[#1e3347] to-[#12202b] text-white overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <ShieldCheck className="w-48 h-48" />
               </div>
               <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27A395] text-white text-[10px] font-black tracking-widest uppercase mb-6">
                    OUR PROACTIVE PLAN
                  </div>
                  <h3 className="text-3xl font-black mb-10 leading-none tracking-tight">Comprehensive Protection</h3>
                  <div className="space-y-6">
                    {[
                      { f: "Expert Pre-Claim Audit", d: "Documentation fixed before it hits the insurer." },
                      { f: "7% Success Fee", d: "30% cheaper than any broker or aggregator." },
                      { f: "24/7 Priority Support", d: "Dedicated specialists only for members." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-[#27A395] flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-sm font-black">{item.f}</p>
                          <p className="text-xs text-white/50 font-medium">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* The Reactive Reality */}
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-black tracking-widest uppercase mb-6 w-fit">
                 TRADITIONAL MODELS
               </div>
               <h3 className="text-3xl font-black mb-10 leading-none tracking-tight text-[#1e3347]">Reactive Gaps</h3>
               <div className="space-y-6 flex-grow">
                  {[
                    { f: "Zero Pre-Submission Audit", d: "You file it yourself, errors and all." },
                    { f: "18%+ Success Fee", d: "Sky-high commissions taken from your claim." },
                    { f: "Limited Call Center Support", d: "General queries, no expert advocacy." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#1e3347]">{item.f}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-widest text-center italic">Most rejections happen when you're reactive. Be proactive.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
          4. RE-DESIGNED STEPS (VISUAL VERTICAL TIMELINE)
      */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 tracking-tight underline-offset-8 decoration-[#27A395]">Simple 4-Step Journey</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">From enrollment to worry-free approval</p>
          </div>

          <div className="relative">
             {/* Central Line */}
             <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-200 to-transparent md:-translate-x-1/2" />
             
             <div className="space-y-12">
               {steps.map((step, i) => (
                 <div key={i} className={`relative flex items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Circle Indicator */}
                    <div className="z-10 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border-2 border-[#27A395] shrink-0">
                       <span className="text-xl font-black text-[#1e3347] italic">{i + 1}</span>
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-[#27A395]/30 transition-all">
                       <div className="text-[#27A395] mb-4">{step.icon}</div>
                       <h3 className="text-xl font-bold text-[#1e3347] mb-2">{step.title}</h3>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{step.description}</p>
                       <div className="flex flex-wrap gap-2">
                          {step.points.map((p, j) => (
                            <span key={j} className="px-3 py-1 bg-[#27A395]/5 text-[#27A395] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#27A395]/10">
                              {p}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 
          5. BENTO STYLE BENEFITS (MAINTAINED BUT TIGHTER)
      */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
             <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 tracking-tight">Your Member Exclusive Benefits</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Unmatched care and savings for every plan holder</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-2 bg-[#1e3347] rounded-3xl p-10 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#27A395] flex items-center justify-center mb-6">
                     <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight">30% Membership Savings</h3>
                  <p className="text-base text-white/70 font-medium max-w-md">Standard processing costs 10%. Members pay only 7%. Every rupee counts during a recovery.</p>
               </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
               <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center text-[#27A395] mx-auto mb-6">
                  <Clock className="w-6 h-6" />
               </div>
               <h4 className="text-lg font-black text-[#1e3347] mb-2 leading-tight">Doorstep Ease</h4>
               <p className="text-xs text-slate-500 font-bold leading-relaxed">Expert care without leaving your home.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center">
               <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center text-[#27A395] mx-auto mb-6">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <h4 className="text-lg font-black text-[#1e3347] mb-2 leading-tight">Expert Audit</h4>
               <p className="text-xs text-slate-500 font-bold leading-relaxed">Rejections reduced by 90% via audit.</p>
            </div>

            <div className="md:col-span-2 bg-[#27A395]/10 rounded-3xl border border-[#27A395]/20 p-8 flex items-center gap-8">
               <HeartHandshake className="w-16 h-16 text-[#27A395] shrink-0" />
               <div>
                  <h4 className="text-xl font-black text-[#1e3347] mb-2 tracking-tight">Care for Senior Citizens</h4>
                  <p className="text-sm text-slate-600 font-medium">Special support tailored for independently living elders.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
          6. TARGET AUDIENCE (REFINED)
      */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-extrabold text-[#1e3347] mb-4 tracking-tight">Built for Real Stories.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { t: "🏥 Reimbursements", d: "Filing claims due to non-network hospitals." },
               { t: "⚖️ Rejected Claims", d: "Fighting denied claims with expert legal support." },
               { t: "👵 Senior Care", d: "Doorstep guidance for elders living independently." },
               { t: "🛡️ Protectors", d: "Safeguarding parents and family members." }
             ].map((card, i) => (
               <div key={i} className="bg-[#1e3347] p-8 rounded-[2rem] hover:rotate-2 transition-all">
                  <h4 className="text-xl font-black text-white mb-2 italic tracking-tight">{card.t}</h4>
                  <p className="text-white/50 text-[11px] font-medium leading-relaxed">{card.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 
          7. TIGHTER FINAL CTA 
      */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1e3347] to-[#12202b] p-12 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">Your Peace of Mind is Worth <span className="text-[#27A395]">₹499.</span></h2>
                 <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">Skip the bureaucracy and the stress. Join the circle of protected health policyholders today.</p>
                 
                 <Link href="/contact" className="w-full sm:w-auto">
                    <button className="px-12 py-5 bg-[#27A395] text-white rounded-2xl font-black text-xl hover:scale-[1.03] transition-all shadow-xl shadow-[#27A395]/20">
                       SECURE MY FAMILY
                    </button>
                 </Link>
                 <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/30 font-black text-[9px] uppercase tracking-[0.3em]">
                    <span>India-Wide</span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#27A395] mt-1" />
                    <span>Annual Membership</span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#27A395] mt-1" />
                    <span>Senior Care</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalProtectionDetails;
