"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/resume-data";
import { SectionShell } from "./SectionShell";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ExperienceLog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".job-row", { opacity: 1, y: 0 });
        return;
      }

      const rows = gsap.utils.toArray(".job-row");
      rows.forEach((row: any) => {
        gsap.set(row, { opacity: 0, y: 20 });

        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell ref={containerRef} label={portfolioData.ui.labels.experience}>
      <div className="relative max-w-5xl mx-auto">
        {/* Branch Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2 hidden md:block" />
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[var(--border)] md:hidden" />

        <div className="flex flex-col gap-12 md:gap-24">
          {portfolioData.jobs.map((job, index) => (
            <div
              key={index}
              className="job-row group relative grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-0"
            >
              {/* LEFT COLUMN (Desktop): Date & Version */}
              <div className="hidden md:flex flex-col items-end pr-12 text-right">
                <span className="font-mono text-sm text-[var(--accent)] font-bold tracking-wider">
                  {job.period}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono mt-1 opacity-50 uppercase tracking-widest">
                  {index === 0
                    ? "Latest Commit"
                    : `v${portfolioData.jobs.length - index}.0.0`}
                </span>
              </div>

              {/* CENTER: Commit Node */}
              <div className="absolute left-[19px] md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center h-8 md:h-auto">
                <div className="relative w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--text-muted)] group-hover:border-[var(--accent)] group-hover:scale-125 transition-all duration-300 z-10">
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* RIGHT COLUMN: Content */}
              <div className="pl-12 md:pl-12">
                {/* Mobile Date */}
                <div className="md:hidden font-mono text-xs text-[var(--accent)] mb-2">
                  {job.period}
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                  {job.company}
                </h3>

                <p className="text-base font-mono text-[var(--text-muted)] mt-1 mb-6">
                  {job.role}
                </p>

                <ul className="space-y-4">
                  {job.highlights.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed"
                    >
                      <svg
                        className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--accent)] opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                {job.stack && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((tech: string, t: number) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-[10px] font-mono border border-[var(--border)] rounded text-[var(--text-muted)] uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
