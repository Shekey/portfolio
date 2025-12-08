"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/resume-data";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const ExperienceLog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".job-item", { opacity: 1, x: 0 });
        return;
      }

      const items = gsap.utils.toArray(".job-item");
      items.forEach((item: any) => {
        gsap.set(item, { opacity: 0, x: -30 });

        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell ref={containerRef} label={portfolioData.ui.labels.experience}>
      <div className="border-l border-[var(--border)] ml-3 md:ml-4 space-y-16 pl-8 md:pl-16 relative">
        {portfolioData.jobs.map((job, index) => (
          <div key={index} className="job-item opacity-0 relative group">
            {/* TIMELINE DOT ALIGNMENT FIX:
              - Mobile: padding-left is 8 (32px). Circle width is 9px. Center is -32 - 4.5 = -36.5px
              - Desktop: padding-left is 16 (64px). Center is -64 - 4.5 = -68.5px
            */}
            <span
              className="absolute top-[5px] w-[9px] h-[9px] bg-[var(--bg)] border border-[var(--accent)] rounded-full z-10 group-hover:bg-[var(--accent)] transition-colors duration-300"
              style={{
                left: "calc(-2rem - 4.5px)", // Mobile default (pl-8 = 2rem)
                // We use a media query style override or Tailwind utility for desktop
              }}
            />
            {/* We apply the desktop override using Tailwind specific class since calc in style tag doesn't support 'md:' */}
            <span className="hidden md:block absolute top-[5px] w-[9px] h-[9px] bg-[var(--bg)] border border-[var(--accent)] rounded-full z-10 group-hover:bg-[var(--accent)] transition-colors duration-300 -left-[calc(4rem+4.5px)]" />
            <span className="md:hidden absolute top-[5px] w-[9px] h-[9px] bg-[var(--bg)] border border-[var(--accent)] rounded-full z-10 group-hover:bg-[var(--accent)] transition-colors duration-300 -left-[calc(2rem+4.5px)]" />

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
              <h4 className="text-xl md:text-2xl font-bold text-[var(--text-main)] tracking-tight">
                {job.company}
              </h4>
              <span
                className={cn(
                  "font-mono text-xs mt-2 sm:mt-0 px-3 py-1 rounded border border-[var(--border)]",
                  index === 0
                    ? "bg-[var(--surface)] text-[var(--text-main)]"
                    : "text-[var(--text-muted)]"
                )}
              >
                {job.period}
              </span>
            </div>

            <p className="text-sm md:text-base font-medium text-[var(--accent)] mb-6 font-mono">
              {job.role}
            </p>

            <ul className="space-y-3">
              {job.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-[var(--text-muted)] leading-relaxed text-sm md:text-base"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full flex-shrink-0 opacity-50" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};
