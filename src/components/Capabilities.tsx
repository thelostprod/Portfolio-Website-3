import { useState } from "react";
import { motion } from "motion/react";
import { Capability } from "../types";
import { capabilitiesData } from "../data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Capabilities() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-black/10" id="capabilities">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section heading left side sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] text-[#221DF2] uppercase bg-[#221DF2]/5 px-3 py-1 rounded-full mb-4 border border-[#221DF2]/10 font-mono">
              <Sparkles size={10} className="text-[#221DF2] animate-pulse" /> Core Offerings
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl tracking-tight text-black leading-tight">
              Capabilities & Craft.
            </h2>
            <p className="text-black/60 text-sm mt-6 leading-relaxed max-w-sm font-sans font-light">
              Creative direction backed by metrics. I integrate storytelling, narrative structure, and cinematic sound design to make content work.
            </p>
          </div>

          {/* Interactive capabilities list right side */}
          <div className="lg:col-span-8 flex flex-col">
            {capabilitiesData.map((item: Capability) => {
              const isHovered = hoveredId === item.id;
              const isClicked = clickedId === item.id;
              const isOpen = isHovered || isClicked;
              return (
                <div
                  key={item.id}
                  className="border-b border-black/10 py-6 sm:py-8 cursor-pointer relative group transition-all duration-300"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setClickedId(isClicked ? null : item.id)}
                >
                  {/* Subtle hover background block */}
                  <div className={`absolute inset-0 bg-[#221DF2]/[0.008] transition-opacity rounded-lg pointer-events-none ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                  <div className="flex items-start gap-4 sm:gap-8 relative z-10">
                    {/* Index */}
                    <span className={`font-serif italic text-sm sm:text-lg select-none font-bold transition-colors duration-300 pt-1 ${isOpen ? "text-[#221DF2]" : "text-black/35 group-hover:text-[#221DF2]"}`}>
                      {item.num}
                    </span>

                    {/* Content Block */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="max-w-xl">
                        <h3 className={`font-serif italic font-normal text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${isOpen ? "text-[#221DF2]" : "text-black group-hover:text-[#221DF2]"}`}>
                          {item.title}
                        </h3>
                        {/* Smooth accordion-style reveal of the description */}
                        <motion.p
                          initial={false}
                          animate={{
                            height: isOpen ? "auto" : "0px",
                            opacity: isOpen ? 1 : 0,
                            marginTop: isOpen ? "8px" : "0px"
                          }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="text-black/60 text-xs sm:text-sm leading-relaxed overflow-hidden font-sans font-light"
                        >
                          {item.description}
                        </motion.p>
                      </div>

                      {/* Animated row arrow with brand colors */}
                      <div className="hidden sm:block">
                        <motion.div
                          animate={{ x: isOpen ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? "border-[#221DF2]/30 text-[#221DF2] bg-[#221DF2]/5" : "border-black/10 text-black/40 group-hover:border-[#221DF2]/30 group-hover:text-[#221DF2] group-hover:bg-[#221DF2]/5"}`}
                        >
                          <ArrowRight size={14} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
