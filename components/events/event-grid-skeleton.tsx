import EventCardSkeleton from "@/components/events/event-card-skeleton";

const EventGridSkeleton = () => {
  return (
    <div role="status" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading events</span>
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default EventGridSkeleton;
