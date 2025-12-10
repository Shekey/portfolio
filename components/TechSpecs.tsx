"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionShell } from "./SectionShell";
import { portfolioData } from "@/data/resume-data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  CubeTransparentIcon, // Frontend
  ServerIcon, // Backend (NEW)
  ArrowsRightLeftIcon, // Integrations (NEW)
  PaintBrushIcon, // DesignOps
  ShieldCheckIcon, // Quality
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const TechSpecs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { specs, stats } = portfolioData;

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".tech-item", { opacity: 1, scale: 1 });
        gsap.set(".stat-item", { opacity: 1, y: 0 });
        return;
      }

      const columns = gsap.utils.toArray(".spec-col");
      columns.forEach((col: any) => {
        const items = col.querySelectorAll(".tech-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell
      ref={containerRef}
      label={portfolioData.ui.labels.specs}
      className="bg-[var(--surface)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        <SpecColumn
          icon={<CubeTransparentIcon className="w-5 h-5" />}
          title="Frontend Core"
          items={specs.frontend}
        />

        <SpecColumn
          icon={<ServerIcon className="w-5 h-5" />}
          title="Server & Infra"
          items={specs.backend}
        />

        <SpecColumn
          icon={<ArrowsRightLeftIcon className="w-5 h-5" />}
          title="Data & API"
          items={specs.integrations}
        />

        <SpecColumn
          icon={<PaintBrushIcon className="w-5 h-5" />}
          title="Design Eng."
          items={specs.designOps}
        />

        <SpecColumn
          icon={<ShieldCheckIcon className="w-5 h-5" />}
          title="Quality & Ops"
          items={specs.quality}
        />
      </div>

      {/* FOOTER STATS */}
      <dl className="stats-container mt-24 pt-8 border-t border-[var(--border)] flex flex-wrap gap-x-12 gap-y-6">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item flex flex-col gap-1">
            <dt className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">
              {stat.label}
            </dt>
            <dd className="text-sm md:text-base font-bold text-[var(--text-main)] font-mono">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
};

function SpecColumn({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="spec-col flex flex-col gap-6">
      <h3 className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
        <span className="p-1.5 rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--accent)]">
          {icon}
        </span>
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="tech-item cursor-default group relative px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-md transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_15px_-5px_var(--accent)]"
          >
            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[var(--text-muted)] group-hover:bg-[var(--accent)] transition-colors" />
            <span className="text-xs md:text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] font-mono transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
