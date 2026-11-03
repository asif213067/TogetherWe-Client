import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

import EventThumbnail from "@/components/events/event-thumbnail";
import { formatEventDate } from "@/lib/format";
import type { CommunityEventDetails } from "@/types/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type EventDetailsProps = {
  event: CommunityEventDetails;
};

const EventDetails = ({ event }: EventDetailsProps) => {
  const facts = [
    {
      icon: CalendarDays,
      label: "Date",
      value: formatEventDate(event.eventDate),
    },
    {
      icon: MapPin,
      label: "Location",
      value: event.location,
    },
    {
      icon: Users,
      label: "Participants",
      value: `${event.participantCount} joined`,
    },
  ];

  return (
    <main className="flex-1 min-w-0">
      <div className="mx-auto w-full max-w-300 min-w-0 px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to events
        </Link>

        <div className="relative mt-6 aspect-video overflow-hidden rounded-3xl bg-muted shadow-lg shadow-primary/10 sm:aspect-21/9">
          <EventThumbnail src={event.thumbnail} alt={event.title} eager />
        </div>

        <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          {/* Main event content */}
          <div className="min-w-0 max-w-full">
            <span className="inline-flex max-w-full rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary">
              {event.eventType}
            </span>

            <h1 className="mt-4 min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            {/* Organizer */}
            <div className="mt-5 flex min-w-0 items-center gap-3">
              <Avatar className="size-10 shrink-0">
                <AvatarImage
                  src={event.organizerPhoto ?? undefined}
                  alt={event.organizerName}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-brand-gradient text-sm font-semibold text-white">
                  {getInitials(event.organizerName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 leading-tight">
                <p className="text-xs text-muted-foreground">
                  Hosted by
                </p>

                <p className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-semibold text-foreground">
                  {event.organizerName}
                </p>
              </div>
            </div>

            {/* Description */}
            <h2 className="mt-8 font-heading text-xl font-bold text-foreground">
              About this event
            </h2>

            <p className="mt-3 min-w-0 max-w-full whitespace-pre-line break-words [overflow-wrap:anywhere] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {event.description}
            </p>
          </div>

          {/* Event information sidebar */}
          <aside className="min-w-0 max-w-full rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-heading text-lg font-bold text-card-foreground">
              Event details
            </h2>

            <ul className="mt-5 flex min-w-0 flex-col gap-4">
              {facts.map((fact) => (
                <li
                  key={fact.label}
                  className="flex min-w-0 items-start gap-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <fact.icon size={20} />
                  </span>

                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="text-xs text-muted-foreground">
                      {fact.label}
                    </p>

                    <p className="mt-1 min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-semibold text-card-foreground">
                      {fact.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {event.hasEnded ? (
              <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                This event has ended
              </p>
            ) : (
              <>
                <Link
                  href="/login"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35"
                >
                  Join Event
                </Link>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  You need to log in to join this event.
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;