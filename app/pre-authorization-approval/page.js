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
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(heroRef.current.querySelector('.hero-content'), 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1 }
    );

    const sections = [
      { ref: problemRef, selector: '.problem-item' },
      { ref: solutionRef, selector: '.solution-step' },
      { ref: benefitsRef, selector: '.benefit-item' },
      { ref: managementRef, selector: '.management-item' },
      { ref: techRef, selector: '.tech-item' },
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
        <title>Expert Pre-Authorization Service - Faster Approvals, Fewer Rejections | Indiem</title>
        <meta name="description" content="Specialized pre-auth service ensuring complete documentation and faster approvals. Personal expert attention for every case." />
      </Head>
      <div className="min-h-screen bg-white selection:bg-[#27A395]/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white min-h-[65vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('/img3.jpg')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-[#1e3347]/85 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
            <div className="hero-content space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#27A395]">Specialized Pre-Auth Support</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Pre-Authorizations <br />
                <span className="text-[#27A395]">Done Right</span>
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Eliminate rejections and slash approval times with our expert-led documentation management service.
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
                Why Requests Get <span className="text-red-500">Delayed</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Incomplete documentation and lack of TPA-specific knowledge lead to revenue leakage and patient stress.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: 'Incomplete Filings', text: '60% of pre-auth requests require multiple submissions due to technical errors.' },
                { icon: Clock, title: 'Processing Lags', text: 'Average 48-72 hours processing time causes critical discharge delays and anxiety.' },
                { icon: CheckCircle, title: 'High Rejection', text: '25% initial rejection rate primarily due to missing clinical justification.' },
                { icon: Users, title: 'Staff Gaps', text: 'Internal teams often lack specialized knowledge of evolving TPA requirements.' },
                { icon: Clock, title: 'Emergency Delays', text: 'Critical cases get stuck in approval loops exactly when time is most precious.' },
                { icon: Shield, title: 'Revenue Leakage', text: 'Claims denied at pre-auth stage often become unrecoverable hospital debt.' },
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

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#33A8D3]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Expert <span className="text-[#33A8D3]">Management</span></h2>
              <p className="text-gray-600 text-lg">We handle the complexity, so your clinical staff can focus on patient care.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Immediate Assessment',
                  items: ['Eligibility verification (2hr)', 'Policy coverage analysis', 'Treatment evaluation', 'Cost estimation strategy'],
                },
                {
                  title: 'Perfect Documentation',
                  items: ['Medical history compilation', 'Clinical justification reports', 'Specialist consultation notes', 'Form accuracy audit'],
                },
                {
                  title: 'Direct TPA Liaison',
                  items: ['Personal TPA submission', 'Real-time status monitoring', 'Immediate query resolution', 'Senior official escalation'],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-8 bg-[#33A8D3] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Phase 0{index + 1}
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

        {/* Service Benefits Section */}
        <section ref={benefitsRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-16">Why Partners <span className="text-[#27A395]">Choose Us</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Specialized Expertise', description: 'Exclusive focus on health insurance pre-auths with deep IRDAI knowledge.' },
                { icon: Users, title: 'Direct Access', description: 'Founder-level involvement in complex case resolution.' },
                { icon: FileText, title: 'Documentation Audit', description: 'Internal 3-point check before any submission to TPA.' },
                { icon: Clock, title: 'Urgency Handling', description: '24/7 support for critical emergency pre-authorization needs.' },
                { icon: Database, title: 'Smart Tracking', description: 'Proprietary dashboard to track every case status in real-time.' },
                { icon: CheckCircle, title: 'Success Linked', description: 'We win only when you get the approval you need.' },
              ].map((item, index) => (
                <div key={index} className="benefit-item group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all">
                  <div className="bg-[#27A395] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Auth Management Section */}
        <section ref={managementRef} className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] text-center mb-16 underline decoration-[#27A395]/30 decoration-8 underline-offset-8">
              Comprehensive Support
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Emergency Care',
                  items: ['24/7 Critical Availability', '2-Hour Doc Completion', 'Direct Hotline to TPAs', 'Specialist Liaison'],
                },
                {
                  title: 'Planned Procedures',
                  items: ['48-Hour Advance Processing', 'Treatment Optimization', 'Coverage Maximization', 'Cost-Benefit Analysis'],
                },
                {
                  title: 'Multi-Specialty Cases',
                  items: ['Specialty Coordination', 'Insurance Med Officer Liaison', 'Alternative Negotiations', 'Board Consultations'],
                },
              ].map((item, index) => (
                <div key={index} className="management-item p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
                  <h3 className="text-2xl font-bold text-[#354B62] mb-8 group-hover:text-[#27A395] transition-colors">{item.title}</h3>
                  <ul className="space-y-5">
                    {item.items.map((point, i) => (
                      <li key={i} className="flex items-center space-x-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395]" />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Platform Section */}
        <section ref={techRef} className="py-24 bg-gray-50/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#33A8D3]/5 -skew-x-12 transform origin-right" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Advanced <span className="text-[#33A8D3]">Platform</span></h2>
              <p className="text-gray-600 text-lg">Leverage our proprietary technology for 100% transparency.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { title: 'Real-time Dashboard', text: 'Track every case status from submission to final approval in one central interface.' },
                { title: 'Smart Alerts', text: 'Automated SMS and WhatsApp notifications for hospital TPA desk on case milestones.' },
                { title: 'Document Vault', text: 'Secure, encrypted cloud storage for all patient medical records and submissions.' },
              ].map((tech, index) => (
                <div key={index} className="tech-item p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 hover:shadow-lg transition-all text-center">
                  <h3 className="text-xl font-bold text-[#354B62] mb-4">{tech.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tech.text}</p>
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
              Ready to <span className="text-[#27A395]">Fast-Track</span> Your<br />
              Approvals?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Consult', text: 'System demo' },
                { step: '02', title: 'Select', text: '5 pilot cases' },
                { step: '03', title: 'Execute', text: 'Quality check' },
                { step: '04', title: 'Partner', text: 'Scalability' },
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
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
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
