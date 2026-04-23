import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  Crown,
  Mail,
  Zap,
  Calendar,
  Users,
  BarChart,
  Rocket,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Plans = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const tabsRef = useRef(null);

  const [activeTab, setActiveTab] = useState("monthly");

  const plans = {
    monthly: [
      {
        id: "starter",
        name: "Starter",
        icon: Rocket,
        price: "$19",
        period: "/month",
        color: "from-blue-500 to-cyan-500",
        badge: "Best for Beginners",
        description:
          "Perfect for early-stage projects to build, test, and launch quickly.",
        features: [
          { name: "500K API Requests", included: true },
          { name: "1 GB Database Storage", included: true },
          { name: "250 GB Bandwidth", included: true },
          { name: "50 GB File Storage", included: true },
          { name: "Automated Daily Backups", included: true },
        ],
        cta: "Get Started",
        popular: false,
        saveAmount: null,
      },
      {
        id: "growth",
        name: "Growth",
        icon: Zap,
        price: "$89",
        period: "/month",
        color: "from-purple-600 to-pink-500",
        badge: "Most Popular",
        description:
          "Scale your applications with powerful performance and reliability.",
        features: [
          { name: "5 Million API Requests", included: true },
          { name: "3 GB Database Storage", included: true },
          { name: "1 TB Bandwidth", included: true },
          { name: "250 GB File Storage", included: true },
          { name: "Automated Daily Backups", included: true },
          { name: "Advanced Security (SOC 2, ISO 27001)", included: true },
        ],
        cta: "Upgrade Now",
        popular: true,
        saveAmount: null,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        icon: Crown,
        price: "$399",
        period: "/month",
        color: "from-gray-700 to-black",
        badge: "Advanced",
        description:
          "Dedicated infrastructure for high-performance, security, and scalability.",
        features: [
          { name: "Unlimited API Requests", included: true },
          { name: "Dedicated Compute (10 CPUs / 14 GB RAM)", included: true },
          { name: "8 GB Database Storage", included: true },
          { name: "2 TB Bandwidth", included: true },
          { name: "1 TB File Storage", included: true },
          { name: "Point-in-Time Recovery Backups", included: true },
          { name: "Enterprise Security Compliance", included: true },
          { name: "HIPAA Compliance Available", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
        saveAmount: null,
      },
    ],

    yearly: [
      {
        id: "starter",
        name: "Starter",
        icon: Rocket,
        price: "$12",
        period: "/month",
        color: "from-blue-500 to-cyan-500",
        badge: "Save 35%",
        description:
          "Best value for startups looking to reduce costs and grow steadily.",
        features: [
          { name: "500K API Requests", included: true },
          { name: "1 GB Database Storage", included: true },
          { name: "250 GB Bandwidth", included: true },
          { name: "50 GB File Storage", included: true },
          { name: "Automated Daily Backups", included: true },
        ],
        cta: "Start Saving",
        popular: false,
        saveAmount: 35,
      },
      {
        id: "growth",
        name: "Growth",
        icon: Zap,
        price: "$69",
        period: "/month",
        color: "from-purple-600 to-pink-500",
        badge: "Most Popular • Save 20%",
        description:
          "Optimized for scaling businesses that need performance and flexibility.",
        features: [
          { name: "5 Million API Requests", included: true },
          { name: "3 GB Database Storage", included: true },
          { name: "1 TB Bandwidth", included: true },
          { name: "250 GB File Storage", included: true },
          { name: "Automated Daily Backups", included: true },
          { name: "Advanced Security (SOC 2, ISO 27001)", included: true },
        ],
        cta: "Upgrade & Save",
        popular: true,
        saveAmount: 20,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        icon: Crown,
        price: "$319",
        period: "/month",
        color: "from-gray-700 to-black",
        badge: "Advanced • Save 20%",
        description:
          "Long-term solution for enterprises needing reliability and full control.",
        features: [
          { name: "Unlimited API Requests", included: true },
          { name: "Dedicated Compute (10 CPUs / 14 GB RAM)", included: true },
          { name: "8 GB Database Storage", included: true },
          { name: "2 TB Bandwidth", included: true },
          { name: "1 TB File Storage", included: true },
          { name: "Point-in-Time Recovery Backups", included: true },
          { name: "Enterprise Security Compliance", included: true },
          { name: "HIPAA Compliance Available", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
        saveAmount: 20,
      },
    ],
  };

  useEffect(() => {
    gsap.set(titleRef.current, { y: 50, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 50, opacity: 0 });
    gsap.set(tabsRef.current, { y: 30, opacity: 0 });

    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { y: 100, opacity: 0, scale: 0.9, ease: "power1.out" });
      }
    });

    gsap.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(tabsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.fromTo(
      ".stat-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(0.5)",
          },
        );
      }
    });
  }, [activeTab]);

  const currentPlans = plans[activeTab];

  return (
    <div ref={sectionRef} className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-400" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white">
              Pricing Plans
            </span>
            <div className="w-8 h-px bg-indigo-400" />
          </div>

          <h1
            ref={titleRef}
            className="cursor-hover w-fit lg:text-4xl text-xl md:text-2xl font-bold text-white mb-4 leading-tight"
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-1 max-w-2xl mx-auto text-sm md:text-base text-gray-400 font-normal"
          >
            Everything you need to create, manage, and optimize links, QR codes,
            and deep linking — all in one platform.
          </p>
        </div>
        <div ref={tabsRef} className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-sm bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700">
           
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-500 ease-out ${
                activeTab === "monthly" ? "left-1" : "left-1/2"
              }`}
            />

            
            <div className="flex relative z-10">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`flex-1 text-center px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === "monthly"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setActiveTab("yearly")}
                className={`relative flex-1 text-center px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === "yearly"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Yearly
                <span className="absolute -top-2 right-1 sm:-right-2 text-[9px] sm:text-[10px] font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full shadow-md">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-20">
          {currentPlans.map((plan, idx) => {
            const Icon = plan.icon;
            const isHighlight = plan.popular;
            const isMiddleCard = idx === 1;

            return (
              <div
                key={`${activeTab}-${plan.id}`}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`relative transition-all duration-300 ${
                  isMiddleCard ? "transform scale-110 z-10" : ""
                }`}
              >
                <div
                  className={`h-full rounded-xl overflow-hidden ${
                    isHighlight
                      ? "ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/30"
                      : "border border-gray-700"
                  } ${isMiddleCard ? "bg-gray-800" : "bg-gray-800/80"}`}
                >
                  {plan.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <div
                        className={`flex items-center gap-1 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border ${
                          plan.badge.includes("Save") ||
                          plan.badge.includes("40%")
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                            : "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                        }`}
                      >
                        <Crown className="w-3 h-3" /> {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div
                      className={`inline-flex p-2.5 rounded-xl bg-gradient-to-r ${plan.color} mb-4 ${
                        isMiddleCard ? "scale-110" : ""
                      }`}
                    >
                      <Icon
                        className={`${isMiddleCard ? "w-6 h-6" : "w-5 h-5"} text-white`}
                      />
                    </div>

                    <h3
                      className={`font-bold mb-2 ${
                        isMiddleCard ? "text-2xl" : "text-xl"
                      } ${
                        isHighlight
                          ? "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                    >
                      {plan.name}
                    </h3>

                    <div className="mb-3">
                      <div className="flex items-baseline gap-1 flex-wrap">
                        <span
                          className={`font-bold text-white ${isMiddleCard ? "text-4xl" : "text-3xl"}`}
                        >
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-400 text-sm">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {activeTab === "yearly" && plan.saveAmount && (
                        <div className="mt-1">
                          <span className="text-xs text-emerald-400 font-medium">
                            Save {plan.saveAmount}% (billed annually)
                          </span>
                        </div>
                      )}
                      {activeTab === "monthly" && plan.price !== "Custom" && (
                        <div className="mt-1">
                          <span className="text-xs text-gray-500">
                            or ${parseFloat(plan.price.replace("$", "")) * 12}
                            /year
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm mb-4 pb-3 border-b border-gray-700">
                      {plan.description}
                    </p>

                    <ul className="space-y-2.5 mb-5">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg hover:shadow-indigo-500/30"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plans;
