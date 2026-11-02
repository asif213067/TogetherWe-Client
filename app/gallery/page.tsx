import { Suspense } from "react";
import type { Metadata } from "next";

import GalleryGrid from "@/components/gallery/gallery-grid";
import GalleryGridSkeleton from "@/components/gallery/gallery-grid-skeleton";

export const metadata: Metadata = {
  title: "Gallery | TogetherWe",
  description:
    "Moments from community events organised by people like you across Dhaka.",
};

export default function GalleryPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-40 -right-24 size-105 rounded-full bg-highlight/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 size-105 rounded-full bg-pink-400/40 blur-3xl" />

        <div className="relative mx-auto max-w-300 px-4 py-12 text-center sm:px-6 sm:py-16">
          <h1 className="font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Our community <span className="text-highlight">in action</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Moments from events organised by people like you. Every photo is a
            neighbourhood that showed up for each other.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-300 px-4 py-12 sm:px-6 sm:py-16">
        <Suspense fallback={<GalleryGridSkeleton />}>
          <GalleryGrid />
        </Suspense>
      </section>
    </main>
  );
}
