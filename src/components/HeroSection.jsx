import React from "react";
import { FcGoogle } from "react-icons/fc";
import LogoSlider from "./LogoSlider";

const HeroSection = () => {
  return (
    <div className="relative h-full w-full bg-dot">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-violet-600/8 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-sky-600/8 rounded-full blur-[80px]" />
        </div>
      <div className="max-w-6xl mx-auto py-20">
        <div className="flex justify-center items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <div>
              <p className="text-sky-500 text-sm font-semibold mb-4 tracking-wide">
                Backend Made Easy
              </p>

              <h1 data-cursor="-opaque" className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                A Unified Platform for <br /> Modern
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  &nbsp;Backend Development
                </span>
              </h1>

              <p className="text-gray-300 mb-6 max-w-lg">
                SpiderLync simplifies backend development by bringing APIs,
                databases, and cloud functions into one powerful platform,
                helping developers build and scale faster.
              </p>

              <div className="flex gap-4">
                <button className="bg-white py-3 px-5 rounded-lg text-black font-semibold flex gap-2 items-center justify-center">
                  <FcGoogle className="text-2xl" /> <span>Login With Google</span>
                </button>
                <button className="btn-gradient">
                  Continue With Email
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="flex-1">
            <div className="relative flex justify-center items-center">
              {/* Glow Circle */}
              <div className="absolute w-64 h-64 bg-sky-600 rounded-full blur-3xl opacity-30"></div>

              {/* Center Box */}
              <div className="relative bg-indigo-500 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-0 left-10 bg-white/10 backdrop-blur-md p-4 rounded-lg w-32 h-20"></div>
              <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-md p-4 rounded-lg w-32 h-20"></div>
              <div className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-md p-4 rounded-lg w-32 h-20"></div>
              <div className="absolute bottom-0 right-10 bg-white/10 backdrop-blur-md p-4 rounded-lg w-32 h-20"></div>
            </div>
          </div>
        </div>
      </div>
      <LogoSlider/>
    </div>
  );
};

export default HeroSection;
