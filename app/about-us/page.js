"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { Shield, Users, CheckCircle, FileText, Clock, Database, ArrowRight, Heart, Target, Lightbulb, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const expertiseRef = useRef(null);
  const differenceRef = useRef(null);
  const processRef = useRef(null);
  const complianceRef = useRef(null);
  const ctaRef = useRef(null);

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

    gsap.fromTo(missionRef.current.querySelectorAll('.mission-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(expertiseRef.current.querySelectorAll('.expertise-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(differenceRef.current.querySelectorAll('.difference-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: differenceRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(processRef.current.querySelectorAll('.process-step'), 
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

    gsap.fromTo(complianceRef.current.querySelectorAll('.compliance-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: complianceRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-content, .contact-item, .cta-button'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        scrollTrigger: {
          trigger: ctaRef.current,
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
        <title>About IndieM - Expert Health Insurance Claims Service in India</title>
        <meta name="description" content="IndieM is a specialized healthcare claims service built by industry insiders. Transparent, risk-free, and focused on hospitals and patients across India." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Reinventing Health Insurance Claims for India
              </h1>
              <p className="text-xl lg:text-2xl max-w-4xl mx-auto">
                Expert healthcare claims service led by industry insiders—personal, transparent, and accessible.
              </p>
              <div className="hero-cta flex justify-center gap-4 mt-8">
                <Link href="/contact">
                  <button className="bg-[#27A395] hover:bg-[#229b87] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section ref={missionRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Our Mission & Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="mission-item space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-[#27A395]" />
                  <h3 className="text-2xl font-semibold text-[#354B62]">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every hospital and patient in India deserves a smooth, honest, and transparent experience with health insurance claims.
                </p>
              </div>
              <div className="mission-item space-y-4">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-8 h-8 text-[#27A395]" />
                  <h3 className="text-2xl font-semibold text-[#354B62]">Our Mission</h3>
                </div>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                    <span>Remove the pain and confusion from health claims processing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                    <span>Empower hospitals with risk-free, expert support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                    <span>Help patients recover what they truly deserve—from reimbursement to rejected claims</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mission-item">
              <h3 className="text-2xl font-semibold text-[#354B62] text-center mb-6">Core Values</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, text: 'Integrity and honesty in every case' },
                  { icon: Users, text: 'Clear communication' },
                  { icon: Heart, text: 'Deep healthcare domain expertise' },
                  { icon: Handshake, text: 'Zero-risk, results-based service' },
                ].map((value, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <value.icon className="w-10 h-10 text-[#27A395] mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare Claims Expertise Section */}
        <section ref={expertiseRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Our Healthcare Claims Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                '100% focus on health insurance claims and hospital reimbursement in India',
                'Familiar with all major TPA workflows, IRDAI guidelines, and insurer requirements',
                'Able to handle complex documentation, appeals, and regulatory escalations',
                'Networked with medical experts for complex cases',
              ].map((item, index) => (
                <div key={index} className="expertise-item flex items-start space-x-4 bg-gray-50 rounded-xl p-6">
                  <CheckCircle className="w-7 h-7 text-[#27A395] flex-shrink-0" />
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes IndieM Different Section */}
        <section ref={differenceRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              What Makes IndieM Different
            </h2>
            <div className="space-y-12">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-6">Startup Advantages for You:</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Users, title: 'Direct Founder Attention', description: 'Every case receives personal oversight' },
                  { icon: Clock, title: 'Agile Processes', description: 'No corporate bureaucracy or delays' },
                  { icon: FileText, title: 'Absolute Transparency', description: 'Full visibility at every step' },
                  { icon: Shield, title: 'Risk-Free Model', description: 'Pay only when we deliver results' },
                ].map((item, index) => (
                  <div key={index} className="difference-item bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
                    <div className="bg-[#27A395] w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#354B62] mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section ref={processRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How We Work
            </h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              {[
                { step: 'Free Consultation', description: 'Understand your specific situation and requirements' },
                { step: 'Free Case Assessment', description: 'Evaluate your hospital case or personal claim with honest advice' },
                { step: 'Risk-Free Pilot', description: 'Try our expertise with sample cases—zero commitment' },
                { step: 'Scale Together', description: 'Continue only if you see real value' },
              ].map((item, index) => (
                <div key={index} className="process-step flex items-center space-x-6 bg-gradient-to-r from-[#27A395]/5 to-[#33A8D3]/5 rounded-xl p-6">
                  <div className="bg-[#27A395] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#354B62] mb-1">{item.step}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Compliance Section */}
        <section ref={complianceRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Trust & Compliance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                '100% data protection guidelines and Secure document handling ',
                
                'Partnered with legal and medical experts for appeals and escalations',
                'Transparent fees, no hidden costs',
              ].map((item, index) => (
                <div key={index} className="compliance-item flex items-start space-x-4 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Shield className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Call To Action Section */}
        <section ref={ctaRef} className="py-20 bg-gradient-to-br from-[#354B62] to-[#27A395] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="cta-content max-w-4xl mx-auto space-y-6 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ready to Resolve Your Health Insurance Challenges?
              </h2>
              <p className="text-xl">
                Get your hospital claims or personal health insurance issues resolved—without the hassle or the risk.
              </p>
            </div>
            <Link href="/contact">
              <button className="cta-button bg-white text-[#354B62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center cursor-pointer hover:scale-105 hover:shadow-lg mb-12">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto text-lg">
              <div className="contact-item flex items-center justify-center space-x-3 bg-white/10 rounded-xl p-4">
                <Database className="w-6 h-6" />
                <span>Email: <a href="mailto:shashank.agnihotri@indiem.tech" className="underline hover:text-[#33A8D3]">shashank.agnihotri@indiem.tech</a></span>
              </div>
              <div className="contact-item flex items-center justify-center space-x-3 bg-white/10 rounded-xl p-4">
                <Users className="w-6 h-6" />
                <span>Call/WhatsApp: <a href="tel:+919205862303" className="underline hover:text-[#33A8D3]">+91-9205862303</a></span>
              </div>
            </div>
            <p className="mt-12 text-lg italic text-white/80">
              <strong>IndieM.tech</strong> – Your partner in fair, fast, and honest health insurance claims. Built for hospitals and patients, from the ground up.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}