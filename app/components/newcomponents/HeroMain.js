"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import CloudinaryImage from "./CloudinaryImage";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroMain() {
  const sectionRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773580654/individual_rdge4d.png",
    "https://res.cloudinary.com/dhlvq35cc/image/upload/v1773678666/banner_hmctzt.png", // Use the same for now, user will add 2nd image
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hm-tag",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".hm-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.2"
        )
        .fromTo(
          ".hm-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hm-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hm-image",
          { opacity: 0, scale: 0.8, x: 50 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power4.out" },
          "-=1"
        );



      // Button hover
      const btns = sectionRef.current?.querySelectorAll(".hm-btn") || [];
      btns.forEach((btn) => {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { y: -2, duration: 0.2, overwrite: "auto" })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { y: 0, duration: 0.2, overwrite: "auto" })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden min-h-[calc(100vh-64px)] flex items-center"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #354B62 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Decorative gradient blob - REMOVED per user request */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          {/* Left content (Swapped to Left) */}
          <div className="space-y-6 md:space-y-7 z-10 text-center lg:text-left order-1">


            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] xl:text-[3.2rem] font-extrabold text-[#1e3347] leading-[1.2] md:leading-[1.15] tracking-tight">
                <span className="hm-title block">Never Let a Valid</span>
                <span className="hm-title block mt-1">Health Claim Get</span>
                <span className="hm-title block mt-1 pb-2 bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">
                  Rejected
                </span>
              </h1>
            </div>

            {/* Sub */}
            <p className="hm-sub text-base md:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Take control of your healthcare journey with AI-driven insights
              and dedicated advocacy. We ensure your claims are handled with the
              care, clarity, and speed you deserve.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-1 justify-center lg:justify-start">
              <Link href="/personal-protection">
                <button className="hm-btn w-full sm:w-[250px] bg-[#354B62] hover:bg-[#2C3E50] text-white py-4 rounded-2xl font-bold inline-flex flex-col items-center justify-center shadow-xl shadow-[#354B62]/20 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-base md:text-lg">Protect My Family</span>
                  <span className="text-[10px] md:text-xs text-white/60 font-medium">
                    (Individuals)
                  </span>
                </button>
              </Link>
              <Link href="/hospital-protection">
                <button className="hm-btn w-full sm:w-[250px] bg-[#27A395] hover:bg-[#229188] text-white py-4 rounded-2xl font-bold inline-flex flex-col items-center justify-center shadow-xl shadow-[#27A395]/25 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-base md:text-lg">
                    Optimize My Hospital
                  </span>
                  <span className="text-[10px] md:text-xs text-white/60 font-medium">
                    (Providers)
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Image (Swapped to Right) */}
          <div className="relative flex justify-center lg:justify-end z-10 order-2">
            {/* Soft ambient glow instead of a structured ring */}
            <div className="absolute inset-0 m-auto w-[110%] h-[110%] bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/5 blur-3xl pointer-events-none" />

            <div className="hm-image relative w-full lg:max-w-[680px] h-[350px] sm:h-[450px] lg:h-[550px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <CloudinaryImage
                    src={images[currentImageIndex]}
                    alt="Healthcare team of doctors"
                    width={680}
                    height={550}
                    priority
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
