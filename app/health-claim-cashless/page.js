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
      <div className="min-h-screen bg-white selection:bg-[#27A395]/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white min-h-[60vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('/img4.webp')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[#1e3347]/80 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
            <div className="hero-content space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Stop Losing <span className="text-[#27A395]">Revenue</span> <br />
                from Claims
              </h1>

              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Eliminate discharge delays and maximize approvals with our expert-led cashless claim management system.
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
                Is Your Hospital Facing <span className="text-[#27A395]">These Challenges?</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Industry research shows these problems affect most hospitals across India, but they're completely avoidable with expert handling.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: 'Discharge Delays', text: '50% of patients facing 6-48 hour discharge delays due to claim issues' },
                { icon: FileText, title: 'Documentation Errors', text: 'Cashless claims getting rejected for technical documentation errors' },
                { icon: Shield, title: 'Revenue Loss', text: 'Lost revenue from denied or partially approved claims' },
                { icon: Users, title: 'Staff Overload', text: 'Staff overwhelmed with complex TPA paperwork and follow-ups' },
                { icon: CheckCircle, title: 'Patient Stress', text: 'Patient dissatisfaction from unexpected payment demands' },
                { icon: Database, title: 'Process Gaps', text: 'Inconsistent tracking and lack of real-time status updates' },
              ].map((item, index) => (
                <div key={index} className="problem-item group bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-[#27A395]/30 hover:shadow-2xl hover:shadow-[#27A395]/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#27A395]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-[#27A395]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#354B62] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#33A8D3]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">
                Our Expert <span className="text-[#33A8D3]">Process</span>
              </h2>
              <p className="text-gray-600 text-lg">
                A streamlined, three-step approach to ensure maximum efficiency and minimal friction.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  step: '01',
                  title: 'Pre-Authorization',
                  items: [
                    'Patient eligibility verification',
                    'Policy coverage analysis',
                    'Perfect document preparation',
                    'Direct TPA communication',
                  ],
                },
                {
                  step: '02',
                  title: 'Treatment Support',
                  items: [
                    'Continuous coverage monitoring',
                    'Proactive insurance liaison',
                    'Immediate issue resolution',
                    'Cost optimization',
                  ],
                },
                {
                  step: '03',
                  title: 'Seamless Discharge',
                  items: [
                    'Final bill verification',
                    'Direct settlement coordination',
                    'Same-day discharge facilitation',
                    'Post-discharge support',
                  ],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                  <div className="absolute -top-6 left-8 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white text-xl font-bold w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#27A395]/20">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-[#354B62] mt-4 mb-6">{step.title}</h3>
                  <ul className="space-y-4">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-[#27A395]/10 flex items-center justify-center mt-1">
                          <CheckCircle className="w-3 h-3 text-[#27A395]" />
                        </div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Service Section */}
        <section ref={whyChooseRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#33A8D3] rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">What Makes Us <span className="text-[#27A395]">Different</span></h2>
              <p className="text-white/60 text-lg">We combine deep healthcare expertise with cutting-edge technology to deliver results.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Healthcare Specialization', description: 'Exclusive focus on health insurance claims with deep clinical understanding.' },
                { icon: Users, title: 'Personal Attention', description: 'Direct founder involvement in every case to ensure highest quality.' },
                { icon: CheckCircle, title: 'Risk-Free Trial', description: 'Test our service with zero upfront commitment. Pay only when satisfied.' },
                { icon: FileText, title: 'Transparent Process', description: 'Complete real-time visibility into every step of the claim journey.' },
                { icon: Clock, title: 'Quick Response', description: 'Guaranteed 24-hour maximum response time for all queries.' },
                { icon: Database, title: 'Success-Based Model', description: 'Our interests are aligned with yours. We win when you win.' },
              ].map((item, index) => (
                <div key={index} className="why-choose-item group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="bg-[#27A395] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Expertise Section */}
        <section ref={expertiseRef} className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] leading-tight">
                  Built by <span className="text-[#27A395]">Healthcare Industry</span> Insiders
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our team brings decades of experience from major insurance providers and top-tier hospital networks, giving us a unique perspective on both sides of the claim process.
                </p>
                <div className="space-y-4">
                  {[
                    'Deep Domain Knowledge: Founded by experts',
                    'Direct TPA Relationships with major providers',
                    'Complete IRDAI regulatory compliance',
                    'Advanced claim tracking technology integration',
                  ].map((item, index) => (
                    <div key={index} className="expertise-item flex items-center space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#27A395]/10 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-[#27A395]" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="h-64 bg-gray-100/50 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-gray-100">
                    <div className="w-full h-full bg-gradient-to-br from-[#27A395]/20 to-[#33A8D3]/20 flex items-center justify-center">
                      <Shield className="w-16 h-16 text-[#27A395]/40" />
                    </div>
                  </div>
                  <div className="h-48 bg-gray-50 rounded-[2rem] border border-gray-100" />
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-gray-50 rounded-[2rem] border border-gray-100" />
                  <div className="h-64 bg-gray-100/50 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-gray-100">
                    <div className="w-full h-full bg-gradient-to-br from-[#33A8D3]/20 to-[#27A395]/20 flex items-center justify-center">
                      <Users className="w-16 h-16 text-[#33A8D3]/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features Section */}
        <section ref={featuresRef} className="py-24 bg-gray-50/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#33A8D3]/5 skew-x-12 transform origin-left" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Complete <span className="text-[#33A8D3]">End-to-End</span> Support</h2>
              <p className="text-gray-600 text-lg">Every aspect of your claim management handled with precision and care.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: 'Documentation',
                  items: [
                    'Pre-authorization form completion',
                    'Medical record compilation',
                    'Treatment justification letters',
                    'Cost estimation & breakdown',
                    'Real-time status tracking',
                  ],
                },
                {
                  icon: Users,
                  title: 'Communication',
                  items: [
                    'Direct liaison with TPA teams',
                    'Query resolution & clarification',
                    'Escalation to senior officials',
                    'Regular status updates',
                    'Settlement facilitation',
                  ],
                },
                {
                  icon: Database,
                  title: 'Technology',
                  items: [
                    'Advanced tracking dashboard',
                    'Mobile app for real-time updates',
                    'Document management system',
                    'Analytics and reporting',
                    'Hospital system integration',
                  ],
                },
              ].map((feature, index) => (
                <div key={index} className="feature-item p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#33A8D3] transition-colors duration-500">
                    <feature.icon className="w-8 h-8 text-[#33A8D3] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#354B62] mb-6">{feature.title} Management</h3>
                  <ul className="space-y-4">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#33A8D3]" />
                        <span className="font-medium group-hover:text-gray-900 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#27A395]">Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Modernize Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27A395] to-[#33A8D3]">Claims Process?</span>
            </h2>
            
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join leading healthcare providers who have already transformed their revenue cycle. Start your risk-free pilot today.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Consult', text: 'Free assessment' },
                { step: '02', title: 'Select', text: '2-3 pilot cases' },
                { step: '03', title: 'Execute', text: 'Complete service' },
                { step: '04', title: 'Partner', text: 'Decide growth' },
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
                <button className="w-full bg-[#27A395] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#229b87] transition-all duration-300 flex items-center justify-center shadow-2xl">
                  Start Risk-Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Talk to an Expert
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}