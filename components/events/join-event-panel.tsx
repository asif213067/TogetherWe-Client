"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Users } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  ApiError,
  getParticipation,
  joinEvent,
  leaveEvent,
} from "@/lib/manage-events-api";
import type { ParticipationState } from "@/types/event";

type JoinEventPanelProps = {
  eventId: string;
  initialCount: number;
  hasEnded: boolean;
};

type TrackedParticipation = ParticipationState & { userId: string };

const buttonBase =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-70";

const JoinEventPanel = ({
  eventId,
  initialCount,
  hasEnded,
}: JoinEventPanelProps) => {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;

  const [participation, setParticipation] =
    useState<TrackedParticipation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    getParticipation(eventId)
      .then((data) => {
        if (!cancelled) setParticipation({ ...data, userId });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [userId, eventId]);

  const current =
    userId && participation?.userId === userId ? participation : null;
  const count = current?.participantCount ?? initialCount;

  const handleToggle = async () => {
    if (!userId || !current) return;

    setIsSubmitting(true);

    try {
      const result = current.joined
        ? await leaveEvent(eventId)
        : await joinEvent(eventId);

      setParticipation({
        userId,
        joined: result.joined,
        participantCount: result.participantCount,
      });
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );

      getParticipation(eventId)
        .then((data) => setParticipation({ ...data, userId }))
        .catch(() => undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAction = () => {
    if (hasEnded) {
      return (
        <p className="rounded-xl bg-muted px-4 py-3 text-center text-sm font-medium text-muted-foreground">
          This event has ended
        </p>
      );
    }

    if (isPending || (userId && !current)) {
      return <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />;
    }

    if (!userId) {
      return (
        <>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/events/${eventId}`)}`}
            className={`${buttonBase} bg-brand-gradient text-white shadow-md shadow-primary/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35`}
          >
            Join Event
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You need to log in to join this event.
          </p>
        </>
      );
    }

    if (current?.joined) {
      return (
        <button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className={`${buttonBase} border border-destructive/40 bg-background text-destructive hover:bg-destructive/10`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Leaving
            </>
          ) : (
            "Leave Event"
          )}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isSubmitting}
        className={`${buttonBase} bg-brand-gradient text-white shadow-md shadow-primary/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Joining
          </>
        ) : (
          "Join Event"
        )}
      </button>
    );
  };

  return (
    <div className="mt-6">
      <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-card-foreground">
        <Users size={18} className="text-primary" />
        {count} {count === 1 ? "Participant" : "Participants"} Joined
      </p>

      {renderAction()}
    </div>
  );
};

export default JoinEventPanel;
