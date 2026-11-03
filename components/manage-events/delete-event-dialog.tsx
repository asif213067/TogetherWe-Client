"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ApiError, deleteEvent } from "@/lib/manage-events-api";
import type { ManagedEvent } from "@/types/event";

type DeleteEventDialogProps = {
  event: ManagedEvent;
  onClose: () => void;
  onDeleted: (id: string) => void;
};

const DeleteEventDialog = ({
  event,
  onClose,
  onDeleted,
}: DeleteEventDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteEvent(event._id);
      toast.success("Event deleted successfully.");
      onDeleted(event._id);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "We could not delete the event. Please try again.",
      );
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        if (!open && !isDeleting) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this event?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete{" "}
            <span className="font-semibold text-foreground">{event.title}</span>
            . It will disappear from every page of the site, and this cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting
              </>
            ) : (
              "Delete event"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventDialog;
