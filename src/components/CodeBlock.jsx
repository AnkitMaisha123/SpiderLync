import { useState } from "react";

export default function CodeBlock({ examples, color }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(examples[active].code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ background: "#0d0d14" }}>
      {/* Tab bar */}
      <div className="flex items-center border-b border-white/[0.06] px-4">
        {/* Traffic lights */}
        <div className="flex gap-1.5 py-3.5 mr-4 flex-shrink-0">
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 flex-1 overflow-x-auto">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 text-xs font-mono whitespace-nowrap border-b-2 transition-all duration-200 bg-transparent"
              style={{
                borderBottomColor: active === i ? color : "transparent",
                color: active === i ? color : "rgba(255,255,255,0.3)",
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={copy}
          className="ml-2 flex-shrink-0 text-[11px] font-mono px-3.5 py-1.5 rounded-lg border transition-all duration-200"
          style={{
            background: copied ? `${color}22` : "rgba(255,255,255,0.04)",
            borderColor: copied ? `${color}44` : "rgba(255,255,255,0.1)",
            color: copied ? color : "rgba(255,255,255,0.35)",
          }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>

      {/* Code */}
      <pre className="m-0 px-7 py-6 font-mono text-[13px] leading-[1.8] text-sky-300 overflow-x-auto whitespace-pre">
        <code>{examples[active].code}</code>
      </pre>
    </div>
  );
}
