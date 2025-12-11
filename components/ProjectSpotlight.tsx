"use client";
import { useRef, useState } from "react"; // Added useState for A11y value tracking
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { SectionShell } from "./SectionShell";
import { portfolioData } from "@/data/resume-data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

export const ProjectSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const revealLineRef = useRef<HTMLDivElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

  // Track percentage for ARIA attributes
  const [revealPercent, setRevealPercent] = useState(50);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { spotlight } = portfolioData;

  // Unified update function for Drag AND Keyboard
  const updateReveal = (percent: number) => {
    // Clamp between 0 and 100
    const clamped = Math.max(0, Math.min(100, percent));
    setRevealPercent(clamped);

    gsap.set(topImageRef.current, {
      clipPath: `inset(0 ${100 - clamped}% 0 0)`,
    });
    gsap.set(revealLineRef.current, { left: `${clamped}%` });
  };

  // Keyboard Handler (Arrow Keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5; // Move 5% per key press
    if (e.key === "ArrowLeft") {
      updateReveal(revealPercent - step);
    } else if (e.key === "ArrowRight") {
      updateReveal(revealPercent + step);
    }
  };

  useGSAP(
    () => {
      if (
        prefersReducedMotion ||
        !imageWrapperRef.current ||
        !dragProxyRef.current
      )
        return;

      const wrapper = imageWrapperRef.current;
      const proxy = dragProxyRef.current;
      const containerWidth = wrapper.offsetWidth;

      // 1. Zoom Entrance
      gsap.fromTo(
        wrapper,
        { scale: 1.1, filter: "brightness(0.8)" },
        {
          scale: 1,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // 2. Init State
      gsap.set(topImageRef.current, { clipPath: "inset(0 50% 0 0)" });
      gsap.set(revealLineRef.current, { left: "50%" });
      gsap.set(proxy, { x: containerWidth / 2 });

      // 3. Draggable Logic
      Draggable.create(proxy, {
        type: "x",
        trigger: wrapper,
        bounds: wrapper,
        inertia: true,
        onDrag: function () {
          const p = (this.x / containerWidth) * 100;
          updateReveal(p);
        },
        onThrowUpdate: function () {
          const p = (this.x / containerWidth) * 100;
          updateReveal(p);
        },
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <SectionShell
      ref={containerRef}
      label={portfolioData.ui.labels.spotlight}
      className="bg-[var(--bg)]"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Text Column (Unchanged) */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-main)] leading-none">
            {spotlight.title}
          </h2>
          <div className="h-px w-12 bg-[var(--accent)]" />
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            {spotlight.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {spotlight.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-mono border border-[var(--border)] rounded-full text-[var(--text-muted)] uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] mt-8 animate-pulse">
            <ArrowsRightLeftIcon className="w-4 h-4" />
            <span>DRAG OR USE ARROW KEYS</span>
          </div>
        </div>

        {/* Interactive Image Card */}
        <div className="lg:w-2/3 w-full relative group">
          <div
            ref={imageWrapperRef}
            // KEYBOARD ACCESSIBILITY ATTRIBUTES
            tabIndex={0} // Make it focusable
            role="slider"
            aria-label="Comparison Slider: Wireframe vs Production"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={revealPercent}
            onKeyDown={handleKeyDown} // Listen for keys
            className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] transition-shadow"
          >
            {/* Drag Proxy */}
            <div
              ref={dragProxyRef}
              className="absolute top-0 left-0 w-1 h-full pointer-events-none opacity-0"
            />

            {/* Bottom Layer */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center pointer-events-none select-none">
              <Image
                src="/theme-a-a.webp"
                alt="Before comparison image"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                width={500}
                height={500}
              />
            </div>

            {/* Top Layer */}
            <div
              ref={topImageRef}
              className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none select-none"
            >
              <Image
                src="/theme-b.webp"
                alt="After comparison image"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                width={500}
                height={500}
              />
            </div>

            {/* Handle Line */}
            <div
              ref={revealLineRef}
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent)] z-20 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg">
                <ArrowsRightLeftIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
