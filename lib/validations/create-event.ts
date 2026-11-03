import { z } from "zod";

export const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Social Service",
  "Community Support",
  "Other",
] as const;

export const createEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Event title must be at least 3 characters.")
    .max(100, "Event title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(2000, "Description cannot exceed 2000 characters."),

  eventType: z.enum(eventTypes),

  thumbnail: z.string().trim().url("Please enter a valid thumbnail image URL."),

  location: z.string().trim().min(3, "Please enter the event location."),

  eventDate: z
    .string()
    .min(1, "Please select an event date.")
    .refine((date) => {
      // Compare date strings using the browser's local date.
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const todayString = `${year}-${month}-${day}`;

      return date > todayString;
    }, "Event date must be in the future."),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;
