"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { portfolioData } from "@/data/resume-data";
import { SectionShell } from "./SectionShell";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { projects } = portfolioData;

  const col1 = projects.filter((_, i) => i % 3 === 0);
  const col2 = projects.filter((_, i) => i % 3 === 1);
  const col3 = projects.filter((_, i) => i % 3 === 2);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".project-card", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // 1. DESKTOP ONLY: Parallax Effect
      // This prevents the "middle column" from moving up/down on mobile and overlapping others.
      mm.add("(min-width: 768px)", () => {
        gsap.to(".parallax-col", {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 2. ALL DEVICES: Cinematic Card Reveal
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%", // Trigger early on mobile so it's visible quickly
              end: "bottom 10%",
              toggleActions: "play none none reverse", // Keeps it visible once revealed
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell
      ref={containerRef}
      label={portfolioData.ui.labels.projects}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 lg:gap:4">
        {/* Column 1 */}
        <div className="flex flex-col gap-1 lg:gap:4">
          {col1.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {/* Column 2 (Parallax only on Desktop) */}
        <div className="parallax-col flex flex-col gap-1 lg:gap:4 md:pt-12">
          {col2.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-1 lg:gap:4 md:pt-24">
          {col3.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

function ProjectCard({
  project,
}: {
  project: {
    id: number;
    title: string;
    cat: string;
    img: string;
    link: string;
    description: string;
  };
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const initialClass = prefersReducedMotion ? "opacity-100" : "opacity-0";

  return (
    <a
      href={project.link}
      target="_blank"
      className={`project-card ${initialClass} group relative block w-full h-full`}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 border border-[var(--border)]">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />

        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-white text-black p-3 rounded-full shadow-lg">
            <ArrowUpRightIcon className="w-5 h-5" />
          </div>
        </div>

        <Image
          src={project.img}
          alt={project.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
      </div>

      <div className="mt-4 flex justify-between items-baseline">
        <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest border border-[var(--border)] px-2 py-1 rounded">
          {project.cat}
        </span>
      </div>
    </a>
  );
}
