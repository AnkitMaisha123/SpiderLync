import { useState } from "react";

export default function FAQItem({ q, a, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer text-left gap-4"
      >
        <span className="text-[15px] font-medium text-white/85 leading-relaxed">
          {q}
        </span>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-lg flex-shrink-0 border transition-all duration-300"
          style={{
            borderColor: open ? color : "rgba(255,255,255,0.12)",
            color: open ? color : "rgba(255,255,255,0.4)",
            background: open ? `${color}15` : "transparent",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? 240 : 0 }}
      >
        <p className="text-sm text-white/50 leading-[1.75] pb-5">{a}</p>
      </div>
    </div>
  );
}
