"use client";
import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionProps {
  id?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  manualHeader?: boolean;
}

export const SectionShell = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, label, className, children, manualHeader = false }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const setRef = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    useGSAP(
      () => {
        const content = internalRef.current?.querySelector(".section-content");
        if (!content) return;

        // A11Y Check
        if (prefersReducedMotion) {
          gsap.set(content, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: internalRef.current,
              start: "top 85%", // Adjusted for better mobile triggering
              end: "top 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      },
      { scope: internalRef, dependencies: [prefersReducedMotion] }
    );

    return (
      <section
        id={id}
        ref={setRef}
        className={cn(
          "relative w-full min-h-screen px-6 md:px-12 py-24 flex flex-col justify-center bg-[var(--bg)] transition-colors duration-500",
          className
        )}
      >
        <div className="max-w-7xl mx-auto w-full relative flex flex-col items-center md:items-start">
          <SectionHeader label={label || "// SECTION"} manual={manualHeader} />

          <div className="section-content w-full pt-16">{children}</div>
        </div>
      </section>
    );
  }
);

SectionShell.displayName = "SectionShell";
