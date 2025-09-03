"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AIServicesSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsGridRef = useRef(null);
  const abstractShapeRef = useRef(null);
  const industryCardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;
    const cardsGrid = cardsGridRef.current;
    const abstractShape = abstractShapeRef.current;
    const industryCard = industryCardRef.current;

    if (
      !container ||
      !title ||
      !subtitle ||
      !description ||
      !button ||
      !cardsGrid ||
      !abstractShape ||
      !industryCard
    )
      return;

    // Set initial states for all elements
    gsap.set([title, subtitle, description, button], { opacity: 0, y: 50 });
    gsap.set(abstractShape, { opacity: 0, scale: 0.5, rotation: -20 });
    gsap.set(cardsGrid.children, { opacity: 0, y: 80, scale: 0.8 });
    gsap.set(industryCard, { opacity: 0, y: 100 });

    // Create main timeline
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Header animations
    mainTimeline
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .to(
        abstractShape,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
        },
        "-=1.2"
      );

    // Cards animation with stagger
    const cardElements = Array.from(cardsGrid.children);
    mainTimeline.to(
      cardElements,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 0.6,
          from: "start",
        },
      },
      "-=0.8"
    );

    // Industry card animation
    mainTimeline.to(
      industryCard,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Individual card hover animations
    cardElements.forEach((card) => {
      const cardElement = card;

      // Add unique entrance delay based on position
      gsap.set(cardElement, {
        transformOrigin: "center center",
        willChange: "transform",
      });

      const handleMouseEnter = () => {
        gsap.to(cardElement, {
          scale: 1.08,
          y: -15,
          rotationY: 5,
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        });
      };

      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);
    });

    // Button animations
    const handleButtonEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      const arrow = button.querySelector(".arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleButtonLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const arrow = button.querySelector(".arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    button.addEventListener("mouseenter", handleButtonEnter);
    button.addEventListener("mouseleave", handleButtonLeave);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-3 items-center">
            {/* Left Content */}
            <div className="col-span-1 lg:col-span-8 flex ml-9 flex-col gap-1">
              <h1
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight text-gray-900"
              >
                What We Offer
              </h1>

              <p
                ref={subtitleRef}
                className="text-xl md:text-2xl lg:text-[2rem] font-semibold leading-tight 
             bg-[linear-gradient(to_right,
             theme(colors.orange.500)_10%,
             theme(colors.pink.500)_50%,
             theme(colors.purple.600)_100%)]
             bg-clip-text text-transparent whitespace-nowrap"
              >
                "AI for Everyday Business"
              </p>
            </div>

            {/* Center Image */}
            <div className="absolute -top-33 sm:right-20 lg:right-105">
              <img
                src="/assets/glass.png"
                alt="AI Illustration"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 object-contain"
              />
            </div>
            {/* Right Content */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 max-w-lg ml-[4rem] pt-18">
              <p
                ref={descriptionRef}
                className="text-lg text-gray-600 leading-7"
              >
                Our AI-powered solutions are designed to be powerful yet simple,
                serving businesses of any size.
              </p>

              <button
                ref={buttonRef}
                className="bg-gradient-to-r from-red-700 to-blue-800 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 flex items-center gap-3 border-none cursor-pointer w-fit"
              >
                <span>Take a Tour</span>
                <span className="arrow transition-transform duration-300 text-xl">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid - Custom Layout */}
        <div className="grid grid-cols-1 mb-10 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="h-40 bg-[radial-gradient(circle_at_top_left,#dc2626,#1e40af)] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI Cybersecurity
              </h3>
            </div>
            <div className="h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Business Process Automation
              </h3>
            </div>
            <div className="h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI Chatbots & Assistants
              </h3>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-6">
            {/* Smart Accounting - Wider */}
            <div className="h-32 md:col-span-3 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg px-6">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Smart Accounting & Finance
              </h3>
            </div>

            {/* Large Center Card */}
            <div className="flex-1 bg-[#0F0F0F] border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center text-center p-6">
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
            <div className="h-40 bg-[radial-gradient(circle_at_top_left,#dc2626,#1e40af)] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                E-Commerce AI
              </h3>
            </div>
            <div className="h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                Document & Data Intelligence
              </h3>
            </div>
            <div className="h-40 bg-[#0F0F0F] text-white rounded-2xl flex items-center justify-center shadow-lg">
              <h3 className="text-lg font-medium whitespace-nowrap">
                AI for Marketing & Sales
              </h3>
            </div>
          </div>
        </div>

        {/* Industry-Focused AI */}
        <div
          ref={industryCardRef}
          className="relative bg-[#0F0F0F] text-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden"
        >
          {/* Left Gradient */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_left,#2400ff,#ff0000,transparent_50%)] opacity-60"></div>

          {/* Right Gradient */}
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
