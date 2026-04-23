import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Database,
  Zap,
  Cloud,
  Code,
  Shield,
  Bell,
  Mail,
  Video,
  Globe,
  Link,
  QrCode,
  Scissors,
  BookOpen,
  FileCode,
  Layout,
  Bot,
  MessageSquare,
  CircleQuestionMark,
} from "lucide-react";

import spyderlync from "../assets/hero2.png";
import { NavLink } from "react-router-dom";

const NAVIGATION_ITEMS = {
  baas: {
    name: "Features",
    href: "/baas",
    dropdown: true,
    isBaaSMegaMenu: true,
    items: [
      {
        category: "Backend Core",
        items: [
          {
            name: "Parse Integration",
            href: "/baas/parse-integration",
            description:
              "Fully managed Parse Server with seamless integration.",
            icon: Database,
          },
          {
            name: "Realtime Database",
            href: "/baas/realtime-db",
            description: "Live data synchronization across all clients.",
            icon: Zap,
          },
          {
            name: "Cloud Functions",
            href: "/baas/cloud-functions",
            description: "Run backend logic without managing infrastructure.",
            icon: Cloud,
          },
          {
            name: "GraphQL, REST API, SDKs",
            href: "/baas/api",
            description:
              "Unified APIs with GraphQL, REST and ready-to-use SDKs.",
            icon: Code,
          },
        ],
      },
      {
        category: "User & Communication",
        items: [
          {
            name: "Authentication",
            href: "/baas/authentication",
            description: "Secure login with JWT, OAuth, and MFA.",
            icon: Shield,
          },
          {
            name: "Push Notifications",
            href: "/baas/push-notifications",
            description: "Send real-time push notifications.",
            icon: Bell,
          },
          {
            name: "Mail Gateway",
            href: "/baas/mail-gateway",
            description: "Send emails, OTPs and transactional messages.",
            icon: Mail,
          },
        ],
      },
      {
        category: "Growth Tools",
        items: [
          {
            name: "Referral Links, Deep Linking",
            href: "/baas/growth-tools",
            description: "Boost growth with referrals and smart deep links.",
            icon: Link,
          },
          {
            name: "QR Code Generator",
            href: "/baas/qr-code-generator",
            description: "Generate dynamic QR codes for campaigns.",
            icon: QrCode,
          },
          {
            name: "Tiny URL",
            href: "/baas/tiny-url",
            description: "Shorten and track links easily.",
            icon: Scissors,
          },
          {
            name: "Live Streaming",
            href: "/baas/live-streaming",
            description: "Real-time video streaming with low latency.",
            icon: Video,
          },
          {
            name: "Web Development",
            href: "/baas/web-development",
            description: "Build modern and scalable web applications.",
            icon: Globe,
          },
        ],
      },
    ],
  },

  docs: {
    name: "Docs",
    href: "/docs",
    dropdown: true,
    isDocsMegaMenu: true,
    items: [
      {
        category: "Backend Platform",
        items: [
          {
            name: "Guides",
            href: "/docs/backend/guides",
            description:
              "Descriptive how-to content with step-by-step workflows for using our Backend as a Service",
            icon: BookOpen,
          },
          {
            name: "API Reference",
            href: "/docs/backend/api-reference",
            description:
              "Examples and sample code (auto-generated from your datamodel) from our APIs and SDKs.",
            icon: FileCode,
          },
          {
            name: "App Templates",
            href: "/docs/backend/app-templates",
            description:
              "There are many example apps and starter projects to get going.",
            icon: Layout,
          },
        ],
      },
      {
        category: "Web Deployment Platform",
        items: [
          {
            name: "Docs",
            href: "/docs/web-deployment",
            description:
              "Descriptive how-to content with step-by-step workflows for using our Web Deployment Platform",
            icon: Globe,
          },
        ],
      },
      {
        category: "AI Agent",
        items: [
          {
            name: "Docs",
            href: "/docs/ai-agent",
            description:
              "In-depth guidance on leveraging the Back4app AI Agent: Dive into setup guides, explore its architecture, and learn optimized prompts for maximum efficiency.",
            icon: Bot,
          },
        ],
      },
    ],
  },
  support: {
    name: "Support",
    href: "/support",
    dropdown: true,
    isSupportMenu: true, 
    items: [
      {
        name: "Chat with the experts",
        href: "/support/chat",
        description:
          "Have a question? Open a chat and a Back4App Expert will get back to you shortly.",
        icon: MessageSquare,
      },
      {
        name: "FAQ",
        href: "/support/faq",
        description: "Frequently asked questions and answers.",
        icon: CircleQuestionMark,
      },
    ],
  },

  pricing: {
    name: "Pricing",
    href: "/pricing",
  },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const buttonRefs = useRef({});
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (key) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (NAVIGATION_ITEMS[key]?.dropdown) {
      setOpenDropdown(key);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const getAllCategories = () => {
    return NAVIGATION_ITEMS.baas.items;
  };

  const getThreeColumns = () => {
    const categories = getAllCategories();
  
    const column1 = [categories[0]]; 
    const column2 = [categories[1]]; 
    const column3 = [categories[2]]; 
    return [column1, column2, column3];
  };

  const getDocsColumns = () => {
    const docsCategories = NAVIGATION_ITEMS.docs.items;
  
    return [
      [docsCategories[0]],
      [docsCategories[1], docsCategories[2]], 
    ];
  };

  return (
    <>
      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
      <header
        className="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent backdrop-blur-xl  shadow-2xl 
          "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a
              href="/newspiderlync/"
              className="flex items-center flex-shrink-0 group"
              aria-label="Home"
            >
              <img
                src={spyderlync}
                alt="Spider Lync"
                className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </a>

            <nav
              className="hidden lg:flex items-center space-x-3"
              aria-label="Main navigation"
            >
              {Object.entries(NAVIGATION_ITEMS).map(([key, item]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        ref={(el) => (buttonRefs.current[key] = el)}
                        className={`group px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          openDropdown === key
                            ? "text-indigo-400 hover:text-indigo-400 hover:bg-indigo-950/20 "
                            : "text-gray-300 hover:text-indigo-400 "
                        }`}
                       
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-all duration-300 ${openDropdown === key ? "rotate-180 text-indigo-400" : "group-hover:text-indigo-400"}`}
                        />
                      </button>

                      {openDropdown === key && (
                        <div
                          className="absolute top-full left-0 pt-2 z-[100]"
                          style={{ minWidth: "200px" }}
                        >
                         
                          <div
                            className="absolute top-0 w-0 h-0"
                            style={{
                              left: buttonRefs.current[key]
                                ? `${buttonRefs.current[key].offsetLeft + buttonRefs.current[key].offsetWidth / 2}px`
                                : "50%",
                              transform: "translateX(-50%)",
                              borderLeft: "8px solid transparent",
                              borderRight: "8px solid transparent",
                              borderBottom: "8px solid #1e293b",
                              marginTop: "4px",
                            }}
                          />

                          <div
                            className={`bg-[#0B0F19]/95 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden mt-1 ${
                              item.isBaaSMegaMenu
                                ? "w-[850px]"
                                : item.isDocsMegaMenu
                                  ? "w-[600px]"
                                  : "w-100"
                            }`}
                            style={{
                              animation: "dropdownFadeIn 0.3s ease-out",
                            }} 
                            role="menu"
                          >
                            {item.isBaaSMegaMenu && (
                              <div className="grid grid-cols-3 gap-6 p-6">
                                {getThreeColumns().map((column, colIdx) => (
                                  <div key={colIdx} className="space-y-6">
                                    {column.map((category, catIdx) => (
                                      <div key={catIdx}>
                                        <div className="mb-3 pb-2 ">
                                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {category.category}
                                          </h3>
                                        </div>
                                        <div className="space-y-3">
                                          {category.items.map(
                                            (subItem, subIdx) => {
                                              const Icon = subItem.icon;
                                              return (
                                                <a
                                                  key={subIdx}
                                                  href={subItem.href}
                                                  className="group block"
                                                  onClick={() =>
                                                    setOpenDropdown(null)
                                                  }
                                                  role="menuitem"
                                                >
                                                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-indigo-950/30 transition-all duration-300">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-950/40 flex items-center justify-center group-hover:bg-indigo-900/50 transition-all duration-300">
                                                      <Icon className="w-4 h-4 text-indigo-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                      <span className="text-[14px]  text-gray-200 group-hover:text-indigo-400 transition-colors duration-300 block">
                                                        {subItem.name}
                                                      </span>
                                                      <p className="text-[13px] text-gray-500  mt-0.5">
                                                        {subItem.description}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </a>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.isDocsMegaMenu && (
                              <div className="grid grid-cols-2 gap-6 p-6">
                                {getDocsColumns().map((column, colIdx) => (
                                  <div key={colIdx} className="space-y-6">
                                    {column.map((category, catIdx) => (
                                      <div key={catIdx}>
                                        <div className="mb-3 pb-2">
                                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {category.category}
                                          </h3>
                                        </div>
                                        <div className="space-y-3">
                                          {category.items.map(
                                            (subItem, subIdx) => {
                                              const Icon = subItem.icon;
                                              return (
                                                <a
                                                  key={subIdx}
                                                  href={subItem.href}
                                                  className="group block"
                                                  onClick={() =>
                                                    setOpenDropdown(null)
                                                  }
                                                  role="menuitem"
                                                >
                                                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-indigo-950/30 transition-all duration-300">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-950/40 flex items-center justify-center group-hover:bg-indigo-900/50 transition-all duration-300">
                                                      <Icon className="w-4 h-4 text-indigo-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                      <span className="text-[14px] text-gray-200 group-hover:text-indigo-400 transition-colors duration-300 block">
                                                        {subItem.name}
                                                      </span>
                                                      <p className="text-[13px] text-gray-500 mt-0.5">
                                                        {subItem.description}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </a>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.isSupportMenu && (
                              <div className="w-96 p-4">
                                <div className="space-y-2">
                                  {item.items.map((subItem, subIdx) => {
                                    const Icon = subItem.icon;
                                    return (
                                      <a
                                        key={subIdx}
                                        href={subItem.href}
                                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-950/30 transition-all duration-300"
                                        onClick={() => setOpenDropdown(null)}
                                        role="menuitem"
                                      >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-950/40 flex items-center justify-center group-hover:bg-indigo-900/50 transition-all duration-300">
                                          <Icon className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className="text-[14px]  text-gray-200 group-hover:text-indigo-400 transition-colors duration-300 block">
                                            {subItem.name}
                                          </span>
                                          <p className="text-[13px] text-gray-500 mt-1 ">
                                            {subItem.description}
                                          </p>
                                        </div>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className="block px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-indigo-400 hover:bg-indigo-950/20  font-medium transition-all duration-300"
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-indigo-400 transition-all duration-300 rounded-lg hover:bg-indigo-950/20 backdrop-blur-sm">
                Sign In
              </button>
              <button className="hidden sm:block px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 cursor-pointer">
                Register Now
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-950/20 transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0B0F19]/95 backdrop-blur-xl shadow-2xl overflow-y-auto animate-slideInRight border-l border-indigo-500/20">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <img
                  src={spyderlync}
                  alt="Spider Lync"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-950/20 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(NAVIGATION_ITEMS).map(([key, item]) => (
                  <div key={key}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === key ? null : key)
                          }
                          className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-indigo-400 hover:bg-indigo-950/20 rounded-lg transition-all duration-300"
                        >
                          <span className="font-medium text-sm">
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-300 ${openDropdown === key ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                            openDropdown === key
                              ? "max-h-[800px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {item.isBaaSMegaMenu &&
                            item.items.flatMap((category) =>
                              category.items.map((subItem, subIdx) => {
                                const Icon = subItem.icon;
                                return (
                                  <a
                                    key={`${category.category}-${subIdx}`}
                                    href={subItem.href}
                                    className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-indigo-950/20 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-950/40 flex items-center justify-center">
                                      <Icon className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-sm font-semibold text-gray-200 block mb-1">
                                        {subItem.name}
                                      </span>
                                    </div>
                                  </a>
                                );
                              }),
                            )}
                          {item.isDocsMegaMenu &&
                            item.items.flatMap((category) =>
                              category.items.map((subItem, subIdx) => {
                                const Icon = subItem.icon;
                                return (
                                  <a
                                    key={`${category.category}-${subIdx}`}
                                    href={subItem.href}
                                    className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-indigo-950/20 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-950/40 flex items-center justify-center">
                                      <Icon className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-sm font-semibold text-gray-200 block mb-1">
                                        {subItem.name}
                                      </span>
                                    </div>
                                  </a>
                                );
                              }),
                            )}
                          {item.isSupportMenu &&
                            item.items.map((subItem, subIdx) => {
                              const Icon = subItem.icon;
                              return (
                                <a
                                  key={subIdx}
                                  href={subItem.href}
                                  className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-indigo-950/20 transition-all duration-300"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-950/40 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-indigo-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm font-semibold text-gray-200 block mb-1">
                                      {subItem.name}
                                    </span>
                                  </div>
                                </a>
                              );
                            })}
                        </div>
                      </>
                    ) : (
                      <NavLink
                       to={item.href}
                        className="block px-4 py-3 text-gray-300 hover:text-indigo-400 hover:bg-indigo-950/20 rounded-lg font-medium text-sm transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              <div className=" flex justify-center items-center gap-2 flex-wrap mt-8 pt-6 border-t border-indigo-500/20">
                <button className="w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 rounded-lg hover:bg-indigo-950/20">
                  Sign In
                </button>
                <button className=" w-full px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 cursor-pointer">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
