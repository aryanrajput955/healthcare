"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import CloudinaryImage from "./CloudinaryImage";

export default function HeroMain() {
  const sectionRef = useRef(null);

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
          { opacity: 0, x: 40, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        );

      // Floating image animation
      gsap.to(".hm-image", {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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
      className="relative bg-white overflow-hidden py-14 lg:py-20"
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

      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-[#EAF7F5] via-[#F0F9F8] to-transparent pointer-events-none rounded-bl-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-7 z-10">
            {/* Tag */}
            <div className="hm-tag inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#27A395]/10 border border-[#27A395]/20">
              <span className="w-2 h-2 rounded-full bg-[#27A395] animate-pulse" />
              <span className="text-[#27A395] text-sm font-semibold">
                Trusted by 500+ Providers for Streamlined Claims
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-extrabold text-[#1e3347] leading-[1.08] tracking-tight">
                <span className="hm-title block">Never Let a Valid</span>
                <span className="hm-title block mt-1">Health Claim Get</span>
                <span className="hm-title block mt-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">
                  Rejected Again.
                </span>
              </h1>
            </div>

            {/* Sub */}
            <p className="hm-sub text-lg text-gray-500 leading-relaxed max-w-lg">
              We streamline healthcare claim management with cutting-edge AI
              technology and expert support — trusted by 500+ healthcare
              providers nationwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
              <Link href="/signup">
                <button className="hm-btn bg-[#354B62] hover:bg-[#2C3E50] text-white px-7 py-4 rounded-xl font-semibold text-[15px] inline-flex flex-col items-center justify-center shadow-lg shadow-[#354B62]/20 transition-colors duration-200">
                  <span className="text-base font-bold">Protect My Family</span>
                  <span className="text-xs text-white/70 font-normal">
                    (Individuals)
                  </span>
                </button>
              </Link>
              <Link href="/signup">
                <button className="hm-btn bg-[#27A395] hover:bg-[#229188] text-white px-7 py-4 rounded-xl font-semibold text-[15px] inline-flex flex-col items-center justify-center shadow-lg shadow-[#27A395]/25 transition-colors duration-200">
                  <span className="text-base font-bold">
                    Optimize My Hospital
                  </span>
                  <span className="text-xs text-white/70 font-normal">
                    (Providers)
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Doctor Image */}
          <div className="relative flex justify-center lg:justify-end z-10">
            {/* Glow ring */}
            <div className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-3xl bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/10 blur-2xl" />

            <div className="hm-image relative w-full max-w-[520px] rounded-3xl overflow-hidden shadow-2xl shadow-[#354B62]/15">
              <CloudinaryImage
                src="https://res.cloudinary.com/dhlvq35cc/image/upload/v1742033000/doctor-group.jpg" // Placeholder for user
                alt="Healthcare team of doctors"
                width={520}
                height={420}
                priority
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3347]/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-6 -left-4 lg:-left-8 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#354B62]">
                  Claims Approved
                </div>
                <div className="text-xs text-gray-400">98% success rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
