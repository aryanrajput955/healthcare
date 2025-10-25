"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PreAuthorizationApprovalPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const benefitsRef = useRef(null);
  const managementRef = useRef(null);
  const techRef = useRef(null);
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

    gsap.fromTo(techRef.current.querySelectorAll('.tech-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: techRef.current,
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
        <title>Expert Pre-Authorization Service - Faster Approvals, Fewer Rejections</title>
        <meta name="description" content="Specialized pre-auth service ensuring complete documentation and faster approvals. Personal expert attention for every case." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Get Pre-Authorizations Right the First Time
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert pre-auth service ensuring complete documentation and faster processing
              </p>
              <p className="text-lg italic text-white/80">
                Healthcare specialization | Personal expert attention | Risk-free trial available
              </p>
              <div className="hero-cta flex justify-center gap-4">
                <Link href="/signup">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                    Start Risk-Free Trial
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
              Why Pre-Authorizations Get Delayed or Rejected
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: '60% of pre-auth requests require multiple submissions due to errors' },
                { icon: Clock, text: 'Average 48-72 hours processing time causes patient anxiety' },
                { icon: CheckCircle, text: '25% initial rejection rate due to incomplete documentation' },
                { icon: Users, text: 'Hospital staff lack specialized knowledge of TPA requirements' },
                { icon: Clock, text: 'Emergency cases get delayed due to documentation issues' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg italic text-gray-600 mt-8">
              These delays cost hospitals revenue and damage patient relationships.
            </p>
          </div>
        </section>

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Expert Pre-Authorization Management
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Immediate Assessment',
                  items: [
                    'Patient eligibility verification within 2 hours',
                    'Complete policy coverage analysis',
                    'Treatment necessity evaluation',
                    'Documentation requirement checklist',
                    'Cost estimation and approval strategy',
                  ],
                },
                {
                  title: 'Perfect Documentation',
                  items: [
                    'Complete medical history compilation',
                    'Treatment plan with medical justification',
                    'Accurate cost estimation and breakdown',
                    'Specialist consultation notes',
                    'All required forms properly completed',
                  ],
                },
                {
                  title: 'Direct TPA Liaison',
                  items: [
                    'Personal submission to TPA representatives',
                    'Real-time status monitoring',
                    'Immediate query resolution',
                    'Escalation to senior officials when needed',
                    'Regular progress updates',
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

        {/* Service Benefits Section */}
        <section ref={benefitsRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Why Choose Our Pre-Auth Service
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Specialized Expertise', description: 'Exclusive focus on health insurance pre-auths' },
                { icon: Users, title: 'Personal Service', description: 'Direct access to founder and experts' },
                { icon: FileText, title: 'Complete Documentation', description: 'No missing forms or incomplete submissions' },
                { icon: Clock, title: 'Fast Response', description: '2-hour maximum response for urgent cases' },
                { icon: Database, title: 'Transparent Process', description: 'Real-time updates on every case' },
                { icon: CheckCircle, title: 'Risk-Free Trial', description: 'Test our service with pilot cases' },
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

        {/* Pre-Auth Management Section */}
        <section ref={managementRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Complete Pre-Auth Management
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Emergency Pre-Auth</h3>
                <ul className="space-y-2">
                  {[
                    '24/7 availability for critical cases',
                    '2-hour documentation completion',
                    'Direct emergency hotline to TPAs',
                    'Critical care specialist consultation',
                    'Immediate approval pursuit',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Planned Procedure Pre-Auth</h3>
                <ul className="space-y-2">
                  {[
                    '24-48 hour advance processing',
                    'Treatment optimization consultation',
                    'Cost-benefit analysis',
                    'Multiple treatment option evaluation',
                    'Insurance coverage maximization',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="management-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Complex Case Management</h3>
                <ul className="space-y-2">
                  {[
                    'Multi-specialty coordination',
                    'Medical board consultations',
                    'Insurance medical officer liaison',
                    'Alternative treatment negotiations',
                    'Maximum approval amount pursuit',
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

        {/* Technology Platform Section */}
        <section ref={techRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Advanced Pre-Auth Tools
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="tech-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Real-time Dashboard</h3>
                <p className="text-gray-700">Track all cases in one place</p>
              </div>
              <div className="tech-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Mobile Notifications</h3>
                <p className="text-gray-700">Instant updates on case progress</p>
              </div>
              <div className="tech-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Document Management</h3>
                <p className="text-gray-700">Secure cloud storage and retrieval</p>
              </div>
              <div className="tech-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">TPA Integration</h3>
                <p className="text-gray-700">Direct connectivity where available</p>
              </div>
              <div className="tech-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Analytics</h3>
                <p className="text-gray-700">Performance insights and improvement recommendations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section ref={trialRef} className="py-20 bg-gradient-to-br from-[#354B62] to-[#27A395] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Simple Onboarding Process</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No setup fees • No long-term contracts • Cancel anytime
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                'Step 1: Free consultation and system demo',
                'Step 2: Select 3-5 pilot cases for trial',
                'Step 3: Experience complete service quality',
                'Step 4: Decide on ongoing partnership',
              ].map((step, index) => (
                <div key={index} className="trial-step bg-white/10 rounded-xl p-6">
                  <div className="text-2xl font-bold text-[#33A8D3] mb-2">{step.split(':')[0]}</div>
                  <p className="text-white/80">{step.split(':')[1].trim()}</p>
                </div>
              ))}
            </div>
            <Link href="/signup">
              <button className="mt-12 bg-white text-[#354B62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}