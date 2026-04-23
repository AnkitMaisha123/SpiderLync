import { useEffect, useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { featuresData } from "../data/featuresData";
import CodeBlock from "../components/CodeBlock";
import FAQItem from "../components/FAQItem";

function SectionMono({ children }) {
  return (
    <p className="mb-3 font-mono text-[11px] tracking-[0.18em] uppercase text-white/30">
      {children}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-display text-2xl lg:text-[28px] font-bold text-white leading-tight">
      {children}
    </h2>
  );
}

export default function FeatureDetailPage() {
  const { featureId } = useParams();
  const blobRef = useRef(null);

  const feature = featuresData[featureId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [featureId]);

  useEffect(() => {
    const move = (e) => {
      if (blobRef.current) {
        blobRef.current.style.left = e.clientX + "px";
        blobRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!feature) return <Navigate to="/features/parse-integration" replace />;

  const { color, colorDim, colorGlow } = feature;

  // Breadcrumbs
  const crumbs = ["SpiderLync", "Docs", "Features", feature.category, feature.name];

  return (
    <div className="relative flex-1 min-w-0">

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-30 pb-24">
        {/* Breadcrumb */}
        <div className="pt-5 pb-0 flex items-center gap-1.5 flex-wrap">
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span
                className="text-[11px] font-mono"
                style={{ color: i === crumbs.length - 1 ? color : "rgba(255,255,255,0.22)" }}
              >
                {crumb}
              </span>
              {i < crumbs.length - 1 && (
                <span className="text-[11px] text-white/10">›</span>
              )}
            </span>
          ))}
        </div>

        {/* ─── HERO ─── */}
        <section className="pt-9 pb-11 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl border flex-shrink-0"
              style={{ background: colorDim, borderColor: `${color}44` }}
            >
              {feature.icon}
            </div>
            <span
              className="text-[11px] font-mono tracking-[0.14em] uppercase px-3 py-1 rounded-full border"
              style={{ background: `${color}18`, color, borderColor: `${color}33` }}
            >
              {feature.badge}
            </span>
          </div>

          <h1
            className="font-display font-extrabold text-white leading-[1.08] mb-3"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}
          >
            {feature.name}
          </h1>
          <p className="text-[17px] font-light text-white/50 max-w-md leading-[1.65]">
            {feature.tagline}
          </p>

          <div className="flex gap-3 mt-7 flex-wrap">
            <button
              className="px-7 py-[11px] rounded-xl font-semibold text-sm text-black cursor-pointer border-none transition-opacity hover:opacity-90"
              style={{ background: color }}
            >
              Get started free
            </button>
            <button className="px-6 py-[11px] rounded-xl border border-white/[0.12] bg-white/[0.04] text-white/65 font-medium text-sm cursor-pointer hover:bg-white/[0.07] transition-colors">
              View full docs →
            </button>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="pt-12 pb-12 border-b border-white/[0.06]">
          <SectionMono>How it works</SectionMono>
          <SectionHeading>From setup to production in minutes</SectionHeading>
          <p className="mt-2.5 mb-9 text-[15px] text-white/42 max-w-lg leading-[1.7]">
            {feature.howItWorks.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {feature.howItWorks.steps.map((step, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${color}88, transparent)` }}
                />
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[13px] mb-3.5"
                  style={{ background: `${color}18`, color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-sm text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-white/42 leading-[1.65]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CAPABILITIES ─── */}
        <section className="pt-12 pb-12 border-b border-white/[0.06]">
          <SectionMono>Capabilities</SectionMono>
          <SectionHeading>Everything included</SectionHeading>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {feature.subFeatures.map((sf, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:-translate-y-0.5 transition-transform duration-200"
              >
                <span className="text-xl block mb-2.5">{sf.icon}</span>
                <h4 className="text-[13px] font-semibold mb-1.5" style={{ color }}>
                  {sf.name}
                </h4>
                <p className="text-[12px] text-white/38 leading-[1.65]">{sf.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CODE EXAMPLES ─── */}
        <section className="pt-12 pb-12 border-b border-white/[0.06]">
          <SectionMono>Code examples</SectionMono>
          <SectionHeading>Copy, paste, ship.</SectionHeading>
          <p className="mt-2.5 mb-7 text-[15px] text-white/38 leading-[1.7]">
            Production-ready snippets. No modification needed for most use cases.
          </p>
          <CodeBlock examples={feature.codeExamples} color={color} />
        </section>

        {/* ─── USE CASES ─── */}
        <section className="pt-12 pb-12 border-b border-white/[0.06]">
          <SectionMono>Use cases</SectionMono>
          <SectionHeading>Built for real products</SectionHeading>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {feature.useCases.map((uc, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white/[0.025] p-5 hover:-translate-y-0.5 transition-transform duration-200"
                style={{ borderColor: `${color}22` }}
              >
                <span className="text-[26px] block mb-3">{uc.icon}</span>
                <h4 className="font-display font-bold text-[15px] text-white mb-2">{uc.title}</h4>
                <p className="text-[13px] text-white/42 leading-[1.7]">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="pt-12 pb-12 border-b border-white/[0.06]">
          <SectionMono>FAQ</SectionMono>
          <SectionHeading>Common questions</SectionHeading>
          <p className="mt-2 mb-8 text-[15px] text-white/38 leading-[1.7]">
            Can't find what you need? Ping us on Discord — we reply fast.
          </p>
          {feature.faq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} color={color} />
          ))}
        </section>

        {/* ─── CTA ─── */}
        <section className="pt-12">
          <div
            className="relative rounded-2xl border p-12 overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at 25% 55%, ${colorGlow}, transparent 60%), rgba(255,255,255,0.02)`,
              borderColor: `${color}30`,
            }}
          >
            {/* Orb */}
            <div
              className="absolute top-[-50px] right-[-50px] w-[220px] h-[220px] rounded-full opacity-35"
              style={{ background: colorGlow, filter: "blur(60px)" }}
            />

            <SectionMono>Get started</SectionMono>
            <h2
              className="font-display font-extrabold text-white leading-[1.2] max-w-md mb-3"
              style={{ fontSize: "clamp(22px, 3.5vw, 36px)" }}
            >
              Ready to ship with {feature.name}?
            </h2>
            <p className="text-[15px] text-white/42 max-w-sm leading-[1.7] mb-8">
              Free tier included. No credit card. Production-grade infrastructure from day one.
            </p>

            <div className="flex gap-3 flex-wrap mb-6">
              <button
                className="px-7 py-3 rounded-xl font-bold text-[15px] text-black border-none cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: color }}
              >
                Start for free
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/[0.15] bg-white/[0.05] text-white/65 font-medium text-[15px] cursor-pointer hover:bg-white/[0.08] transition-colors">
                Book a demo
              </button>
            </div>

            <div className="flex gap-5 flex-wrap">
              {["Free 1M API calls/month", "No credit card required", "Deploy in 60 seconds"].map((t, i) => (
                <span key={i} className="text-[12px] text-white/32 flex items-center gap-1.5">
                  <span style={{ color }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
