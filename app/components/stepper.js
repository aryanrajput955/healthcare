"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SplitScreenProcess = () => {
  const stepsRef = useRef([]);
  const imageRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Initial Consultation",
      image: "/step1.jpg",
      subPara:
        "Our process begins with a personalized consultation to understand your healthcare needs, ensuring a tailored approach to your requirements.",
    },
    {
      number: 2,
      title: "Detailed Assessment",
      image: "/step2.jpg",
      subPara:
        "We conduct a thorough assessment of your claims and services, leveraging advanced tools to identify optimal solutions for your organization.",
    },
    {
      number: 3,
      title: "Efficient Processing",
      image: "/step3.jpg",
      subPara:
        "Our team efficiently processes your requests with precision, utilizing streamlined workflows to minimize delays and maximize accuracy.",
    },
    {
      number: 4,
      title: "Quality Review",
      image: "/step4.jpg",
      subPara:
        "Each step undergoes a rigorous quality review to ensure compliance and excellence, guaranteeing the highest standards of service delivery.",
    },
    {
      number: 5,
      title: "Seamless Delivery",
      image: "/step5.jpg",
      subPara:
        "We conclude with a seamless delivery of services, providing you with comprehensive support to integrate solutions into your operations.",
    },
  ];

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98, filter: "blur(3px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power1.out",
        }
      );
    }

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        gsap.set(step, { height: activeStep === index && isExpanded ? "auto" : "60px" });
        gsap.fromTo(
          step,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out",
          }
        );
      });
    });

    return () => ctx.revert();
  }, [activeStep, isExpanded]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setIsExpanded(true);
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        gsap.to(step, {
          height: i === index && isExpanded ? "auto" : "60px",
          paddingBottom: i === index && isExpanded ? "1.5rem" : "0.75rem",
          duration: 0.3,
          ease: "power1.out",
          onStart: () => gsap.set(step, { overflow: "hidden" }),
          onComplete: () => gsap.set(step, { overflow: "visible" }),
        });
      });
    });
    ctx.revert();
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#F5F7FA] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#354B62] text-center mb-10">
          Our Streamlined Process
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto">
          Explore a professional 5-step journey designed to deliver healthcare
          solutions with precision and ease.
        </p>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Steps */}
          <div className="w-full lg:w-1/2 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[index] = el)}
                onClick={() => handleStepClick(index)}
                className={`p-4 rounded-xl shadow-md border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden relative group ${
                  activeStep === index
                    ? "bg-gradient-to-r from-[#27A395]/30 via-[#33A8D3]/10 to-transparent text-[#27A395]"
                    : "bg-white hover:bg-gray-50 text-[#354B62]"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 text-lg font-semibold transition-all duration-300 ${
                      activeStep === index
                        ? "bg-[#33A8D3] text-white"
                        : "bg-gray-100  text-[#354B62] group-hover:bg-[#33A8D3]/20 group-hover:text-[#27A395]"
                    }`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                {activeStep === index && isExpanded && (
                  <p className="text-base text-gray-600 mt-4 leading-relaxed">
                    {step.subPara}
                  </p>
                )}
                <div
                  className={`absolute -bottom-2 left-6 w-16 h-1 bg-[#27A395] rounded-full opacity-0 transition-opacity duration-300 ${
                    activeStep === index ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-[#27A395]/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative">
            <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
              <img
                ref={imageRef}
                src={steps[activeStep].image}
                alt={`${steps[activeStep].title} Image`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#354B62]/50 to-transparent rounded-xl" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-medium">
                  Step {steps[activeStep].number}: {steps[activeStep].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitScreenProcess;