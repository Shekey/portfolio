"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(Number(value)) : lenis.scroll;
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.body, {});
    };
  }, []);
  return children;
};
