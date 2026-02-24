"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Shield, Users, CheckCircle, FileText, Clock, ArrowRight,
  Heart, Target, Lightbulb, Handshake, Phone, Mail,
  Sparkles, Award, TrendingUp, Eye
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


const coreValues = [
  { icon: Shield, title: "Integrity", text: "Honesty and transparency in every single case we handle" },
  { icon: Heart, title: "Expertise", text: "Deep healthcare domain knowledge from industry insiders" },
  { icon: Users, title: "Communication", text: "Clear, proactive updates at every stage of the process" },
  { icon: Handshake, title: "Zero Risk", text: "Results-based service — you only pay when we deliver" },
];

const expertise = [
  "100% focus on health insurance claims and hospital reimbursement in India",
  "Familiar with all major TPA workflows, IRDAI guidelines, and insurer requirements",
  "Able to handle complex documentation, appeals, and regulatory escalations",
  "Networked with medical experts for complex cases",
];

const differentiators = [
  { icon: Users, title: "Direct Founder Attention", description: "Every case receives personal oversight from our leadership team" },
  { icon: Clock, title: "Agile Processes", description: "No corporate bureaucracy—fast, responsive, and efficient" },
  { icon: FileText, title: "Absolute Transparency", description: "Full visibility at every step with real-time updates" },
  { icon: Shield, title: "Risk-Free Model", description: "Pay only when we deliver measurable results for you" },
];

const processSteps = [
  { step: "Free Consultation", description: "Understand your specific situation and requirements" },
  { step: "Free Case Assessment", description: "Evaluate your hospital case or personal claim with honest advice" },
  { step: "Risk-Free Pilot", description: "Try our expertise with sample cases—zero commitment" },
  { step: "Scale Together", description: "Continue only if you see real value in our partnership" },
];

const compliance = [
  { icon: Shield, text: "100% data protection guidelines and secure document handling" },
  { icon: Handshake, text: "Partnered with legal and medical experts for appeals and escalations" },
  { icon: Eye, text: "Transparent fees with no hidden costs whatsoever" },
];

