import { useState } from "react";
import { Shuffle } from "lucide-react";

const activities = [
  {
    emoji: "🏋️",
    title: "Gym Session",
    description: "Pushing limits, breaking PRs",
    vibe: "Power Mode",
    color: "from-orange-600 to-red-600",
  },
  {
    emoji: "🔥",
    title: "BBQ Time",
    description: "Grilling with the crew",
    vibe: "Social Energy",
    color: "from-red-600 to-yellow-600",
  },
  {
    emoji: "🚗",
    title: "Car Spotting",
    description: "Hunting for 90s classics",
    vibe: "Nostalgia Trip",
    color: "from-blue-600 to-purple-600",
  },
  {
    emoji: "🏊",
    title: "Lake Swimming",
    description: "Missing those Bosnian waters",
    vibe: "Peace Mode",
    color: "from-cyan-600 to-blue-600",
  },
  {
    emoji: "💻",
    title: "Side Project",
    description: "Building something cool",
    vibe: "Creator Mode",
    color: "from-purple-600 to-pink-600",
  },
  {
    emoji: "☕",
    title: "Coffee & Chill",
    description: "Berlin café hopping",
    vibe: "Relax Mode",
    color: "from-yellow-700 to-orange-700",
  },
];

export function WeekendVibes() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleActivity = () => {
    setIsShuffling(true);
    let count = 0;
    const maxCount = 10;

    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
      count++;

      if (count >= maxCount) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 100);
  };

  const activity = activities[currentActivity];

  return (
    <section className="min-h-screen px-8 py-32 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic background based on activity */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-10 transition-all duration-700`}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="mb-16 weekend-header">
          <span className="text-sm text-gray-500 uppercase tracking-widest mb-6 block">
            Weekend Generator
          </span>
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter mb-8">
            What I&apos;m
            <br />
            Probably Doing
          </h2>
        </div>

        {/* Activity Display */}
        <div className="mb-16 weekend-card">
          <div
            className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br ${activity.color} p-6 md:p-12 border-4 border-white/10 transition-all duration-700 ${isShuffling ? "scale-95" : "scale-100"}`}
          >
            {/* Animated background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10">
              <div
                className="text-8xl mb-4 md:text-9xl md:mb-8 animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                {activity.emoji}
              </div>
              <div className="inline-block px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full mb-6">
                <span className="text-white/90 uppercase tracking-widest text-sm">
                  {activity.vibe}
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl mb-6 text-white">
                {activity.title}
              </h3>
              <p className="text-xl md:text-2xl text-white/80">
                {activity.description}
              </p>
            </div>
          </div>
        </div>

        {/* Shuffle Button */}
        <div className="flex flex-col items-center gap-6 weekend-shuffle">
          <button
            onClick={shuffleActivity}
            disabled={isShuffling}
            className="group relative inline-flex items-center gap-3 p-6 md:px-12 md:py-6 bg-white text-black rounded-full text-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
          >
            <Shuffle
              className={`w-6 h-6 ${isShuffling ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`}
            />
            {isShuffling ? "Shuffling..." : "Shuffle My Weekend"}
          </button>
          <p className="text-gray-500 text-sm">
            Click to see what I might be up to this weekend
          </p>
        </div>

        {/* Activity dots indicator */}
        <div className="flex justify-center gap-3 mt-12 weekend-dots">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentActivity(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentActivity
                  ? "bg-white w-8"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Fun note */}
        <div className="mt-24 weekend-note">
          <p className="text-gray-400 italic">
            Actual weekend plans may vary depending on weather, mood, and coffee
            intake ☕
          </p>
        </div>
      </div>
    </section>
  );
}
