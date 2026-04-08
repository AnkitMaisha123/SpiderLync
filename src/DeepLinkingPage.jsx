import { useState } from "react";

const sections = [
  { id: "what",      label: "What is Deep Linking?", icon: "🔗" },
  { id: "types",     label: "Types",                 icon: "📂" },
  { id: "how",       label: "How It Works",          icon: "⚙️" },
  { id: "usecases",  label: "Use Cases",             icon: "💡" },
  { id: "setup",     label: "Setup Guide",           icon: "🛠️" },
  { id: "platforms", label: "Platforms",             icon: "📱" },
];

const types = [
  {
    name: "Basic Deep Link",
    tag: "Traditional",
    tagBg: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
    border: "border-sky-500/20",
    headerBg: "bg-sky-500/5",
    accent: "text-sky-300",
    desc: "Opens a specific screen inside an already-installed app using a custom URI scheme like myapp://dashboard.",
    example: "myapp://product/42",
    pros: ["Simple to implement", "Works on all platforms"],
    cons: ["Fails if app not installed", "No fallback behavior"],
  },
  {
    name: "Deferred Deep Link",
    tag: "Smart",
    tagBg: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    border: "border-violet-500/20",
    headerBg: "bg-violet-500/5",
    accent: "text-violet-300",
    desc: "Remembers destination even if user doesn't have the app. After installation, the user is routed to the right screen.",
    example: "Works via attribution SDKs",
    pros: ["Survives app install", "Great for campaigns"],
    cons: ["Requires third-party SDK", "Slight delay"],
  },
  {
    name: "Universal / App Links",
    tag: "Modern",
    tagBg: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    accent: "text-emerald-300",
    desc: "Uses standard HTTPS URLs that open the app if installed, or fall back to the website gracefully.",
    example: "https://myapp.com/product/42",
    pros: ["SEO friendly", "Seamless fallback", "No custom scheme"],
    cons: ["Requires domain verification", "More complex setup"],
  },
];

const steps = [
  {
    step: "01",
    title: "Define Your URL Structure",
    desc: "Plan your deep link schema — decide between custom URI schemes (myapp://) or universal HTTPS links.",
    code: `// URI Scheme example
myapp://home
myapp://profile/:userId
myapp://product/:productId`,
  },
  {
    step: "02",
    title: "Configure App to Handle Links",
    desc: "Register your scheme in AndroidManifest.xml (Android) or Info.plist (iOS).",
    code: `<!-- Android: AndroidManifest.xml -->
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <data android:scheme="myapp"/>
</intent-filter>`,
  },
  {
    step: "03",
    title: "Handle the Incoming URL",
    desc: "Parse the URL when the app opens and navigate the user to the correct screen.",
    code: `// React Native example
import { Linking } from 'react-native';

Linking.addEventListener('url', ({ url }) => {
  const route = parseDeepLink(url);
  navigate(route);
});`,
  },
  {
    step: "04",
    title: "Test & Verify",
    desc: "Test your deep links on both platforms using adb commands and iOS simulator.",
    code: `# Android test
adb shell am start \\
  -a android.intent.action.VIEW \\
  -d "myapp://product/42"

# iOS test
xcrun simctl openurl booted \\
  "myapp://product/42"`,
  },
];

const useCases = [
  { icon: "📣", title: "Marketing Campaigns",     desc: "Direct users from email, SMS, or ads to a specific promotion or product page.",           hover: "hover:border-orange-500/40 hover:bg-orange-500/5"  },
  { icon: "🔔", title: "Push Notifications",      desc: "Tap a notification → land directly on the relevant content, not the home screen.",         hover: "hover:border-blue-500/40 hover:bg-blue-500/5"     },
  { icon: "🤝", title: "Referral Programs",       desc: "Share a link; new users install the app and land on the referrer's profile automatically.", hover: "hover:border-emerald-500/40 hover:bg-emerald-500/5"},
  { icon: "🛒", title: "Abandoned Cart Recovery", desc: "Re-engage users by linking them straight back to their cart.",                              hover: "hover:border-rose-500/40 hover:bg-rose-500/5"     },
  { icon: "🔐", title: "Magic Link Auth",          desc: "One-click login links that open the app and authenticate the user instantly.",              hover: "hover:border-violet-500/40 hover:bg-violet-500/5" },
  { icon: "📲", title: "Social Sharing",          desc: "Share content from your app to social — when tapped, opens the right in-app screen.",      hover: "hover:border-sky-500/40 hover:bg-sky-500/5"       },
];

