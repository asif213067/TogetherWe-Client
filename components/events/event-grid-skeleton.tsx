import EventCardSkeleton from "@/components/events/event-card-skeleton";

const EventGridSkeleton = () => {
  return (
    <div role="status" className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex flex-wrap gap-2.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="h-10 animate-pulse rounded-full bg-muted"
              style={{ width: `${5.5 + (index % 3) * 1.5}rem` }}
            />
          ))}
        </div>
        <span className="h-11 w-full animate-pulse rounded-full bg-muted md:w-72 lg:w-80" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <span className="sr-only">Loading events</span>
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default EventGridSkeleton;
