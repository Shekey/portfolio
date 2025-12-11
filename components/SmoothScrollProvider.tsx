"use client";

import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewMode } from "@/store/useViewMode";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => {
  return useContext(LenisContext);
};

export const SmoothScrollProvider: FC<PropsWithChildren> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { isCreative } = useViewMode();

  useLayoutEffect(() => {
    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    // FIX: Wrap setLenis in setTimeout to satisfy the linter
    // This moves the state update out of the immediate synchronous execution flow
    const timer = setTimeout(() => {
      setLenis(instance);
    }, 0);

    function update(time: number) {
      instance.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

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
    });

    return () => {
      clearTimeout(timer); // Clean up timer
      gsap.ticker.remove(update);
      instance.destroy();
      ScrollTrigger.killAll();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [isCreative, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};
