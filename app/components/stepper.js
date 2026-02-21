"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, ClipboardCheck, Cog, ShieldCheck, Rocket, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1, title: "Initial Consultation", icon: Search, image: "/step1.webp",
    accent: "from-[#27A395] to-[#2BBD9E]",
    description: "Our process begins with a personalized consultation to understand your healthcare needs, ensuring a tailored approach to your requirements.",
    highlights: ["Free assessment", "Needs analysis", "Custom strategy"]
  },
  {
    number: 2, title: "Detailed Assessment", icon: ClipboardCheck, image: "/step2.webp",
    accent: "from-[#33A8D3] to-[#5BC0EB]",
    description: "We conduct a thorough assessment of your claims and services, leveraging advanced tools to identify optimal solutions for your organization.",
    highlights: ["Claims audit", "Gap analysis", "Solution mapping"]
  },
  {
    number: 3, title: "Efficient Processing", icon: Cog, image: "/step3.webp",
    accent: "from-[#354B62] to-[#4A6A85]",
    description: "Our team efficiently processes your requests with precision, utilizing streamlined workflows to minimize delays and maximize accuracy.",
    highlights: ["Fast turnaround", "Zero errors", "Live tracking"]
  },
  {
    number: 4, title: "Quality Review", icon: ShieldCheck, image: "/step4.webp",
    accent: "from-[#27A395] to-[#33A8D3]",
    description: "Each step undergoes a rigorous quality review to ensure compliance and excellence, guaranteeing the highest standards of service delivery.",
    highlights: ["Compliance check", "Multi-point QA", "Standards audit"]
  },
  {
    number: 5, title: "Seamless Delivery", icon: Rocket, image: "/step5.webp",
    accent: "from-[#33A8D3] to-[#354B62]",
    description: "We conclude with a seamless delivery of services, providing you with comprehensive support to integrate solutions into your operations.",
    highlights: ["Full integration", "Ongoing support", "Performance reports"]
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => track.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.process-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: section, start: "top 85%", once: true }
        }
      );

      // Horizontal scroll pinned animation
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 64px",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Progress bar — synced to scroll
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 64px",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.3,
        }
      });

      // Card entrance reveal as they scroll into view
      const cards = track.querySelectorAll('.process-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, force3D: true,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 80%",
              end: "left 40%",
              scrub: 0.5,
            }
          }
        );
      });

      // GSAP hover on process cards — image scale
      cards.forEach(card => {
        const img = card.querySelector('.card-bg-img');
        const accent = card.querySelector('.card-accent-line');

        card.addEventListener('mouseenter', () => {
          if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out", force3D: true, overwrite: "auto" });
          if (accent) gsap.to(accent, { opacity: 1, duration: 0.4, overwrite: "auto" });
        });
        card.addEventListener('mouseleave', () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out", force3D: true, overwrite: "auto" });
          if (accent) gsap.to(accent, { opacity: 0, duration: 0.4, overwrite: "auto" });
        });
      });

      // CTA button hover
      const ctaBtn = section.querySelector('.process-cta-btn');
      if (ctaBtn) {
        ctaBtn.addEventListener('mouseenter', () => {
          gsap.to(ctaBtn, { scale: 1.02, boxShadow: '0 20px 40px rgba(39,163,149,0.4)', duration: 0.3, force3D: true, overwrite: "auto" });
        });
        ctaBtn.addEventListener('mouseleave', () => {
          gsap.to(ctaBtn, { scale: 1, boxShadow: '0 10px 25px rgba(39,163,149,0.3)', duration: 0.3, force3D: true, overwrite: "auto" });
        });
      }
    }, section);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#27A395]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#33A8D3]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="process-header max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-3">
                Our Streamlined{" "}
                <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                A professional 5-step journey designed to deliver healthcare solutions with precision and ease.
              </p>
            </div>
            <div className="flex-shrink-0 lg:pb-2">
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                <span className="font-semibold text-[#354B62]">01</span>
                <div className="w-32 lg:w-48 h-[3px] bg-gray-200 rounded-full overflow-hidden">
                  <div ref={progressBarRef} className="h-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] rounded-full origin-left" style={{ transform: 'scaleX(0)' }} />
                </div>
                <span className="font-semibold text-[#354B62]">05</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Scroll to explore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex gap-6 pl-8 pr-8 pb-8 items-center" style={{ width: 'max-content' }}>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div key={step.number} className="process-card flex-shrink-0" style={{ width: 'min(85vw, 900px)' }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 280px)', minHeight: '320px', maxHeight: '480px' }}>
                <img src={step.image} alt={step.title} loading={index < 2 ? "eager" : "lazy"}
                  className="card-bg-img absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e3f]/90 via-[#1a2e3f]/70 to-[#1a2e3f]/30" />

                <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg`}>
                        <StepIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Step</span>
                        <div className="text-white font-extrabold text-3xl leading-none">0{step.number}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-2">
                      {steps.map((_, i) => (
                        <div key={i} className="rounded-full" style={{
                          width: '6px',
                          height: i === index ? '24px' : '6px',
                          background: i === index ? 'linear-gradient(180deg, #27A395, #33A8D3)' : i < index ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'
                        }} />
                      ))}
                    </div>
                  </div>

                  <div className="max-w-md">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">{step.title}</h3>
                    <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-5">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((highlight, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1.5 text-[#27A395]" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`card-accent-line absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.accent} opacity-0`} />
              </div>
            </div>
          );
        })}

        {/* Final CTA */}
        <div className="process-card flex-shrink-0" style={{ width: 'min(85vw, 900px)' }}>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#354B62] to-[#1e3347]" style={{ height: 'calc(100vh - 280px)', minHeight: '320px', maxHeight: '480px' }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 lg:p-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center mb-6 shadow-xl shadow-[#27A395]/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Ready to Get<br />
                <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Started?</span>
              </h3>
              <p className="text-white/60 text-lg mb-8 max-w-sm leading-relaxed">
                Begin your journey towards streamlined healthcare management today.
              </p>
              <a href="/signup"
                className="process-cta-btn inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white font-semibold text-lg shadow-lg shadow-[#27A395]/30">
                Start Your Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;