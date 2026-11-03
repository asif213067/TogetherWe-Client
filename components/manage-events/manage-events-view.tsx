"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarPlus } from "lucide-react";

import EventGridSkeleton from "@/components/events/event-grid-skeleton";
import DeleteEventDialog from "@/components/manage-events/delete-event-dialog";
import EditEventDialog from "@/components/manage-events/edit-event-dialog";
import ManageEventCard from "@/components/manage-events/manage-event-card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ApiError, getMyEvents } from "@/lib/manage-events-api";
import type { ManagedEvent } from "@/types/event";

type Status = "loading" | "ready" | "error";

const ManageEventsView = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;

  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [editTarget, setEditTarget] = useState<ManagedEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagedEvent | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackUrl=%2Fmanage-events");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    getMyEvents()
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
            : "We could not load your events.",
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

  const handleDeleted = (id: string) => {
    setEvents((current) => current.filter((event) => event._id !== id));
    setDeleteTarget(null);
    router.refresh();
  };

  const handleSaved = async () => {
    setReloadKey((current) => current + 1);
    router.refresh();
  };

  if (status === "loading" || isPending || !session) {
    return <EventGridSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          We could not load your events
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

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <CalendarPlus size={28} />
        </span>
        <h2 className="mt-5 font-heading text-xl font-bold text-foreground">
          You have not created any events yet
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Organize your first community drive and it will show up here, ready to
          edit or delete whenever you need.
        </p>
        <Link
          href="/create-event"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25"
        >
          Create Event
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <ManageEventCard
            key={event._id}
            event={event}
            onEdit={setEditTarget}
            onDelete={setDeleteTarget}
          />
        ))}
      </div>

      {editTarget ? (
        <EditEventDialog
          key={editTarget._id}
          event={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={handleSaved}
        />
      ) : null}

      {deleteTarget ? (
        <DeleteEventDialog
          key={deleteTarget._id}
          event={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={handleDeleted}
        />
      ) : null}
    </>
  );
};

export default ManageEventsView;
