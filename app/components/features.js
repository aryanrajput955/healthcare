"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Zap, BarChart3, TrendingUp, Users, Award, Lock, Smartphone, Plug, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      gsap.fromTo('.features-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
        }
      );

      // Batch animate feature items
      ScrollTrigger.batch('.feature-item', {
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, force3D: true, overwrite: "auto" }
          );
        },
        start: "top 90%",
        once: true
      });

      // CTA card entrance
      gsap.fromTo('.features-cta-card',
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
        }
      );

      // GSAP hover for feature items
      const items = sectionRef.current.querySelectorAll('.feature-item');
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { backgroundColor: 'rgba(39,163,149,0.05)', duration: 0.3, overwrite: "auto" });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { backgroundColor: 'transparent', duration: 0.3, overwrite: "auto" });
        });
      });

      // GSAP hover for CTA link
      const ctaLink = sectionRef.current.querySelector('.features-cta-link');
      if (ctaLink) {
        ctaLink.addEventListener('mouseenter', () => {
          gsap.to(ctaLink, { y: -1, duration: 0.2, force3D: true, overwrite: "auto" });
        });
        ctaLink.addEventListener('mouseleave', () => {
          gsap.to(ctaLink, { y: 0, duration: 0.2, force3D: true, overwrite: "auto" });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Zap, text: "Automated Workflow Management" },
    { icon: BarChart3, text: "Real-time Claim Tracking" },
    { icon: TrendingUp, text: "Advanced Analytics & Reporting" },
    { icon: Plug, text: "Multi-payer Integration" },
    { icon: Lock, text: "Secure Data Encryption" },
    { icon: Smartphone, text: "Mobile-responsive Design" },
    { icon: Plug, text: "API Integration Support" }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #354B62 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="features-content">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#33A8D3]/10 text-[#33A8D3] text-sm font-semibold mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Platform Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-6 leading-tight">
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Platform?</span>
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Our comprehensive healthcare management platform offers cutting-edge features designed to streamline your operations and enhance patient care.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-item flex items-center space-x-3 p-3 rounded-xl cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-[#27A395]" />
                  </div>
                  <span className="text-gray-700 font-medium text-[15px]">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="features-cta-card relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#27A395]/5 to-[#33A8D3]/5 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-[#354B62] to-[#2C3E50] rounded-2xl p-8 lg:p-10 text-white shadow-2xl shadow-[#354B62]/20 overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-sm mb-6">
                  <Star className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                  Most Popular
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                  Ready to Transform Your Healthcare Operations?
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#27A395]/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#27A395]" />
                    </div>
                    <span className="text-white/90">Increase efficiency by up to 40%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#33A8D3]/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#33A8D3]" />
                    </div>
                    <span className="text-white/90">Trusted by 500+ healthcare providers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                      <Award className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-white/90">Industry-leading compliance standards</span>
                  </div>
                </div>
                <Link href="/signup" className="features-cta-link inline-flex items-center bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-[#27A395]/30">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
