import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      timeline
        .to(".loader-text", {
          opacity: 0,
          y: -50,
          duration: 0.5,
        })
        .to(
          ".loader-overlay",
          {
            y: "-100%",
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay fixed inset-0 z-[10000] bg-black flex items-center justify-center">
      <div className="loader-text text-center space-y-4">
        <div className="text-4xl tracking-tighter">Ajdin Šahinbegović</div>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
        <div className="text-sm text-gray-500 uppercase tracking-widest">
          Loading Experience
        </div>
      </div>
    </div>
  );
}
