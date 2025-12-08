"use client";
import { useEffect } from "react";
import { useViewMode } from "@/store/useViewMode";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isCreative } = useViewMode();

  useEffect(() => {
    const root = document.documentElement;
    if (isCreative) root.classList.add("theme-creative");
    else root.classList.remove("theme-creative");
  }, [isCreative]);

  return <>{children}</>;
};
