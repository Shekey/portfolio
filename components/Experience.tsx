"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const { isImmersive } = useViewMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten experience data from your CV
  const jobs = portfolioData.experience;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".job-card");

      cards.forEach((card: any, index) => {
        if (isImmersive) {
          // Immersive: Soft fade up with slight rotation
          gsap.fromTo(
            card,
            { opacity: 0, y: 100, rotationX: 10 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        } else {
          // Architect: Technical slide from side
          gsap.fromTo(
            card,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [isImmersive] }
  );

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)] ${isImmersive ? "font-serif" : "font-mono"}`}
        >
          {isImmersive ? "Selected Works" : "02. Experience_Log"}
        </h2>
        <div className="h-1 w-24 bg-[var(--accent)]"></div>
      </div>

      <div className="space-y-12 relative">
        {/* Timeline Line (Architect Mode Only) */}
        {!isImmersive && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--grid-color)] md:left-8" />
        )}

        {jobs.map((job, i) => (
          <div key={i} className="job-card relative md:pl-20 group">
            {/* Architect Mode: Timeline Dot */}
            {!isImmersive && (
              <div className="hidden md:block absolute left-[30px] top-6 w-3 h-3 bg-[var(--bg-primary)] border-2 border-[var(--accent)] rounded-full z-10" />
            )}

            <div
              className={`
                p-8 rounded-xl transition-all duration-500
                ${
                  isImmersive
                    ? "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
                    : "bg-[var(--card-bg)] border border-[var(--grid-color)] hover:border-[var(--accent)]"
                }
             `}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {job.company}
                  </h3>
                  <p
                    className={`text-lg ${isImmersive ? "text-[var(--accent)]" : "text-[var(--text-secondary)] font-mono"}`}
                  >
                    {job.role}
                  </p>
                </div>
                <span className="text-sm text-[var(--text-secondary)] mt-2 md:mt-0 font-mono py-1 px-3 bg-[var(--grid-color)] rounded">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isImmersive ? "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" : "bg-[var(--text-secondary)]"}`}
                    />
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Specific Highlight based on CV (Figma Automation or Greenfield) */}
              {job.company.includes("Dr. Oetker") && (
                <div className="mt-6 pt-6 border-t border-[var(--grid-color)]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    Key Metric
                  </span>
                  <p className="font-mono text-sm mt-1">
                    [cite_start]"DesignOps Automation: Saved 3 working days per
                    handover cycle." [cite: 16]
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
