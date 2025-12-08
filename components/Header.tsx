"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownTrayIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";
import { Logo } from "@/components/Logo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const Header = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { isCreative, toggleMode } = useViewMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.to(headerRef.current, {
        backgroundColor: isCreative
          ? "rgba(0,0,0,0.8)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottomColor: isCreative
          ? "rgba(255,255,255,0.1)"
          : "rgba(0, 0, 0, 0.05)",
        scrollTrigger: {
          start: "top -10px",
          end: "top -20px",
          toggleActions: "play none none reverse",
        },
      });
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
          <button
            onClick={toggleMode}
            aria-label={
              isCreative
                ? "Switch to Architect Mode"
                : "Switch to Creative Mode"
            }
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-main)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {isCreative ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
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
