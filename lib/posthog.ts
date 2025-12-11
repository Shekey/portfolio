"use client";

import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com";
const ENABLE_RECORDING = process.env.NEXT_PUBLIC_POSTHOG_RECORDING === "true";

let initialized = false;

export const initPosthog = () => {
  if (typeof window === "undefined") return null;
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog key missing. Analytics disabled.");
    }
    return null;
  }

  if (!initialized) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      capture_exceptions: true,
      persistence: "localStorage+cookie",
      disable_session_recording: !ENABLE_RECORDING,
      loaded: (client) => {
        if (ENABLE_RECORDING) {
          client.startSessionRecording?.();
        }
      },
    });

    initialized = true;
  }

  return posthog;
};

export const captureEvent = (
  name: string,
  properties?: Record<string, unknown>
) => {
  const client = initPosthog();
  if (!client) return;
  client.capture(name, properties);
};

export const captureError = (
  message: string,
  properties?: Record<string, unknown>
) => {
  captureEvent("client_error", {
    message,
    ...properties,
  });
};

export type WebVitalMetric = {
  id?: string;
  name: string;
  value: number;
  delta?: number;
  rating?: string;
  navigationType?: string;
};

export const captureWebVital = (metric: WebVitalMetric) => {
  captureEvent("web_vital", {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
  });
};
