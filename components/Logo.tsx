"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCreative } = useViewMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-5xl",
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // A11Y: If user prefers reduced motion, disable all animations immediately.
      if (prefersReducedMotion) {
        gsap.set(container, { x: 0, y: 0 });
        return;
      }

      // Select internal layers
      const main = container.querySelector(".logo-main");
      const layer1 = container.querySelector(".logo-layer-1"); // Rose
      const layer2 = container.querySelector(".logo-layer-2"); // Indigo

      // 1. Creative Mode: Idle "Breathing" Glitch (Subtle)
      if (isCreative) {
        const idleTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        idleTl
          .to([layer1, layer2], {
            x: "random(-1, 1)", // Reduced distance for less visual noise
            y: "random(-0.5, 0.5)",
            opacity: 0.6,
            duration: 0.1,
            yoyo: true,
            repeat: 1, // Fewer repeats
            ease: "steps(1)",
          })
          .to([layer1, layer2], {
            x: 0,
            y: 0,
            opacity: 0,
            duration: 0.1,
          });
      } else {
        gsap.set([layer1, layer2], { x: 0, y: 0, opacity: 0 });
      }

      // 2. Hover Interaction: Snappy Glitch
      const onEnter = () => {
        // Layer 1 (Deep Rose)
        gsap.to(layer1, {
          x: "random(-2, 2)",
          y: "random(-1, 1)",
          opacity: 0.8,
          duration: 0.06,
          repeat: -1,
          yoyo: true,
        });

        // Layer 2 (Royal Indigo)
        gsap.to(layer2, {
          x: "random(-2, 2)",
          y: "random(-1, 1)",
          opacity: 0.8,
          duration: 0.06,
          repeat: -1,
          yoyo: true,
          delay: 0.01,
        });

        // Main Text (Subtle shake)
        gsap.to(main, {
          x: "random(-0.5, 0.5)",
          duration: 0.05,
          repeat: -1,
          yoyo: true,
        });
      };

      const onLeave = () => {
        gsap.killTweensOf([layer1, layer2, main]);
        // Snap back
        gsap.to([layer1, layer2, main], { x: 0, y: 0, duration: 0.2 });
        gsap.to([layer1, layer2], { opacity: 0, duration: 0.2 });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef, dependencies: [isCreative, prefersReducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Shekey Logo"
      className={cn(
        "relative font-black tracking-tighter cursor-pointer select-none inline-block font-mono",
        sizeClasses[size],
        className
      )}
    >
      {/* Main Layer: Source of Truth for reading */}
      <span className="logo-main relative z-20 block text-[var(--text-main)]">
        shekey
      </span>

      {/* Glitch Layer 1: Deep Rose (Better contrast than neon red) */}
      {/* aria-hidden ensures screen readers ignore this decorative text */}
      <span
        aria-hidden="true"
        className="logo-layer-1 absolute top-0 left-0 z-10 text-rose-600 opacity-0 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      >
        shekey
      </span>

      {/* Glitch Layer 2: Deep Indigo (Better contrast than neon blue) */}
      <span
        aria-hidden="true"
        className="logo-layer-2 absolute top-0 left-0 z-10 text-indigo-600 opacity-0 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      >
        shekey
      </span>
    </div>
  );
};
