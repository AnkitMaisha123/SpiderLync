import { NavLink } from "react-router-dom";
import { allFeatures } from "../data/featuresData";

// Group features by category
const grouped = allFeatures.reduce((acc, f) => {
  if (!acc[f.category]) acc[f.category] = [];
  acc[f.category].push(f);
  return acc;
}, {});

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[60px] left-0 z-40 h-[calc(100vh-60px)] w-56 overflow-y-auto
          border-r border-white/5 bg-[#080810]/95 backdrop-blur-xl
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-[60px] lg:translate-x-0 lg:flex-shrink-0
        `}
      >
        <div className="p-4 pb-10">
          {Object.entries(grouped).map(([category, features]) => (
            <div key={category} className="mb-5">
              <p className="px-2 mb-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-white/20">
                {category}
              </p>
              {features.map((f) => (
                <NavLink
                  key={f.id}
                  to={`/features/${f.id}`}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    background: isActive ? `${f.color}18` : "transparent",
                    color: isActive ? f.color : "rgba(255,255,255,0.42)",
                  })}
                  className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl mb-0.5 text-sm font-medium transition-all duration-150 hover:bg-white/5 group"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-[13px] flex-shrink-0 border transition-all duration-150"
                        style={{
                          background: isActive ? `${f.color}22` : "rgba(255,255,255,0.04)",
                          borderColor: isActive ? `${f.color}44` : "rgba(255,255,255,0.06)",
                        }}
                      >
                        {f.icon}
                      </span>
                      <span
                        className="truncate transition-colors duration-150"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
                      >
                        {f.name}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
