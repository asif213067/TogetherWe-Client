import Link from "next/link";
import { MapPin, Users } from "lucide-react";

import EventThumbnail from "@/components/events/event-thumbnail";
import { formatEventDate } from "@/lib/format";
import type { CommunityEvent } from "@/types/event";

type EventCardProps = {
  event: CommunityEvent;
  eager?: boolean;
};

const EventCard = ({ event, eager = false }: EventCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <EventThumbnail src={event.thumbnail} alt={event.title} eager={eager} />

        <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {event.eventType}
        </span>

        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {formatEventDate(event.eventDate)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="truncate font-heading text-lg leading-snug font-bold text-card-foreground">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} className="shrink-0 text-primary" />
            {event.participantCount} joined
          </p>
        </div>

        <Link
          href={`/events/${event._id}`}
          className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
        >
          View Event
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
