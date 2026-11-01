import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import EventGrid from "@/components/events/event-grid";
import EventGridSkeleton from "@/components/events/event-grid-skeleton";

export const metadata: Metadata = {
  title: "Upcoming Events | TogetherWe",
  description:
    "Browse upcoming community service events near you and join the ones you care about.",
};

export default function EventsPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-300 flex-col gap-6 px-4 pt-12 pb-8 sm:px-6 sm:pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary">
              <span className="size-2 rounded-full bg-highlight" />
              Future Community Drives
            </span>
            <h1 className="mt-4 font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Upcoming Events
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
              Discover community events happening near you. Past events are
              removed automatically, so you only see drives you can still join.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35"
          >
            Create Event
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-300 px-4 py-10 sm:px-6 sm:py-12">
        <Suspense fallback={<EventGridSkeleton />}>
          <EventGrid />
        </Suspense>
      </section>
    </main>
  );
}
