"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  label: string;
  className?: string;
  manual?: boolean;
}

export const SectionHeader = ({
  label,
  className,
  manual = false,
}: HeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || manual) return;

      const line = ref.current.querySelector(".section-line");
      const text = ref.current.querySelector(".section-label");

      // A11Y: If reduced motion, show instantly and exit.
      if (prefersReducedMotion) {
        gsap.set([line, text], { opacity: 1, width: "3rem", x: 0 });
        return;
      }

      if (line && text) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%", // Trigger earlier on mobile/small screens
            end: "bottom 10%",
            // Robust Toggle Actions: Play on enter, reverse on leave back up.
            // "play none none reverse" ensures it stays visible if you scroll past it down.
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          line,
          { width: 0, opacity: 0 },
          { width: "3rem", opacity: 1, duration: 0.8, ease: "power2.out" }
        ).fromTo(
          text,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "<"
        );
      }
    },
    { scope: ref, dependencies: [manual, prefersReducedMotion] }
  );

  return (
    // Layout Fix: Center on mobile, start on desktop
    <div
      ref={ref}
      className={cn(
        "flex items-center w-full justify-start gap-3 mb-8 opacity-100",
        className
      )}
    >
      <div
        className="section-line h-px bg-[var(--accent)]"
        style={{
          width:
            manual && !prefersReducedMotion
              ? 0
              : prefersReducedMotion
                ? "3rem"
                : undefined,
        }}
      />
      <p
        className="section-label font-mono text-[var(--accent)] text-xs md:text-sm tracking-widest uppercase opacity-0"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {label}
      </p>
    </div>
  );
};
