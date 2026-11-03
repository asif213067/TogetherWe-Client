import Link from "next/link";
import { ArrowLeft, CalendarPlus } from "lucide-react";

import RequireAuth from "@/components/auth/require-auth";
import CreateEventForm from "@/components/events/create-event-form";

export default function CreateEventPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background px-4 py-10 sm:px-6 sm:py-14">
      {/* Ambient brand glow (decorative, painted behind the relative content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-48 -left-24 size-72 rounded-full bg-highlight/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Back navigation */}
        <Link
          href="/events"
          className="mb-8 inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        {/* Page heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-primary/20">
            <CalendarPlus size={27} />
          </div>

          <h1 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl">
            Create a Community Event
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Share something worth showing up for. Add the details below and
            your event will appear in the upcoming community feed for your
            neighbours to join.
          </p>
        </div>

        {/* Event form (authenticated users only) */}
        <div className="rounded-3xl border border-border bg-card p-4 shadow-xl shadow-primary/5 sm:p-8">
          <RequireAuth>
            <CreateEventForm />
          </RequireAuth>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Together, we can make a meaningful impact.
        </p>
      </div>
    </main>
  );
}
