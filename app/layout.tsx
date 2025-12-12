import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { Preloader } from "@/components/Preloader";
import Script from "next/script";
import { PosthogProvider } from "@/components/analytics/PosthogProvider";
import { WebVitals } from "@/components/analytics/WebVitals";
import { EngagementTracker } from "@/components/analytics/EngagementTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // SEO STRATEGY:
  // 1. "Software Specialist" -> Matches your main goal.
  // 2. "Frontend Developer" -> Matches high volume search terms.
  // 3. "Berlin" -> Crucial for local ranking.
  title: "Ajdin Šahinbegović | Software Specialist & Frontend Developer Berlin",

  description:
    "Senior Frontend Engineer based in Berlin specializing in building high-performance websites and scalable React/Next.js architecture. Expert in Design Systems and Front-End Development.",

  keywords: [
    // --- The Core Request ---
    "Software Specialist Berlin",
    "Frontend Developer",
    "Front-End Developer",
    "Building Website Berlin",

    // --- Tech Specifics ---
    "Software Engineer",
    "Frontend Architecture",
    "Design Systems",
    "Next.js",
    "React",
    "DesignOps",
    "WebGL",

    // --- Variations for Reach ---
    "Web Developer Berlin",
    "Freelance Developer Germany",
  ],

  openGraph: {
    title:
      "Ajdin Šahinbegović | Software Specialist & Frontend Developer Berlin",
    description:
      "Senior Frontend Engineer based in Berlin. Building digital ecosystems with high-performance Architecture & Design Systems.",
    url: "https://shekeyweb.com",
    siteName: "Ajdin Šahinbegović",
    images: [
      {
        url: "https://shekeyweb.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajdin Šahinbegović - Software Specialist & Frontend Developer Berlin",
      },
    ],
    locale: "en_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Ajdin Šahinbegović | Software Specialist & Frontend Developer Berlin",
    description:
      "Senior Frontend Engineer based in Berlin. Building digital ecosystems and scalable web architecture.",
    images: ["https://shekeyweb.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PosthogProvider />
        <WebVitals />
        <EngagementTracker />
        <SmoothScrollProvider>
          <ThemeWrapper>
            <Preloader />
            <Script
              type="application/ld+json"
              id="person-ld"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Ajdin Šahinbegović",
                  jobTitle: "Specialized Software Engineer",
                  url: "https://shekeyweb.com",
                  sameAs: [
                    "https://github.com/shekey",
                    "https://linkedin.com/in/shekey",
                  ],
                  description:
                    "Senior Frontend Engineer specializing in scalable architecture, design systems, and high‑performance web applications.",
                }),
              }}
            />

            <div className="animate-fade-in">{children}</div>
            <div data-end-sentinel className="h-px w-full" />
          </ThemeWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
