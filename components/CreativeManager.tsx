"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const CreativeManager = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ---------------------------------------------------------
      // 1. SETUP (Runs when component mounts via dynamic import)
      // ---------------------------------------------------------

      // A. Safety Check
      if (prefersReducedMotion) {
        gsap.to("body", { backgroundColor: "#050505", color: "#e4e4e7" });
        return;
      }

      // B. Dark Mode Transition
      gsap.to("body", {
        backgroundColor: "#050505",
        color: "#e4e4e7",
        duration: 0.8,
      });

      // C. Velocity Skew (Jelly Effect)
      const skewProxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".section-shell", "skewY", "deg");
      const clamp = gsap.utils.clamp(-5, 5);

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
            skewProxy.skew = skew;
            gsap.to(skewProxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(skewProxy.skew),
            });
          }
        },
      });

      // D. Chaotic Parallax
      const floatingElements = gsap.utils.toArray<HTMLElement>(
        ".project-card, .job-row, .spec-col"
      );
      floatingElements.forEach((el, i) => {
        const rotation = i % 2 === 0 ? 2 : -2;
        gsap.fromTo(
          el,
          { y: 0, rotation: 0 },
          {
            y: (i + 1) * 30,
            rotation: rotation,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // E. Text Blur
      const headings = gsap.utils.toArray<HTMLElement>("h1, h2");
      headings.forEach((el) => {
        gsap.fromTo(
          el,
          { filter: "blur(0px)", opacity: 1 },
          {
            filter: "blur(4px)",
            opacity: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "top -20%",
              scrub: true,
            },
          }
        );
      });

      // ---------------------------------------------------------
      // 2. CLEANUP (Runs automatically when unmounted)
      // ---------------------------------------------------------
      // useGSAP handles context revert automatically, but we need
      // to manually reset the body styles we touched.
      return () => {
        // Revert Body Theme
        gsap.to("body", {
          backgroundColor: "#f4f4f5",
          color: "#18181b",
          duration: 0.5,
          ease: "power2.out",
        });

        // Clear props that might be stuck
        gsap.set(".section-shell, .job-row, .project-card, .spec-col, h1, h2", {
          clearProps: "all",
        });
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return <div ref={containerRef} className="creative-manager-proxy hidden" />;
};
