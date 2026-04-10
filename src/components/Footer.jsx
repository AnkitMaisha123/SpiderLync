import React from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle,
  Users,
  Headphones,
  Server,
  Database,
  Cloud,
  BookOpen,
  HelpCircle,
  Heart,
  Handshake,
  Globe,
} from "lucide-react";

import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa";
import spyderlync from "../assets/hero2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: "Backend Platform", href: "/spiderlync/platform", icon: Database },
    { name: "Pricing", href: "/spiderlync/pricing", icon: Server },
    { name: "Docs", href: "/spiderlync/docs", icon: BookOpen },
    { name: "App Templates", href: "/spiderlync/templates", icon: Cloud },
  ];

  const companyLinks = [
    { name: "About Spiderlync", href: "/spiderlync/about", icon: Heart },
    { name: "Become a Partner", href: "/spiderlync/partner", icon: Handshake },
    { name: "Find a Partner", href: "/spiderlync/find-partner", icon: Globe },
  ];

  const helpLinks = [
    { name: "Community", href: "/spiderlync/community", icon: Users },
    { name: "FAQ", href: "/spiderlync/faq", icon: HelpCircle },
    { name: "Support", href: "/spiderlync/support", icon: Headphones },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:bg-[#1DA1F2]",
    },
    {
      icon: FaGithub,
      href: "https://github.com",
      label: "GitHub",
      color: "hover:bg-[#333]",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]",
    },
    {
      icon: FaDiscord,
      href: "https://discord.com",
      label: "Discord",
      color: "hover:bg-[#5865F2]",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com",
      label: "YouTube",
      color: "hover:bg-[#FF0000]",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "support@spiderlync.com",
      href: "mailto:support@spiderlync.com",
    },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "Faridabad, India", href: null },
  ];

  return (
    <footer className="relative bg-dot text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-violet-600/8 rounded-full blur-[80px]" />
        <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-sky-600/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-800">
          <div className="mb-6 md:mb-0">
            <img src={spyderlync} alt="Spider Lync" className="h-10 w-auto " />
            <p className="text-gray-400 text-sm mt-3 max-w-md">
              The complete backend platform for modern applications. Build
              faster, scale automatically.
            </p>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg border border-gray-700 hover:border-transparent`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h4 className="font-semibold text-gray-200 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Platform
            </h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-400 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-indigo-400" />
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Community & Help
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <Headphones className="w-3.5 h-3.5 text-indigo-400" />
              Contact
            </h4>
            <ul className="space-y-2.5">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-800/50 flex items-center justify-center border border-gray-700">
                      <info.icon className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">{info.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email for updates"
                  className="bg-gray-800/50 border border-gray-700 px-3 py-2 rounded-md outline-none w-full text-sm text-gray-400 placeholder-gray-500 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
                />
                <button className="px-3 py-2 rounded-md text-white text-sm font-medium bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-gray-400">
                © {currentYear} SpiderLync, Inc.
              </span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-400 text-sm">
                Backend as a Service Platform
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/spiderlync/privacy"
                className="text-gray-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/spiderlync/terms"
                className="text-gray-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/spiderlync/security"
                className="text-gray-400 hover:text-indigo-400 text-sm transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-gray-800 hover:bg-indigo-600/20 text-white p-3 rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-110 z-50 group border border-indigo-500/30 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90 group-hover:text-indigo-400 transition-colors" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
