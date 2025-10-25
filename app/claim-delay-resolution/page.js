"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, FileText, Clock, Users, Shield, Database, ArrowRight } from 'lucide-react';

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

    gsap.fromTo(whyDelaysRef.current.querySelectorAll('.why-delay-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: whyDelaysRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(tacticsRef.current.querySelectorAll('.tactic-item'), 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: tacticsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(interestRef.current.querySelectorAll('.interest-item'), 
      { opacity: 0, x: -20 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: interestRef.current,
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
        <title>Resolve Delayed Insurance Claims - Get Your Settlement Fast</title>
        <meta name="description" content="Tired of waiting for claim settlement? New specialized delay resolution service. Expert pressure tactics and legal support." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative text-white py-20 lg:py-32 min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-[url('/hospital-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#354B62]/90 to-[#2C3E50]/90 z-1" />
          <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="hero-content text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Stop Waiting Months for Your Insurance Money
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
                Expert delay resolution service to force faster claim settlements
              </p>
              <p className="text-lg italic text-white/80">
                Healthcare specialization | Legal pressure tactics | Success-based fees
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
              Why Insurance Companies Delay Your Payments
            </h2>
            <div className="space-y-6 text-center mb-8">
              <p className="text-lg text-gray-700">Disturbing Industry Statistics:</p>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li>60% of patients experience significant discharge delays due to claim processing</li>
                <li>Average 45+ days settlement time vs IRDAI mandated guidelines</li>
                <li>Deliberate delay tactics to pressure patients into lower settlements</li>
                <li>₹15,100+ Crores worth of legitimate claims artificially delayed</li>
                <li>Financial pressure forces many to accept partial payments</li>
              </ul>
            </div>
            <h3 className="text-2xl font-semibold text-[#33A8D3] text-center mb-6">Common Delay Tactics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, text: 'Repeated requests for "additional documentation"' },
                { icon: Clock, text: 'Endless cycles of queries and clarifications' },
                { icon: Clock, text: 'Artificial "technical review" periods' },
                { icon: Users, text: 'TPA-insurer coordination delays' },
                { icon: FileText, text: 'Settlement amount "negotiations"' },
                { icon: Database, text: 'Processing system "technical issues"' },
              ].map((item, index) => (
                <div key={index} className="problem-item flex items-start space-x-4">
                  <item.icon className="w-8 h-8 text-[#27A395] flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Overview Section */}
        <section ref={solutionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Aggressive Delay Resolution Strategy
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Immediate Action (Day 1-3)',
                  items: [
                    'Complete case timeline analysis',
                    'IRDAI compliance guideline review',
                    'Delay tactic identification',
                    'Legal pressure point mapping',
                    'Escalation strategy development',
                  ],
                },
                {
                  title: 'Pressure Application (Day 4-15)',
                  items: [
                    'Senior management direct escalation',
                    'Regulatory complaint filing with evidence',
                    'Legal notice service with penalty calculations',
                    'Public pressure through social media',
                    'Consumer court case preparation',
                  ],
                },
                {
                  title: 'Resolution Enforcement (Day 16-30)',
                  items: [
                    'Ombudsman formal complaint submission',
                    'Consumer court hearing attendance',
                    'Settlement negotiation with legal backing',
                    'Payment release coordination',
                    'Interest penalty recovery',
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

        {/* Why Delays Happen Section */}
        <section ref={whyDelaysRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              The Truth About Insurance Delays
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="why-delay-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Company Strategies</h3>
                <ul className="space-y-2">
                  {[
                    'Cash Flow Manipulation: Use your money for their investments',
                    'Pressure Tactics: Force you to accept lower amounts out of frustration',
                    'Resource Constraints: Understaffed teams cause genuine backlogs',
                    'Profit Maximization: Every day of delay improves their bottom line',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="why-delay-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Our Counter-Strategy</h3>
                <ul className="space-y-2">
                  {[
                    'Legal Pressure: IRDAI complaints with penalty demands',
                    'Public Exposure: Social media and review platform pressure',
                    'Executive Escalation: Direct contact with senior management',
                    'Regulatory Leverage: Consumer protection law enforcement',
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

        {/* Interest Recovery Rights Section */}
        <section ref={interestRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              Get Paid for Their Delays
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="interest-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">IRDAI Penalty Guidelines</h3>
                <ul className="space-y-2">
                  {[
                    'Claims must settle within 30 days of complete documentation',
                    'Interest penalty of Bank Rate + 2% for delays beyond deadline',
                    'Additional compensation for harassment and mental stress',
                    'Service deficiency charges under Consumer Protection Act',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="interest-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Typical Interest Calculations</h3>
                <ul className="space-y-2">
                  {[
                    '₹5 Lakh Claim: Approximately ₹2,500+ monthly interest',
                    '₹10 Lakh Claim: Approximately ₹5,000+ monthly interest',
                    '₹15 Lakh Claim: Approximately ₹7,500+ monthly interest',
                    'Plus legal costs and harassment compensation',
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

        {/* Our Pressure Tactics Section */}
        <section ref={tacticsRef} className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#354B62] text-center mb-12">
              How We Force Fast Settlements
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="tactic-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Legal Pressure</h3>
                <ul className="space-y-2">
                  {[
                    'IRDAI formal complaints with documentation',
                    'Consumer court case filing',
                    'Legal notices with interest calculations',
                    'Regulatory violation evidence compilation',
                    'High Court writ petitions (if needed)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tactic-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Public Pressure</h3>
                <ul className="space-y-2">
                  {[
                    'Social media campaign coordination',
                    'Online review platform management',
                    'Consumer forum discussions',
                    'Media attention (when appropriate)',
                    'Public interest litigation (extreme cases)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tactic-item">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Executive Pressure</h3>
                <ul className="space-y-2">
                  {[
                    'Direct contact with insurance company leadership',
                    'Escalation to CEO and board level',
                    'Regulatory body intervention requests',
                    'Industry association complaints',
                    'Investor relations pressure (listed companies)',
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
              No upfront fees • Action starts immediately • Pay only on successful settlement
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Case Evaluation Requirements</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Original claim submission documents',
                    'All correspondence with insurance company',
                    'Timeline of events and delays',
                    'Settlement offer details (if any)',
                    'Policy document and coverage details',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="trial-step">
                <h3 className="text-2xl font-semibold text-[#33A8D3] mb-4">Our Assessment</h3>
                <ul className="space-y-2 text-white/80">
                  {[
                    'Delay reason analysis',
                    'Legal action viability',
                    'Interest penalty calculations',
                    'Pressure strategy recommendation',
                    'Timeline and cost projection',
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