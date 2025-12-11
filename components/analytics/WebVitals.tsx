"use client";

import { useCallback } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { captureWebVital } from "@/lib/posthog";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

export const WebVitals = () => {
  const handleWebVitals = useCallback<ReportWebVitalsCallback>((metric) => {
    captureWebVital({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  }, []);

  useReportWebVitals(handleWebVitals);

  return null;
};
