"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Disclaimer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".disclaimer-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#1e3347] mb-4 tracking-tight">
            Disclaimers & Important Notes
          </h1>
          <p className="text-sm font-bold text-[#27A395] uppercase tracking-widest">
            Effective Date: March 17, 2026
          </p>
        </div>
      </section>

      {/* Clean Content Area */}
      <section className="py-16 md:py-24">
        <div ref={containerRef} className="max-w-3xl mx-auto px-6 disclaimer-content">
          <div className="prose prose-slate prose-lg max-w-none space-y-12">
            
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#1e3347] tracking-tight">
                Important Notice Regarding Empanelment Approval
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Empanelment approval is subject to the individual criteria, policies, and decisions of each insurance company. Our platform provides comprehensive application support, documentation preparation, and liaison services; however, final authority rests solely with the respective insurance company. Empanelment approval is not guaranteed.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#1e3347] tracking-tight">
                Subscription Terms and Billing
              </h2>
              <ul className="list-disc pl-5 space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <li><span className="font-bold text-[#1e3347]">Personal Protection Plan:</span> Annual membership fee of Rs 499 is non-refundable once activated</li>
                <li><span className="font-bold text-[#1e3347]">Hospital Plans:</span> All subscription fees are charged monthly and are non-refundable for the ongoing month</li>
                <li>The post-empanelment service fee of Rs 9,999 per insurer (Enterprise Plan) is charged only upon confirmed and successful empanelment approval</li>
                <li>Additional patient charges (hospital plans) are billed based on the total patients processed in the billing period beyond the base plan limit</li>
                <li>All prices are in Indian Rupees (INR) and are subject to applicable taxes</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#1e3347] tracking-tight">
                Service Scope and Limitations
              </h2>
              <ul className="list-disc pl-5 space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <li>Claim filing and approval are ultimately subject to insurance company policies and decisions</li>
                <li>The platform provides documentation support, audit services, and guidance — final claim approval rests with the insurer</li>
                <li>Processing timelines may vary based on insurance company responsiveness and complexity of claims</li>
                <li>Hospital plans require active participation from hospital staff for optimal results</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#1e3347] tracking-tight">
                Data Privacy and Security
              </h2>
              <ul className="list-disc pl-5 space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <li>All patient and claim data is handled in compliance with applicable data protection regulations</li>
                <li>Secure encryption protocols protect sensitive medical and financial information</li>
                <li>Access controls ensure only authorised personnel can view patient claim files</li>
                <li>Regular security audits and compliance reviews are conducted</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#1e3347] tracking-tight">
                Plan Changes and Cancellations
              </h2>
              <ul className="list-disc pl-5 space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <li><span className="font-bold text-[#1e3347]">Personal Protection Plan:</span> Annual membership is non-refundable; services available for full 12 months from activation</li>
                <li><span className="font-bold text-[#1e3347]">Hospital Plans:</span> Subscription changes (upgrade/downgrade) take effect from the next billing cycle</li>
                <li>Cancellation requests must be submitted before the next billing cycle to avoid charges</li>
                <li>No refunds for partial months or unused patient quotas</li>
              </ul>
            </div>

            <div className="pt-12 border-t border-slate-100 text-center">
              <p className="text-slate-500 mb-4">Need further clarification?</p>
              <a href="mailto:hello@indiem.tech" className="text-[#27A395] font-black hover:underline underline-offset-4">
                hello@indiem.tech
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
