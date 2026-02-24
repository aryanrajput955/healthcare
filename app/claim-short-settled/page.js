"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight, Scale, Wallet, AlertCircle, Gavel, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClaimShortSettledPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const categoriesRef = useRef(null);
  const advantagesRef = useRef(null);
  const recoveryRef = useRef(null);
  const successRef = useRef(null);
  const trialRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(heroRef.current.querySelector('.hero-content'), 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1 }
    );

    const sections = [
      { ref: problemRef, selector: '.problem-item' },
      { ref: solutionRef, selector: '.solution-step' },
      { ref: categoriesRef, selector: '.category-item' },
      { ref: advantagesRef, selector: '.advantage-item' },
      { ref: recoveryRef, selector: '.recovery-item' },
      { ref: successRef, selector: '.success-item' },
      { ref: trialRef, selector: '.trial-step' }
    ];

    sections.forEach(({ ref, selector }) => {
      gsap.fromTo(ref.current.querySelectorAll(selector), 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Recover Short-Settled Insurance Claims - Get Your Full Amount | Indiem</title>
        <meta name="description" content="Did your insurance company pay less than your actual bill? We challenge unfair deductions and recover the short-settled amount for you." />
      </Head>
      <div className="min-h-screen bg-white selection:bg-[#27A395]/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white min-h-[65vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('/img4.webp')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-[#1e3347]/85 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
            <div className="hero-content space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#27A395]">Zero-Risk Settlement Recovery</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Don't Accept <br />
                <span className="text-[#27A395]">Partial Payments</span>
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Insurers often apply arbitrary deductions. We challenge unfair short-settlements and ensure you get every rupee you're entitled to.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section ref={problemRef} className="py-24 bg-gray-50/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6 tracking-tight">
                Why Claims are <span className="text-red-500">Short-Settled</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Insurers use complex jargon and "non-medical" exclusions to reduce payouts. 70% of settled claims leave significant eligible money on the table.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Wallet, title: 'Room Rent Capping', text: 'Illegal deductions applied when hospitals charge slightly above your room-rent limit.' },
                { icon: FileText, title: 'Consumable Cuts', text: 'Essential medical disposables unfairly marked as non-medical or disallowed.' },
                { icon: Scale, title: 'Network Rates', text: 'Applying lower "negotiated rates" even when the hospital claims higher costs.' },
                { icon: AlertCircle, title: 'Incorrect Copay', text: 'Forcing copayments that don\'t exist in your policy or miscalculating the ratios.' },
                { icon: Clock, title: 'Post-Hospitalization', text: 'Arbitrary rejection of follow-up bills, medicines, and diagnostic tests.' },
                { icon: TrendingUp, title: 'Incremental Penalty', text: 'Proportionate deductions on doctor fees, surgeries, and all bill components.' },
              ].map((item, index) => (
                <div key={index} className="problem-item group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-[#27A395]/30 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#27A395]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-[#27A395]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#354B62] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aggressive Strategy Section */}
        <section ref={solutionRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Our <span className="text-[#27A395]">Recovery Protocol</span></h2>
              <p className="text-gray-600 text-lg">A line-by-line audit and clinical challenge to reclaim your lost settlement money.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Line-by-Line Audit',
                  items: ['Original bill vs payout gap', 'Policy clause verification', 'Deduction logic challenge', 'Recovery potential map'],
                },
                {
                  title: 'Clinical Justification',
                  items: ['Doctor certification letters', 'Medical necessity audits', 'Cost benchmark reporting', 'Precedent law research'],
                },
                {
                  title: 'Aggressive Recovery',
                  items: ['Revised settlement filing', 'Grievance team negotiation', 'Ombudsman escalation', 'Legal interest penalty'],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-8 bg-[#27A395] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Stage {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-[#354B62] mt-4 mb-6">{step.title}</h3>
                  <ul className="space-y-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#27A395] mt-1 flex-shrink-0" />
                        <span className="text-gray-600 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section ref={categoriesRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 underline decoration-[#27A395]/30 decoration-8 underline-offset-8">
              Wealth Left on the Table
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Room Rent',
                  items: ['Incremental deletions', 'Sub-limit errors', 'ICU capping', 'Nursing charges'],
                },
                {
                  title: 'Medical Costs',
                  items: ['Surgeon fee cuts', 'OT charge reductions', 'Consultation caps', 'Diagnostic gaps'],
                },
                {
                  title: 'Implants',
                  items: ['Stent cost cuts', 'Joint replacement gaps', 'Device depreciation', 'Panel rate errors'],
                },
                {
                  title: 'Non-Medical',
                  items: ['Illegal item cuts', 'PPE kit reductions', 'Service charge gaps', 'Documentation fees'],
                },
              ].map((item, index) => (
                <div key={index} className="category-item p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all group text-center">
                  <h3 className="text-xl font-bold text-[#27A395] mb-6">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.items.map((point, i) => (
                      <li key={i} className="text-white/60 text-xs font-medium">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section ref={advantagesRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-16">Why Trust Our <span className="text-[#27A395]">Audit Team</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Clinical Depth', description: 'Doctors who understand medical bills better than insurance clerks.' },
                { icon: Gavel, title: 'Legal Strength', description: 'Consumer protection experts specializing in insurance claim recovery.' },
                { icon: TrendingUp, title: 'Max Recovery', description: 'Dedicated to finding every single rupee missed in the initial payout.' },
                { icon: CheckCircle, title: 'No Upfront Fee', description: 'Zero risk. You only pay a small portion of the additional money we recover.' },
                { icon: Database, title: 'Precedent Data', description: 'Access to thousands of solved cases to use as leverage in negotiations.' },
                { icon: Users, title: 'Direct Advocacy', description: 'We talk to the insurers so you don\'t have to experience the frustration.' },
              ].map((item, index) => (
                <div key={index} className="advantage-item group bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all">
                  <div className="bg-[#27A395] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#354B62] mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section ref={trialRef} className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1e3347] z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3347] via-[#27A395]/20 to-[#1e3347] z-10" />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl lg:text-6xl font-bold mb-12 leading-tight">
               Recover What's <br />
               <span className="text-[#27A395]">Rightfully Yours</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Upload', text: 'Bills & documents' },
                { step: '02', title: 'Audit', text: 'Find missing money' },
                { step: '03', title: 'Challenge', text: 'Clinical legal case' },
                { step: '04', title: 'Collect', text: 'Full payout done' },
              ].map((item, index) => (
                <div key={index} className="trial-step bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem]">
                  <div className="text-2xl md:text-3xl font-black text-white/10 mb-2">{item.step}</div>
                  <div className="text-lg md:text-xl font-bold mb-1">{item.title}</div>
                  <div className="text-xs md:text-sm text-white/50">{item.text}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <button className="w-full bg-[#27A395] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#229b87] transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-[1.02]">
                  Analyze My Settlement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Speak to an Auditor
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}