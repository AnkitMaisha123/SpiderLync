import React from "react";
const types = [
  {
    name: "Parse Integration",
    border: "border-sky-500/20 col-span-2",
    headerBg: "bg-sky-500/5",
    accent: "text-sky-300",
    
  },
  {
    name: "Push Notifications",
    border: "border-violet-500/20",
    headerBg: "bg-violet-500/5",
    accent: "text-violet-300",
    
  },
  {
    name: "Realtime Database",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    accent: "text-emerald-300",
   
  },
  {
    name: "Referral Links / Deep Linking",
    border: "border-orange-500/40",
    headerBg: "bg-orange-500/5",
    accent: "text-orange-300",
  },
  {
    name: "Live Stream",
    border: "border-blue-500/40",
    headerBg: "bg-blue-500/5",
    accent: "text-blue-300",
  },
  {
    name: "Cloud Functions",
    border: "border-rose-500/40",
    headerBg: "bg-rose-500/5",
    accent: "text-rose-300",
  },
  {
    name: "GraphQL, REST API & SDK's",
    tag: "Modern",
    tagBg: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    border: "border-violet-500/20 col-span-2",
    headerBg: "bg-violet-500/5",
    accent: "text-violet-300",
    desc: "Uses standard HTTPS URLs that open the app if installed, or fall back to the website gracefully.",
    example: "https://myapp.com/product/42",
    pros: ["SEO friendly", "Seamless fallback", "No custom scheme"],
    cons: ["Requires domain verification", "More complex setup"],
  },
  {
    name: "Authentication",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    accent: "text-emerald-300",
  },
  {
    name: "Web Developement",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    accent: "text-emerald-300",
  },
  {
    name: "QR Generator",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    accent: "text-emerald-300",
  },
];
const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h1
        data-cursor="-opaque"
        className="text-4xl text-center md:text-5xl font-bold leading-tight mb-6"
      >
        All-in-One Backend <br />
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
          &nbsp;Platform for Developers
        </span>
      </h1>
      <div className="mt-10 grid grid-cols-3 gap-2">
        {types.map((t, i) => (
          <div
            key={i}
            className={`rounded-2xl border ${t.border} bg-white/[0.025] overflow-hidden hover:bg-white/[0.04] transition-colors duration-200`}
          >
            <div
              className={`px-7 py-5 ${t.headerBg} border-b ${t.border} flex flex-wrap items-center gap-3`}
            >
              <h3 className={`font-display text-xl font-bold ${t.accent}`}>
                {t.name}
              </h3>
            </div>
            <div className="px-7 py-6">hello</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
