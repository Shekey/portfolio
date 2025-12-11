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
  title: "Ajdin Šahinbegović | Specialized Software Engineer",
  description:
    "Senior Frontend Engineer specializing in scalable architecture, design systems, and high-performance React/Next.js applications. Bridging logic and imagination.",
  keywords: [
    "Software Engineer",
    "Frontend Architecture",
    "Design Systems",
    "Next.js",
    "React",
    "DesignOps",
    "WebGL",
  ],
  openGraph: {
    title: "Ajdin Šahinbegović | Specialized Software Engineer",
    description:
      "Building digital ecosystems. Specialized in Architecture & Design Systems.",
    url: "https://shekeyweb.com",
    siteName: "Ajdin Šahinbegović",
    images: [
      {
        url: "https://shekeyweb.com/og-image.png", // See suggestion below
        width: 1200,
        height: 630,
        alt: "Ajdin Šahinbegović - Specialized Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajdin Šahinbegović | Specialized Software Engineer",
    description:
      "Building digital ecosystems. Specialized in Architecture & Design Systems.",
    images: ["https://shekeyweb.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