const platforms = [
  { name: "Android",      logo: "🤖", method: "App Links / Intent Filters",     file: "AndroidManifest.xml",                    bg: "bg-emerald-500/5",  accent: "text-emerald-400", border: "border-emerald-500/20" },
  { name: "iOS",          logo: "🍎", method: "Universal Links / URL Schemes",   file: "Info.plist + apple-app-site-association", bg: "bg-slate-500/5",    accent: "text-slate-300",   border: "border-slate-500/20"   },
  { name: "React Native", logo: "⚛️", method: "Linking API / react-navigation", file: "Both platforms",                         bg: "bg-cyan-500/5",     accent: "text-cyan-400",    border: "border-cyan-500/20"    },
  { name: "Flutter",      logo: "💙", method: "go_router / uni_links",          file: "Both platforms",                         bg: "bg-blue-500/5",     accent: "text-blue-400",    border: "border-blue-500/20"    },
];

export default function DeepLinkingPage() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .float { animation: float 4s ease-in-out infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }

        .dot-bg {
          background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ring-glow {
          box-shadow: 0 0 0 1px rgba(99,102,241,0.2), 0 8px 48px rgba(99,102,241,0.18);
        }
        .card-glow:hover {
          box-shadow: 0 0 0 1px rgba(99,102,241,0.15), 0 4px 24px rgba(99,102,241,0.08);
        }
        /* Subtle scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="dot-bg relative overflow-hidden pt-24 pb-20 px-6 text-center border-b border-white/5">
        {/* Radial blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-violet-600/8 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-sky-600/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto fade-up">
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-mono-custom tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
            Developer Documentation
          </span>
          <h1 className="font-display text-6xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
            Deep{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Linking
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know — from fundamentals to platform-specific
            implementation — to send users exactly where they need to go.
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-2 rounded-lg text-sm font-mono-custom bg-white/5 border border-white/10 text-white/60 hover:bg-indigo-500/15 hover:border-indigo-500/35 hover:text-indigo-300 transition-all duration-200"
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-28 py-24">

        {/* ─── WHAT IS DEEP LINKING ─── */}
        <section id="what" className="fade-up">
          <SectionLabel number="01" label="What is Deep Linking?" />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 card-glow transition-all duration-300">
              <div className="text-4xl mb-4 float inline-block">🔗</div>
              <h3 className="font-display text-2xl font-bold mb-3 text-white">The Core Idea</h3>
              <p className="text-white/50 leading-relaxed">
                A <span className="text-indigo-400 font-semibold">deep link</span> is a URL that points to a
                specific piece of content inside a mobile app — not just the app's home screen. Think of it
                like a hyperlink for the web, but for your native app's inner screens.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 card-glow transition-all duration-300">
              <div className="text-4xl mb-4 float inline-block" style={{ animationDelay: "0.6s" }}>📍</div>
              <h3 className="font-display text-2xl font-bold mb-3 text-white">Without vs With</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 text-red-400">
                  <span className="mt-0.5 font-bold flex-shrink-0">✗</span>
                  <span>User clicks → App opens → Home screen → User navigates manually</span>
                </div>
                <div className="flex items-start gap-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3 text-emerald-400">
                  <span className="mt-0.5 font-bold flex-shrink-0">✓</span>
                  <span>User clicks → App opens → <strong className="text-emerald-300">Exact content shown instantly</strong></span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/8 p-8">
            <p className="text-indigo-200 leading-relaxed text-lg">
              Deep links dramatically improve user experience, conversion rates, and retention — they are the
              bridge between your marketing, notifications, and the in-app content users actually want.
            </p>
          </div>
        </section>

        {/* ─── TYPES ─── */}
        <section id="types">
          <SectionLabel number="02" label="Types of Deep Links" />
          <div className="mt-10 space-y-6">
            {types.map((t, i) => (
              <div key={i} className={`rounded-2xl border ${t.border} bg-white/[0.025] overflow-hidden hover:bg-white/[0.04] transition-colors duration-200`}>
                <div className={`px-7 py-5 ${t.headerBg} border-b ${t.border} flex flex-wrap items-center gap-3`}>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono-custom font-medium ${t.tagBg}`}>{t.tag}</span>
                  <h3 className={`font-display text-xl font-bold ${t.accent}`}>{t.name}</h3>
                </div>
                <div className="px-7 py-6">
                  <p className="text-white/50 mb-5">{t.desc}</p>
                  <div className="font-mono-custom text-sm bg-black/50 rounded-lg px-4 py-3 text-emerald-400 border border-white/5 mb-5">
                    {t.example}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4">
                      <p className="text-emerald-400 font-semibold mb-2">✓ Pros</p>
                      {t.pros.map((p, j) => <p key={j} className="text-emerald-300/70 ml-2">· {p}</p>)}
                    </div>
                    <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4">
                      <p className="text-red-400 font-semibold mb-2">✗ Cons</p>
                      {t.cons.map((c, j) => <p key={j} className="text-red-300/70 ml-2">· {c}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how">
          <SectionLabel number="03" label="How It Works — Step by Step" />
          <div className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
                <div className="flex items-center gap-5 px-7 py-5 border-b border-white/5">
                  <span className="font-display text-4xl font-extrabold text-white/8 select-none leading-none flex-shrink-0">{s.step}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
                    <p className="text-white/40 text-sm mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="relative">
                  <pre className="font-mono-custom text-sm text-emerald-400 bg-black/60 px-7 py-5 overflow-x-auto leading-relaxed">
                    <code>{s.code}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(s.code, i)}
                    className="absolute top-3 right-4 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all font-mono-custom"
                  >
                    {copiedIdx === i ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── USE CASES ─── */}
        <section id="usecases">
          <SectionLabel number="04" label="Use Cases" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-white/8 bg-white/[0.025] p-6 ${u.hover} transition-all duration-200 group cursor-default`}
              >
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-200">{u.icon}</span>
                <h4 className="font-display font-bold text-lg mb-2 text-white">{u.title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SETUP CHECKLIST ─── */}
        <section id="setup">
          <SectionLabel number="05" label="Quick Setup Checklist" />
          <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.025] divide-y divide-white/5 overflow-hidden">
            {[
              { check: "Choose your link type (URI scheme vs Universal Links)",            done: true  },
              { check: "Register intent filters / URL schemes in native config files",     done: true  },
              { check: "Host apple-app-site-association / assetlinks.json on your domain", done: false },
              { check: "Handle incoming URL in app navigation logic",                      done: false },
              { check: "Add fallback for web browser (no app installed)",                  done: false },
              { check: "Test on physical device (both platforms)",                         done: false },
              { check: "Add analytics tracking to deep link events",                       done: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-7 py-4 ${item.done ? "bg-emerald-500/5" : ""}`}>
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs border flex-shrink-0 font-bold transition-all ${item.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/15 text-white/15"}`}>
                  {item.done ? "✓" : ""}
                </span>
                <span className={`text-sm ${item.done ? "text-white/80 font-medium" : "text-white/30"}`}>{item.check}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PLATFORMS ─── */}
        <section id="platforms">
          <SectionLabel number="06" label="Platform Support" />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {platforms.map((p, i) => (
              <div key={i} className={`rounded-2xl border ${p.border} ${p.bg} p-7 card-glow transition-all duration-300`}>
                <div className="text-3xl mb-3">{p.logo}</div>
                <h3 className={`font-display text-xl font-bold ${p.accent} mb-2`}>{p.name}</h3>
                <p className="text-white/40 text-sm mb-1">
                  Method: <span className="text-white/70 font-medium">{p.method}</span>
                </p>
                <p className="text-white/40 text-sm">
                  Config:{" "}
                  <span className="font-mono-custom text-xs text-white/55 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                    {p.file}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="text-center py-8">
          <div className="rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-[#0d0d14] to-violet-500/8 p-14 ring-glow">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="font-display text-4xl font-bold mb-4 text-white">Ready to Implement?</h2>
            <p className="text-white/45 mb-8 max-w-lg mx-auto leading-relaxed">
              Start with Universal Links for modern apps — they give you the best fallback experience and SEO
              benefits out of the box.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                iOS Docs →
              </a>
              <a
                href="https://developer.android.com/training/app-links"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors"
              >
                Android Docs →
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-5xl font-extrabold text-white/5 select-none leading-none">{number}</span>
      <h2 className="font-display text-3xl font-bold text-white">{label}</h2>
    </div>
  );
}