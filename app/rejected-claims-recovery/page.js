"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight, AlertCircle, Gavel, Scale } from 'lucide-react';

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
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(heroRef.current.querySelector('.hero-content'), 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1 }
    );

    const sections = [
      { ref: problemRef, selector: '.problem-item' },
      { ref: solutionRef, selector: '.solution-step' },
      { ref: advantagesRef, selector: '.advantage-item' },
      { ref: casesRef, selector: '.case-item' },
      { ref: processRef, selector: '.process-item' },
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
        <title>Recover Your Rejected Insurance Claim - Expert Appeal Service | Indiem</title>
        <meta name="description" content="Don't accept insurance claim rejections. Our expert legal and clinical team helps you challenge wrongful denials and recover your money." />
      </Head>
      <div className="min-h-screen bg-white selection:bg-[#27A395]/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white min-h-[65vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('/img2.jpg')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-[#1e3347]/85 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
            <div className="hero-content space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#27A395]">Zero-Risk Appeal Service</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Rejected Claims <br />
                <span className="text-[#27A395]">Recovered</span>
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Wrongful rejections shouldn't cost you your savings. We challenge the insurers and bring your money back.
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
                Claim Rejections are <span className="text-red-500">Not Final</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Insurers count on you giving up. 80% of initially rejected claims are actually eligible and can be successfully overturned with expert advocacy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: AlertCircle, title: '"Pre-Existing"', text: 'Claims unfairly denied due to miscalculated waiting periods or non-disclosure clauses.' },
                { icon: Shield, title: '"Not Necessary"', text: 'Technically-challenged denials despite clear clinical recommendations from your doctor.' },
                { icon: FileText, title: '"Policy Terms"', text: 'Complex interpretations of fine print used to exclude eligible high-value procedures.' },
                { icon: Clock, title: '"Delayed Filing"', text: 'Timeline disputes where insurance companies ignore valid medical emergencies.' },
                { icon: Scale, title: '"Regulatory Gaps"', text: 'Exploiting your lack of knowledge about TPA and IRDAI grievance guidelines.' },
                { icon: Database, title: '"Documentation"', text: 'Moving goalposts by creating endless loops of "missing information" requests.' },
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

        {/* Appeal Strategy Section */}
        <section ref={solutionRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Our <span className="text-[#27A395]">Battle Plan</span></h2>
              <p className="text-gray-600 text-lg">A systematic, multi-level legal and clinical pursuit to recover your wrongly denied money.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Deep Clinical Analysis',
                  items: ['Complete case file review', 'Medical merit assessment', 'Legal precedent audit', 'Success probability map'],
                },
                {
                  title: 'Evidence Building',
                  items: ['Doctor opinion procurement', 'Compliance error audit', 'Regulatory gap mapping', 'Strategic file preparation'],
                },
                {
                  title: 'Aggressive Escalation',
                  items: ['Insurance internal appeals', 'Ombudsman filing', 'IRDAI grievance escalation', 'Consumer court advocacy'],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-8 bg-[#27A395] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Phase {index + 1}
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

        {/* Service Advantages Section */}
        <section ref={advantagesRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-16">Why Fight <span className="text-[#27A395]">With Us</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Gavel, title: 'Legal Muscle', description: 'Expert legal minds specializing exclusively in insurance consumer protection.' },
                { icon: Shield, title: 'Clinical Depth', description: 'In-house medical experts who can challenge insurance clerks on technical grounds.' },
                { icon: Database, title: 'Case Precedents', description: 'Database of thousands of successfully overturned claims to use as leverage.' },
                { icon: CheckCircle, title: 'Zero Upfront Risk', description: 'We only get paid when you receive your money. No recovery, no fee.' },
                { icon: FileText, title: 'End-to-End Filing', description: 'We manage all follow-ups, calls, and legal paperwork for you.' },
                { icon: Users, title: 'Founder Managed', description: 'Critical rejections are directly reviewed by our senior leadership.' },
              ].map((item, index) => (
                <div key={index} className="advantage-item group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all">
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

        {/* Claim Categories Section */}
        <section ref={casesRef} className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] text-center mb-16 underline decoration-[#27A395]/30 decoration-8 underline-offset-8">
              Cases We Successfully Overturn
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Critical Care Denials',
                  items: ['Cardiac Surgeries', 'Cancer Treatments', 'ICU Admissions', 'Emergency Procedures'],
                },
                {
                  title: 'Technical Denials',
                  items: ['Waiting Period Gaps', 'Documentation Lapses', 'TPA Processing Errors', 'Network Conflicts'],
                },
                {
                  title: 'Lifestyle & Ortho',
                  items: ['Joint Replacements', 'Maternity Complications', 'Vision/Dental (Special)', 'Non-Medical Items Cuts'],
                },
              ].map((item, index) => (
                <div key={index} className="case-item p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
                  <h3 className="text-2xl font-bold text-[#354B62] mb-8 group-hover:text-[#27A395] transition-colors">{item.title}</h3>
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

        {/* Pursuit Process Section */}
        <section ref={processRef} className="py-24 bg-gray-50/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Multi-Level <span className="text-[#27A395]">Pursuit</span></h2>
              <p className="text-gray-600 text-lg">We don't take "No" for an answer. Our advocacy moves across all regulatory levels until justice is served.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { icon: Scale, title: 'Internal Grievance', text: 'Formal clinical challenge to the insurance company\'s medical board.' },
                { icon: Gavel, title: 'Ombudsman Fight', text: 'Complete evidence-based filing and representation at the Insurance Ombudsman.' },
                { icon: Shield, title: 'Legal Escalation', text: 'Consumer Court support for high-value claims involving systemic injustice.' },
              ].map((item, index) => (
                <div key={index} className="process-item p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 hover:shadow-lg transition-all text-center group">
                   <div className="w-12 h-12 rounded-xl bg-[#27A395]/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#27A395] transition-colors">
                    <item.icon className="w-6 h-6 text-[#27A395] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#354B62] mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
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
               Don't Accept a <br />
               <span className="text-[#27A395]">Wrongful Denied Claim</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Evaluate', text: 'Free analysis' },
                { step: '02', title: 'Strategy', text: 'Legal plan' },
                { step: '03', title: 'File', text: 'Expert appeal' },
                { step: '04', title: 'Recover', text: 'Money back' },
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
                  Evaluate My Case
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Talk to a Counselor
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}