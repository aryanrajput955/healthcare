"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RejectedClaimsRecoveryPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const advantagesRef = useRef(null);
  const casesRef = useRef(null);
  const processRef = useRef(null);
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

    gsap.fromTo(casesRef.current.querySelectorAll('.case-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: casesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(processRef.current.querySelectorAll('.process-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: processRef.current,
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
        <title>Recover Your Rejected Insurance Claim - Expert Appeal Service</title>
        <meta name="description" content="Don't accept claim rejection. New specialized appeal service with healthcare expertise. Free case evaluation available." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your Insurance Claim Was Rejected? We Can Help
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert appeal service to challenge wrongly denied health insurance claims
              </p>
              <p className="text-lg italic text-white/80">
                Free case evaluation | Healthcare law expertise | No recovery, no fee
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
              <p className="text-lg text-gray-700">Shocking Industry Facts:</p>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li>25% of all health insurance claims get initially rejected</li>
                <li>Research proves 80% of rejections can be successfully overturned</li>
                <li>Only 15% of patients actually attempt to appeal</li>
                <li>Insurance companies count on most people giving up</li>
              </ul>
            </div>
            <h3 className="text-2xl font-semibold text-[#33A8D3] text-center mb-6">Common Unfair Rejection Reasons</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: '"Pre-existing condition not disclosed" - often applied incorrectly' },
                { icon: FileText, text: '"Treatment not medically necessary" - despite doctor’s clear recommendation' },
                { icon: FileText, text: '"Policy exclusions apply" - misinterpretation of policy terms' },
                { icon: FileText, text: '"Insufficient documentation" - moving goalposts after submission' },
                { icon: FileText, text: '"Waiting period not completed" - calculation errors by insurers' },
                { icon: FileText, text: '"Claim filed too late" - disputable timeline interpretations' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Appeal Strategy Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Systematic Recovery Approach
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Phase 1: Free Case Analysis',
                  items: [
                    'Complete rejection reason review',
                    'Policy terms expert interpretation',
                    'Medical necessity assessment',
                    'Legal merit evaluation',
                    'Success probability analysis',
                    'No-obligation recommendation',
                  ],
                },
                {
                  title: 'Phase 2: Evidence Development',
                  items: [
                    'Medical expert opinions and consultations',
                    'Additional documentation procurement',
                    'Insurance law precedent research',
                    'Timeline and procedure verification',
                    'Regulatory compliance review',
                  ],
                },
                {
                  title: 'Phase 3: Strategic Appeals',
                  items: [
                    'Level 1: Internal review with insurance company',
                    'Level 2: Senior management escalation',
                    'Level 3: Insurance Ombudsman complaint',
                    'Level 4: Consumer court proceedings',
                    'Level 5: High Court petition (complex cases)',
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

        {/* Service Advantages Section */}
        <section ref={advantagesRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Why Start With Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Personal Attention', description: 'Founder directly handles challenging cases' },
                { icon: Shield, title: 'Healthcare Focus', description: 'Exclusive specialization in medical claim appeals' },
                { icon: Database, title: 'Latest Knowledge', description: 'Up-to-date on regulations and legal precedents' },
                { icon: CheckCircle, title: 'Risk-Free Start', description: 'Free evaluation with no commitments' },
                { icon: FileText, title: 'Transparent Process', description: 'Regular updates and complete case visibility' },
                { icon: CheckCircle, title: 'Success-Based Fee', description: 'Pay only when we recover your money' },
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

        {/* Types of Cases Section */}
        <section ref={casesRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Rejected Claim Categories
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="case-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Medical Treatment Rejections</h3>
                <ul className="space-y-2">
                  {[
                    'Cardiac procedures and heart surgeries',
                    'Cancer treatment and chemotherapy',
                    'Orthopedic surgeries and joint replacements',
                    'Maternity complications and C-sections',
                    'Emergency procedures and ICU admissions',
                    'Chronic disease management',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="case-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Technical Rejections</h3>
                <ul className="space-y-2">
                  {[
                    'Documentation "insufficiency" claims',
                    'Timeline and deadline disputes',
                    'Pre-authorization technicalities',
                    'Policy interpretation conflicts',
                    'Network hospital complications',
                    'TPA processing errors',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="case-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Complex Disputes</h3>
                <ul className="space-y-2">
                  {[
                    'High-value claim denials',
                    'Multiple insurance coordination',
                    'International treatment claims',
                    'Experimental procedure disputes',
                    'Group insurance policy conflicts',
                    'Corporate health plan issues',
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

        {/* Our Process Section */}
        <section ref={processRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How We Fight for Your Money
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="process-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Free Consultation</h3>
                <ul className="space-y-2">
                  {[
                    'Complete case file review',
                    'Expert legal opinion',
                    'Recovery probability assessment',
                    'Timeline and strategy explanation',
                    'No-pressure recommendation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="process-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Appeal Preparation</h3>
                <ul className="space-y-2">
                  {[
                    'Comprehensive evidence compilation',
                    'Medical expert opinion letters',
                    'Legal precedent research',
                    'Regulatory compliance documentation',
                    'Strategic appeal drafting',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="process-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Multi-Level Pursuit</h3>
                <ul className="space-y-2">
                  {[
                    'Insurance company internal appeals',
                    'Regulatory body complaints',
                    'Consumer court proceedings',
                    'Settlement negotiations',
                    'Final recovery coordination',
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Free Case Evaluation</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No upfront costs • No hidden fees • Pay only when we win
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Documents We Need</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Original claim rejection letter',
                    'Complete medical records',
                    'Insurance policy documents',
                    'All bills and receipts',
                    'Previous correspondence',
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
                    'Expert case analysis',
                    'Success probability assessment',
                    'Recovery timeline estimate',
                    'Fee structure explanation',
                    'No-obligation advice',
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