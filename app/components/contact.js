"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }
        }
      );

      // Batch cards
      ScrollTrigger.batch('.contact-card', {
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, force3D: true, overwrite: "auto" }
          );
        },
        start: "top 85%",
        once: true
      });

      // GSAP hover for contact cards
      const cards = sectionRef.current.querySelectorAll('.contact-card');
      cards.forEach(card => {
        const icon = card.querySelector('.contact-icon');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -4,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.15)',
            duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto"
          });
          if (icon) gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)", force3D: true, overwrite: "auto" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.08)',
            duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto"
          });
          if (icon) gsap.to(icon, { scale: 1, duration: 0.3, force3D: true, overwrite: "auto" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-28 relative overflow-hidden bg-gradient-to-br from-[#354B62] via-[#2C3E50] to-[#1e3347]">
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#27A395]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#33A8D3]/6 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-header text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.08] text-white/80 text-sm font-semibold mb-4 border border-white/10">
            <Phone className="w-4 h-4 mr-2 text-[#27A395]" />
            Contact Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Ready to streamline your healthcare operations? Our team is here to help you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="contact-card text-center p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm">
            <div className="contact-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#2BBD9E] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#27A395]/20">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
            <p className="text-white/60 mb-3 text-sm">Available 24/7 for your needs</p>
            <a href="tel:+919205862303" className="text-[#27A395] font-semibold text-lg">+91 9205862303</a>
          </div>

          <div className="contact-card text-center p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm">
            <div className="contact-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-[#33A8D3] to-[#5BC0EB] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#33A8D3]/20">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-white/60 mb-3 text-sm">We reply within 2 hours</p>
            <a href="mailto:hello@indiem.tech" className="text-[#33A8D3] font-semibold text-lg">hello@indiem.tech</a>
          </div>

          <div className="contact-card text-center p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm">
            <div className="contact-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#354B62] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#27A395]/20">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
            <p className="text-white/60 mb-3 text-sm">Come say hello</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Office No. 101, First Floor, Plot No. A-61,<br />
              Seven Wonder Business Center,<br />
              Sector-16, Noida, UP-201301
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
