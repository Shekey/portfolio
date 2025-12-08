"use client";
import dynamic from "next/dynamic"; // 1. Import dynamic
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { ProjectSpotlight } from "@/components/ProjectSpotlight";
import { Projects } from "@/components/Projects";
import { TechSpecs } from "@/components/TechSpecs";
import { ExperienceLog } from "@/components/ExperienceLog";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { useViewMode } from "@/store/useViewMode";

// 2. Define the Dynamic Component
const CreativeManager = dynamic(
  () =>
    import("@/components/CreativeManager").then((mod) => mod.CreativeManager),
  { ssr: false } // No server rendering for this chaos engine
);

export default function Home() {
  const { isCreative } = useViewMode();

  return (
    <main
      className={`w-full min-h-screen transition-colors duration-500 selection:bg-[var(--accent)] selection:text-white ${
        isCreative ? "bg-black" : "bg-[var(--bg)]"
      }`}
    >
      {/* 3. Conditionally Render */}
      {/* React will mount this component (and download the bundle) ONLY when isCreative becomes true. */}
      {/* When becomes false, it unmounts, triggering the cleanup return function in useGSAP. */}
      {isCreative && <CreativeManager />}

      <Preloader />
      <Header />

      <div className="section-shell">
        <Hero />
      </div>

      <div className="section-shell">
        <Statement />
      </div>

      <div className="section-shell">
        <ProjectSpotlight />
      </div>

      <div className="section-shell">
        <Projects />
      </div>

      <div className="section-shell">
        <TechSpecs />
      </div>

      <div className="section-shell">
        <ExperienceLog />
      </div>

      <div className="section-shell">
        <Footer />
      </div>

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
