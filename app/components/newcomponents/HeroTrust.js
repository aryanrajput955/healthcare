"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CloudinaryImage from "./CloudinaryImage";
import { ShieldCheck, Award, Lock, Cpu, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTrust() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ht-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".ht-author-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Add custom style to hide scrollbar while keeping functionality
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const certifications = [
    {
      id: "iso-9001",
      label: "ISO 9001",
      sublabel: "Quality Assured",
      icon: Award,
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773573625/iso_jnngce.png",
    },
    {
      id: "iso-27001",
      label: "ISO 27001",
      sublabel: "Data Security",
      icon: Lock,
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773573627/iso27001_shlia1.png",
    },
    {
      id: "iso-20000",
      label: "ISO 20000",
      sublabel: "IT Excellence",
      icon: Cpu,
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773573625/iso20000_kjei72.webp",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8FAFC] py-12 md:py-16 relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="ht-card inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 mb-4">
            <ShieldCheck size={14} className="text-[#27A395]" strokeWidth={2.5} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified & Secure</span>
          </div>
          <h2 className="ht-card text-2xl md:text-3xl font-[900] text-[#1e3347] tracking-tight">
            Built on <span className="text-[#27A395]">Industry Excellence</span>
          </h2>
        </div>

        <div className="relative group mt-8 mb-16">
          {/* Mobile-only Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-[#27A395] active:scale-95 transition-all"
            aria-label="Previous certificate"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-[#27A395] active:scale-95 transition-all"
            aria-label="Next certificate"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 lg:gap-8 px-2 hide-scrollbar snap-x snap-mandatory"
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="ht-card flex-shrink-0 w-[85%] sm:w-[60%] md:w-full snap-center group relative p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle accent gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-5 relative">
                    <div className="absolute inset-0 bg-[#E8F6F4] rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-white rounded-2xl border border-[#27A395]/10 flex items-center justify-center shadow-inner group-hover:border-[#27A395]/30 transition-colors">
                      <CloudinaryImage
                        src={cert.src}
                        alt={cert.label}
                        width={56}
                        height={56}
                        className="object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 scale-95 group-hover:scale-100"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-black text-[#1e3347] tracking-tight uppercase mb-1">
                    {cert.label}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {cert.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authoritative Backing Section */}
        <div className="flex flex-col items-center pt-8 border-t border-slate-100">
          <div className="ht-author-tag flex flex-col items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">A Product Of</span>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] shadow-[0_15px_35px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-500 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                <CloudinaryImage
                  src="https://res.cloudinary.com/dhlvq35cc/image/upload/v1773573629/logo_wb6akc.png"
                  alt="Indiem Tech Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 relative z-10"
                />
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="flex flex-col leading-none">
                <div className="flex items-center tracking-tighter">
                  <span className="text-lg font-black text-[#354B62]">INDIEM</span>
                  <span className="text-lg font-black text-[#27A395]">TECH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#27A395]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#33A8D3]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
    </section>
  );
}

