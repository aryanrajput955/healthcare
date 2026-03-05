"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { CheckCircle, Shield, Award, FileCheck, Phone, Mail, ArrowRight, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitForm, validateEmail, validatePhone } from '../lib/form-submission';

export default function Hero() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const pulseRef = useRef(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceType: '', message: ''
  });
  const [errorStatus, setErrorStatus] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const serviceTypes = [
    "Insurance Claims Processing", "Rejected Claims Recovery",
    "Claims Delay Resolution", "Technical Support",
    "CMS Portal Development", "Form Submissions & Processing"
  ];

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
    const result = await submitForm(formData, 'Hero Service Consultation');
    
    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    } else {
      setErrorStatus(result.error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

      tl.fromTo('.hero-badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
      .fromTo('.hero-title-line',
        { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.15 }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo('.hero-stat',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo('.hero-cta-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(formRef.current,
        { opacity: 0, x: 40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7 },
        "-=0.5"
      );

      // Floating decorative orbs
      gsap.to('.float-element', {
        y: -15, duration: 3, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: 0.5, force3D: true
      });

      // Pulsing green dot via GSAP instead of CSS animate-pulse
      gsap.to(pulseRef.current, {
        opacity: 0.4, duration: 1, repeat: -1, yoyo: true,
        ease: "sine.inOut"
      });

      // GSAP hover for CTA buttons
      const ctaBtns = heroRef.current.querySelectorAll('.hero-cta-btn');
      ctaBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { y: -2, duration: 0.25, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { y: 0, duration: 0.25, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative text-white min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/img4.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3347]/95 via-[#354B62]/90 to-[#2C3E50]/85" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-[15%] right-[12%] w-20 h-20 rounded-full bg-[#27A395]/10 blur-xl" />
        <div className="float-element absolute top-[60%] right-[25%] w-32 h-32 rounded-full bg-[#33A8D3]/8 blur-2xl" />
        <div className="float-element absolute bottom-[20%] left-[8%] w-24 h-24 rounded-full bg-[#27A395]/6 blur-xl" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="hero-badge inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm">
              <div ref={pulseRef} className="w-2 h-2 rounded-full bg-[#27A395] mr-3" />
              <span className="text-white/90">ISO Certified Healthcare Management Solutions</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
                <span className="hero-title-line block">Professional Healthcare</span>
                <span className="hero-title-line block mt-2">
                  <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Management</span>
                  {" "}Solutions
                </span>
              </h1>
            </div>

            <p className="hero-subtitle text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
              Streamline your healthcare operations with enterprise-grade claims processing, custom CMS development, and comprehensive technical support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/signup">
                <button className="hero-cta-btn bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center shadow-lg shadow-[#27A395]/25">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="#services">
                <button className="hero-cta-btn border-2 border-white/20 bg-white/[0.06] backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center">
                  View Services
                </button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-5">
            <div className="bg-white/[0.97] backdrop-blur-md rounded-2xl shadow-2xl shadow-black/20 p-7 lg:p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#354B62]">Get Free Consultation</h2>
                  <p className="text-xs text-gray-500">We respond within 2 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="hero-name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" id="hero-name" name="name" value={formData.name} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none text-gray-800 text-sm bg-gray-50/50"
                        placeholder="Enter your name" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="hero-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="email" id="hero-email" name="email" value={formData.email} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 text-gray-800 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50"
                          placeholder="Email address" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="hero-phone" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="tel" id="hero-phone" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full text-gray-800 text-sm pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50"
                          placeholder="Phone number" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="hero-serviceType" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Service Interest</label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        id="hero-serviceType"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full pl-10 pr-4 py-3 text-sm text-left border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 flex items-center justify-between transition-all duration-200 ${!formData.serviceType ? 'text-gray-400' : 'text-gray-800'}`}
                      >
                        <FileCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl shadow-black/10 overflow-hidden"
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
                                  className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${formData.serviceType === service ? 'text-[#27A395] font-semibold bg-[#27A395]/5' : 'text-gray-700'}`}
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
                  <div>
                    <label htmlFor="hero-message" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea id="hero-message" name="message" value={formData.message} onChange={handleChange} rows={2}
                      className="w-full px-4 py-3 border text-gray-800 text-sm border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395]/30 focus:border-[#27A395] outline-none bg-gray-50/50 resize-none"
                      placeholder="Tell us about your needs..." required></textarea>
                  </div>
                  {errorStatus && (
                    <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl border border-red-100 mb-2">
                      {errorStatus}
                    </div>
                  )}
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#27A395]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Sending...</>
                    ) : (
                      <><Mail className="w-4 h-4 mr-2" />Send Message</>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">🔒 Your information is secure and will never be shared</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
