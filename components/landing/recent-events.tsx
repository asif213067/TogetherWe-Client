import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EventGridSkeleton from "@/components/events/event-grid-skeleton";
import RecentEventsGrid from "@/components/landing/recent-events-grid";
import SectionHeading from "@/components/shared/section-heading";

const RecentEvents = () => {
  return (
    <section
      id="upcoming-events"
      className="scroll-mt-18 bg-muted/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Recent upcoming events"
            description="Fresh community drives added by neighbours. Pick one and show up."
          />

          <Link
            href="/events"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            See all events
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-12">
          <Suspense fallback={<EventGridSkeleton />}>
            <RecentEventsGrid />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
