"use client";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const SystemDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Starts when top of section hits 75% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // 1. Reveal Title
      tl.from(".diagram-title", { opacity: 0, y: 20, duration: 0.5 });

      // 2. Sequence the Nodes appearing
      tl.from(".diagram-node", {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.5,
        stagger: 0.2, // Time between each node appearing
        ease: "back.out(1.7)",
      });

      // 3. Animate the connecting lines (width from 0% to 100%)
      tl.from(
        ".connector-line",
        {
          width: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=0.8"
      ); // Overlap slightly with node animation
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 diagram-title">
          <p className="font-mono text-xs text-[var(--accent)] mb-2 uppercase tracking-widest">
            // Architecture Highlight
          </p>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Automated DesignOps Pipeline
          </h3>
          <p className="text-[var(--text-muted)] max-w-2xl text-lg leading-relaxed">
            Eliminating manual copy-paste errors and standardizing token naming
            by automating the extraction of CSS tokens directly from Figma.
          </p>
        </div>

        {/* THE VISUAL FLOW */}
        <div className="relative bg-[var(--surface)] rounded-3xl p-8 md:p-20 overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            {/* NODE 1 */}
            <Node label="Figma API" sub="Source of Truth" icon="🎨" />

            <Connector />

            {/* NODE 2 */}
            <Node
              label="Transformer"
              sub="Normalization Logic"
              icon="⚙️"
              isProcessing
            />

            <Connector />

            {/* NODE 3 */}
            <Node label="NPM Package" sub="Design System v2" icon="📦" />

            <Connector />

            {/* NODE 4 */}
            <Node
              label="Next.js App"
              sub="Dr. Oetker Platform"
              icon="🚀"
              isFinal
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB COMPONENTS ---

function Node({
  label,
  sub,
  icon,
  isProcessing,
  isFinal,
}: {
  label: string;
  sub: string;
  icon: ReactNode;
  isProcessing?: boolean;
  isFinal?: boolean;
}) {
  return (
    <div
      className={cn(
        "diagram-node relative flex flex-col items-center justify-center w-full md:w-64 h-48 rounded-2xl bg-white shadow-sm border transition-all hover:shadow-md hover:-translate-y-1",
        isFinal
          ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-blue-50/10"
          : "border-gray-200",
        isProcessing ? "border-dashed border-gray-300" : ""
      )}
    >
      <span className="text-4xl mb-4">{icon}</span>
      <h4 className="font-bold text-lg text-[var(--text-main)]">{label}</h4>
      <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide mt-2">
        {sub}
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex-1 w-full md:w-auto h-12 md:h-1 flex items-center justify-center relative">
      {/* The visible line that animates */}
      <div className="connector-line h-8 w-0.5 md:h-0.5 md:w-full bg-gradient-to-b md:bg-gradient-to-r from-gray-200 via-[var(--accent)] to-gray-200" />
      {/* Arrow head */}
      <div className="absolute opacity-20 md:right-0 md:top-1/2 md:-translate-y-1/2 bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0">
        ➤
      </div>
    </div>
  );
}
