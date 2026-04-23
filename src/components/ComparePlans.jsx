import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Zap, Shield, Database, Cloud, Headphones } from "lucide-react";

const ComparePlans = () => {
  const [expandedSections, setExpandedSections] = useState({
    limits: true,
    storage: false,
    security: false,
    support: false,
    backups: false,
  });
  const [activeTab, setActiveTab] = useState("monthly");

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: "limits",
      name: "API & Usage Limits",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        { name: "API Requests", starter: "500K", growth: "5M", enterprise: "Unlimited" },
        { name: "Rate Limit", starter: "10 req/s", growth: "50 req/s", enterprise: "Unlimited" },
        { name: "Concurrent Connections", starter: "10", growth: "50", enterprise: "Unlimited" },
      ]
    },
    {
      id: "storage",
      name: "Storage & Database",
      icon: Database,
      gradient: "from-purple-500 to-pink-500",
      features: [
        { name: "Database Storage", starter: "1 GB", growth: "3 GB", enterprise: "8 GB" },
        { name: "File Storage", starter: "50 GB", growth: "250 GB", enterprise: "1 TB" },
        { name: "Bandwidth", starter: "250 GB", growth: "1 TB", enterprise: "2 TB" },
        { name: "Compute Resources", starter: "Shared", growth: "Shared", enterprise: "10 CPU / 14GB" },
      ]
    },
    {
      id: "security",
      name: "Security & Compliance",
      icon: Shield,
      gradient: "from-red-500 to-orange-500",
      features: [
        { name: "SSL Encryption", starter: "✓", growth: "✓", enterprise: "✓" },
        { name: "DDoS Protection", starter: "Basic", growth: "Advanced", enterprise: "Enterprise" },
        { name: "SOC 2", starter: "✗", growth: "✓", enterprise: "✓" },
        { name: "ISO 27001", starter: "✗", growth: "✓", enterprise: "✓" },
        { name: "HIPAA Ready", starter: "✗", growth: "✗", enterprise: "✓" },
      ]
    },
    {
      id: "support",
      name: "Support & SLA",
      icon: Headphones,
      gradient: "from-indigo-500 to-violet-500",
      features: [
        { name: "Support Channels", starter: "Email", growth: "Email & Chat", enterprise: "24/7 Phone" },
        { name: "Response Time", starter: "48h", growth: "24h", enterprise: "1h" },
        { name: "Account Manager", starter: "✗", growth: "✗", enterprise: "✓" },
        { name: "Uptime Guarantee", starter: "99.9%", growth: "99.95%", enterprise: "99.99%" },
      ]
    },
    {
      id: "backups",
      name: "Backups & Recovery",
      icon: Cloud,
      gradient: "from-emerald-500 to-teal-500",
      features: [
        { name: "Backup Frequency", starter: "Daily", growth: "Daily", enterprise: "Point-in-Time" },
        { name: "Retention Period", starter: "7 days", growth: "30 days", enterprise: "90 days" },
        { name: "Auto Restore", starter: "✗", growth: "✗", enterprise: "✓" },
      ]
    }
  ];

  const getValue = (value) => {
    if (value === "✓") return <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />;
    if (value === "✗") return <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mx-auto" />;
    return <span className="text-gray-200 font-medium text-sm sm:text-base">{value}</span>;
  };

  const getPrice = (plan, period) => {
    if (period === "monthly") {
      if (plan === "starter") return "$19";
      if (plan === "growth") return "$89";
      if (plan === "enterprise") return "$399";
    } else {
      if (plan === "starter") return "$182";
      if (plan === "growth") return "$854";
      if (plan === "enterprise") return "$3,830";
    }
    return "";
  };

  const getPriceSuffix = (plan, period) => {
    if (period === "monthly") return "/month";
    return "/year";
  };

  const getBillingNote = (plan, period) => {
    if (period === "monthly") return "Billed monthly";
    return plan === "enterprise" ? "Custom billing" : "Billed annually";
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        
      
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-violet-400" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-white">
              Compare Features
            </span>
            <div className="w-6 sm:w-8 h-px bg-indigo-400" />
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
            Compare Our Plans & <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Find the Perfect Fit
            </span>
          </h1>
          <p className="mt-1 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-400 font-normal px-3">
            Easily see which services and features are included in each plan. Choose the plan that fits your campaign goals, scale, and workflow needs.
          </p>
        </div>

       
        <div className="flex justify-center mb-6 sm:mb-10 px-3">
          <div className="relative w-full max-w-[280px] sm:max-w-sm bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-500 ease-out ${
                activeTab === "monthly" ? "left-1" : "left-1/2"
              }`}
            />
            <div className="flex relative z-10">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`flex-1 text-center px-2 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-base rounded-full transition-all duration-300 cursor-pointer font-medium ${
                  activeTab === "monthly"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab("yearly")}
                className={`relative flex-1 text-center px-2 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-base rounded-full transition-all duration-300 cursor-pointer font-medium ${
                  activeTab === "yearly"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Yearly
                <span className="absolute -top-2 right-0 sm:-right-2 text-[8px] sm:text-[10px] font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        
        <div className="hidden  grid-cols-1  gap-3  mb-6">
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
            <h3 className="text-lg font-bold text-white">Starter</h3>
            <div className="mt-1">
              <span className="text-2xl font-bold text-white">{getPrice("starter", activeTab)}</span>
              <span className="text-gray-400 text-xs ml-0.5">{getPriceSuffix("starter", activeTab)}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{getBillingNote("starter", activeTab)}</p>
          </div>
          <div className="bg-gradient-to-b from-indigo-500/10 to-violet-500/10 rounded-xl p-3 text-center border border-indigo-500/30">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Growth</h3>
            <div className="mt-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {getPrice("growth", activeTab)}
              </span>
              <span className="text-gray-400 text-xs ml-0.5">{getPriceSuffix("growth", activeTab)}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{getBillingNote("growth", activeTab)}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
            <h3 className="text-lg font-bold text-white">Enterprise</h3>
            <div className="mt-1">
              <span className="text-2xl font-bold text-white">{getPrice("enterprise", activeTab)}</span>
              <span className="text-gray-400 text-xs ml-0.5">{getPriceSuffix("enterprise", activeTab)}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{getBillingNote("enterprise", activeTab)}</p>
          </div>
        </div>

       
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="min-w-[640px] sm:min-w-full bg-gray-800/20 rounded-2xl overflow-hidden border border-gray-800">
            
            
            <div className="grid grid-cols-4 border-b border-gray-700">
              <div className="p-3 sm:p-5">
                <div className="hidden sm:block">&nbsp;</div>
              </div>
              
              <div className="p-3 sm:p-5 text-center">
                <h3 className="text-base sm:text-2xl font-bold text-white">Starter</h3>
                <div className="hidden sm:block mt-2">
                  <span className="text-2xl sm:text-4xl font-bold text-white">{getPrice("starter", activeTab)}</span>
                  <span className="text-gray-400 text-xs sm:text-sm ml-1">{getPriceSuffix("starter", activeTab)}</span>
                </div>
                <p className="hidden sm:block text-[10px] sm:text-xs text-gray-500 mt-1">{getBillingNote("starter", activeTab)}</p>
              </div>
              
              <div className="p-3 sm:p-5 text-center relative bg-gradient-to-b from-indigo-500/10 to-violet-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5"></div>
                <h3 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Growth</h3>
                <div className="hidden sm:block mt-2">
                  <span className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {getPrice("growth", activeTab)}
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm ml-1">{getPriceSuffix("growth", activeTab)}</span>
                </div>
                <p className="hidden sm:block text-[10px] sm:text-xs text-gray-500 mt-1">{getBillingNote("growth", activeTab)}</p>
              </div>
              
              <div className="p-3 sm:p-5 text-center">
                <h3 className="text-base sm:text-2xl font-bold text-white">Enterprise</h3>
                <div className="hidden sm:block mt-2">
                  <span className="text-2xl sm:text-4xl font-bold text-white">{getPrice("enterprise", activeTab)}</span>
                  <span className="text-gray-400 text-xs sm:text-sm ml-1">{getPriceSuffix("enterprise", activeTab)}</span>
                </div>
                <p className="hidden sm:block text-[10px] sm:text-xs text-gray-500 mt-1">{getBillingNote("enterprise", activeTab)}</p>
              </div>
            </div>

            
            {sections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections[section.id];

              return (
                <div key={section.id} className="border-b border-gray-700 last:border-b-0">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-3 sm:px-5 py-2.5 sm:py-4 bg-gray-800/50 hover:bg-gray-700/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                      <span className="font-semibold text-white text-xs sm:text-base">
                        {section.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div>
                      {section.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-4 border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                        >
                          <div className="p-2.5 sm:p-4 pl-4 sm:pl-10 text-xs sm:text-sm text-gray-300 font-medium">
                            {feature.name}
                          </div>
                          <div className="p-2.5 sm:p-4 text-center">
                            {getValue(feature.starter)}
                          </div>
                          <div className="p-2.5 sm:p-4 text-center bg-gradient-to-r from-indigo-500/5 to-violet-500/5 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5"></div>
                            {getValue(feature.growth)}
                          </div>
                          <div className="p-2.5 sm:p-4 text-center">
                            {getValue(feature.enterprise)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="text-center mt-4 sm:hidden">
          <p className="text-xs text-gray-500">← Scroll horizontally to see more →</p>
        </div>
      </div>
    </div>
  );
};

export default ComparePlans;