"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HealthClaimReimbursementPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const benefitsRef = useRef(null);
  const managementRef = useRef(null);
  const expensesRef = useRef(null);
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

    gsap.fromTo(benefitsRef.current.querySelectorAll('.benefit-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(managementRef.current.querySelectorAll('.management-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: managementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(expensesRef.current.querySelectorAll('.expense-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: expensesRef.current,
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
        <title>Expert Health Insurance Reimbursement - Get Your Money Fast</title>
        <meta name="description" content="New specialized reimbursement service. Expert documentation, faster processing, maximum payouts. Risk-free consultation available." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Stop Struggling With Health Insurance Reimbursements
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert service to handle your complete reimbursement process and maximize your payout
              </p>
              <p className="text-lg italic text-white/80">
                Healthcare specialization | Personal attention | No success, no fee
              </p>
              <div className="hero-cta flex justify-center gap-4">
                <Link href="/signup">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                    Start Free Consultation
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
              Why Patients Give Up on Their Claims
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: 'Overwhelming Paperwork: 15+ different documents with complex requirements' },
                { icon: Clock, text: 'Endless Waiting: 30-90 days average processing with no updates' },
                { icon: CheckCircle, text: 'Reduced Payouts: Most claims get only 60-70% of eligible amount' },
                { icon: FileText, text: 'Constant Rejections: 40% of claims need multiple resubmissions' },
                { icon: Users, text: 'No Support: Insurance companies provide minimal help' },
                { icon: FileText, text: 'Complex Process: Technical jargon and confusing procedures' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg italic text-gray-600 mt-8">
              Most people eventually give up and lose money they're entitled to receive.
            </p>
          </div>
        </section>

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Complete Reimbursement Management
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Step 1: Expert Assessment',
                  items: [
                    'Free policy coverage analysis',
                    'Eligible expense calculation',
                    'Maximum claimable amount projection',
                    'Documentation requirement checklist',
                    'Success probability evaluation',
                  ],
                },
                {
                  title: 'Step 2: Professional Documentation',
                  items: [
                    'Complete medical records organization',
                    'Bill verification and categorization',
                    'Missing document identification and procurement',
                    'Claim form expert completion',
                    'Supporting letter preparation',
                  ],
                },
                {
                  title: 'Step 3: Strategic Submission',
                  items: [
                    'Optimal timing for submission',
                    'Direct insurance company liaison',
                    'Real-time tracking and monitoring',
                    'Query resolution and clarification',
                    'Settlement amount negotiation',
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

        {/* Why Choose Our Service Section */}
        <section ref={benefitsRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Why Choose Our Service
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Personal Focus', description: 'Direct founder involvement in every case' },
                { icon: Shield, title: 'Healthcare Specialization', description: 'Exclusive expertise in medical claims' },
                { icon: Database, title: 'Transparent Process', description: 'Daily updates and complete visibility' },
                { icon: CheckCircle, title: 'Maximum Recovery', description: 'Fight for every rupee you deserve' },
                { icon: FileText, title: 'Risk-Free Model', description: 'Pay only when you receive money' },
                { icon: Clock, title: 'Quick Start', description: 'Begin processing within 24 hours' },
              ].map((item, index) => (
                <div key={index} className="benefit-item bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
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

        {/* What We Handle Section */}
        <section ref={managementRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Complete End-to-End Service
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Documentation Management</h3>
                <ul className="space-y-2">
                  {[
                    'Hospital bills and medical receipts',
                    'Discharge summary and treatment records',
                    'Prescription and medicine receipts',
                    'Diagnostic reports and scan results',
                    'Pre and post-hospitalization expenses',
                    'Insurance form completion',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Insurance Communication</h3>
                <ul className="space-y-2">
                  {[
                    'Direct submission to insurance companies',
                    'Regular follow-up and status checks',
                    'Query resolution and additional documentation',
                    'Settlement amount negotiation',
                    'Payment processing coordination',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Legal Support (if needed)</h3>
                <ul className="space-y-2">
                  {[
                    'Ombudsman complaint preparation',
                    'Consumer court representation',
                    'IRDAI escalation assistance',
                    'Legal documentation support',
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

        {/* Eligible Expenses Section */}
        <section ref={expensesRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              What Can Be Claimed
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="expense-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Main Hospitalization</h3>
                <ul className="space-y-2">
                  {[
                    'Room rent and nursing charges',
                    'Doctor consultation and surgery fees',
                    'Medicine and medical consumables',
                    'Diagnostic tests and procedures',
                    'Operation theater and ICU charges',
                    'Physiotherapy and rehabilitation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="expense-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Related Expenses</h3>
                <ul className="space-y-2">
                  {[
                    '30 days pre-hospitalization medical expenses',
                    '60 days post-hospitalization follow-up costs',
                    'Specialist consultations',
                    'Medical equipment and aids',
                    'Home nursing care',
                    'Transportation (ambulance)',
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Free Consultation Process</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No upfront fees • No hidden charges • Pay only on successful recovery
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">What You Need</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'All medical bills and receipts',
                    'Insurance policy documents',
                    'Medical records and reports',
                    'Basic patient information',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">What We Provide</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Free claim assessment',
                    'Maximum recovery estimate',
                    'Timeline projection',
                    'Service explanation',
                    'No-obligation recommendation',
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
                Start Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}