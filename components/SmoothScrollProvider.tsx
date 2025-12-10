"use client";

import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewMode } from "@/store/useViewMode";

gsap.registerPlugin(ScrollTrigger);

// 1. Create the Context
const LenisContext = createContext<Lenis | null>(null);

// 2. Create a Custom Hook for easy access
export const useLenis = () => {
  return useContext(LenisContext);
};

export const SmoothScrollProvider: FC<PropsWithChildren> = ({ children }) => {
  // Use State instead of Ref so the Context updates when Lenis is created
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const { isCreative } = useViewMode();

  useEffect(() => {
    // Initialize Lenis
    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      // You can add 'wrapper' or 'content' here if you aren't scrolling the body
    });

    setLenis(instance);

    // OPTIMIZATION: Use GSAP's ticker instead of a separate requestAnimationFrame
    // This ensures GSAP animations and Lenis scroll are perfectly synced on the same frame
    function update(time: number) {
      instance.raf(time * 1000); // GSAP gives time in seconds, Lenis needs ms
    }

    // Add the update function to GSAP's ticker
    gsap.ticker.add(update);

    // Optional: turn off GSAP's lag smoothing to prevent stuttering during heavy calculations
    gsap.ticker.lagSmoothing(0);

    // Connect to ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? instance.scrollTo(Number(value), { immediate: true })
          : instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // If you are using 'pinType: fixed' normally, this is fine.
      // If you notice pinning issues, you might need: pinType: instance.className ? "transform" : "fixed"
    });

    // Cleanup
    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      ScrollTrigger.killAll(); // Good practice to kill triggers when provider unmounts
    };
  }, []);

  // Handle your store change logic
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // 'immediate' prevents momentum fighting
    }
  }, [isCreative, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};
