import React, { useLayoutEffect, useRef, useState } from "react";

import {
  Database,
  Bell,
  Activity,
  Link,
  Video,
  CloudLightning,
  Code,
  ShieldCheck,
  Globe,
  QrCode,
  Scissors,
  Mail,
} from "lucide-react";

const types = [
  {
    name: "Parse Integration",
    icon: Activity,
    border: "border-sky-500/20 lg:col-span-2 sm:col-span-2 col-span-1",
    headerBg: "bg-sky-500/5",
    color: "#00a6f4",
    accent: "text-sky-300",
    desc: `Built on top of Parse Server, SpiderLync provides a scalable backend with automatic APIs, database management, and cloud logic—so you can skip boilerplate and focus on building.`,
    code: `import Parse from "parse";

Parse.initialize("APP_ID");
Parse.serverURL = "https://api.spiderlync.com";

const Test = Parse.Object.extend("Test");
const obj = new Test();
obj.set("name", "SpiderLync");
await obj.save();`,
  },
  {
    name: "Push Notifications",
    icon: Bell,
    border: "border-violet-500/20",
    headerBg: "bg-violet-500/5",
    color: "#7f22fe",
    accent: "text-violet-300",
    desc: "Send targeted, real-time push notifications with support for scheduling, segmentation, and multi-device delivery via a unified API.",
    code: `await fetch("/api/push", {
  method: "POST",
  body: JSON.stringify({
    title: "Hello",
    message: "New update available"
  })
});
    `,
  },
  {
    name: "Realtime Database",
    icon: Database,
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
    color: "#009966",
    accent: "text-emerald-300",
    desc: "Subscribe to live data streams with WebSocket-based syncing, enabling real-time updates across apps without manual polling.",

    code: `const socket = new WebSocket("wss://api.spiderlync.com");

socket.onmessage = (event) => {
  console.log("New Data:", event.data);
};
    `,
  },
  {
    name: "Referral Links / Deep Linking",
    icon: Link,
    border: "border-orange-500/40 lg:col-span-2 sm:col-span-2 col-span-1",
    headerBg: "bg-orange-500/5",
    accent: "text-orange-300",
    color: "#ff6900",
    desc: "Generate dynamic deep links that route users to specific in-app content while tracking referrals and campaign performance.",

    code: `const link = await createDeepLink({
  path: "/product/123",
  ref: "user_456"
});
    `,
  },
  {
    name: "Cloud Functions",
    icon: CloudLightning,
    border: "border-rose-500/40",
    headerBg: "bg-rose-500/5",
    color: "#f6339a",
    accent: "text-rose-300",
    desc: "Deploy serverless functions to handle business logic, triggers, and background jobs with automatic scaling.",

    code: `Parse.Cloud.define("hello", async (req) => {
  return "Hello from SpiderLync!";
});
    `,
  },
  {
    name: "Live Stream",
    icon: Video,
    border: "border-blue-500/40",
    headerBg: "bg-blue-500/5",
    accent: "text-blue-300",
    color: "#155dfc",
    desc: "Enable live video and data streaming with scalable infrastructure, optimized for performance and real-time interaction.",

    code: `const stream = await navigator.mediaDevices.getUserMedia({ video: true });

video.srcObject = stream;
    `,
  },

  {
    name: "GraphQL, REST API & SDK's",
    icon: Code,
    border: "border-violet-500/20",
    color: "#7f22fe",

    headerBg: "bg-violet-500/5",
    accent: "text-violet-300",
    desc: "Instantly available REST and GraphQL APIs with SDK support for JavaScript, React Native, and more—fully auto-generated from your schema.",

    code: `// GraphQL
query {
  users {
    id
    name
  }
}

// REST
fetch("/api/users").then(res => res.json());
    `,
  },
  {
    name: "Authentication",
    icon: ShieldCheck,
    border: "border-lime-500/20",
    headerBg: "bg-lime-500/5",
    accent: "text-lime-300",
    color: "#7ccf00",
    desc: "Built-in authentication with support for email/password, OAuth providers, JWT, and role-based access control.",

    code: `const user = await Parse.User.logIn("username", "password");
console.log(user);
    `,
  },
  {
    name: "Web Developement",
    icon: Globe,
    border: "border-indigo-500/20 lg:col-span-2 sm:col-span-2 col-span-1",
    headerBg: "bg-indigo-500/5",
    color: "#7c86ff",
    accent: "text-indigo-300",
    desc: "Build and deploy full-stack applications with seamless integration between frontend frameworks and SpiderLync backend services.",
    code: `export default function Home() {
  return <h1>Welcome to SpiderLync</h1>;
}
    `,
  },
  {
    name: "QR Generator",
    icon: QrCode,
    border: "border-yellow-500/20",
    headerBg: "bg-yellow-500/5",
    accent: "text-yellow-300",
    color: "#f0b100",
    desc: "Generate customizable QR codes for links, data, and user interactions with dynamic rendering support.",

    code: `import QRCode from "qrcode";

QRCode.toDataURL("https://spiderlync.com", (err, url) => {
  console.log(url);
});`,
  },
  {
    name: "Tiny URL",
    icon: Scissors,
    border: "border-cyan-500/20",
    headerBg: "bg-cyan-500/5",
    accent: "text-cyan-300",
    color: "#00b8db",
    desc: "Create compact URLs with analytics, tracking, and redirection control via a simple API.",

    code: `const shortUrl = await fetch("/api/shorten", {
  method: "POST",
  body: JSON.stringify({ url: "https://example.com" })
});`,
  },
  {
    name: "SMS Mail Gateway",
    icon: Mail,
    border: "border-pink-500/20",
    headerBg: "bg-pink-500/10",
    color: "#f6339a",
    accent: "text-pink-300",
    desc: "Unified API to send SMS and emails with delivery tracking, templates, and automation workflows.",

    code: `await sendMessage({
  to: "+1234567890",
  message: "Hello from SpiderLync"
});

    `,
  },
];
const FeaturesSection = () => {
  const blobRef = useRef(null);
  useLayoutEffect(() => {
    const move = (e) => {
      if (blobRef.current) {
        blobRef.current.style.left = e.clientX + "px";
        blobRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };
  return (
    <section className="max-w-6xl mx-auto mt-10">
      <div ref={blobRef} className="blob" />
      <h1
        data-cursor="-opaque"
        className="text-2xl md:text-5xl text-center font-bold leading-tight mb-6"
      >
        All-in-One Backend <br />
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
          &nbsp;Platform for Developers
        </span>
      </h1>
      <div className="mt-10 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-2">
        {types.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              onMouseEnter={() => {
                blobRef.current.style.background = t.color;
                blobRef.current.classList.add("active");
              }}
              onMouseLeave={() => blobRef.current.classList.remove("active")}
              key={i}
              className={`rounded-2xl border ${t.border} bg-white/[0.025] overflow-hidden hover:bg-white/[0.04] transition-colors duration-200`}
            >
              <div
                className={`px-7 py-5 ${t.headerBg} border-b ${t.border} flex flex-wrap items-center gap-3`}
              >
                <h3
                  className={`font-display text-xl font-bold ${t.accent} flex gap-2 items-center justify-center`}
                >
                  <Icon />
                  {t.name}
                </h3>
              </div>
              <div className="px-7 py-6">
                <p className="text-white/65">{t.desc}</p>
                <div className="relative mt-5">
                  <pre className="font-mono-custom rounded-xl  text-sm text-sky-400 bg-black/60 px-7 py-5 overflow-x-auto scrollbar-hide leading-relaxed">
                    <code>{t.code}</code>
                  </pre>
                  <button
                    onClick={() => copyCode(t.code, i)}
                    className="absolute top-3 right-4 text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all font-mono-custom"
                  >
                    {copiedIdx === i ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
