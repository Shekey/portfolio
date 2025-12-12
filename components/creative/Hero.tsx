import { portfolioData } from "@/data/resume-data";

export function Hero() {
  return (
    <section className="min-h[min(100dvh, 800px)] flex flex-col justify-center items-center px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full md:mt-32 mt-16">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h1 className="text-[clamp(3rem,12vw,14rem)] leading-[0.9] tracking-tighter hero-line">
              Not Your
              <span className="sr-only">
                {" "}
                <span className="sr-only">
                  <span>
                    {portfolioData.personal.name} -{" "}
                    {portfolioData.personal.title}
                  </span>
                  <span>Berlin | {portfolioData.personal.subtitle}</span>
                </span>
              </span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-[clamp(3rem,12vw,14rem)] leading-[0.9] tracking-tighter hero-line">
              Typical CV
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between pt-8">
            <div className="max-w-xl space-y-4">
              <p className="text-2xl text-gray-300 hero-description">
                Outside of my work as a Frontend & Full-Stack Developer in
                Berlin, I&apos;m into 90s cars, BBQ sessions, and lake swimming.
              </p>
              <p className="text-lg text-gray-500 hero-subtext">
                (Yes, there&apos;s still tech stuff here. But that&apos;s not
                all I am.)
              </p>
            </div>

            <div className="text-right hero-location mt-5">
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                Currently in
              </div>
              <div className="text-2xl">Berlin 🇩🇪</div>
              <div className="text-sm text-gray-600 mt-1">
                (Heart in Bosnia 🇧🇦)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto scroll-indicator flex flex-col justify-end gap-2 items-center grow mt-6">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Scroll for fun
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
