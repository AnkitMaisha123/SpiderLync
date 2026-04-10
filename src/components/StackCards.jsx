import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import { HiArrowSmallRight } from "react-icons/hi2";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectstack = [
  {
    id: 1,
    name: "Real-Time Chat Application",
    desc: "Build a fully functional chat app with live messaging, notifications, and user presence using real-time database and push services.",
  },
  {
    id: 2,
    name: "E-commerce Backend System",
    desc: "Create a scalable backend for an online store with authentication, APIs, payment integrations, and order management.",
  },
  {
    id: 3,
    name: "Social Media Platform",
    desc: "Develop a feature-rich social platform with posts, likes, comments, real-time updates, and media handling.",
  },
  {
    id: 4,
    name: "Live Streaming App",
    desc: "Launch a live streaming platform with low-latency video, user interaction, and real-time engagement features.",
  },
];

export default function StackCards() {
  const swiperRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-4">
      
      {/* Swiper */}
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-78 h-100"
      >
        {projectstack.map((p) => (
          <SwiperSlide
            key={p.id}
            className="flex! flex-col rounded-2xl bg-white/10 backdrop-blur-xl border border-sky-300"
          >
            <div className="p-8 flex flex-col gap-4 items-start justify-end">
              <span className="text-5xl font-extrabold text-green-400">
                0{p.id}
              </span>
              <h2 className="text-sky-400 font-extrabold text-2xl">
                {p.name}
              </h2>
              <p className="text-white/70 text-base">{p.desc}</p>
              <button className="flex gap-1 text-sm items-center border px-3 py-2 rounded-md">
                View <HiArrowSmallRight />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex items-center backdrop-blur-xl border border-sky-300 justify-center w-10 h-10 bg-white/20 rounded-full"
        >
          <ChevronLeft/>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="flex items-center backdrop-blur-xl border border-sky-300 justify-center w-10 h-10 bg-white/20 rounded-full"
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
}