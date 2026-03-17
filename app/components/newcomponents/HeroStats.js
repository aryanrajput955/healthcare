"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Clock, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroStats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats with a nicer staggered reveal
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { 
      val: "60%", 
      label: "Fewer Rejections", 
      sub: "Industry leading accuracy",
      icon: ShieldCheck,
      color: "from-[#27A395] to-[#229188]"
    },
    { 
      val: "40%", 
      label: "Faster Payouts", 
      sub: "Optimized filing speed",
      icon: Clock,
      color: "from-[#33A8D3] to-[#298EBD]"
    },
    { 
      val: "24/7", 
      label: "Live Support", 
      sub: "Expert advocacy team",
      icon: Headphones,
      color: "from-[#354B62] to-[#1e3347]"
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAFCFF] relative overflow-hidden">
      {/* Subtle abstract background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#27A395]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* Icon with Glowing background */}
              <div className="mb-8 relative w-16 h-16">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-2xl blur-lg group-hover:opacity-20 transition-opacity`} />
                <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  <stat.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                   <h3 className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent tracking-tighter`}>
                    {stat.val}
                  </h3>
                </div>
                
                <div>
                  <h4 className="text-lg font-extrabold text-[#1e3347] tracking-tight">
                    {stat.label}
                  </h4>
                  <p className="text-sm font-medium text-slate-400">
                    {stat.sub}
                  </p>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className={`absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] rounded-full scale-0 group-hover:scale-150 transition-all duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

