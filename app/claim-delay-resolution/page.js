"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight, Zap, Hammer, Scale, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClaimsDelayResolutionPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const whyDelaysRef = useRef(null);
  const tacticsRef = useRef(null);
  const interestRef = useRef(null);
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
      { ref: whyDelaysRef, selector: '.why-delay-item' },
      { ref: tacticsRef, selector: '.tactic-item' },
      { ref: interestRef, selector: '.interest-item' },
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
        <title>Resolve Delayed Insurance Claims - Fast Settlement Resolution | Indiem</title>
        <meta name="description" content="Stuck in an endless wait for your insurance claim? We force insurers to settle delayed claims using expert legal and regulatory pressure." />
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
                <span className="text-xs font-semibold uppercase tracking-widest text-[#27A395]">Rapid Settlement Force</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                End the <span className="text-[#27A395]">Waiting</span> <br />
                Get Settled Now
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Insurance delays are often deliberate. We use aggressive legal and regulatory pressure to force immediate payment of your legitimate claims.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section ref={problemRef} className="py-24 bg-gray-50/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          
          <div className="max-max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6 tracking-tight">
                Delays are a <span className="text-red-500">Tactic</span>, Not a Process
              </h2>
              <p className="text-gray-600 text-lg">
                Insurers delay payments to manage their cash flow and pressure you into accepting lower settlements. Most delays violate IRDAI guidelines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: 'Endless Queries', text: 'Creation of circular "additional information" requests to reset processing clocks.' },
                { icon: FileText, title: 'Technical Review', text: 'Arbitrary "expert audits" used as an excuse to hold high-value payments.' },
                { icon: Users, title: 'TPA Finger-Pointing', text: 'Being bounced between the hospital, TPA, and Insurer with no clear ownership.' },
                { icon: AlertCircle, title: 'Silent Waiting', text: 'Complete lack of updates or transparent tracking of your claim status.' },
                { icon: Scale, title: '"Negotiations"', text: 'Intentionally slowing the process to force you into "settling" for 60-70% of the value.' },
                { icon: Zap, title: 'Financial Stress', text: 'Exploiting your urgency to pay hospital bills to gain an unfair leverage.' },
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
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Our <span className="text-[#27A395]">Resolution Force</span></h2>
              <p className="text-gray-600 text-lg">We shift the pressure from you back to the insurer using a systematic escalation protocol.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Immediate Audit',
                  items: ['Compliance review', 'Delay tactic logging', 'Legal point mapping', 'Escalation roadmap'],
                },
                {
                  title: 'Pressure Tactics',
                  items: ['Senior management alerts', 'IRDAI grievance filing', 'Legal notice services', 'Penalty calculations'],
                },
                {
                  title: 'Enforcement',
                  items: ['Ombudsman escalation', 'Consumer court filing', 'Settlement enforcement', 'Interest recovery'],
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

        {/* Interest Recovery Section */}
        <section ref={interestRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="interest-item space-y-8">
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                  Get Paid for <br />
                  <span className="text-[#27A395]">Every Day Delayed</span>
                </h2>
                <p className="text-white/70 text-lg">
                  IRDAI mandates that insurers pay interest (Bank Rate + 2%) for delays beyond 30 days of complete documentation. We ensure you recover this penalty.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-3xl font-bold text-[#27A395] mb-2">2% +</div>
                    <div className="text-sm text-white/50">Mandatory Interest above Bank Rate</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-3xl font-bold text-[#27A395] mb-2">30 Days</div>
                    <div className="text-sm text-white/50">Maximum Settlement Window</div>
                  </div>
                </div>
              </div>
              <div className="interest-item bg-white p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl font-bold text-[#354B62] mb-6">Delay Penalty Rights</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Bank Rate Interest', text: 'Automatic penalty for payments made beyond the IRDAI 30-day window.' },
                    { title: 'Mental Harassment', text: 'Compensation for stress caused by deliberate discharge delays.' },
                    { title: 'Legal Recovery', text: 'Recovery of all costs incurred while pursuing the insurance company.' },
                    { title: 'Service Deficiency', text: 'Additional consumer protection penalties for systemic failures.' },
                  ].map((point, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-[#27A395]/10 flex items-center justify-center mt-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[#27A395]" />
                      </div>
                      <div>
                        <div className="text-[#354B62] font-bold text-sm mb-1">{point.title}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{point.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pressure Tactics Section */}
        <section ref={tacticsRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] text-center mb-16 underline decoration-[#27A395]/30 decoration-8 underline-offset-8">
              How We Force Speed
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Hammer, title: 'Legal Escalation', items: ['Litigation management', 'Notice drafting', 'Statutory compliance audits'] },
                { icon: Zap, title: 'Regulatory Pulse', items: ['Direct IRDAI portal filing', 'Grievance tracking', 'Ombudsman representation'] },
                { icon: Users, title: 'Executive Pulse', items: ['Direct corporate alerts', 'Stakeholder pressure', 'CEO-level escalation'] },
              ].map((item, index) => (
                <div key={index} className="tactic-item p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-[#27A395]/10 flex items-center justify-center mb-8 group-hover:bg-[#27A395] transition-colors">
                    <item.icon className="w-8 h-8 text-[#27A395] group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#354B62] mb-6">{item.title}</h3>
                  <ul className="space-y-4">
                    {item.items.map((point, i) => (
                      <li key={i} className="flex items-center space-x-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27A395]" />
                        <span className="font-medium text-sm">{point}</span>
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
            <h2 className="text-4xl lg:text-6xl font-bold mb-12 leading-tight">
               Fast Settlement is <br />
               <span className="text-[#27A395]">Your Legal Right</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Audit', text: 'Analyze delay' },
                { step: '02', title: 'Pressure', text: 'Legal escalation' },
                { step: '03', title: 'Settle', text: 'Release payment' },
                { step: '04', title: 'Interest', text: 'Recovery done' },
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
                  Resolve My Delay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Talk to a Specialist
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}