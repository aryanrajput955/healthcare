"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CashlessClaimsPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const whyChooseRef = useRef(null);
  const expertiseRef = useRef(null);
  const featuresRef = useRef(null);
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

    gsap.fromTo(expertiseRef.current.querySelectorAll('.expertise-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(featuresRef.current.querySelectorAll('.feature-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: featuresRef.current,
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
        <title>Expert Cashless Claims Processing - Reduce Hospital Discharge Delays | Indiem</title>
        <meta name="description" content="New specialized service for hospital cashless claim management. Expert processing, documentation support, faster approvals. Risk-free trial available." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Stop Losing Revenue from Cashless Claim Problems
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert claim processing service to eliminate discharge delays and maximize approvals
              </p>
              <p className="text-lg italic text-white/80">
                Specialized healthcare claims expertise | Risk-free trial | Personal attention guaranteed
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
              Is Your Hospital Facing These Challenges?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Clock, text: '50% of patients facing 6-48 hour discharge delays due to claim processing issues' },
                { icon: FileText, text: 'Cashless claims getting rejected for technical documentation errors' },
                { icon: CheckCircle, text: 'Lost revenue from denied or partially approved claims' },
                { icon: Users, text: 'Staff overwhelmed with complex TPA paperwork and follow-ups' },
                { icon: Users, text: 'Patient dissatisfaction from unexpected payment demands at discharge' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg italic text-gray-600 mt-8">
              Industry research shows these problems affect most hospitals across India, but they're completely avoidable with expert handling.
            </p>
          </div>
        </section>

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How Our Expert Cashless Service Works
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Step 1: Comprehensive Pre-Authorization',
                  items: [
                    'Complete patient eligibility verification',
                    'Thorough policy coverage analysis',
                    'Perfect documentation preparation',
                    'Direct TPA communication and follow-up',
                  ],
                },
                {
                  title: 'Step 2: Real-Time Treatment Support',
                  items: [
                    'Continuous monitoring of approved coverage',
                    'Proactive communication with insurance teams',
                    'Immediate issue identification and resolution',
                    'Cost optimization recommendations',
                  ],
                },
                {
                  title: 'Step 3: Seamless Discharge Process',
                  items: [
                    'Final bill verification and correction',
                    'Direct settlement coordination',
                    'Same-day discharge facilitation',
                    'Complete post-discharge support',
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
        <section ref={whyChooseRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Healthcare Specialization', description: 'Exclusive focus on health insurance claims' },
                { icon: Users, title: 'Personal Attention', description: 'Direct founder involvement in every case' },
                { icon: CheckCircle, title: 'Risk-Free Trial', description: 'Test our service with no upfront commitment' },
                { icon: FileText, title: 'Transparent Process', description: 'Complete visibility into every step' },
                { icon: Clock, title: 'Quick Response', description: '24-hour maximum response time' },
                { icon: Database, title: 'Success-Based Model', description: 'Pay only for successful outcomes' },
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

        {/* Our Expertise Section */}
        <section ref={expertiseRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Built by Healthcare Industry Insiders
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Deep Domain Knowledge: Founded by healthcare technology experts',
                'TPA Relationships: Direct connections with major TPAs',
                'Regulatory Understanding: Complete IRDAI compliance knowledge',
                'Technology Integration: Advanced claim processing systems',
                'Continuous Learning: Regular updates on policy changes',
              ].map((item, index) => (
                <div key={index} className="expertise-item flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#27A395] flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Features Section */}
        <section ref={featuresRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Complete End-to-End Support
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="feature-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Documentation Management</h3>
                <ul className="space-y-2">
                  {[
                    'Pre-authorization form completion',
                    'Medical record compilation',
                    'Treatment justification letters',
                    'Cost estimation and breakdown',
                    'Real-time status tracking',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">TPA Communication</h3>
                <ul className="space-y-2">
                  {[
                    'Direct liaison with TPA teams',
                    'Query resolution and clarification',
                    'Escalation to senior officials',
                    'Regular status updates',
                    'Settlement facilitation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Technology Support</h3>
                <ul className="space-y-2">
                  {[
                    'Advanced tracking dashboard',
                    'Mobile app for real-time updates',
                    'Document management system',
                    'Analytics and reporting',
                    'Integration with hospital systems',
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Risk-Free Trial Process</h2>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              No upfront costs • No long-term contracts • Cancel anytime
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                'Step 1: Free consultation and assessment',
                'Step 2: Select 2-3 pilot cases for trial',
                'Step 3: Experience our complete service',
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