export default function AboutUsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ──
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });
      heroTl
        .fromTo(".about-hero-badge", { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .fromTo(".about-hero-title", { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.8 }, "-=0.3")
        .fromTo(".about-hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".about-hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .fromTo(".about-hero-image", { opacity: 0, x: 60, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.8 }, "-=0.7")
        .fromTo(".about-hero-accent", { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");

      // Floating orbs
      gsap.to(".about-float", { y: -12, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.6, force3D: true });

      // Hero buttons hover
      const heroCtaBtns = document.querySelectorAll(".about-hero-cta .about-cta-btn");
      heroCtaBtns.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { y: -3, scale: 1.03, boxShadow: "0 16px 32px rgba(39,163,149,0.35)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { y: 0, scale: 1, boxShadow: "0 8px 20px rgba(39,163,149,0.25)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
      });

      const secBtn = document.querySelector(".about-secondary-btn");
      if (secBtn) {
        secBtn.addEventListener("mouseenter", () => {
          gsap.to(secBtn, { y: -3, borderColor: "rgba(39,163,149,0.5)", backgroundColor: "rgba(39,163,149,0.05)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
        secBtn.addEventListener("mouseleave", () => {
          gsap.to(secBtn, { y: 0, borderColor: "rgba(53,75,98,0.15)", backgroundColor: "rgba(255,255,255,0.6)", duration: 0.3, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
      }


      // ── Section entrance animations ──
      const sections = [
        { sel: ".mission-section", children: ".mission-animate" },
        { sel: ".values-section", children: ".value-card" },
        { sel: ".expertise-section", children: ".expertise-item" },
        { sel: ".difference-section", children: ".diff-card" },
        { sel: ".process-section", children: ".process-step" },
        { sel: ".compliance-section", children: ".compliance-card" },
        { sel: ".cta-section", children: ".cta-animate" },
      ];

      sections.forEach(({ sel, children }) => {
        // Header
        const header = document.querySelector(`${sel} .section-header`);
        if (header) {
          gsap.fromTo(header, { opacity: 0, y: 35 }, {
            opacity: 1, y: 0, duration: 0.7, force3D: true,
            scrollTrigger: { trigger: sel, start: "top 85%", once: true }
          });
        }
        // Children batch
        ScrollTrigger.batch(children, {
          onEnter: (batch) => {
            gsap.fromTo(batch, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, force3D: true, overwrite: "auto" });
          },
          start: "top 88%",
          once: true,
        });
      });

      // ── Hover effects ──
      // Value cards
      const valueCards = document.querySelectorAll(".value-card");
      valueCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, boxShadow: "0 20px 40px rgba(39,163,149,0.1)", duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.35, ease: "power2.out", force3D: true, overwrite: "auto" });
        });
      });

      // Diff cards
      const diffCards = document.querySelectorAll(".diff-card");
      diffCards.forEach(card => {
        const icon = card.querySelector(".diff-icon");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -6, boxShadow: "0 20px 40px rgba(39,163,149,0.12)", duration: 0.35, force3D: true, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)", force3D: true, overwrite: "auto" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", duration: 0.35, force3D: true, overwrite: "auto" });
          if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, force3D: true, overwrite: "auto" });
        });
      });

      // CTA button
      const ctaBtn = document.querySelector(".about-cta-btn");
      if (ctaBtn) {
        ctaBtn.addEventListener("mouseenter", () => {
          gsap.to(ctaBtn, { scale: 1.03, boxShadow: "0 16px 32px rgba(39,163,149,0.35)", duration: 0.3, force3D: true, overwrite: "auto" });
        });
        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, { scale: 1, boxShadow: "0 8px 20px rgba(39,163,149,0.2)", duration: 0.3, force3D: true, overwrite: "auto" });
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ═══════════════════════ HERO — Split Light Layout ═══════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-[#f0faf8] min-h-[calc(100vh-64px)] flex items-center">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #354B62 1px, transparent 0)", backgroundSize: "36px 36px" }} />

        {/* Decorative geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="about-float absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#27A395]/[0.06] blur-3xl" />
          <div className="about-float absolute bottom-0 -left-32 w-64 h-64 rounded-full bg-[#33A8D3]/[0.05] blur-3xl" />
          <div className="about-float absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-[#27A395]/40" />
          <div className="about-float absolute top-[25%] left-[8%] w-2 h-2 rounded-full bg-[#33A8D3]/30" />
          {/* Diagonal accent lines */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]" style={{ background: "repeating-linear-gradient(135deg, transparent, transparent 60px, #27A395 60px, #27A395 61px)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — Story */}
            <div>
              <div className="about-hero-badge inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#27A395]/10 text-[#27A395] mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story
              </div>

              <h1 className="about-hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] leading-[1.1] tracking-tight mb-4">
                Born from{" "}
                <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Frustration.</span>
                <br />
                Built with{" "}
                <span className="bg-gradient-to-r from-[#33A8D3] to-[#27A395] bg-clip-text text-transparent">Expertise.</span>
              </h1>

              <p className="about-hero-sub text-base lg:text-lg text-gray-500 leading-relaxed max-w-xl mb-4">
                We saw hospitals losing lakhs to rejected claims, patients drowning in paperwork, and a system that punished the people it was meant to protect. So we decided to fix it.
              </p>

              <p className="about-hero-sub text-sm text-gray-400 leading-relaxed max-w-xl mb-5">
                ClaimTrue was founded by healthcare insiders who spent years navigating India&apos;s insurance maze from the inside — working with TPAs, insurers, and hospital billing teams. We know where claims break, why they get rejected, and exactly how to recover what you&apos;re owed.
              </p>

              {/* Founder quote */}
              <blockquote className="about-hero-sub relative pl-5 border-l-[3px] border-[#27A395] mb-6">
                <p className="text-[15px] text-[#354B62] italic leading-relaxed">
                  &ldquo;Every rejected claim isn&apos;t just a number — it&apos;s a patient who paid premiums for years and deserves better. That&apos;s why we exist.&rdquo;
                </p>
                <footer className="mt-2 text-sm text-gray-400 font-medium not-italic">
                  — Shashank Agnihotri, Founder
                </footer>
              </blockquote>




              <div className="about-hero-cta flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="about-cta-btn bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white px-7 py-3.5 rounded-xl font-semibold text-base inline-flex items-center shadow-lg shadow-[#27A395]/25">
                    Talk to Our Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="#process-section">
                  <button className="about-secondary-btn border-2 border-[#354B62]/15 text-[#354B62] px-7 py-3.5 rounded-xl font-semibold text-base inline-flex items-center bg-white/60 backdrop-blur-sm">
                    See How We Work
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — Image Composition */}
            <div className="about-hero-image relative hidden lg:block max-w-md mx-auto">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/40">
                <div className="aspect-[3/4] max-h-[420px]">
                  <img src="/about.jpeg" alt="ClaimTrue healthcare team at work" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#354B62]/30 via-transparent to-transparent" />
              </div>

              {/* Floating card — founding year */}
              <div className="about-hero-accent absolute -top-6 -left-8 bg-white rounded-2xl shadow-xl shadow-gray-200/60 p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-[#354B62]">Founded 2025</div>
                    <div className="text-xs text-gray-400 font-medium">A Decade of Trust</div>
                  </div>
                </div>
              </div>

              {/* Bottom floating card — zero risk */}
              <div className="about-hero-accent absolute -bottom-5 -right-6 bg-white rounded-2xl shadow-xl shadow-gray-200/60 px-5 py-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#354B62] to-[#4A6A85] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#354B62]">Zero-Risk Model</div>
                    <div className="text-[11px] text-gray-400">Pay only for results</div>
                  </div>
                </div>
              </div>

              {/* Decorative accents */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/10 -z-10" />
              <div className="absolute -top-4 right-8 w-16 h-16 rounded-xl bg-gradient-to-br from-[#33A8D3]/10 to-[#27A395]/5 -z-10" />
              <div className="absolute -right-3 top-[15%] bottom-[15%] w-1.5 rounded-full bg-gradient-to-b from-[#27A395] via-[#33A8D3] to-[#354B62]" />
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27A395]/20 to-transparent" />
      </section>

      {/* ═══════════════════════ MISSION & VISION ═══════════════════════ */}
      <section className="mission-section py-12 lg:py-16 bg-gradient-to-b from-gray-50/80 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#27A395]/10 text-[#27A395] text-sm font-semibold mb-4">
              <Target className="w-4 h-4 mr-2" />
              Our Purpose
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
              Mission &{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Vision</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Vision */}
            <div className="mission-animate relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm">
              <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-[#27A395] to-[#2BBD9E]" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#2BBD9E] flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#354B62]">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Every hospital and patient in India deserves a smooth, honest, and transparent experience with health insurance claims. We envision a system where claims processing is effortless, fair, and human-centered.
              </p>
            </div>

            {/* Mission */}
            <div className="mission-animate relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm">
              <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-[#33A8D3] to-[#5BC0EB]" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#33A8D3] to-[#5BC0EB] flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#354B62]">Our Mission</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Remove the pain and confusion from health claims processing",
                  "Empower hospitals with risk-free, expert support",
                  "Help patients recover what they truly deserve",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#27A395] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CORE VALUES ═══════════════════════ */}
      <section className="values-section py-4 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#33A8D3]/10 text-[#33A8D3] text-sm font-semibold mb-4">
              <Heart className="w-4 h-4 mr-2" />
              What We Stand For
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
              Our Core{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card bg-white rounded-2xl p-7 border border-gray-100 text-center shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-6 h-6 text-[#27A395]" />
                </div>
                <h3 className="text-lg font-bold text-[#354B62] mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ EXPERTISE ═══════════════════════ */}
      <section className="expertise-section py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #354B62 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image side */}
            <div className="section-header relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/30">
                <div className="aspect-[4/3]">
                  <img src="/img.jpeg" alt="Healthcare expertise" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#354B62]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#27A395]/20 to-[#33A8D3]/10 -z-10" />
              <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#33A8D3]/15 to-[#27A395]/10 -z-10" />
            </div>

            {/* Content side */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#27A395]/10 text-[#27A395] text-sm font-semibold mb-4">
                <Award className="w-4 h-4 mr-2" />
                Specialized Knowledge
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#354B62] mb-6 leading-tight">
                Healthcare Claims{" "}
                <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Expertise</span>
              </h2>
              <div className="space-y-4">
                {expertise.map((item, index) => (
                  <div key={index} className="expertise-item flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600 leading-relaxed text-[15px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT MAKES US DIFFERENT ═══════════════════════ */}
      <section className="difference-section py-4 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#354B62]/10 text-[#354B62] text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Why ClaimTrue
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Startup advantages that translate to real benefits for your healthcare organization.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <div key={index} className="diff-card bg-white rounded-2xl p-7 border border-gray-100 text-center shadow-sm">
                <div className="diff-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#354B62] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW WE WORK ═══════════════════════ */}
      <section id="process-section" className="process-section py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-white" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#27A395]/10 text-[#27A395] text-sm font-semibold mb-4">
              <Target className="w-4 h-4 mr-2" />
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
              How We{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Work</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#27A395] via-[#33A8D3] to-[#354B62] rounded-full hidden sm:block" />

            <div className="space-y-6">
              {processSteps.map((item, index) => (
                <div key={index} className="process-step relative flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm sm:ml-0">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#27A395] to-[#33A8D3] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#27A395]/20">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-[#354B62] mb-1">{item.step}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST & COMPLIANCE ═══════════════════════ */}
      <section className="compliance-section py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#354B62]/10 text-[#354B62] text-sm font-semibold mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Trust & Security
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#354B62] mb-5">
              Trust &{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Compliance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {compliance.map((item, index) => (
              <div key={index} className="compliance-card bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#27A395]" />
                </div>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="cta-section relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-[#354B62] via-[#2C3E50] to-[#1e3347] text-white">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#27A395]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#33A8D3]/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-header mb-8">
            <h2 className="cta-animate text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
              Ready to Resolve Your{" "}
              <span className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] bg-clip-text text-transparent">Health Insurance Challenges?</span>
            </h2>
            <p className="cta-animate text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Get your hospital claims or personal health insurance issues resolved — without the hassle or the risk.
            </p>
          </div>

          <Link href="/contact" className="cta-animate inline-block mb-12">
            <button className="about-cta-btn bg-gradient-to-r from-[#27A395] to-[#2BBD9E] text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center shadow-lg shadow-[#27A395]/25">
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="cta-animate flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Mail className="w-5 h-5 text-[#27A395]" />
              <a href="mailto:shashank.agnihotri@indiem.tech" className="text-white/90 text-sm font-medium">shashank.agnihotri@indiem.tech</a>
            </div>
            <div className="cta-animate flex items-center justify-center gap-3 bg-white/[0.08] backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Phone className="w-5 h-5 text-[#33A8D3]" />
              <a href="tel:+919205862303" className="text-white/90 text-sm font-medium">+91-9205862303</a>
            </div>
          </div>

          <p className="cta-animate mt-10 text-white/40 text-sm">
            <strong className="text-white/60">ClaimTrue.in</strong> — Your partner in fair, fast, and honest health insurance claims.
          </p>
        </div>
      </section>
    </div>
  );
}