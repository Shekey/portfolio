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
      // A11Y: Disable scrubbing highlight if user prefers reduced motion
      if (prefersReducedMotion) {
        gsap.set(".statement-word", { opacity: 1, color: "var(--text-main)" });
        return;
      }

      // SCROLL SCRUB ANIMATION
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
            start: "top top", // When sticky container hits top
            end: "bottom bottom", // When bottom hits bottom
            scrub: 1, // Smooth scrubbing tied to scrollbar
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    // Outer Track: Controls scroll duration (150vh)
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-[var(--bg)] transition-colors duration-500"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center md:items-start px-6 md:px-12">
        {/* Header: Centered on mobile, Left on desktop */}
        <div className="w-full max-w-4xl mb-12 md:mb-20 flex justify-center md:justify-start">
          {/* We use manual={false} (default) so the header handles its own visibility 
                 logic using the robust "play none none reverse" inside SectionHeader.tsx */}
          <SectionHeader label="// ENGINEERING_MANIFESTO" />
        </div>

        {/* Text Content */}
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
    </section>
  );
};
