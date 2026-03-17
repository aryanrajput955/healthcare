"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      name: "For Individual Policyholders",
      faqs: [
        {
          q: "How does the 7% claim processing charge work?",
          a: "Members of the Personal Protection Plan pay only 7% of the approved claim amount as processing charges, compared to the standard 10% charged to non-members. For example, on a Rs 50,000 claim, members pay Rs 3,500 instead of Rs 5,000 — a savings of Rs 1,500.",
        },
        {
          q: "Can I use the plan for multiple claims in one year?",
          a: "Yes, your annual membership covers unlimited claim assistance throughout the year. You can file and receive support for multiple claims during your membership period.",
        },
        {
          q: "What happens if my claim is rejected?",
          a: "Our team provides full rejection analysis, documentation rectification, and resubmission support. This service is charged at 20% of the claim amount + GST, applicable for both subscribed and non-subscribed individuals, as well as hospitals. The fee is charged only upon resubmission, not on the initial rejection.",
        },
        {
          q: "Is this plan suitable for cashless claims or only reimbursement?",
          a: "The Personal Protection Plan is primarily designed for reimbursement claims where documentation review and submission guidance are critical. For cashless claims at network hospitals, hospital-level infrastructure is required.",
        },
      ],
    },
    {
      name: "For Hospitals",
      faqs: [
        {
          q: "What happens if we exceed our monthly patient limit?",
          a: "You will be charged Rs 169 per additional patient beyond your base limit. There is no need to upgrade your plan immediately — the overage charges provide flexibility for temporary volume increases.",
        },
        {
          q: "Can we upgrade from Starter to Enterprise mid-month?",
          a: "Yes, upgrades can be processed at any time. The pricing adjustment will be prorated for the remainder of the current billing cycle, and the full Enterprise plan rate will apply from the next cycle.",
        },
        {
          q: "How long does empanelment typically take?",
          a: "Empanelment timelines vary by insurance company, typically ranging from 6–16 weeks from application submission to approval. Our liaison support helps expedite the process where possible.",
        },
        {
          q: "Do you support integration with our existing HMS?",
          a: "Yes, the Enterprise Plan includes integration support for most common HMS platforms. Our technical team will work with your IT department to establish seamless data flow where applicable.",
        },
        {
          q: "What types of insurance claims does the platform support?",
          a: "The platform supports all major health insurance claim types including hospitalisation, day-care procedures, pre and post-hospitalisation expenses, and various reimbursement categories across TPA and non-TPA insurers.",
        },
      ],
    },
  ];

  // Flat list for SEO JSON-LD
  const allFaqs = categories.flatMap(cat => cat.faqs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className="pt-2 md:pt-4 pb-12 md:pb-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-[#1e3347] mb-2">
            Got Questions?
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Everything you need to know about our plans and services.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 className="text-xs font-black text-[#27A395] uppercase tracking-[0.3em] mb-4">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIdx) => {
                  const uniqueId = `${catIdx}-${faqIdx}`;
                  const isOpen = openFaq === uniqueId;
                  
                  return (
                    <div
                      key={faqIdx}
                      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "bg-white border-[#27A395] shadow-xl shadow-[#27A395]/5"
                          : "bg-gray-50/50 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : uniqueId)}
                        className="w-full flex items-center justify-between py-5 px-6 md:px-8 text-left outline-none"
                      >
                        <span
                          className={`text-sm md:text-base font-bold transition-colors leading-tight ${
                            isOpen ? "text-[#27A395]" : "text-[#1e3347]"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ml-4 ${
                            isOpen
                              ? "bg-[#27A395] text-white rotate-180"
                              : "bg-white text-gray-400 shadow-sm"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="pb-6 px-6 md:px-8">
                              <div className="w-full h-px bg-gray-100 mb-4" />
                              <p className="text-gray-500 text-[13px] md:text-sm font-medium leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
