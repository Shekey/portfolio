import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Handle PostHog STATIC assets (Safe to cache long-term)
  if (pathname.startsWith("/ingest/static/")) {
    const newPath = pathname.replace("/ingest/static", "");
    const destinationUrl = `https://eu-assets.i.posthog.com/static${newPath}`;

    // Fetch the asset manually
    const res = await fetch(destinationUrl, {
      headers: {
        ...Object.fromEntries(request.headers),
        host: "eu-assets.i.posthog.com", // Ensure host matches destination
      },
    });

    // Create a new response with the body from PostHog
    const response = new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });

    // FORCE override the cache control to 1 year
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, stale-while-revalidate=86400"
    );

    return response;
  }

  // 2. Handle PostHog API events (Do NOT cache these!)
  if (pathname.startsWith("/ingest/")) {
    const newPath = pathname.replace("/ingest", "");
    const destinationUrl = `https://eu.i.posthog.com${newPath}`;

    const res = await fetch(destinationUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        host: "eu.i.posthog.com",
      },
      body: request.body,
      // @ts-ignore: Required for passing request body in newer Next.js/Node
      duplex: "half",
    });

    const response = new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });

    // Keep PostHog's default headers here (usually no-cache)
    // to ensure Feature Flags and Analytics work correctly.
    return response;
  }
}

export const config = {
  // Only run middleware on the ingest paths to save performance
  matcher: "/ingest/:path*",
};
