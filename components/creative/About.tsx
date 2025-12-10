export function About() {
  return (
    <section id="about" className="min-h-screen px-8 py-32 relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Left side - Title */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-32">
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-6 about-label">
                The Basics
              </div>
              <h2 className="text-[clamp(2rem,6vw,5rem)] leading-[1.1] tracking-tighter about-title">
                Who I Am
                <br />
                Beyond Code
              </h2>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="col-span-12 lg:col-span-7 space-y-24">
            {/* Personal Summary */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-3xl text-gray-300 leading-relaxed about-intro">
                  I&apos;m Ajdin — Software Engineer at Dr. Oetker by day, 90s
                  car enthusiast and BBQ master by night.
                </p>
                <p className="text-xl text-gray-400 leading-relaxed about-description">
                  Three years ago, I made the jump from the beautiful lakes of
                  Bosnia to the bustling tech scene of Berlin. Still can&apos;t
                  decide which I love more: debugging React components or
                  debating which 90s car is the ultimate classic.
                </p>
                <p className="text-xl text-gray-400 leading-relaxed about-description">
                  I believe in working hard at the gym, grilling harder with
                  friends, and keeping that Bosnian spirit alive wherever I go.
                  Life&apos;s too short for boring portfolios — let&apos;s have
                  some fun!
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-6 pt-8 border-t border-gray-800">
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                Quick Facts
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">🇧🇦 → 🇩🇪</div>
                  <p className="text-gray-300">Bosnian roots, Berlin living</p>
                </div>
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">🚗</div>
                  <p className="text-gray-300">Dream car: Mercedes W124</p>
                </div>
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">🏋️</div>
                  <p className="text-gray-300">Gym regular, PRs chaser</p>
                </div>
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">🔥</div>
                  <p className="text-gray-300">BBQ enthusiast, grill master</p>
                </div>
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">🏊</div>
                  <p className="text-gray-300">Lake swimmer, nature lover</p>
                </div>
                <div className="achievement-item space-y-2">
                  <div className="text-2xl">💻</div>
                  <p className="text-gray-300">Building @ Dr. Oetker</p>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 hobbies-intro">
              <div className="text-4xl mb-6">💭</div>
              <p className="text-2xl text-gray-300 italic leading-relaxed">
                &quot;Life is about balance: Clean code and good food. Solid
                architecture and solid friendships. Debugging errors and
                debugging yourself.&quot;
              </p>
              <p className="text-gray-500 mt-4">— My personal motto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated SVG Path Background */}
      <svg
        className="absolute top-1/2 left-0 w-full h-full opacity-10 -z-10 pointer-events-none svg-path"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          id="animatedPath"
          d="M 0,500 Q 250,300 500,500 T 1000,500"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
