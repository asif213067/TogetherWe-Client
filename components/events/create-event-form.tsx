"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarClock,
  CalendarPlus,
  ClipboardList,
  ImagePlus,
  Loader2,
  MapPin,
  RotateCcw,
  Shapes,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEvent } from "@/lib/event-client";
import type { CreateEventPayload } from "@/lib/event-client";
import { DuplicateEventError } from "@/lib/event-client";

// Keep in sync with the Express backend's EVENT_TYPES
// (togetherwe-server/utils/validate-event.js) so submissions never hit a 400.
const EVENT_TYPES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

type EventFormValues = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  // datetime-local string ("YYYY-MM-DDTHH:mm") in the browser's local time
  eventDate: string;
};

const EMPTY_FORM_VALUES: EventFormValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

const isFormEmpty = (values: EventFormValues) =>
  Object.values(values).every((value) => value.trim() === "");

type EventFormSectionProps = {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
};

const EventFormSection = ({ icon: Icon, title, children }: EventFormSectionProps) => (
  <section className="rounded-2xl border border-border/60 bg-muted/40 p-4 sm:p-6">
    <header className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon size={18} />
      </span>
      <h2 className="font-heading text-base font-bold text-foreground sm:text-lg">
        {title}
      </h2>
    </header>

    <div className="mt-5 space-y-5">{children}</div>
  </section>
);

const httpsUrlPattern = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

type CreateEventFormProps = {
  onSuccess?: () => void;
};

