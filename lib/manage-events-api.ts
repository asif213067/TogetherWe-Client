import { authClient } from "@/lib/auth-client";
import type {
  JoinedEvent,
  ManagedEvent,
  ParticipationState,
} from "@/types/event";

const API_BASE = (
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:5000"
).replace(/\/+$/, "");

type ErrorBody = {
  message?: string;
  errors?: Record<string, string>;
};

type ActionResponse = {
  success: boolean;
  message: string;
};

export type UpdateEventPayload = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
};

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function authorizedRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError(
      "Could not reach the server. Check your connection and try again.",
      0,
    );
  }

  const body = (await response.json().catch(() => null)) as
    | (ErrorBody & Record<string, unknown>)
    | null;

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? "Something went wrong. Please try again.",
      response.status,
      body?.errors,
    );
  }

  return body as T;
}

export function getMyEvents() {
  return authorizedRequest<ManagedEvent[]>("/my-events");
}

export function updateEvent(id: string, payload: UpdateEventPayload) {
  return authorizedRequest<ActionResponse>(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteEvent(id: string) {
  return authorizedRequest<ActionResponse>(`/events/${id}`, {
    method: "DELETE",
  });
}

type ParticipationActionResponse = ActionResponse & ParticipationState;

export function getParticipation(id: string) {
  return authorizedRequest<ParticipationState>(`/events/${id}/participation`);
}

export function joinEvent(id: string) {
  return authorizedRequest<ParticipationActionResponse>(`/events/${id}/join`, {
    method: "POST",
  });
}

export function leaveEvent(id: string) {
  return authorizedRequest<ParticipationActionResponse>(`/events/${id}/join`, {
    method: "DELETE",
  });
}

export function getJoinedEvents() {
  return authorizedRequest<JoinedEvent[]>("/joined-events");
}
