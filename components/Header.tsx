"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownTrayIcon,
  SunIcon,
  MoonIcon,
  CubeTransparentIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";
import { Logo } from "@/components/Logo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export const Header = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { isCreative, toggleMode } = useViewMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;
      if (prefersReducedMotion) return;

      // 1. Determine Target Colors based on Mode
      const scrolledBg = isCreative
        ? "rgba(5, 5, 5, 0.85)"
        : "rgba(255, 255, 255, 0.85)";
      const scrolledBorder = isCreative
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(24, 24, 27, 0.06)";

      // 2. Animate Appearance on Scroll
      gsap.to(el, {
        scrollTrigger: {
          trigger: "body",
          start: "top -20px", // Trigger slightly after scrolling starts
          end: "top -21px",
          toggleActions: "play none none reverse", // Play when scrolling down, Reverse when at top
        },
        backgroundColor: scrolledBg,
        borderBottomColor: scrolledBorder,
        backdropFilter: "blur(16px)", // Heavy blur for readability
        duration: 0.3,
        ease: "power2.out",
      });

      // 3. Handle Mode Switch while already scrolled
      // If user toggles mode halfway down the page, we need to update the background immediately
      if (window.scrollY > 20) {
        gsap.to(el, {
          backgroundColor: scrolledBg,
          borderBottomColor: scrolledBorder,
          duration: 0.5,
        });
      }
    },
    { scope: headerRef, dependencies: [isCreative, prefersReducedMotion] }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full h-20 px-6 md:px-12 border-b border-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-4 md:gap-6">
          <Logo size="md" /> {/* Now displays 'shekey' */}
          <div className="hidden md:flex flex-col">
            <h1 className="font-bold text-sm tracking-tight leading-none text-[var(--text-main)]">
              {portfolioData.personal.name}
            </h1>
            <span className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase mt-0.5">
              {portfolioData.personal.title}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* The Reality Switch */}
          <button
            onClick={toggleMode}
            className="group relative flex items-center gap-3 px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-all"
            aria-label={
              isCreative
                ? "Switch to Architect Mode"
                : "Switch to Creative Mode"
            }
          >
            <span
              className={cn(
                "text-xs font-mono tracking-widest uppercase hidden md:block",
                {
                  "text-purple-400": isCreative,
                }
              )}
            >
              {isCreative ? "Simulation: Active" : "Mode: Architect"}
            </span>

            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-500 ${isCreative ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
              >
                <CubeTransparentIcon /> {/* Architect Icon */}
              </div>
              <div
                className={`absolute inset-0 text-purple-400 transition-all duration-500 ${isCreative ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
              >
                <SparklesIcon /> {/* Creative Icon */}
              </div>
            </div>
          </button>

          <a
            href="/cv-ajdin.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium bg-[var(--text-main)] text-[var(--bg)] rounded-full hover:bg-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span className="hidden md:inline">Resume</span>
            <span className="md:hidden">CV</span>
            <ArrowDownTrayIcon className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
