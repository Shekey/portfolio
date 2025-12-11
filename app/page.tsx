"use client";
import dynamic from "next/dynamic"; // 1. Import dynamic
import { Header } from "@/components/Header";
import { useViewMode } from "@/store/useViewMode";

const CreativeComponents = dynamic(
  () =>
    import("@/components/creative/CreativeComponents").then(
      (mod) => mod.CreativeComponents
    ),
  { ssr: true } // No server rendering for this chaos engine
);

const ArchitectComponents = dynamic(
  () =>
    import("@/components/architect/ArchitectComponents").then(
      (mod) => mod.ArchitectComponents
    ),
  { ssr: true } // No server rendering for this chaos engine
);

export default function Home() {
  const { isCreative } = useViewMode();

  return (
    <main
      className={`w-full min-h-screen transition-colors duration-500 selection:bg-[var(--accent)] selection:text-white ${
        isCreative ? "bg-black" : "bg-[var(--bg)]"
      }`}
    >
      <Header />
      {isCreative && (
        <>
          <CreativeComponents />
        </>
      )}

      {!isCreative && <ArchitectComponents />}

      {/* Grid Overlay (Visual only, light enough to keep in main bundle) */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          isCreative ? "opacity-20" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </main>
  );
}
