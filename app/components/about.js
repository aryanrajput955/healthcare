"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo('.about-image-main',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.8, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
        }
      );

      // Floating stat card
      gsap.fromTo('.about-image-overlay',
        { opacity: 0, y: 40, x: 40 },
        {
          opacity: 1, y: 0, x: 0, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
        }
      );

      // Content side
      gsap.fromTo('.about-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
        }
      );

      // Batch stat cards
      ScrollTrigger.batch('.about-stat-card', {
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, force3D: true, overwrite: "auto" }
          );
        },
        start: "top 85%",
        once: true
      });

      // GSAP hover for stat cards
      const statCards = sectionRef.current.querySelectorAll('.about-stat-card');
      statCards.forEach(card => {
        const underline = card.querySelector('.stat-underline');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { borderColor: 'rgba(39,163,149,0.2)', boxShadow: '0 10px 25px rgba(39,163,149,0.06)', duration: 0.3, overwrite: "auto" });
          if (underline) gsap.to(underline, { width: 80, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { borderColor: 'rgba(243,244,246,1)', boxShadow: 'none', duration: 0.3, overwrite: "auto" });
          if (underline) gsap.to(underline, { width: 48, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="about-image-main relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/30">
              <div className="aspect-[4/5] lg:aspect-[3/4]">
                <img src="/img.jpeg" alt="Healthcare professionals working" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#354B62]/30 via-transparent to-transparent" />
            </div>

            <div className="about-image-overlay absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#354B62]">10+</div>
                  <div className="text-sm text-gray-500">Years of Excellence</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#27A395]/20 to-[#33A8D3]/10 -z-10" />
          </div>

          {/* Content Side */}
          <div className="about-content">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#27A395]/10 text-[#27A395] text-sm font-semibold mb-4">
              <Users className="w-4 h-4 mr-2" />
              About Indiem
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-6 leading-tight">
              Pioneering{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Healthcare</span>
              {" "}Innovation
            </h2>

            <p className="text-lg text-gray-500 mb-5 leading-relaxed">
              With over a decade of experience in healthcare administration, we understand the unique challenges faced by healthcare providers. Our mission is to simplify complex processes and help you focus on what matters most — patient care.
            </p>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Our team of certified professionals combines deep healthcare industry knowledge with cutting-edge technology to deliver solutions that drive real results for your organization.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="about-stat-card p-5 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[#27A395] to-[#2BBD9E] bg-clip-text text-transparent mb-1">10+</div>
                <div className="text-gray-500 text-sm font-medium">Years Experience</div>
                <div className="stat-underline h-1 rounded-full bg-gradient-to-r from-[#27A395] to-[#2BBD9E] mt-3" style={{ width: 48 }} />
              </div>
              <div className="about-stat-card p-5 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[#33A8D3] to-[#5BC0EB] bg-clip-text text-transparent mb-1">50+</div>
                <div className="text-gray-500 text-sm font-medium">Expert Team Members</div>
                <div className="stat-underline h-1 rounded-full bg-gradient-to-r from-[#33A8D3] to-[#5BC0EB] mt-3" style={{ width: 48 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