export default function CreateEventForm({ onSuccess }: CreateEventFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [formData, setFormData] = useState<EventFormValues>(EMPTY_FORM_VALUES);
  const [previewFailed, setPreviewFailed] = useState(false);

  // Earliest selectable datetime in the browser's local format. Computed once
  // when the form mounts so the value stays stable while editing.
  const minEventDate = (() => {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  })();

  const handleChange = (field: keyof EventFormValues, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset the thumbnail preview whenever the URL changes.
    if (field === "thumbnail") {
      setPreviewFailed(false);
    }
  };

  // Clears every field, the thumbnail preview, and its error state.
  // Selecting eventType: "" restores the Select's placeholder automatically.
  const resetForm = () => {
    setFormData(EMPTY_FORM_VALUES);
    setPreviewFailed(false);
  };

  // Reset immediately when the form is already empty; otherwise ask first.
  const handleResetRequest = () => {
    if (loading) {
      return;
    }

    if (isFormEmpty(formData)) {
      resetForm();
      return;
    }

    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    resetForm();
    setResetDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.eventType) {
      toast.error("Please select an event type.");
      return;
    }

    // The browser parses "YYYY-MM-DDTHH:mm" as a local-time instant, so
    // comparing against Date.now() treats today's passed times as invalid.
    const selectedDate = new Date(formData.eventDate);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      toast.error("Please pick a date and time that is still in the future.");
      return;
    }

    // Send an explicit UTC ISO string so the Express server's validation
    // (eventDate.getTime() <= Date.now()) is timezone-unambiguous.
    const payload: CreateEventPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      eventType: formData.eventType,
      thumbnail: formData.thumbnail.trim(),
      location: formData.location.trim(),
      eventDate: selectedDate.toISOString(),
    };

    try {
      setLoading(true);

      await createEvent(payload);

      toast.success("Your event has been created successfully!");

      onSuccess?.();

      // Clear the form (values + preview states) before navigating away so
      // returning to /create-event always starts empty.
      resetForm();

      router.push("/events");
      router.refresh();
    } catch (error) {
      if (error instanceof DuplicateEventError) {
        // HTTP 409 duplicate — surface the backend's message, keep every
        // entered value so the user can adjust it, and never redirect.
        toast.error(error.message);
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "h-11 rounded-xl bg-background border-input focus-visible:ring-ring";

  const thumbnail = formData.thumbnail.trim();
  const isHttpsThumbnail = httpsUrlPattern(thumbnail);
  const showPreview = isHttpsThumbnail && !previewFailed;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* ── Section: Event details ─────────────────────────────────────────── */}
      <EventFormSection icon={ClipboardList} title="Event Details">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Community Tree Plantation"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClassName}
            minLength={5}
            maxLength={80}
            required
          />
          <p className="text-xs text-muted-foreground">
            A short, inviting name (5–80 characters).
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="What will volunteers do? Who should join? What should they bring?"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={`${inputClassName} min-h-32 resize-y py-2.5 leading-relaxed`}
            minLength={20}
            maxLength={1000}
            required
          />
          <p className="text-xs text-muted-foreground">
            Tell people what to expect and how they can help (20–1000
            characters).
          </p>
        </div>
      </EventFormSection>

      {/* ── Section: Logistics ─────────────────────────────────────────────── */}
      <EventFormSection icon={Shapes} title="Logistics">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select
              value={formData.eventType}
              onValueChange={(value) => {
                if (value !== null) {
                  handleChange("eventType", value);
                }
              }}
            >
              <SelectTrigger
                id="eventType"
                className="h-11 w-full rounded-xl bg-background"
              >
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>

              <SelectContent>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose the drive that best fits your event.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date &amp; Time</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="datetime-local"
              min={minEventDate}
              value={formData.eventDate}
              onChange={(e) => handleChange("eventDate", e.target.value)}
              className={inputClassName}
              required
            />
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock size={13} className="shrink-0 text-primary" />
              Must be a date and time in the future — your own local time
              (Dhaka).
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Event Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. Dhanmondi Lake, Dhaka"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className={inputClassName}
            minLength={3}
            maxLength={100}
            required
          />
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={13} className="shrink-0 text-primary" />
            Where should volunteers meet? (3–100 characters)
          </p>
        </div>
      </EventFormSection>

      {/* ── Section: Event poster ──────────────────────────────────────────── */}
      <EventFormSection icon={ImagePlus} title="Event Poster">
        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={formData.thumbnail}
            onChange={(e) => handleChange("thumbnail", e.target.value)}
            className={inputClassName}
            required
          />
          <p className="text-xs text-muted-foreground">
            Must be a valid HTTPS image link (starts with{" "}
            <span className="font-medium text-foreground">https://</span>).
          </p>
        </div>

        {thumbnail !== "" && (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
            {showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={thumbnail}
                src={thumbnail}
                alt="Event poster preview"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setPreviewFailed(true)}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2 px-4 text-center">
                <ImagePlus
                  size={28}
                  className="text-muted-foreground"
                  aria-hidden
                />
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  {isHttpsThumbnail
                    ? "Preview unavailable — check that the URL points to an image."
                    : "Only HTTPS links can be previewed and submitted."}
                </p>
              </div>
            )}
          </div>
        )}
      </EventFormSection>

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetRequest}
            disabled={loading}
            className="h-11 flex-1 rounded-xl border-border bg-background text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-primary disabled:translate-y-0 sm:text-base"
          >
            <RotateCcw className="size-4" />
            Reset Form
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 flex-1 rounded-xl bg-brand-gradient text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35 disabled:translate-y-0 disabled:opacity-70 sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating Event...
              </>
            ) : (
              <>
                <CalendarPlus className="size-4" />
                Create Event
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Your account details are attached automatically — volunteers will see
          who organised this event.
        </p>
      </div>

      {/* ── Reset confirmation ────────────────────────────────────────────── */}
      <AlertDialog
        open={resetDialogOpen}
        onOpenChange={(open) => setResetDialogOpen(Boolean(open))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <RotateCcw aria-hidden />
            </AlertDialogMedia>
            <AlertDialogTitle>Reset the form?</AlertDialogTitle>
            <AlertDialogDescription>
              Every entered event detail and the poster preview will be
              cleared. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Keep my changes</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              className="bg-brand-gradient text-white hover:opacity-90"
            >
              Yes, reset form
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
