"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewMode } from "@/store/useViewMode";
import { portfolioData } from "@/data/resume-data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, setLoaded } = useViewMode();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { isCreative } = useViewMode();

  // FIX 1: Start with a static empty string to match Server-Side Rendering
  const [message, setMessage] = useState("");

  // FIX 2: Set random message on client only
  useEffect(() => {
    const messages = portfolioData?.ui?.loaderMessages || [
      "SYSTEM INITIALIZING...",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    // FIX 3: Wrap in setTimeout to satisfy the "synchronous setState" linter rule
    // This moves the update to the end of the event loop, avoiding the warning
    // while still updating immediately after mount.
    const timer = setTimeout(() => {
      setMessage(randomMsg);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 2. Window Load Logic
  useLayoutEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    const handleLoad = () => {
      document.fonts.ready.then(() => {
        setIsPageLoaded(true);
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 4000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, [isLoading]);

  useGSAP(
    () => {
      // Don't animate until we have a message
      if (!message) return;

      const tl = gsap.timeline();

      // Step A: Entrance
      tl.to(".svg-path", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }).to(
        ".boot-text",
        {
          opacity: 1,
          duration: 0.5,
          ease: "sine.inOut",
        },
        "-=0.8"
      );

      // Step B: Exit
      if (isPageLoaded) {
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setLoaded();
          },
        });

        exitTl
          .to({}, { duration: 1.6 })
          .to(".loader-content", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
          })
          .to(
            ".loader-curtain",
            {
              yPercent: -100,
              duration: 0.8,
              ease: "power4.inOut",
            },
            "-=0.1"
          );
      }
    },
    // Add message to dependencies so animation starts when message is set
    { scope: containerRef, dependencies: [isPageLoaded, message] }
  );

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div
        className={cn("loader-curtain absolute inset-0 w-full h-full", {
          "bg-[#050505]": !isCreative,
          "bg-white": isCreative,
        })}
      />

      <div className="loader-content relative z-10 flex flex-col items-center justify-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          className="mb-8"
        >
          <path
            className={cn("svg-path stroke-white stroke-[0.5]", {
              "stroke-white": !isCreative,
              "stroke-black": isCreative,
            })}
            d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
          <path
            className={cn("svg-path  stroke-[0.5] opacity-60", {
              "stroke-[var(--accent)]": !isCreative,
              "stroke-black": isCreative,
            })}
            d="M50 5 L50 95 M10 25 L90 75 M90 25 L10 75"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
        </svg>

        {/* We use a min-height here to prevent layout shift 
           when the message populates 
        */}
        <div
          className={cn(
            "boot-text opacity-0 font-mono text-xs tracking-[0.2em] uppercase text-center min-h-[20px] font-medium",
            {
              "text-white/90 ": !isCreative,
              "text-black": isCreative,
            }
          )}
        >
          {message}
        </div>
      </div>
    </div>
  );
};
