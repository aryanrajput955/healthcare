"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldCheck, Zap, Clock, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroStats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats
      gsap.fromTo(
        ".stat-box",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate Price Cards
      gsap.fromTo(
        ".price-card",
        { opacity: 0, x: (i) => (i === 0 ? -40 : 40), scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".pricing-container",
            start: "top 80%",
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
      icon: ShieldCheck,
      color: "text-[#27A395]"
    },
    { 
      val: "40%", 
      label: "Faster Reimbursements", 
      icon: Clock,
      color: "text-[#33A8D3]"
    },
    { 
      val: "24/7", 
      label: "Support Available", 
      icon: Headphones,
      color: "text-[#354B62]"
    },
  ];

  const plans = [
    {
      title: "Individual Plan",
      price: "₹499/year",
      tag: "For Families",
      features: [
        "Dedicated Claim Support",
        "Family Coverage",
        "Family Coverage", // As per image
        "Claims Delay Resolution",
        "Claim Stat Support",
      ],
      color: "border-[#27A395]",
      btnColor: "bg-[#27A395]",
    },
    {
      title: "Provider Plan",
      price: "₹1,499/month",
      tag: "For Hospitals",
      features: [
        "AI-Powered Claim Analysis",
        "Rejected Claim Claims",
        "Unlimited Priority Recovery",
        "Clinimate Heart Claims",
        "Priority Processing",
      ],
      color: "border-[#33A8D3]",
      btnColor: "bg-[#33A8D3]",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 stats-container">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-box flex items-center justify-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100/80 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <div className={`text-4xl font-black ${stat.color} tracking-tight`}>
                  {stat.val}
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pricing-container">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`price-card relative p-8 lg:p-10 rounded-3xl border-2 ${plan.color} bg-white shadow-2xl shadow-gray-200/50 flex flex-col`}
            >
              {/* Plan Tag */}
              <div className={`absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 rounded-full text-white text-xs font-bold ${plan.btnColor} shadow-lg shadow-black/10`}>
                {plan.price}
              </div>

              <h3 className="text-2xl font-extrabold text-[#354B62] mb-6">
                {plan.title}
              </h3>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center ${idx === 0 ? 'bg-[#27A395]/10 text-[#27A395]' : 'bg-[#33A8D3]/10 text-[#33A8D3]'}`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-white font-bold text-sm ${plan.btnColor} shadow-lg shadow-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all`}>
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
