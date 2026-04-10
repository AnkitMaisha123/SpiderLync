import { MoveRight } from "lucide-react";

export default function CTASection() {
  return (
    <div className="">
      <section className="ring-glow relative max-w-6xl mx-auto rounded-4xl my-10 py-20 bg-[#0a0a0a] flex items-center justify-center overflow-hidden px-6">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-5xl w-full">
          <h1
            data-cursor="-opaque"
            className="text-white text-center text-2xl md:text-5xl font-bold leading-[1.05] tracking-tight cursor-none mb-6"
          >
            Built for
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              {" "}
              Modern Developers
            </span>{" "}
          </h1>

          <div className="flex flex-wrap gap-5 justify-center items-center">
            <span className="text-xs sm:text-sm cursor-none px-8 py-4 border border-white/15 text-white/70 font-medium tracking-wide rounded-full hover:border-white/30 hover:text-white transition-all duration-300">
              Code less. Build more. Scale instantly.
            </span>
            <span className="text-xs sm:text-sm cursor-none px-8 py-4 border border-white/15 text-white/70 font-medium tracking-wide rounded-full hover:border-white/30 hover:text-white transition-all duration-300">
              Your backend, supercharged.
            </span>
            <span className="text-xs sm:text-sm cursor-none px-8 py-4 border border-white/15 text-white/70 font-medium tracking-wide rounded-full hover:border-white/30 hover:text-white transition-all duration-300">
              Turn ideas into APIs in minutes.
            </span>
            <span className="text-xs sm:text-sm cursor-none px-8 py-4 border border-white/15 text-white/70 font-medium tracking-wide rounded-full hover:border-white/30 hover:text-white transition-all duration-300">
              Modern tools for modern applications.
            </span>
          </div>

          <button className="btn-gradient flex gap-2 items-center justify-center mx-auto mt-8">
            Learn More <MoveRight />
          </button>
        </div>
      </section>
    </div>
  );
}
