import type { Metadata } from "next";
import Link from "next/link";
import { Settings2, SquarePlus } from "lucide-react";
import ManageEventsView from "@/components/manage-events/manage-events-view";


export const metadata: Metadata = {
  title: "Manage Your Events | TogetherWe",
  description: "View, edit and delete the community events you created.",
};

export default function ManageEventsPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-300 flex-col gap-6 px-4 pt-12 pb-8 sm:px-6 sm:pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary">
              <Settings2 size={16} />
              Organizer Dashboard
            </span>
            <h1 className="mt-4 font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Manage Your Events
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
              View, edit and manage the community drives you have published.
              Only you can edit or delete the events you created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35"
          >
            <SquarePlus size={18} />
            Create New Event
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-300 px-4 py-10 sm:px-6 sm:py-12">
        <ManageEventsView />
      </section>
    </main>
  );
}
