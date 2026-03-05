"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Clock, Send, User, Building,
  MessageSquare, CheckCircle, Shield, Headphones,
  ArrowRight, Sparkles, Calendar, ChevronDown, FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitForm, validateEmail, validatePhone } from "../lib/form-submission";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our claims specialists",
    value: "+91 9205862303",
    href: "tel:+919205862303",
    availability: "Mon–Sat · 9AM–7PM IST",
    gradient: "from-[#27A395] to-[#2BBD9E]",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a detailed response within 2 hours",
    value: "hello@indiem.tech",
    href: "mailto:hello@indiem.tech",
    availability: "We reply within 2 hours",
    gradient: "from-[#33A8D3] to-[#5BC0EB]",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come meet us at our Noida office",
    value: "Sector-16, Noida",
    href: "https://maps.google.com/?q=Sector+16+Noida",
    availability: "Mon–Fri · 10AM–6PM IST",
    gradient: "from-[#354B62] to-[#4A6A85]",
  },
];

const serviceTypes = [
  "Insurance Claims Processing",
  "Rejected Claims Recovery",
  "Claims Delay Resolution",
  "CMS Portal Development",
  "Form Processing & Digitization",
  "General Inquiry",
  "Partnership Opportunity",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ──
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });
      heroTl
        .fromTo(".contact-hero-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
        .fromTo(".contact-hero-title", { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.7 }, "-=0.2")
        .fromTo(".contact-hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

      // ── Contact method cards batch ──
      ScrollTrigger.batch(".contact-method-card", {
        onEnter: (batch) => {
          gsap.fromTo(batch, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, force3D: true, overwrite: "auto" });
        },
        start: "top 88%",
        once: true,
      });

      // ── Form section entrance ──
      gsap.fromTo(".contact-form-panel", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, force3D: true,
        scrollTrigger: { trigger: ".contact-form-section", start: "top 80%", once: true },
      });
      gsap.fromTo(".contact-info-panel", { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.7, force3D: true,
        scrollTrigger: { trigger: ".contact-form-section", start: "top 80%", once: true },
      });

      // ── Hover effects — contact cards ──
      const cards = document.querySelectorAll(".contact-method-card");
      cards.forEach((card) => {
        const icon = card.querySelector(".card-icon");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, boxShadow: "0 20px 40px rgba(39,163,149,0.12)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)", force3D: true, overwrite: "auto" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, force3D: true, overwrite: "auto" });
        });
      });

      // ── Submit button hover ──
      const submitBtn = document.querySelector(".contact-submit-btn");
      if (submitBtn) {
        submitBtn.addEventListener("mouseenter", () => {
          gsap.to(submitBtn, { scale: 1.02, boxShadow: "0 16px 32px rgba(39,163,149,0.3)", duration: 0.3, force3D: true, overwrite: "auto" });
        });
        submitBtn.addEventListener("mouseleave", () => {
          gsap.to(submitBtn, { scale: 1, boxShadow: "0 8px 20px rgba(39,163,149,0.2)", duration: 0.3, force3D: true, overwrite: "auto" });
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorStatus(null);

    // Client-side validation
    if (!formData.name.trim()) return setErrorStatus('Please enter your name.');
    if (!validateEmail(formData.email)) return setErrorStatus('Please enter a valid email address.');
    if (formData.phone && !validatePhone(formData.phone)) return setErrorStatus('Please enter a valid 10-digit phone number.');
    if (!formData.serviceType) return setErrorStatus('Please select a service interest.');
    if (!formData.message.trim()) return setErrorStatus('Please enter a message.');
    if (formData.message.trim().length < 10) return setErrorStatus('Message must be at least 10 characters.');

    setIsSubmitting(true);
    
    // We can add the organization to the data sent to the API
    const result = await submitForm(formData, 'Contact Page Inquiry');
    
    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", organization: "", serviceType: "", message: "" });
      // Reset submission status after 5 seconds to allow another message
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setErrorStatus(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-[#f0faf8] min-h-[50vh] flex items-center">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #354B62 1px, transparent 0)", backgroundSize: "36px 36px" }} />

        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#27A395]/[0.06] blur-3xl" />
          <div className="absolute bottom-0 -left-28 w-56 h-56 rounded-full bg-[#33A8D3]/[0.05] blur-3xl" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03]" style={{ background: "repeating-linear-gradient(135deg, transparent, transparent 60px, #27A395 60px, #27A395 61px)" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center w-full">
          <div className="contact-hero-badge inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#27A395]/10 text-[#27A395] mb-5">
            <Sparkles className="w-4 h-4 mr-2" />
            We&apos;d Love to Hear from You
          </div>

          <h1 className="contact-hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] leading-[1.1] tracking-tight mb-5">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Conversation</span>
          </h1>

          <p className="contact-hero-sub text-base lg:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
            Whether you&apos;re a hospital battling claim rejections or a patient struggling with paperwork — reach out. Our first consultation is always free.
          </p>

          <div className="contact-hero-sub flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#27A395]" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#27A395]" />
              <span>Expert support</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#27A395]" />
              <span>Zero-risk model</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27A395]/20 to-transparent" />
      </section>

      {/* ═══════════════════════ CONTACT METHOD CARDS ═══════════════════════ */}
      <section className="py-12 lg:py-16 -mt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-method-card block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer"
              >
                <div className={`card-icon w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mb-4 shadow-md`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#354B62] mb-1">{method.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{method.description}</p>
                <p className="text-[#27A395] font-semibold text-[15px] mb-1">{method.value}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {method.availability}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FORM + INFO SECTION ═══════════════════════ */}
      <section className="contact-form-section py-12 lg:py-16 bg-gradient-to-b from-gray-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* ── Form (3 cols) ── */}
            <div className="contact-form-panel lg:col-span-3 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 lg:p-10">
              <div className="mb-7">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#354B62] mb-2">Send Us a Message</h2>
                <p className="text-gray-400 text-sm">We typically respond within 2 hours during business hours.</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white"
                          placeholder="John Doe" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1.5">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white"
                          placeholder="you@example.com" required />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="form-group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-600 mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white"
                          placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="organization" className="block text-sm font-semibold text-gray-600 mb-1.5">Organization</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white"
                          placeholder="Hospital or company name" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-600 mb-1.5">What do you need help with?</label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        id="serviceType"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full pl-10 pr-10 py-3 text-sm text-left border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white transition-all duration-200 flex items-center justify-between ${!formData.serviceType ? 'text-gray-400' : 'text-gray-700'}`}
                      >
                        <FileCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <span className="truncate">
                          {formData.serviceType || "Select a service"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl shadow-black/5 overflow-hidden"
                          >
                            <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                              {serviceTypes.map((service) => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, serviceType: service });
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${formData.serviceType === service ? 'text-[#27A395] font-semibold bg-[#27A395]/5' : 'text-gray-600'}`}
                                >
                                  {formData.serviceType === service && <div className="w-1.5 h-1.5 rounded-full bg-[#27A395]" />}
                                  {service}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-1.5">Your Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 focus:bg-white resize-none"
                      placeholder="Tell us about your situation — claim issues, hospital details, or any questions you have…"
                      required />
                  </div>

                  {errorStatus && (
                    <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl border border-red-100 mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                       {errorStatus}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting}
                    className="contact-submit-btn w-full bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white py-3.5 rounded-xl font-semibold text-base inline-flex items-center justify-center shadow-lg shadow-[#27A395]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Sidebar Info (2 cols) ── */}
            <div className="contact-info-panel lg:col-span-2 space-y-6">

              {/* Office card */}
              <div className="bg-gradient-to-br from-[#354B62] to-[#2C3E50] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#27A395]" />
                  Our Office
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Office No. 101, First Floor, Plot No. A-61,<br />
                  Seven Wonder Business Center,<br />
                  Sector-16, Noida, UP-201301
                </p>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  Mon–Fri · 10AM–6PM IST
                </div>
              </div>

              {/* Quick response promise */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#354B62] mb-3">Why Reach Out?</h3>
                <ul className="space-y-3">
                  {[
                    "Get a free case assessment — no strings attached",
                    "Understand exactly how much you can recover",
                    "Learn about our zero-risk, results-based model",
                    "Start with a pilot — no long-term commitment",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-[#27A395] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency card */}
              <div className="bg-gradient-to-r from-[#27A395]/10 to-[#33A8D3]/10 rounded-2xl p-6 border border-[#27A395]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#27A395] to-[#2BBD9E] flex items-center justify-center shadow-md">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#354B62]">Need Urgent Help?</h4>
                    <p className="text-xs text-gray-400">For time-sensitive claims</p>
                  </div>
                </div>
                <a href="tel:+919205862303" className="text-[#27A395] font-bold text-lg flex items-center gap-2">
                  +91 9205862303
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>



            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
