// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react", // Critical: Contains hundreds of icons
      "@heroicons/react", // Critical: Contains hundreds of icons
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.codepen.io",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  // We handle PostHog in middleware.ts now
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
