"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownTrayIcon,
  CubeTransparentIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";
import { Logo } from "@/components/Logo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/posthog";

gsap.registerPlugin(useGSAP);

export const Header = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const { isCreative, toggleMode } = useViewMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = headerRef.current;
      const triggerModeButton =
        headerRef.current?.querySelector(".mode-trigger");

      const borderColor = isCreative ? "#c27aff" : "#000";
      const color = isCreative ? "#000" : "#000";
      const background = isCreative ? "#000" : "#fff";

      if (!el || !triggerModeButton) return;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline();

      // 2. Animate Appearance on Scroll
      tl.to(el, {
        scrollTrigger: {
          trigger: "body",
          start: "top -20px", // Trigger slightly after scrolling starts
          end: "top -21px",
          toggleActions: "play none none reverse", // Play when scrolling down, Reverse when at top
        },
        backdropFilter: "blur(16px)", // Heavy blur for readability
        duration: 0.3,
        ease: "power2.out",
      }).to(
        triggerModeButton,
        {
          borderColor,
          color,
          background,
        },
        "<"
      );
    },
    { dependencies: [isCreative, prefersReducedMotion] }
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full h-20 px-6 md:px-12 border-b border-transparent duration-300",
        {
          "bg-white": !isCreative,
          "bg-black": isCreative,
        }
      )}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-4 md:gap-6">
          <Logo size="md" /> {/* Now displays 'shekey' */}
          <div className="hidden sm:flex flex-col">
            <h2
              className={cn(
                "font-bold text-sm tracking-tight leading-none text-[var(--accent)]"
              )}
            >
              {portfolioData.personal.name}
            </h2>
            <span className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase mt-0.5">
              {portfolioData.personal.title}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* The Reality Switch */}
          <button
            data-testid="mode-toggle"
            onClick={() => {
              gsap.killTweensOf(window);
              captureEvent("mode_toggle", {
                nextMode: isCreative ? "architect" : "creative",
              });
              toggleMode();
            }}
            className={cn(
              "mode-trigger group relative flex items-center gap-3 px-4 py-2 border rounded-full transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              {
                "border-white/20 hover:bg-white/10 focus-visible:ring-[var(--accent)]":
                  !isCreative,
                "border-purple-400 hover:bg-white/10 focus-visible:ring-purple-400":
                  isCreative,
              }
            )}
            aria-live="polite"
            aria-label={
              isCreative
                ? "Current mode: Personality. Activate to switch to Architect Mode"
                : "Current mode: Architect. Activate to switch to Personality Mode"
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
              {isCreative ? "Mode: Personality" : "Mode: Architect"}
            </span>

            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isCreative
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <CubeTransparentIcon /> {/* Architect Icon */}
              </div>
              <div
                className={`absolute inset-0 text-purple-400 transition-all duration-500 ${
                  isCreative
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              >
                <SparklesIcon /> {/* Creative Icon */}
              </div>
            </div>
          </button>

          <a
            href="/cv-ajdin.pdf"
            download
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              {
                "focus-visible:ring-[var(--accent)] bg-[var(--text-main)] text-[var(--bg)] bg-[var(--accent)]":
                  !isCreative,
                "focus-visible:ring-purple-400 bg-black text-purple-400 hover:bg-black border-purple-400 border-1":
                  isCreative,
              }
            )}
            data-testid="resume-link"
            onClick={() =>
              captureEvent("resume_download", {
                source: "header",
              })
            }
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
