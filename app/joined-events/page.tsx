import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";

import JoinedEventsView from "@/components/joined-events/joined-events-view";

export const metadata: Metadata = {
  title: "Joined Events | TogetherWe",
  description: "All the community events you have signed up for.",
};

export default function JoinedEventsPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="mx-auto max-w-300 px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary">
            <CircleCheck size={16} />
            My Volunteer Commitments
          </span>
          <h1 className="mt-4 font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Joined Events
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Here are all the community drives you have signed up for, with the
            soonest first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-300 px-4 py-10 sm:px-6 sm:py-12">
        <JoinedEventsView />
      </section>
    </main>
  );
}
