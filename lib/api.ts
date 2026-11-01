import type { CommunityEvent, CommunityEventDetails } from "@/types/event";

const API_URL = process.env.API_URL ?? "http://localhost:5000";


export async function getAllEvents(): Promise<CommunityEvent[]> {
  const response = await fetch(`${API_URL}/all-events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load events");
  }

  return response.json();
}

export async function getEventById(
  id: string,
): Promise<CommunityEventDetails | null> {
  const response = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load event");
  }

  return response.json();
}
