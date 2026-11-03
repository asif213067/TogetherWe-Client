import Link from "next/link";
import { MapPin, Pencil, Trash2, Users } from "lucide-react";

import EventThumbnail from "@/components/events/event-thumbnail";
import { formatEventDate, formatEventTime } from "@/lib/format";
import type { ManagedEvent } from "@/types/event";

type ManageEventCardProps = {
  event: ManagedEvent;
  onEdit: (event: ManagedEvent) => void;
  onDelete: (event: ManagedEvent) => void;
};

const actionClass =
  "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition-colors";

const ManageEventCard = ({ event, onEdit, onDelete }: ManageEventCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <EventThumbnail src={event.thumbnail} alt={event.title} />

        <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          {event.eventType}
        </span>

        {event.hasEnded ? (
          <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Ended
          </span>
        ) : null}

        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {formatEventDate(event.eventDate)} ·{" "}
          {formatEventTime(event.eventDate)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-13 font-heading text-lg leading-snug font-bold text-card-foreground">
          {event.title}
        </h3>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} className="shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </p>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        <p className="mt-1 flex items-center gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
          <Users size={16} className="shrink-0 text-primary" />
          {event.participantCount} joined
        </p>

        <div className="mt-auto grid grid-cols-3 gap-2 pt-2">
          <Link
            href={`/events/${event._id}`}
            className={`${actionClass} bg-muted text-foreground hover:bg-accent`}
          >
            View
          </Link>

          <button
            type="button"
            onClick={() => onEdit(event)}
            className={`${actionClass} bg-secondary text-primary hover:bg-accent`}
          >
            <Pencil size={15} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(event)}
            className={`${actionClass} bg-destructive/10 text-destructive hover:bg-destructive/20`}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ManageEventCard;
