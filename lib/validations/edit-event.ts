import { z } from "zod";

import { EVENT_TYPES } from "@/lib/event-types";

export const editEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(80, "Title must be 80 characters or less"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be 1000 characters or less"),
  eventType: z
    .string()
    .refine(
      (value) => (EVENT_TYPES as readonly string[]).includes(value),
      "Choose a valid event type",
    ),
  thumbnail: z
    .string()
    .trim()
    .url("Enter a valid image link")
    .refine(
      (value) => value.startsWith("https://"),
      "The link must start with https://",
    ),
  location: z
    .string()
    .trim()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be 100 characters or less"),
  eventDate: z
    .string()
    .min(1, "Choose a date and time")
    .refine(
      (value) => new Date(value).getTime() > Date.now(),
      "Event date and time must be in the future",
    ),
});

export type EditEventValues = z.infer<typeof editEventSchema>;
