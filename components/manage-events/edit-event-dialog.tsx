"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import FormField from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { EVENT_TYPES } from "@/lib/event-types";
import { ApiError, updateEvent } from "@/lib/manage-events-api";
import {
  editEventSchema,
  type EditEventValues,
} from "@/lib/validations/edit-event";
import type { ManagedEvent } from "@/types/event";

type EditEventDialogProps = {
  event: ManagedEvent;
  onClose: () => void;
  onSaved: () => Promise<void>;
};

const toDateTimeLocal = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const controlClass =
  "w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 aria-invalid:border-destructive";

const EditEventDialog = ({ event, onClose, onSaved }: EditEventDialogProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditEventValues>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: toDateTimeLocal(event.eventDate),
    },
  });

  const onSubmit = async (values: EditEventValues) => {
    try {
      await updateEvent(event._id, {
        ...values,
        eventDate: new Date(values.eventDate).toISOString(),
      });

      toast.success("Event updated successfully.");
      await onSaved();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);

        Object.entries(error.fieldErrors ?? {}).forEach(([field, message]) => {
          if (field in values) {
            setError(field as keyof EditEventValues, { message });
          }
        });

        return;
      }

      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isSubmitting) onClose();
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <div>
          <DialogTitle className="font-heading text-xl font-bold">
            Edit event
          </DialogTitle>
          <DialogDescription>
            Update the details of your event. Changes appear everywhere on the
            site right away.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          <FormField
            label="Title"
            type="text"
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              aria-invalid={errors.description ? true : undefined}
              className={`${controlClass} resize-y py-3`}
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="eventType"
              className="text-sm font-medium text-foreground"
            >
              Event type
            </label>
            <select
              id="eventType"
              aria-invalid={errors.eventType ? true : undefined}
              className={`${controlClass} h-12`}
              {...register("eventType")}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.eventType ? (
              <p className="text-sm text-destructive">
                {errors.eventType.message}
              </p>
            ) : null}
          </div>

          <FormField
            label="Thumbnail link"
            type="url"
            error={errors.thumbnail?.message}
            {...register("thumbnail")}
          />

          <FormField
            label="Location"
            type="text"
            error={errors.location?.message}
            {...register("location")}
          />

          <FormField
            label="Date and time"
            type="datetime-local"
            error={errors.eventDate?.message}
            {...register("eventDate")}
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-11 rounded-xl px-6"
            >
              Cancel
            </Button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/35 disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
