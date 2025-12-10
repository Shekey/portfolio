"use client";
import dynamic from "next/dynamic"; // 1. Import dynamic
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import { useViewMode } from "@/store/useViewMode";

const CreativeComponents = dynamic(
  () =>
    import("@/components/creative/CreativeComponents").then(
      (mod) => mod.CreativeComponents
    ),
  { ssr: false } // No server rendering for this chaos engine
);

const Hero = dynamic(
  () => import("@/components/Hero").then((mod) => mod.Hero),
  { ssr: false } // No server rendering for this chaos engine
);

const Statement = dynamic(
  () => import("@/components/Statement").then((mod) => mod.Statement),
  { ssr: false } // No server rendering for this chaos engine
);

const ProjectSpotlight = dynamic(
  () =>
    import("@/components/ProjectSpotlight").then((mod) => mod.ProjectSpotlight),
  { ssr: false } // No server rendering for this chaos engine
);

const Projects = dynamic(
  () => import("@/components/Projects").then((mod) => mod.Projects),
  { ssr: false } // No server rendering for this chaos engine
);

const TechSpecs = dynamic(
  () => import("@/components/TechSpecs").then((mod) => mod.TechSpecs),
  { ssr: false } // No server rendering for this chaos engine
);

const ExperienceLog = dynamic(
  () => import("@/components/ExperienceLog").then((mod) => mod.ExperienceLog),
  { ssr: false } // No server rendering for this chaos engine
);

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
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
      <Header />

      {isCreative && (
        <>
          <CreativeComponents />
        </>
      )}

      {!isCreative && (
        <>
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
        </>
      )}

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
