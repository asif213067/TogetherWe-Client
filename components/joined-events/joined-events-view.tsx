"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartHandshake } from "lucide-react";

import EventGridSkeleton from "@/components/events/event-grid-skeleton";
import JoinedEventCard from "@/components/joined-events/joined-event-card";
// import JoinedHero from "@/components/joined-events/joined-hero";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ApiError, getJoinedEvents } from "@/lib/manage-events-api";
import type { JoinedEvent } from "@/types/event";

type Status = "loading" | "ready" | "error";

const JoinedEventsView = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackUrl=%2Fjoined-events");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    getJoinedEvents()
      .then((data) => {
        if (cancelled) return;
        setEvents(data);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : "We could not load your joined events.",
        );
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [userId, reloadKey]);

  const handleRetry = () => {
    setStatus("loading");
    setReloadKey((current) => current + 1);
  };

  if (status === "error") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          We could not load your joined events
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {errorMessage}
        </p>
        <Button onClick={handleRetry} className="mt-6 h-11 rounded-xl px-6">
          Try again
        </Button>
      </div>
    );
  }

  const isLoading = status === "loading" || isPending || !session;

  return (
    <div className="flex flex-col gap-10">
      {/* <JoinedHero count={isLoading ? null : events.length} /> */}

      {isLoading ? (
        <EventGridSkeleton />
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-primary/25">
            <HeartHandshake size={30} />
          </span>
          <h2 className="mt-6 font-heading text-xl font-bold text-foreground">
            You haven&apos;t joined any events yet.
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Find a community drive near you and sign up. It only takes a few
            seconds.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <JoinedEventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEventsView;
