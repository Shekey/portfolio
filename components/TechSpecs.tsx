"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionShell } from "./SectionShell";
import { portfolioData } from "@/data/resume-data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const TechSpecs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { specs } = portfolioData;

  useGSAP(
    () => {
      // A11Y: Skip animation
      if (prefersReducedMotion) {
        gsap.set(".spec-col", { y: 0, opacity: 1 });
        return;
      }

      const columns = gsap.utils.toArray(".spec-col");
      columns.forEach((col: any, i) => {
        // Set initial state
        gsap.set(col, { y: 30, opacity: 0 });

        gsap.to(col, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1, // Stagger effect
          ease: "power2.out",
          scrollTrigger: {
            trigger: col,
            start: "top 90%",
            // Scroll Down: Play
            // Scroll Past: None (Stay visible)
            // Scroll Up: None (Stay visible)
            // Scroll Up Past Top: Reverse (Fade out)
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell
      ref={containerRef}
      label="// SYSTEM_ARCHITECTURE"
      className="bg-[var(--surface)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <SpecColumn title="System Architecture" items={specs.architecture} />
        <SpecColumn title="Design Engineering" items={specs.designEngine} />
        <SpecColumn title="Backend & Data" items={specs.backend} />
        <SpecColumn title="Quality Assurance" items={specs.quality} />
      </div>

      <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-wrap gap-12 font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest opacity-60">
        <span>Thinking: Systems First</span>
        <span>Uptime: 99.99%</span>
        <span>A11y: WCAG 2.1 AA</span>
      </div>
    </SectionShell>
  );
};

function SpecColumn({ title, items }: { title: string; items: string[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // If reduced motion is on, we start fully visible. Otherwise, start hidden for GSAP.
  const initialClass = prefersReducedMotion ? "opacity-100" : "opacity-0";

  return (
    <div className={`spec-col ${initialClass}`}>
      <h3 className="text-lg font-bold text-[var(--text-main)] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--accent)] rounded-sm" />
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-mono border-b border-[var(--border)] pb-2 last:border-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
