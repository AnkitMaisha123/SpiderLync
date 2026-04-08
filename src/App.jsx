import React from "react";
import DeepLinkingPage from "./DeepLinkingPage";
import HeroSection from "./components/HeroSection";
import MouseFollower from "mouse-follower";
import { useEffect } from "react";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import FeaturesSection from "./components/FeaturesSection";

MouseFollower.registerGSAP(gsap);

const App = () => {
  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 0.4,
      skewing: 2,
    });

    return () => cursor.destroy();
  }, []);
  return (
    <div className="w-full h-full bg-[#0d0d14] text-white">
      <HeroSection />
      <FeaturesSection/>
    </div>
  );
};

export default App;
