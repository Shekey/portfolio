"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/resume-data";

gsap.registerPlugin(ScrollTrigger);

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toolkit } = portfolioData;

  useGSAP(
    () => {
      // Animate Metrics (The big numbers)
      gsap.from(".metric-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".metrics-grid",
          start: "top 80%",
        },
      });

      // Animate Lists (The tech columns)
      gsap.from(".tech-col", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 bg-[var(--surface)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* IMPACT METRICS */}
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-b border-gray-200 pb-12">
          {toolkit.impact.map((metric, i) => (
            <div key={i} className="metric-item">
              <p className="font-mono text-xs text-[var(--text-muted)] uppercase mb-2 tracking-widest">
                {metric.label}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-[var(--text-main)] tracking-tighter">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* SKILLS LISTS (Clean columns, ample whitespace) */}
        <div className="tech-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          <div className="tech-col">
            <h4 className="font-bold text-xl mb-8">Core Architecture</h4>
            <ul className="space-y-4">
              {toolkit.core.map((t) => (
                <SkillItem key={t} text={t} />
              ))}
            </ul>
          </div>

          <div className="tech-col">
            <h4 className="font-bold text-xl mb-8">Backend & Data</h4>
            <ul className="space-y-4">
              {toolkit.backend.map((t) => (
                <SkillItem key={t} text={t} />
              ))}
            </ul>
          </div>

          <div className="tech-col">
            <h4 className="font-bold text-xl mb-8">Quality Assurance</h4>
            <ul className="space-y-4">
              {toolkit.quality.map((t) => (
                <SkillItem key={t} text={t} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

function SkillItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4 text-[var(--text-muted)] font-mono text-sm border-b border-gray-200/50 pb-2">
      <span className="w-1 h-1 bg-[var(--accent)] rounded-full opacity-50" />
      {text}
    </li>
  );
}
