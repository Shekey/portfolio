"use client";

import { useEffect, useRef } from "react";
import { captureEvent } from "@/lib/posthog";
import { useViewMode } from "@/store/useViewMode";

export const EngagementTracker = () => {
  const { isCreative } = useViewMode();
  const hasRecordedCompletion = useRef(false);
  const hasSwitchedMode = useRef(false);
  const lastMode = useRef(isCreative);

  useEffect(() => {
    if (lastMode.current !== isCreative) {
      hasSwitchedMode.current = true;
      lastMode.current = isCreative;
    }
  }, [isCreative]);

  useEffect(() => {
    const target = document.querySelector("[data-end-sentinel]");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRecordedCompletion.current) {
            hasRecordedCompletion.current = true;
            captureEvent("page_completion", {
              mode: isCreative ? "creative" : "architect",
              switchedDuringSession: hasSwitchedMode.current,
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isCreative]);

  return null;
};
