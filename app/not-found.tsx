"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-main)] px-6 text-center">
      <div className="space-y-6 max-w-md">
        {/* Abstract 404 Visual */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-[var(--accent)] rounded-lg rotate-12 opacity-50"></div>
          <div className="absolute inset-0 border-2 border-[var(--text-muted)] rounded-lg -rotate-12 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold">
            404
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Lost in Reality?
        </h1>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
          The coordinates you are looking for do not exist in this sector.
          Let's get you back to solid ground.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Return to Base</span>
        </Link>
      </div>

      <div className="absolute bottom-8 text-xs font-mono text-[var(--text-muted)] opacity-50">
        ERROR_CODE: PAGE_NOT_FOUND
      </div>
    </div>
  );
}
