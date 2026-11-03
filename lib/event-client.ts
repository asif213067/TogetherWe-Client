import { authClient } from "@/lib/auth-client";

export type CreateEventPayload = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
};

type CreateEventResponse = {
  success: boolean;
  message: string;
  eventId: string;
};

// Shape of the structured error bodies returned by the Express API
// (validation 400, auth 401, duplicate 409, ...).
type CreateEventErrorBody = {
  success?: boolean;
  code?: string;
  message?: string;
};

/** Thrown when the backend rejects a creation as an exact duplicate (HTTP 409). */
export class DuplicateEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateEventError";
  }
}

const DUPLICATE_EVENT_FALLBACK_MESSAGE =
  "An event with the same title, date and time, and location already exists.";

export async function createEvent(
  eventData: CreateEventPayload,
): Promise<CreateEventResponse> {
  // Get the Better Auth JWT
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Authentication failed. Please log in again.");
  }

  const API_URL = (
    process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:5000"
  ).replace(/\/+$/, "");

  const response = await fetch(`${API_URL}/create-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify(eventData),
  });

  const result = (await response.json()) as CreateEventErrorBody;

  if (!response.ok) {
    // HTTP 409 Conflict — the backend detected a duplicate event
    // (same organizer, title, date/time, location) and sent its own message.
    if (response.status === 409) {
      throw new DuplicateEventError(
        result.message && result.message.trim() !== ""
          ? result.message
          : DUPLICATE_EVENT_FALLBACK_MESSAGE
      );
    }

    throw new Error(result.message || "Failed to create event.");
  }

  return result as CreateEventResponse;
}
