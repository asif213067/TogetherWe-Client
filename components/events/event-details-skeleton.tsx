const EventDetailsSkeleton = () => {
  return (
    <main role="status" className="flex-1">
      <span className="sr-only">Loading event</span>
      <div className="mx-auto max-w-300 animate-pulse px-4 py-8 sm:px-6 sm:py-12">
        <div className="h-5 w-32 rounded-md bg-muted" />
        <div className="mt-6 aspect-video rounded-3xl bg-muted sm:aspect-21/9" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <div className="h-8 w-28 rounded-full bg-muted" />
            <div className="mt-4 h-10 w-4/5 rounded-lg bg-muted" />
            <div className="mt-3 h-10 w-2/5 rounded-lg bg-muted" />
            <div className="mt-8 h-6 w-44 rounded-md bg-muted" />
            <div className="mt-4 flex flex-col gap-3">
              <div className="h-4 w-full rounded-md bg-muted" />
              <div className="h-4 w-full rounded-md bg-muted" />
              <div className="h-4 w-3/4 rounded-md bg-muted" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="h-6 w-32 rounded-md bg-muted" />
            <div className="mt-5 flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-muted" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-3 w-16 rounded-md bg-muted" />
                    <div className="h-4 w-3/4 rounded-md bg-muted" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-12 w-full rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsSkeleton;
