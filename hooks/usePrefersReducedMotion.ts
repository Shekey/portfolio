"use client";
import { useState, useEffect } from "react";

export function usePrefersReducedMotion() {
  // Initialize state lazily. This runs only once during mount.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check if window is defined (for SSR safety)
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // We no longer need to set state here immediately because we did it in useState above!

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
