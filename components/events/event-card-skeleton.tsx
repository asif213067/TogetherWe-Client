const EventCardSkeleton = () => {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-video bg-muted" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-4/5 rounded-md bg-muted" />
        <div className="h-5 w-2/5 rounded-md bg-muted" />
        <div className="mt-1 h-4 w-3/5 rounded-md bg-muted" />
        <div className="h-4 w-1/3 rounded-md bg-muted" />
        <div className="mt-auto h-11 w-full rounded-xl bg-muted" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
