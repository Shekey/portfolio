"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";
import { SectionShell } from "./SectionShell";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

export const Hero = () => {
  const { isCreative, isLoading } = useViewMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (isLoading) return;

      // A11Y: Instant reveal
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-fade",
            ".architect-code",
            ".creative-visual",
            ".section-line",
            ".section-label",
          ],
          { opacity: 1, y: 0, x: 0, width: "3rem" }
        );
        if (isCreative) {
          gsap.set(".architect-code", { display: "none" });
        } else {
          gsap.set(".creative-visual", { display: "none" });
        }
        return;
      }

      // Standard Animation
      const tl = gsap.timeline();

      tl.to(".hero-fade", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      if (isCreative) {
        gsap.to(".creative-visual", { opacity: 1, duration: 1 });
        gsap.set(".architect-code", { opacity: 0, display: "none" });
      } else {
        gsap.to(".architect-code", {
          opacity: 1,
          display: "block",
          duration: 1,
        });
        gsap.set(".creative-visual", { opacity: 0 });
      }

      // Header Animation (Manual)
      tl.fromTo(
        ".section-line",
        { width: 0, opacity: 0 },
        { width: "3rem", opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      ).fromTo(
        ".section-label",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "<"
      );
    },
    {
      scope: containerRef,
      dependencies: [isCreative, isLoading, prefersReducedMotion],
    }
  );

  return (
    <SectionShell
      ref={containerRef}
      label={portfolioData.ui.labels.hero}
      className="h-screen items-center md:items-start" // Ensure center on mobile
      manualHeader={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full w-full">
        {/* Left: Text */}
        <div className="text-center md:text-left">
          <h1 className="hero-fade text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-8 text-[var(--text-main)] opacity-0 translate-y-4">
            {portfolioData.personal.name} {portfolioData.personal.title}
            <span className="sr-only">
              Senior Frontend & Full-Stack Developer - Berlin
            </span>
          </h1>
          <p className="hero-fade text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto md:mx-0 opacity-0 translate-y-4">
            {portfolioData.personal.summary}
          </p>
        </div>

        {/* Right: Visual */}
        <div className="relative flex items-center justify-center md:justify-end">
          {/* Code Snippet */}
          <div className="architect-code opacity-0 hidden w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm font-mono text-xs md:text-sm leading-relaxed overflow-hidden text-left">
            <div className="flex gap-2 mb-4 border-b border-[var(--border)] pb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-[var(--text-muted)]">
              <p>
                <span className="text-purple-600">const</span>{" "}
                <span className="text-blue-600">engineer</span> ={" "}
                <span className="text-purple-600">new</span>{" "}
                <span className="text-yellow-600">SpecializedDev</span>();
              </p>
              <p className="mt-2 text-green-600">engineer.init({"{"}</p>
              <p className="pl-4">
                mode:{" "}
                <span className="text-orange-500">
                  &ldquo;Architecture&rdquo;
                </span>
                ,
              </p>
              <p className="pl-4">
                focus:{" "}
                <span className="text-orange-500">
                  &ldquo;Design Systems&rdquo;
                </span>
              </p>
              <p className="text-green-600">{"}"});</p>
            </div>
          </div>

          {/* Creative Spinner */}
          <div className="creative-visual opacity-0 absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-64 h-64 border border-[var(--accent)] rounded-full animate-spin-slow opacity-20 border-dashed"
              style={{ animationDuration: "20s" }}
            />
            <div className="absolute text-[var(--accent)] font-mono text-xs animate-pulse">
              LIVE_RENDER
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
