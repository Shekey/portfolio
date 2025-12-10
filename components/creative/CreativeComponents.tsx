import { Hero } from "./Hero";
import { About } from "./About";
import { BackToTop } from "./BackToTop";
import { CarCollection } from "./CarCollection";
import { WeekendVibes } from "./WeekendVibes";
import { LifeJourney } from "./LifeJourney";
import { Contact } from "./Contact";

export const CreativeComponents = () => {
  return (
    <div className="bg-black text-white">
      <Hero />
      <About />
      <CarCollection />
      <LifeJourney />
      <WeekendVibes />
      <Contact />
      <BackToTop />
    </div>
  );
};
