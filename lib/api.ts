import type { CommunityEvent, CommunityEventDetails } from "@/types/event";
import type { GalleryItem } from "@/types/gallery";


const API_URL = (
  process.env.SERVER_BASE_URL ?? "http://localhost:5000"
).replace(/\/+$/, "");


export async function getAllEvents(): Promise<CommunityEvent[]> {
  const url = `${API_URL}/all-events`;

  console.log("Fetching events from:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Events API error:", response.status, error);

    throw new Error(`Failed to load events: ${response.status}`);
  }

  return response.json();
}

export async function getEventById(
  id: string,
): Promise<CommunityEventDetails | null> {
  const response = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error("Failed to load event");
  }

  return response.json();
}


export async function getGalleryItems(): Promise<GalleryItem[]> {
  const response = await fetch(`${API_URL}/gallery`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load gallery");
  }

  return response.json();
}