import Link from "next/link";
import { CalendarX } from "lucide-react";

const EventsEmptyState = () => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
        <CalendarX size={28} />
      </span>
      <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
        No upcoming events yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Be the first to organize a community drive and invite your neighbours.
      </p>
      <Link
        href="/create-event"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25"
      >
        Create Event
      </Link>
    </div>
  );
};

export default EventsEmptyState;
