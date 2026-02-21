"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, FileText, Clock, Headphones, Database, FormInput, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, force3D: true,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }
        }
      );

      // Batch animate cards for better perf than individual ScrollTriggers
      ScrollTrigger.batch('.service-card', {
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 50, rotateX: 5 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.1, force3D: true, overwrite: "auto" }
          );
        },
        start: "top 85%",
        once: true
      });

      // GSAP hover effects for service cards
      const cards = sectionRef.current.querySelectorAll('.service-card');
      cards.forEach(card => {
        const accentLine = card.querySelector('.card-accent');
        const icon = card.querySelector('.card-icon');
        const learnMore = card.querySelector('.card-learn-more');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, boxShadow: '0 20px 40px rgba(39,163,149,0.08)', duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto" });
          gsap.to(card, { borderColor: 'rgba(39,163,149,0.2)', duration: 0.3, overwrite: "auto" });
          if (accentLine) gsap.to(accentLine, { opacity: 1, duration: 0.3, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)", force3D: true, overwrite: "auto" });
          if (learnMore) gsap.to(learnMore, { opacity: 1, y: 0, duration: 0.3, overwrite: "auto" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto" });
          gsap.to(card, { borderColor: 'rgba(243,244,246,1)', duration: 0.3, overwrite: "auto" });
          if (accentLine) gsap.to(accentLine, { opacity: 0, duration: 0.3, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1, duration: 0.3, force3D: true, overwrite: "auto" });
          if (learnMore) gsap.to(learnMore, { opacity: 0, y: 8, duration: 0.3, overwrite: "auto" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Shield, title: "Insurance Claims Processing", description: "Streamline your insurance claims with our expert processing services. We handle everything from initial submission to final approval.", color: "from-[#27A395] to-[#2BBD9E]" },
    { icon: FileText, title: "Rejected Claims Recovery", description: "Don't let rejected claims cost you money. Our specialists review and resubmit claims with higher success rates.", color: "from-[#33A8D3] to-[#5BC0EB]" },
    { icon: Clock, title: "Claims Delay Resolution", description: "Expedite delayed claims with our proven follow-up processes and direct insurer relationships.", color: "from-[#354B62] to-[#4A6A85]" },
    { icon: Headphones, title: "24/7 Technical Support", description: "Round-the-clock technical assistance for all your healthcare management system needs.", color: "from-[#27A395] to-[#33A8D3]" },
    { icon: Database, title: "CMS Portal Development", description: "Custom Content Management Systems tailored for healthcare providers with HIPAA compliance.", color: "from-[#33A8D3] to-[#354B62]" },
    { icon: FormInput, title: "Form Submissions & Processing", description: "Automated form processing solutions that reduce manual work and improve accuracy.", color: "from-[#354B62] to-[#27A395]" }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-28 bg-gradient-to-b from-gray-50/80 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="services-header text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#27A395]/10 text-[#27A395] text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
            Healthcare Solutions That{" "}
            <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Deliver Results</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Comprehensive management solutions designed to optimize your operations, boost efficiency, and improve patient outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card relative bg-white rounded-2xl p-7 border border-gray-100">
              <div className={`card-accent absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r ${service.color} opacity-0`} />
              <div className={`card-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#354B62] mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">{service.description}</p>
              <div className="card-learn-more mt-5 flex items-center text-[#27A395] font-semibold text-sm opacity-0 translate-y-2">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
