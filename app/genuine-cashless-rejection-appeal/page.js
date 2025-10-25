"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CashlessClaimsAppealsPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const whyChooseRef = useRef(null);
  const approachRef = useRef(null);
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

    gsap.fromTo(whyChooseRef.current.querySelectorAll('.why-choose-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: whyChooseRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(approachRef.current.querySelectorAll('.approach-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: approachRef.current,
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
        <title>Challenge Wrongly Rejected Cashless Claims - Expert Appeal Service</title>
        <meta name="description" content="Don't accept unfair claim rejections. Expert appeal service for hospitals. Risk-free case evaluation. Recover your deserved revenue." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Don’t Accept Unfair Claim Rejections
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert appeal service to challenge wrongly denied cashless claims and recover your revenue
              </p>
              <p className="text-lg italic text-white/80">
                Free case evaluation | No recovery, no fee | Healthcare law expertise
              </p>
              <div className="hero-cta flex justify-center gap-4">
                <Link href="/signup">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                    Get Free Case Evaluation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#354B62] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg">
                    Contact Us
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
              Why Most Claim Rejections Are Actually Wrong
            </h2>
            <div className="space-y-6 text-center mb-8">
              <p className="text-lg text-gray-700">Industry data reveals shocking truths:</p>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li>25% of cashless claims get initially rejected by TPAs</li>
                <li>Research shows 80% of denials are overturned when properly appealed</li>
                <li>Most hospitals never appeal due to lack of expertise</li>
                <li>TPAs count on hospitals not challenging their decisions</li>
              </ul>
            </div>
            <h3 className="text-2xl font-semibold text-[#33A8D3] text-center mb-6">Common Unjust Rejection Reasons</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: '"Medical necessity not established" - despite clear doctor recommendations' },
                { icon: FileText, text: '"Treatment could be outpatient" - ignoring patient condition complexity' },
                { icon: FileText, text: '"Documentation insufficient" - arbitrary requirements after the fact' },
                { icon: FileText, text: '"Policy exclusions apply" - misinterpreting policy terms' },
                { icon: FileText, text: '"Pre-existing condition" - without proper medical timeline review' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appeal Process Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Systematic Challenge Strategy
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Phase 1: Case Evaluation (Free)',
                  items: [
                    'Complete rejection analysis',
                    'Medical necessity review',
                    'Policy terms interpretation',
                    'Success probability assessment',
                    'No-obligation recommendation',
                  ],
                },
                {
                  title: 'Phase 2: Evidence Building',
                  items: [
                    'Medical expert consultations',
                    'Additional documentation gathering',
                    'Legal precedent research',
                    'Appeal strategy development',
                    'Timeline and procedure review',
                  ],
                },
                {
                  title: 'Phase 3: Multi-Level Appeals',
                  items: [
                    'Level 1: Internal review with TPA/Insurer',
                    'Level 2: Senior management escalation',
                    'Level 3: Insurance Ombudsman complaint',
                    'Level 4: Consumer court proceedings (if needed)',
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

        {/* Why Work With Us Section */}
        <section ref={whyChooseRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Startup Advantages
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Personal Attention', description: 'Founder directly handles complex cases' },
                { icon: Clock, title: 'No Bureaucracy', description: 'Quick decisions and immediate action' },
                { icon: Database, title: 'Latest Knowledge', description: 'Up-to-date on newest regulations and precedents' },
                { icon: CheckCircle, title: 'Success-Only Model', description: 'Pay only when we recover money' },
                { icon: FileText, title: 'Complete Transparency', description: 'Regular updates and full case visibility' },
                { icon: Shield, title: 'Risk-Free Start', description: 'Free evaluation with no obligations' },
              ].map((item, index) => (
                <div key={index} className="why-choose-item bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
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

        {/* Service Approach Section */}
        <section ref={approachRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How We Build Winning Appeals
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="approach-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Medical Review</h3>
                <ul className="space-y-2">
                  {[
                    'Independent medical necessity analysis',
                    'Specialist doctor consultations',
                    'Treatment protocol verification',
                    'Alternative treatment comparisons',
                    'Medical board opinions (if needed)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="approach-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Legal Strategy</h3>
                <ul className="space-y-2">
                  {[
                    'Insurance law precedent research',
                    'Consumer protection act applications',
                    'IRDAI regulation compliance review',
                    'Ombudsman case preparation',
                    'Court documentation (if required)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="approach-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Documentation</h3>
                <ul className="space-y-2">
                  {[
                    'Complete case file reorganization',
                    'Missing evidence identification',
                    'Expert opinion letters',
                    'Timeline clarification',
                    'Regulatory compliance proof',
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Free Case Assessment</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No upfront fees • No hidden costs • Pay only on successful recovery
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">What We Need</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Original claim documents',
                    'Rejection letter with reasons',
                    'Complete medical records',
                    'Policy document copy',
                    'Hospital bill breakdown',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">What You Get</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Free expert analysis',
                    'Success probability assessment',
                    'Recovery timeline estimate',
                    'No-obligation recommendation',
                    'Complete transparency',
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
                Start Your Free Case Evaluation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}