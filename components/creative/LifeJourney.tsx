import { MapPin, Plane, Home } from "lucide-react";
import Image from "next/image";

export function LifeJourney() {
  return (
    <section className="min-h-screen px-8 py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-green-900/10" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6 journey-label">
            <Plane className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              {new Date().getFullYear() - 2022} Years Ago
            </span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tighter mb-8 journey-title">
            Bosnia → Berlin
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto journey-desc">
            From the emerald lakes and mountains of Bosnia to the vibrant tech
            scene of Berlin. A journey that shaped who I am today.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Connection line - hidden on mobile */}
          {/* <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 -translate-x-1/2 journey-line" /> */}

          {/* Bosnia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6 mb-16 md:mb-32">
            <div className="md:text-right flex flex-col md:items-end journey-bosnia order-2 md:order-1">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-2 mb-4 text-green-400">
                  <Home className="w-6 h-6" />
                  <span className="uppercase tracking-widest">The Roots</span>
                </div>
                <h3 className="text-4xl md:text-5xl mb-6">Bosnia 🇧🇦</h3>
                <p className="text-lg md:text-xl text-gray-400 mb-6">
                  Where it all started. Crystal clear lakes, mountains, family
                  BBQs, and learning to appreciate the simple things in life.
                </p>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
                    Swimming in lakes
                  </span>
                  <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
                    Mountain vibes
                  </span>
                  <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
                    Epic BBQs
                  </span>
                </div>
              </div>
            </div>
            <div className="journey-bosnia-img order-1 md:order-2">
              <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] border-2 border-green-500/30">
                <Image
                  src="https://images.unsplash.com/photo-1734141077666-ee12d17b6b8f?q=80&w=1857&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bosnia landscape"
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* The Journey */}
          <div className="flex justify-center mb-16 md:mb-32">
            <div className="journey-plane relative z-10">
              <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-500 border-4 border-black">
                <Plane className="w-10 h-10 md:w-12 md:h-12 rotate-45" />
              </div>
              <div className="absolute -bottom-16 md:-bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
                  The Big Move
                </p>
              </div>
            </div>
          </div>

          {/* Berlin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6 mt-8 md:mt-0">
            <div className="journey-berlin-img">
              <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] border-2 border-purple-500/30">
                <Image
                  src="https://images.unsplash.com/photo-1612540142740-c45f53c2554b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJsaW4lMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzY1MjY0OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Berlin cityscape"
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="flex flex-col journey-berlin">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-2 mb-4 text-purple-400">
                  <MapPin className="w-6 h-6" />
                  <span className="uppercase tracking-widest">The Present</span>
                </div>
                <h3 className="text-4xl md:text-5xl mb-6">Berlin 🇩🇪</h3>
                <p className="text-lg md:text-xl text-gray-400 mb-6">
                  New chapter, new challenges, same love for good food and great
                  company. Building cool stuff by day, exploring the city by
                  night.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
                    Tech scene
                  </span>
                  <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
                    Urban gym life
                  </span>
                  <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
                    New adventures
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-24 md:mt-32 text-center journey-quote">
          <p className="text-2xl md:text-3xl text-gray-300 italic max-w-3xl mx-auto px-4">
            &quot;You can take me out of Bosnia, but you can&apos;t take Bosnia
            out of me.&quot;
          </p>
          <p className="mt-4 text-gray-500">
            - Still dreaming of those lake swims
          </p>
        </div>
      </div>
    </section>
  );
}
