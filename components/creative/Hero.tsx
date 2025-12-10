export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
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

      <div className="relative z-10 max-w-[1400px] w-full">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h1 className="text-[clamp(3rem,12vw,14rem)] leading-[0.9] tracking-tighter hero-line">
              Not Your
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[clamp(3rem,12vw,14rem)] leading-[0.9] tracking-tighter hero-line">
              Typical CV
            </h1>
          </div>

          <div className="flex items-end justify-between pt-8">
            <div className="max-w-xl space-y-4">
              <p className="text-2xl text-gray-300 hero-description">
                I build stuff with code. But I&apos;m also into 90s cars, BBQ
                sessions, and swimming in lakes. Let me show you the real me.
              </p>
              <p className="text-lg text-gray-500 hero-subtext">
                (Yes, there&apos;s still tech stuff here. But that&apos;s not
                all I am.)
              </p>
            </div>

            <div className="text-right hero-location">
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Scroll for fun
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
