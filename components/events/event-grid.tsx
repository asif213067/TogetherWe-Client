import EventsBrowser from "@/components/events/events-browser";
import EventsEmptyState from "@/components/events/events-empty-state";
import { getAllEvents } from "@/lib/api";

const EventGrid = async () => {
  const events = await getAllEvents();

  if (events.length === 0) {
    return <EventsEmptyState />;
  }

  return <EventsBrowser events={events} />;
};

export default EventGrid;
