import { Hero } from "./Hero";
import { Statement } from "./Statement";
import { ProjectSpotlight } from "./ProjectSpotlight";
import { Projects } from "./Projects";
import { TechSpecs } from "./TechSpecs";
import { Footer } from "../Footer";
import { ExperienceLog } from "./ExperienceLog";

export const ArchitectComponents = () => {
  return (
    <div className="bg-black text-white">
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
    </div>
  );
};
