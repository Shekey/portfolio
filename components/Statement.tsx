"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/resume-data";
import { SectionHeader } from "./SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const Statement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = portfolioData.statement.text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".statement-word", { opacity: 1, color: "var(--text-main)" });
        return;
      }

      const wordElements = gsap.utils.toArray(".statement-word");
      gsap.fromTo(
        wordElements,
        { opacity: 0.2, color: "var(--text-muted)" },
        {
          opacity: 1,
          color: "var(--text-main)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-[var(--bg)] transition-colors duration-500"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12">
        {/* HEADER ALIGNMENT FIX */}
        {/* We use max-w-7xl mx-auto to match SectionShell's grid exactly */}
        <div className="w-full max-w-7xl mx-auto mb-16 flex justify-center md:justify-start">
          <SectionHeader label={portfolioData.ui.labels.statement} />
        </div>

        {/* TEXT CONTENT */}
        {/* Centered within the grid, max-w-4xl for readability */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center md:items-start">
          <div className="max-w-4xl w-full relative z-10 pb-24 text-center md:text-left">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-2">
              {words.map((word, i) => (
                <span
                  key={i}
                  className="statement-word transition-colors duration-200"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
