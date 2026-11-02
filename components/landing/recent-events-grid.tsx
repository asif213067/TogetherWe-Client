import EventCard from "@/components/events/event-card";
import EventsEmptyState from "@/components/events/events-empty-state";
import { getRecentEvents } from "@/lib/api";
import type { CommunityEvent } from "@/types/event";
import { connection } from "next/server";

const RecentEventsGrid = async () => {
  let events: CommunityEvent[];

  await connection();

  try {
    events = await getRecentEvents();
  } catch {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <h3 className="font-heading text-xl font-bold text-foreground">
          We could not load events right now
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Please refresh the page in a moment.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return <EventsEmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default RecentEventsGrid;
