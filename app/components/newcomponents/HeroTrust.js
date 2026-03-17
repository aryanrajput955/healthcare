"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CloudinaryImage from "./CloudinaryImage";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTrust() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ht-badge",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".ht-powered",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      id: "iso-9001",
      label: "ISO 9001",
      sublabel: "Quality Management",
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1742033000/iso-9001-sample.png", // Example placeholder, user will update
    },
    {
      id: "isd-e3601",
      label: "ISD E3601",
      sublabel: "Excellence Standard",
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1742033000/isd-sample.png",
    },
    {
      id: "iso-20000",
      label: "ISO 20000",
      sublabel: "IT Service Mgmt",
      src: "https://res.cloudinary.com/dhlvq35cc/image/upload/v1742033000/iso-20000-sample.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-r from-[#EBF8F7] via-[#F0FAFD] to-[#E8F6F4] border-y border-[#27A395]/10 py-8 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Certification badges */}
          <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center sm:justify-start">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="ht-badge flex items-center gap-4 group"
              >
                <div className="w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <CloudinaryImage
                    src={cert.src}
                    alt={cert.label}
                    width={64}
                    height={64}
                    className="object-contain" // Use object-contain for logos/badges
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#354B62]">
                    {cert.label}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {cert.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block w-px h-12 bg-[#27A395]/10" />

          {/* Powered by Indiem Tech with Image Logo */}
          <div className="ht-powered flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">
                Powered by
              </div>
              <div className="flex items-center gap-3">
                <CloudinaryImage
                  src="https://res.cloudinary.com/dhlvq35cc/image/upload/v1742033000/indiem-logo.png" // User will update
                  alt="Indiem Tech Logo"
                  width={36}
                  height={36}
                  className="rounded-lg shadow-sm"
                />
                <div>
                  <span className="text-2xl font-extrabold text-[#354B62] tracking-tighter">
                    Indiem
                  </span>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent tracking-tighter">
                    Tech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
