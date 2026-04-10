import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";
import TestimonialSlider from "../components/TestimonialSlider";
import StackCards from "../components/StackCards";
import { MoveRight } from "lucide-react";
import DeveloperTabs from "../components/DeveloperTabs";

const Home = () => {
  return (
    <div className="px-1">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <DeveloperTabs />
      <section className="overflow-x-hidden">
        <div className="max-w-5xl mx-auto py-20">
          <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-10">
            {/* LEFT CONTENT */}
            <div className="flex-1">
              <div>
                <p className="text-sky-500 text-sm font-semibold mb-4 tracking-wide">
                  Discover Possibilities
                </p>

                <h1
                  data-cursor="-opaque"
                  className="text-2xl md:text-5xl font-bold leading-tight mb-6"
                >
                  Build Anything
                  <br /> with
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                    &nbsp;SpiderLync
                  </span>
                </h1>

                <p className="text-gray-300 mb-6 max-w-lg">
                  SpiderLync empowers you to create powerful, scalable, and
                  real-time applications without the complexity of traditional
                  backend systems. From startups to enterprise solutions,
                  everything you need to build, launch, and grow is built right
                  in—so you can focus on innovation, not infrastructure.
                </p>

                <p className="text-gray-300 my-6 max-w-lg">
                  With SpiderLync, you can move faster, experiment freely, and
                  scale effortlessly—turning your ideas into production-ready
                  applications in record time.
                </p>
                <button className="btn-gradient flex gap-2 items-center justify-center mt-8">
                  Learn More <MoveRight />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative flex justify-center items-center">
                {/* Glow Circle */}
                <div className="absolute w-100 h-100 bg-sky-600 rounded-full blur-3xl opacity-30"></div>
                <StackCards />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSlider />
    </div>
  );
};

export default Home;
