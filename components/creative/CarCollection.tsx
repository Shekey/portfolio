import { useState, useRef } from "react";
import { Car, Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 🔊 SOUND SETUP
// Replace this URL with your preferred "Car Crash" or "Mechanical Thud" mp3
const SOUND_URL = "/Crash.mp3";

const cars = [
  {
    name: "Mercedes W124",
    year: "1994",
    status: "Dream Car",
    image:
      "https://images.unsplash.com/photo-1725339063858-459533d54cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMHcxMjQlMjBjbGFzc2ljfGVufDF8fHx8MTc2NTMyMjg3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vibe: "🏆 The Legend",
    specs: ["260E", "W124 Body", "Built Like Tank"],
  },
  {
    name: "BMW E30",
    year: "1990",
    status: "Pure Love",
    image:
      "https://images.unsplash.com/photo-1744233479940-1d854a2df68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibXclMjBlMzAlMjB2aW50YWdlfGVufDF8fHx8MTc2NTMyMjg3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vibe: "🎯 The Icon",
    specs: ["M3 Spirit", "Perfect Balance", "Driver's Car"],
  },
  {
    name: "VW Golf 2",
    year: "1992",
    status: "First Love",
    image:
      "https://images.unsplash.com/photo-1565786089437-496904c48734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2dyUyMGdvbGYlMjBtazJ8ZW58MXx8fHwxNzY1MzIyODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vibe: "❤️ The Classic",
    specs: ["GTI Blood", "Mk2 Perfection", "Timeless Design"],
  },
];

export function CarCollection() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to play sound safely
  const playImpactSound = () => {
    const audio = new Audio(SOUND_URL);
    audio.volume = 0.4; // Keep volume reasonable
    audio
      .play()
      .catch((e) =>
        console.log("Audio play failed (user interaction needed first)", e)
      );
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Animation starts when top of section hits 60% of viewport height
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Header Animation (Fade Up)
      tl.from(".car-header-label, .car-header-title, .car-header-desc", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Card Stack Animation (Right to Left + Bounce + Sound)
      tl.from(
        ".car-card-container",
        {
          x: 800, // Slide in from right (pixels)
          opacity: 0,
          rotation: 15, // Slight rotation for "thrown onto table" feel
          duration: 1.5,
          stagger: {
            each: 0.2,
            onStart: playImpactSound, // 🎵 Play sound when each card starts animating
          },
          ease: "elastic.out(1, 0.6)", // 🏀 The BOUNCE effect
        },
        "-=0.4"
      ); // Overlap slightly with header animation

      // 3. Fun Fact Animation
      tl.from(".car-fun-fact", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Floating car icon continuous animation
      gsap.to(".floating-car", {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen px-8 py-32 relative overflow-hidden bg-gray-950 text-white"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-orange-900/10" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Floating car icon decoration */}
        <div className="absolute top-20 right-20 opacity-5 floating-car">
          <Car className="w-64 h-64" />
          <span className="sr-only">Car icon</span>
        </div>

        {/* Header */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6 car-header-label">
            <Car className="w-8 h-8 text-red-500" />
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              90s Automotive Obsession
            </span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tighter mb-8 car-header-title">
            My Dream
            <br />
            Garage
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl car-header-desc">
            These aren&apos;t just cars. They&apos;re rolling art pieces from an
            era when engineering met soul. Click to flip and see why each one
            holds a special place.
          </p>
        </div>

        {/* Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cars.map((car, index) => (
            <div
              key={index}
              className="car-card-container perspective-1000"
              onMouseEnter={() => setFlipped(index)}
              onMouseLeave={() => setFlipped(null)}
            >
              <div
                className={`relative w-full transition-all duration-700 transform-style-3d car-card ${
                  flipped === index ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    flipped === index ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className="backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gray-900 border-2 border-gray-800 hover:border-red-500/50 transition-all duration-500 cursor-pointer shadow-2xl">
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-2 mb-3">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          <span className="text-sm text-red-400">
                            {car.status}
                          </span>
                        </div>
                        <h3 className="text-4xl mb-2 font-bold">{car.name}</h3>
                        <p className="text-xl text-gray-400">{car.year}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="h-full rounded-3xl bg-gradient-to-br from-red-600 to-orange-600 border-2 border-red-500 p-8 flex flex-col justify-center items-center text-center cursor-pointer shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    <div className="text-6xl mb-6">{car.vibe}</div>
                    <h3 className="text-3xl mb-6 font-bold">{car.name}</h3>
                    <div className="space-y-3">
                      {car.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="text-lg text-white/90 font-medium"
                        >
                          • {spec}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-sm text-white/70 uppercase tracking-widest font-semibold">
                      One Day In My Driveway
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun fact */}
        <div className="mt-24 text-center car-fun-fact">
          <p className="text-xl text-gray-500 italic">
            &quot;Why 90s cars? Because they had character before computers took
            over.&quot;
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20" />
    </section>
  );
}
