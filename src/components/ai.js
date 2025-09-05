"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AIServicesSection = () => {
  const serviceRef = useRef();
  const paraRef = useRef();
  const btnRef = useRef();
  const gridRef = useRef();
  const industryRef = useRef();
  const imgRef = useRef();

  const heading = "What We Offer";

  useEffect(() => {
    const letters = serviceRef.current.querySelectorAll(".letter");

    // Heading animation
    gsap.fromTo(
      letters,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: serviceRef.current,
          start: "top 80%",
        },
      }
    );

    // Sub-heading paragraph
    gsap.fromTo(
      paraRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 85%",
        },
      }
    );

    // Button bounce in
    gsap.fromTo(
      btnRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        delay: 0.5,
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
        },
      }
    );

    // Floating effect for main glass image
    gsap.to(imgRef.current, {
      y: -15,
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Services Grid - Stagger fade up
    gsap.fromTo(
      gridRef.current.children,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );

    // Industry Section smooth fade + rise
    gsap.fromTo(
      industryRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: industryRef.current,
          start: "top 85%",
        },
      }
    );

    // ---- Cursor tilt (now working) ----
    const cards = gridRef.current.querySelectorAll(".card");
    const listeners = [];

    cards.forEach((card) => {
      gsap.set(card, { transformPerspective: 1000, transformOrigin: "center" });

      const qx = gsap.quickTo(card, "rotateX", { duration: 0.25, ease: "power2.out" });
      const qy = gsap.quickTo(card, "rotateY", { duration: 0.25, ease: "power2.out" });
      const qs = gsap.quickTo(card, "scale", { duration: 0.25, ease: "power2.out" });

      const onEnter = () => qs(1.05);
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = ((y - cy) / cy) * 12;
        const rotateY = ((x - cx) / cx) * -12;

        qx(rotateX);
        qy(rotateY);
      };
      const onLeave = () => {
        qx(0);
        qy(0);
        qs(1);
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      listeners.push({ card, onEnter, onMove, onLeave });
    });

    return () => {
      listeners.forEach(({ card, onEnter, onMove, onLeave }) => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 py-20">
        {/* Header Section */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-3 items-center">
            {/* Left Content */}
            <div className="col-span-1 lg:col-span-8 flex ml-20 flex-col gap-1">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                ref={serviceRef}
              >
                <div className="flex flex-wrap justify-start">
                  {heading.split("").map((char, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                      <span className="letter inline-block text-gray-900">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    </span>
                  ))}
                </div>
              </h2>

              <p
                ref={paraRef}
                className="text-xl md:text-2xl lg:text-[2rem] font-semibold leading-tight 
             bg-gradient-to-r from-red-700 to-blue-800
             bg-clip-text text-transparent whitespace-nowrap"
              >
                "AI for Everyday Business"
              </p>
            </div>

            {/* Center Image */}
            <div className="absolute -top-33 sm:right-20 lg:right-105">
              <img
                ref={imgRef}
                src="/assets/glass.png"
                alt="AI Illustration"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 object-contain"
              />
            </div>
            {/* Right Content */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 max-w-lg ml-[4rem] pt-18">
              <p className="text-lg text-gray-600 leading-7">
                Our AI-powered solutions are designed to be powerful yet simple,
                serving businesses of any size.
              </p>

              <button
                ref={btnRef}
                className="bg-gradient-to-r from-red-700 to-blue-800 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 flex items-center gap-3 border-none cursor-pointer w-fit hover:shadow-xl"
              >
                <span>Take a Tour</span>
                <span className="arrow transition-transform duration-300 text-xl group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 mb-10 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="card will-change-transform h-40 bg-[radial-gradient(circle_at_top_left,#dc2626,#1e40af)] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#1e40af]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI Cybersecurity
              </h3>
            </div>
            <div className="card will-change-transform h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#dc2626]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Business Process Automation
              </h3>
            </div>
            <div className="card will-change-transform h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#9333ea]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI Chatbots & Assistants
              </h3>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-6">
            <div className="card will-change-transform h-32 md:col-span-3 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg px-6 transition-shadow duration-300 hover:shadow-[0_0_30px_#2563eb]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Smart Accounting & Finance
              </h3>
            </div>

            <div className="card will-change-transform flex-1 bg-[#0F0F0F] border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center text-center p-6 transition-shadow duration-300 hover:shadow-[0_0_30px_#ec4899]">
              <img
                src="/assets/ai.png"
                alt="Generative Content AI"
                className="w-full h-64 object-contain rounded-xl mb-4 bg-black"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Generative Content AI
              </h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="card will-change-transform h-40 bg-[radial-gradient(circle_at_top_left,#dc2626,#1e40af)] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#2563eb]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                E-Commerce AI
              </h3>
            </div>
            <div className="card will-change-transform h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#facc15]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Document & Data Intelligence
              </h3>
            </div>
            <div className="card will-change-transform h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_#22c55e]">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI for Marketing & Sales
              </h3>
            </div>
          </div>
        </div>

        {/* Industry-Focused AI */}
        <div
          ref={industryRef}
          className="card relative bg-[#0F0F0F] text-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden will-change-transform transition-shadow duration-500 hover:shadow-[0_0_40px_#9333ea]"
        >
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_left,#2400ff,#ff0000,transparent_50%)] opacity-60"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_right,#ff0000,#2400ff,transparent_50%)] opacity-60"></div>

          <h3 className="relative z-10 text-2xl md:text-3xl font-medium mb-8 text-center">
            Industry-Focused AI
          </h3>

          <div className="relative z-10 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-lg leading-7">
                Hospitality: Guest dashboards & insights
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-lg leading-7">
                Retail: Billing & engagement automation
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-lg leading-7">
                Healthcare: Smart booking & patient data
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-lg leading-7">
                Education: AI tutoring & smart content
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIServicesSection;
