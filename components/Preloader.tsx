"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data"; // Import data

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, setLoaded } = useViewMode();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // State for the random message
  const [message, setMessage] = useState("Loading...");

  // Select random message on mount
  useEffect(() => {
    const messages = portfolioData.ui.loaderMessages;
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
  }, []);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    const handleLoad = () =>
      document.fonts.ready.then(() => setIsPageLoaded(true));

    if (document.readyState === "complete") handleLoad();
    else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Boot Animation
      tl.to(".svg-path", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }).to(
        ".boot-text",
        {
          opacity: 1,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "<"
      );

      // 2. Exit Animation
      if (isPageLoaded) {
        gsap.killTweensOf(".boot-text");
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setLoaded();
          },
        });

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

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="loader-curtain absolute inset-0 bg-[#050505] w-full h-full" />
      <div className="loader-content relative z-10 flex flex-col items-center justify-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          className="mb-6"
        >
          {/* ... Same SVG paths as before ... */}
          <path
            className="svg-path stroke-white stroke-[0.5]"
            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
          <path
            className="svg-path stroke-[var(--accent)] stroke-[0.5] opacity-60"
            d="M50 5 L50 95 M10 25 L90 75 M90 25 L10 75"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </svg>

        {/* Dynamic Funny Text */}
        <div className="boot-text opacity-0 font-mono text-xs text-white tracking-[0.2em] uppercase text-center">
          {message}
        </div>
      </div>
    </div>
  );
};
