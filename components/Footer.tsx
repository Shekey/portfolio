"use client";
import { portfolioData } from "@/data/resume-data";
import { Logo } from "@/components/Logo";
import { captureEvent } from "@/lib/posthog";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full px-6 md:px-12 py-12 md:py-24 bg-[var(--surface)] border-t border-[var(--border)] transition-colors duration-500"
      data-end-sentinel
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Logo size="lg" /> {/* Large Logo here */}
          <div className="max-w-xs">
            <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
              Built by{" "}
              <strong className="text-[var(--text-main)]">
                {portfolioData.personal.name}
              </strong>
              .
              <br />
              Forging digital reality with code & motion.
            </p>
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex gap-6 font-mono text-sm">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-[var(--text-main)] hover:text-[var(--accent)] underline decoration-dotted transition-colors"
              onClick={() =>
                captureEvent("contact_click", {
                  channel: "email",
                  source: "footer",
                })
              }
            >
              Email
            </a>
            <a
              href={`https://${portfolioData.personal.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-main)] hover:text-[var(--accent)] underline decoration-dotted transition-colors"
              onClick={() =>
                captureEvent("contact_click", {
                  channel: "linkedin",
                  source: "footer",
                })
              }
            >
              LinkedIn
            </a>
            <a
              href={`https://${portfolioData.personal.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-main)] hover:text-[var(--accent)] underline decoration-dotted transition-colors"
              onClick={() =>
                captureEvent("contact_click", {
                  channel: "github",
                  source: "footer",
                })
              }
            >
              GitHub
            </a>
          </div>

          <p className="text-[10px] text-[var(--text-muted)] opacity-50 font-mono mt-2">
            © {year} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
