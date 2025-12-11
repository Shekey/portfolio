"use client";

import { useEffect } from "react";
import { captureError, initPosthog } from "@/lib/posthog";

export const PosthogProvider = () => {
  useEffect(() => {
    const client = initPosthog();
    if (!client) return;

    const handleError = (event: ErrorEvent) => {
      captureError(event.message, {
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      captureError("Unhandled rejection", {
        reason:
          typeof reason === "string"
            ? reason
            : reason?.message ?? "Unknown rejection",
        stack: reason?.stack,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
};
