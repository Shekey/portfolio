import { portfolioData } from "@/data/resume-data";
import { captureEvent } from "@/lib/posthog";

export function Contact() {
  const { personal } = portfolioData;
  return (
    <section
      id="contact"
      className="min-h-screen px-8 py-32 relative flex items-center"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-1 lg:gap:4">
          {/* Left - CTA */}
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                Let&apos;s Connect
              </div>
              <h2 className="contact-title text-[clamp(2.5rem,8vw,9rem)] leading-[0.95] tracking-tighter">
                Coffee?
                <br />
                BBQ?
                <br />
                Or just talk code?
              </h2>
              <p className="text-xl text-gray-400 max-w-lg">
                Whether you want to discuss React architectures, debate which
                90s car is the best, or just grab a coffee in Berlin ~ I&apos;m
                down!
              </p>
            </div>

            <a
              href={`mailto:${personal.email}`}
              className="contact-link inline-block group"
              onClick={() =>
                captureEvent("contact_click", {
                  channel: "email",
                  source: "creative",
                })
              }
            >
              <div className="text-[clamp(1.5rem,4vw,3rem)] tracking-tight border-b-2 border-white/20 pb-2 group-hover:border-purple-500 transition-colors">
                {personal.email}
              </div>
            </a>
          </div>

          {/* Right - Info */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 space-y-12">
            <div className="space-y-8">
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest mb-3">
                  Currently Living
                </div>
                <div className="text-xl text-gray-300">
                  Berlin, Germany 🇩🇪
                  <br />
                  (But my heart is in Bosnia 🇧🇦)
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest mb-3">
                  Find Me Online
                </div>
                <div className="space-y-2">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link block text-xl text-gray-300 hover:text-white transition-colors"
                    onClick={() =>
                      captureEvent("contact_click", {
                        channel: "linkedin",
                        source: "creative",
                      })
                    }
                  >
                    LinkedIn →
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    className="contact-link block text-xl text-gray-300 hover:text-white transition-colors"
                    onClick={() =>
                      captureEvent("contact_click", {
                        channel: "email",
                        source: "creative",
                      })
                    }
                  >
                    Email →
                  </a>
                  <a
                    href={personal.github}
                    className="contact-link block text-xl text-gray-300 hover:text-white transition-colors"
                    onClick={() =>
                      captureEvent("contact_click", {
                        channel: "github",
                        source: "creative",
                      })
                    }
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-800">
                <div className="text-sm text-gray-500 uppercase tracking-widest mb-3">
                  Fun Fact
                </div>
                <div className="text-lg text-gray-400 italic">
                  I respond faster to messages that mention Mercedes W124 or
                  barbecue 😄
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 mt-32 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} Ajdin Šahinbegović. Built with
              passion (and lots of coffee ☕)
            </div>
            <div className="flex gap-1 lg:gap:4">
              <span className="text-gray-600">Not your typical portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
