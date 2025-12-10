import { useEffect, useRef, useState } from "react";
import { Flame, Dumbbell, Coffee, Car, Heart } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <Dumbbell className="w-8 h-8" />,
    label: "Gym Sessions This Year",
    value: 156,
    suffix: "+",
    color: "text-orange-500",
  },
  {
    icon: <Flame className="w-8 h-8" />,
    label: "BBQ Events Attended",
    value: 47,
    suffix: "",
    color: "text-red-500",
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    label: "Cups of Coffee",
    value: 892,
    suffix: "☕",
    color: "text-yellow-600",
  },
  {
    icon: <Car className="w-8 h-8" />,
    label: "90s Car Photos Saved",
    value: 234,
    suffix: "📸",
    color: "text-blue-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    label: "Days in Berlin",
    value: 1095,
    suffix: "",
    color: "text-pink-500",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-6xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function LifeStats() {
  return (
    <section className="min-h-screen px-8 py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(168,85,247,0.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 stats-label">
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              Real Talk
            </span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tighter mb-8 stats-title">
            Life By The
            <br />
            Numbers
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto stats-desc">
            Because sometimes the best way to understand someone is through
            their life stats. Here&apos;s what makes me, well... me.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative overflow-hidden rounded-3xl bg-gray-900/50 border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 p-8"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

              <div className="relative z-10">
                <div
                  className={`${stat.color} mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <div className="mb-4">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </div>

              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}

          {/* Special card - Random fact */}
          <div className="stat-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-500 p-8 md:col-span-2 lg:col-span-1">
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-6">🎯</div>
              <div className="text-2xl mb-3">Fun Fact</div>
              <p className="text-white/90">
                I once drove 800km just to see a Mercedes W124 in person. Worth
                every kilometer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-24 text-center stats-footer">
          <p className="text-lg text-gray-500">
            These numbers are {"{"}more or less{"}"} accurate. But who&apos;s
            counting?
            <span className="inline-block ml-2">😉</span>
          </p>
        </div>
      </div>
    </section>
  );
}
