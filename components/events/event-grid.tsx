import EventCard from "@/components/events/event-card";
import EventsEmptyState from "@/components/events/events-empty-state";
import { getAllEvents } from "@/lib/api";

const EventGrid = async () => {
  const events = await getAllEvents();

  if (events.length === 0) {
    return <EventsEmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCard key={event._id} event={event} eager={index < 3} />
      ))}
    </div>
  );
};

export default EventGrid;
