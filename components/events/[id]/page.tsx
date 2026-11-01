import { notFound } from "next/navigation";

import EventDetails from "@/components/events/event-details";
import { getEventById } from "@/lib/api";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetails event={event} />;
}
