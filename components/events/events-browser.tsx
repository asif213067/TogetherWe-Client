"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import EventCard from "@/components/events/event-card";
import EventsFilterBar from "@/components/events/events-filter-bar";
import type { CommunityEvent } from "@/types/event";

const ALL_CATEGORY = "All";

const PREFERRED_CATEGORIES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

type EventsBrowserProps = {
  events: CommunityEvent[];
};

const EventsBrowser = ({ events }: EventsBrowserProps) => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const known = PREFERRED_CATEGORIES.filter((category) =>
      events.some(
        (event) => event.eventType.toLowerCase() === category.toLowerCase()
      )
    );
    const extras = Array.from(
      new Set(events.map((event) => event.eventType))
    ).filter((type) => !PREFERRED_CATEGORIES.includes(type));

    return [ALL_CATEGORY, ...known, ...extras];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY ||
        event.eventType.toLowerCase() === activeCategory.toLowerCase();
      const matchesQuery =
        query === "" ||
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [events, activeCategory, searchQuery]);

  const hasActiveFilters =
    activeCategory !== ALL_CATEGORY || searchQuery.trim() !== "";

  const clearFilters = () => {
    setActiveCategory(ALL_CATEGORY);
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <EventsFilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={event._id} event={event} eager={index < 3} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
            <SearchX size={28} />
          </span>
          <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
            No events match your filters
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Try a different category or search term to find community drives
            near you.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border bg-transparent px-6 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsBrowser;
