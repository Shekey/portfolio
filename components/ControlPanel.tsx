"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ControlPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });

      // Animate the Gauge (from 0 to 100%)
      gsap.fromTo(
        ".gauge-circle",
        { strokeDashoffset: 251 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: { trigger: ".gauge-card" },
        }
      );
    },
    { scope: containerRef }
  );

  // UPDATED STACK: Includes GSAP & A11y
  const stack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind v4",
    "GSAP",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "Design Systems",
    "Accessibility (a11y)",
    "Docker",
    "AWS",
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h3 className="font-bold text-2xl md:text-3xl text-[var(--text-main)]">
            System Overview
          </h3>
          <div className="h-px bg-[var(--border)] flex-1 ml-8 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto">
          {/* 1. PIPELINE VISUAL (Same as before, simplified for brevity) */}
          <div className="bento-card md:col-span-2 md:row-span-1 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10 mb-4">
              <h4 className="font-bold text-lg text-[var(--text-main)]">
                DesignOps Pipeline
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-mono uppercase">
                Figma API → Automated Tokens
              </p>
            </div>
            {/* Visual Flow */}
            <div className="flex items-center justify-between relative z-10 w-full">
              <Step icon="🎨" label="Figma" />
              <div className="flex-1 h-[1px] bg-[var(--border)] mx-2" />
              <Step icon="⚙️" label="Transform" />
              <div className="flex-1 h-[1px] bg-[var(--border)] mx-2" />
              <Step icon="📦" label="NPM" />
            </div>
          </div>

          {/* 2. LIGHTHOUSE GAUGE (Animated) */}
          <div className="bento-card gauge-card bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 flex flex-col items-center justify-center relative">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-800"
                />
                {/* Full circle is approx 251px circumference */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251"
                  strokeDashoffset="251"
                  strokeLinecap="round"
                  className="text-green-500 gauge-circle"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-[var(--text-main)]">
                  100
                </span>
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                  A11y
                </span>
              </div>
            </div>
            <p className="text-xs font-medium text-[var(--text-muted)] mt-2 text-center">
              Lighthouse Audit
            </p>
          </div>

          {/* 3. TECH STACK (Updated with GSAP/A11y) */}
          <div className="bento-card md:col-span-1 md:row-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 flex flex-col">
            <h4 className="font-bold text-lg mb-6 text-[var(--text-main)]">
              Core Stack
            </h4>

            {/* Tags Wrapper */}
            <div className="flex flex-wrap gap-2 content-start">
              {stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-[var(--bg)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-[10px] text-[var(--text-muted)] font-mono opacity-70">
                // Latest version locked
                <br />
                // Strict type safety
              </p>
            </div>
          </div>

          {/* 4. GLOBAL SCALE (Filler) */}
          <div className="bento-card md:col-span-2 bg-[var(--text-main)] text-[var(--bg)] rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg">Global Architecture</h4>
              <p className="text-sm opacity-70 mt-1 max-w-xs">
                Supporting 40+ domains with zero downtime.
              </p>
            </div>
            <div className="mt-4 text-3xl font-bold text-green-400">
              99.99%{" "}
              <span className="text-sm font-normal text-[var(--bg)] opacity-70">
                Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Step({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] z-10">
      <span className="text-lg">{icon}</span>
      <span className="text-[9px] font-bold uppercase text-[var(--text-main)]">
        {label}
      </span>
    </div>
  );
}
