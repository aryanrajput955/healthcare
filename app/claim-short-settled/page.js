"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

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
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(heroRef.current.querySelector('.hero-content'), 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo(heroRef.current.querySelectorAll('.hero-cta button'), 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }
    );

    gsap.fromTo(problemRef.current.querySelectorAll('.problem-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: problemRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(solutionRef.current.querySelectorAll('.solution-step'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: solutionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(categoriesRef.current.querySelectorAll('.category-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(advantagesRef.current.querySelectorAll('.advantage-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: advantagesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(recoveryRef.current.querySelectorAll('.recovery-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: recoveryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(successRef.current.querySelectorAll('.success-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: successRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(trialRef.current.querySelectorAll('.trial-step'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: trialRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Recover Short-Settled Insurance Claims - Get Your Full Amount</title>
        <meta name="description" content="Don't accept partial claim payments. New specialized service to recover short-settled amounts with expert challenge strategies." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                They Paid You Less Than You Deserve. We’ll Get the Rest
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert service to challenge short-settled insurance claims and recover full amounts
              </p>
              <p className="text-lg italic text-white/80">
                Healthcare expertise | Legal challenge strategies | No recovery, no fee
              </p>
              <div className="hero-cta flex justify-center gap-4">
                <Link href="/signup">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                    Start Free Settlement Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#354B62] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg">
                    Urgent Case? Call Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section ref={problemRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Why Insurance Companies Pay Less Than Your Full Claim
            </h2>
            <div className="space-y-6 text-center mb-8">
              <p className="text-lg text-gray-700">Industry Manipulation Tactics:</p>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li>70%+ of settled claims are paid below actual eligible amounts</li>
                <li>Average ₹50,000-3 Lakhs left on the table per case</li>
                <li>85% of patients accept partial payment without questioning</li>
                <li>Most short-settlements can be successfully challenged</li>
              </ul>
            </div>
            <h3 className="text-2xl font-semibold text-[#33A8D3] text-center mb-6">Common Manipulation Tactics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: '"Policy Sub-limits Apply" - Hidden restrictions never properly explained' },
                { icon: FileText, text: '"Standard Treatment Costs" - Arbitrary reductions below actual expenses' },
                { icon: FileText, text: '"Network Hospital Rates" - Lower negotiated rates applied unfairly' },
                { icon: FileText, text: '"Depreciation on Consumables" - Illegal deductions on new medical items' },
                { icon: FileText, text: '"Non-Medical Expenses" - Legitimate costs suddenly excluded' },
                { icon: FileText, text: '"Co-payment Clauses" - Incorrectly applied or miscalculated' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge Process Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Systematic Short-Settlement Recovery
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Step 1: Settlement Analysis',
                  items: [
                    'Original bill vs paid amount detailed comparison',
                    'Policy coverage clause-by-clause review',
                    'Deduction justification verification',
                    'Calculation error identification',
                    'Additional recovery potential assessment',
                  ],
                },
                {
                  title: 'Step 2: Evidence Building',
                  items: [
                    'Medical necessity documentation',
                    'Treatment protocol justification',
                    'Cost benchmark research',
                    'Policy interpretation legal research',
                    'Expert medical opinions (if needed)',
                  ],
                },
                {
                  title: 'Step 3: Recovery Action',
                  items: [
                    'Formal dispute filing with detailed evidence',
                    'Additional amount calculation with interest',
                    'Direct negotiation with settlement teams',
                    'Senior management escalation',
                    'Regulatory complaint (if needed)',
                  ],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step">
                  <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">{step.title}</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Short-Settlement Categories Section */}
        <section ref={categoriesRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Where We Recover Additional Money
            </h2>
            <div className="grid lg:grid-cols-4 gap-12">
              <div className="category-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Room Rent Manipulations</h3>
                <ul className="space-y-2">
                  {[
                    'Single/double room charges reduced to "general ward"',
                    'ICU charges arbitrarily capped below actual',
                    'Private room medical necessity ignored',
                    'Sub-limit clauses applied incorrectly',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="category-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Treatment Cost Reductions</h3>
                <ul className="space-y-2">
                  {[
                    'Surgeon fees cut to "panel rates"',
                    'Procedure costs capped below standard',
                    'Diagnostic test fees reduced arbitrarily',
                    'Consultation charges limited unfairly',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="category-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Consumables & Equipment</h3>
                <ul className="space-y-2">
                  {[
                    'New medical devices artificially "depreciated"',
                    'Life-saving equipment costs disallowed',
                    'Surgical implants reduced to "basic" rates',
                    'Essential consumables marked "non-medical"',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="category-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Hidden Exclusions</h3>
                <ul className="space-y-2">
                  {[
                    'Ambulance costs capped or denied',
                    'Attendant charges disallowed',
                    'Food and accommodation reduced',
                    'Miscellaneous essential costs excluded',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Advantages Section */}
        <section ref={advantagesRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Why Choose Our New Service
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Fresh Perspective', description: 'Latest knowledge of insurance tactics and counters' },
                { icon: Users, title: 'Personal Attention', description: 'Founder directly reviews every case' },
                { icon: FileText, title: 'Healthcare Specialization', description: 'Exclusive focus on medical claim disputes' },
                { icon: CheckCircle, title: 'Risk-Free Service', description: 'Pay only when we recover additional money' },
                { icon: Database, title: 'Transparent Process', description: 'Complete visibility into challenge strategy' },
                { icon: Clock, title: 'Quick Action', description: 'Begin recovery process within 48 hours' },
              ].map((item, index) => (
                <div key={index} className="advantage-item bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-[#27A395] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#354B62] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recovery Strategy Section */}
        <section ref={recoveryRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How We Get Your Additional Money
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="recovery-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Documentation Challenge</h3>
                <ul className="space-y-2">
                  {[
                    'Line-by-line bill analysis',
                    'Policy clause interpretation',
                    'Medical necessity certification',
                    'Cost justification research',
                    'Legal precedent compilation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="recovery-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Negotiation Tactics</h3>
                <ul className="space-y-2">
                  {[
                    'Direct insurance company engagement',
                    'Settlement team pressure',
                    'Senior management escalation',
                    'Legal notice with calculations',
                    'Regulatory complaint preparation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="recovery-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Legal Leverage</h3>
                <ul className="space-y-2">
                  {[
                    'Consumer protection act enforcement',
                    'IRDAI regulation violation documentation',
                    'Ombudsman complaint filing',
                    'Interest penalty calculations',
                    'Court proceedings (if necessary)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Success Examples Section */}
        <section ref={successRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Types of Cases We Can Help
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="success-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">High Recovery Potential</h3>
                <ul className="space-y-2">
                  {[
                    'Room rent sub-limit disputes',
                    'Surgeon fee reductions',
                    'Implant and device cost cuts',
                    'Treatment necessity challenges',
                    'Policy interpretation disputes',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="success-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Medium Recovery Potential</h3>
                <ul className="space-y-2">
                  {[
                    'Consumable depreciation disputes',
                    'Diagnostic cost reductions',
                    'Attendant charge denials',
                    'Miscellaneous expense cuts',
                    'Co-payment calculation errors',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="success-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Complex Recovery Cases</h3>
                <ul className="space-y-2">
                  {[
                    'Multiple policy coordination',
                    'International treatment claims',
                    'Experimental procedure disputes',
                    'Group insurance complications',
                    'Corporate policy conflicts',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section ref={trialRef} className="py-20 bg-gradient-to-br from-[#354B62] to-[#27A395] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Free Settlement Analysis</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No upfront costs • No hidden fees • Pay only when we recover additional money
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">What We Need</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Original claim settlement document',
                    'Complete hospital bills',
                    'Insurance policy copy',
                    'All correspondence with insurer',
                    'Medical records and reports',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Our Free Analysis</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Settlement accuracy verification',
                    'Additional recovery potential',
                    'Challenge strategy recommendation',
                    'Timeline and process explanation',
                    'Risk-free service proposal',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/signup">
              <button className="mt-12 bg-white text-[#354B62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                Start Your Free Settlement Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}