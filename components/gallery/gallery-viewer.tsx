"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import EventThumbnail from "@/components/events/event-thumbnail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryItem } from "@/types/gallery";

type GalleryViewerProps = {
  items: GalleryItem[];
};

const GalleryViewer = ({ items }: GalleryViewerProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + direction + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, step]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo: ${item.title}`}
            className="group relative aspect-4/3 cursor-zoom-in overflow-hidden rounded-2xl bg-brand-gradient text-left shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
          >
            <EventThumbnail
              src={item.image}
              alt={`${item.title} in ${item.location}`}
              eager={index < 3}
            />

            <span className="absolute inset-x-0 bottom-0 block bg-linear-to-t from-black/75 via-black/30 to-transparent p-5 pt-12 text-white">
              <span className="block font-heading text-base font-bold">
                {item.title}
              </span>
              <span className="block text-sm text-white/80">
                {item.location}
              </span>
            </span>
          </button>
        ))}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[calc(100dvh-4rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl lg:w-160 lg:max-w-none"
        >
          {activeItem ? (
            <>
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-4 sm:px-5">
                <div className="min-w-0">
                  <DialogTitle className="font-heading text-lg leading-snug font-bold">
                    {activeItem.title}
                  </DialogTitle>
                  <DialogDescription>{activeItem.location}</DialogDescription>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close photo viewer"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative aspect-16/10 w-full shrink-0 bg-black lg:aspect-auto lg:h-[min(50vh,24rem)]">
                <Image
                  key={activeItem._id}
                  src={activeItem.image}
                  alt={`${activeItem.title} in ${activeItem.location}`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-contain"
                />

                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryViewer;
