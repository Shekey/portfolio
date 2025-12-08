"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, setLoaded } = useViewMode();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useLayoutEffect(() => {
    // 1. Lock Scroll Immediately
    document.body.style.overflow = "hidden";

    // 2. Define what "Loaded" means (Window + Fonts)
    const handleLoad = () => {
      // Wait for fonts to be ready to avoid text jumps
      document.fonts.ready.then(() => {
        setIsPageLoaded(true);
      });
    };

    // 3. Check if page is already loaded (e.g. refresh)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback: If something gets stuck, force load after 5 seconds
      const timeout = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  useGSAP(
    () => {
      // Initial Setup
      const tl = gsap.timeline();

      // A. The "Booting" Animation (Runs immediately)
      tl.to(".svg-path", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }).to(
        ".boot-text",
        {
          opacity: 1,
          duration: 0.5,
          repeat: -1, // Pulse indefinitely until loaded
          yoyo: true,
          ease: "sine.inOut",
        },
        "<"
      ); // Start with previous animation

      // B. The "Exit" Animation (Waits for page load)
      if (isPageLoaded) {
        // Kill the infinite pulse
        gsap.killTweensOf(".boot-text");

        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setLoaded(); // UNLOCK THE APP
          },
        });

        // Finish the line drawing if not done
        exitTl
          .to(".svg-path", { strokeDashoffset: 0, duration: 0.5 })
          .to(".loader-content", { opacity: 0, y: -20, duration: 0.5 })
          .to(".loader-curtain", {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          });
      }
    },
    { scope: containerRef, dependencies: [isPageLoaded] }
  );

  // Only unmount when Zustand says we are done
  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Black Curtain */}
      <div className="loader-curtain absolute inset-0 bg-[#050505] w-full h-full" />

      {/* Content */}
      <div className="loader-content relative z-10 flex flex-col items-center justify-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          className="mb-6"
        >
          {/* Outer Hexagon */}
          <path
            className="svg-path stroke-white stroke-[0.5]"
            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
          {/* Inner Tech Lines */}
          <path
            className="svg-path stroke-[var(--accent)] stroke-[0.5] opacity-60"
            d="M50 5 L50 95 M10 25 L90 75 M90 25 L10 75"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </svg>

        {/* Boot Text */}
        <div className="boot-text opacity-0 font-mono text-xs text-white tracking-[0.3em] uppercase">
          System Boot...
        </div>
      </div>
    </div>
  );
};
