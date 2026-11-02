"use client";

import { Button } from "@/components/ui/button";

export default function GalleryError({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-extrabold text-foreground">
        We could not load the gallery
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The server did not respond. Check your connection and try again.
      </p>
      <Button onClick={reset} className="mt-6 h-11 rounded-xl px-6">
        Try again
      </Button>
    </main>
  );
}
