"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight, HeartPulse, Receipt, Scale } from 'lucide-react';

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
      { ref: expensesRef, selector: '.expense-item' },
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
        <title>Expert Health Insurance Reimbursement - Get Your Money Back | Indiem</title>
        <meta name="description" content="Hassle-free reimbursement service for individuals. We navigate the complex paperwork to ensure you receive your maximum eligible payout." />
      </Head>
      <div className="min-h-screen bg-white selection:bg-[#27A395]/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white min-h-[65vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-[url('/step2.webp')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-[#1e3347]/85 backdrop-blur-[2px] z-10" />
          
          <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
            <div className="hero-content space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#27A395]">Patient-First Reimbursement Care</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Recover Your <br />
                <span className="text-[#27A395]">Medical Expenses</span>
              </h1>
              <p className="text-lg lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Don't let complex paperwork stop you from getting your money back. We handle the entire claim process for you.
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
                Why Individual Claims <span className="text-red-500">Fail</span>
              </h2>
              <p className="text-gray-600 text-lg">
                The reimbursement journey is designed to be difficult. Most individuals lose 30-40% of their eligible money simply due to process errors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: 'Paperwork Maze', text: 'Navigating 15+ different technical documents with zero guidance is overwhelming.' },
                { icon: Clock, title: 'Silent Waiting', text: '30-90 days of "In Process" status with no actual updates or timeline clarity.' },
                { icon: Receipt, title: 'Unfair Deductions', text: 'Insurance companies often cut 30% of payouts due to minor billing technicalities.' },
                { icon: Shield, title: 'Technical Rejections', text: '40% of first-time claims are rejected for "lack of medical necessity" documentation.' },
                { icon: Users, title: 'Zero Advocacy', text: 'Standard TPAs offer no support to individual patients during the dispute process.' },
                { icon: HeartPulse, title: 'Added Stress', text: 'Dealing with insurance while recovering from illness is a burden you shouldn\'t carry.' },
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
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Expert <span className="text-[#27A395]">Advocacy</span></h2>
              <p className="text-gray-600 text-lg">A simple, 3-step path to getting your money back without the headache.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Expert Assessment',
                  items: ['Free policy analysis', 'Eligible expense audit', 'Payout projection', 'Success evaluation'],
                },
                {
                  title: 'Clinical Filing',
                  items: ['Complete record organization', 'Technical billing verification', 'Medical justification letters', 'Form error-proofing'],
                },
                {
                  title: 'Active Pursuit',
                  items: ['Direct TPA liaison', 'Daily status tracking', 'Query resolution', 'Settlement negotiation'],
                },
              ].map((step, index) => (
                <div key={index} className="solution-step relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-8 bg-[#27A395] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Step {index + 1}
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

        {/* Why Choose Our Service Section */}
        <section ref={benefitsRef} className="py-24 bg-[#1e3347] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#27A395] rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-16">Dedicated to <span className="text-[#27A395]">Your Recovery</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Personal Concierge', description: 'A dedicated expert manages your file from start to finish.' },
                { icon: Shield, title: 'Clinical Depth', description: 'Our team includes doctors who understand medical necessity better than insurance clerks.' },
                { icon: Database, title: 'Live Dashboard', description: 'Track your money in real-time. No more calling the TPA for updates.' },
                { icon: CheckCircle, title: 'Maximum Payout', description: 'We dispute unfair deductions to ensure you get every rupee.' },
                { icon: FileText, title: 'No Success, No Fee', description: 'Our interests are 100% aligned with yours. We win when you do.' },
                { icon: Clock, title: '24hr Onboarding', description: 'We start working on your claim within 24 hours of submission.' },
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

        {/* Claimable Expenses Section */}
        <section ref={expensesRef} className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#27A395]/5 skew-x-12 transform origin-left" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] text-center mb-16 underline decoration-[#27A395]/30 decoration-8 underline-offset-8">
              What We Help You Claim
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'In-Patient Treatment',
                  items: ['Room & Nursing Fees', 'Surgeon & OT Charges', 'ICU & Critical Care', 'Implants & Medical Gear'],
                },
                {
                  title: 'Ancillary Costs',
                  items: ['30 Days Pre-Hospitalization', '60-90 Days Post-Care', 'Follow-up Diagnostics', 'Home Nursing Support'],
                },
              ].map((item, index) => (
                <div key={index} className="expense-item p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
                  <h3 className="text-2xl font-bold text-[#354B62] mb-8 group-hover:text-[#27A395] transition-colors">{item.title}</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
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

        {/* Legal & Escalation Section */}
        <section ref={managementRef} className="py-24 bg-gray-50/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#27A395]/5 -skew-x-12 transform origin-right" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#354B62] mb-6">Disputes & <span className="text-[#27A395]">Escalations</span></h2>
              <p className="text-gray-600 text-lg">We don't stop at rejections. Our legal experts fight for your rights.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { icon: Scale, title: 'Ombudsman Support', text: 'Professional preparation and filing of complaints with the Insurance Ombudsman.' },
                { icon: Shield, title: 'IRDAI Escalation', text: 'Direct engagement with regulatory authorities for systemic claim delays.' },
                { icon: Database, title: 'Audit Trail', text: 'Meticulous collection of evidence to win even the most complex disputes.' },
              ].map((item, index) => (
                <div key={index} className="management-item p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 hover:shadow-lg transition-all text-center group">
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
               Don't Leave Your Money <br />
               <span className="text-[#27A395]">With the TPA</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { step: '01', title: 'Upload', text: 'Send docs' },
                { step: '02', title: 'Audit', text: 'Expert review' },
                { step: '03', title: 'File', text: 'Safe submission' },
                { step: '04', title: 'Refund', text: 'Money back' },
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
                  Check My Claim
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Free Assessment
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
