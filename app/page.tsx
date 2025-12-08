// app/page.js
import { Hero } from "@/components/Hero";
import { ExperienceLog } from "@/components/ExperienceLog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Statement } from "@/components/Statement";
import { Projects } from "@/components/Projects";
import { TechSpecs } from "@/components/TechSpecs";
import { ProjectSpotlight } from "@/components/ProjectSpotlight";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg)] transition-colors duration-500">
      <Header />
      <Hero />
      <Statement />
      <ProjectSpotlight />
      <Projects />
      <TechSpecs />
      <ExperienceLog />
      <Footer />
    </main>
  );
}
