"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type EventsFilterBarProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

const EventsFilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange,
}: EventsFilterBarProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
      <div
        role="group"
        aria-label="Filter events by category"
        className="flex flex-wrap gap-2.5"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold transition-all duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive
                  ? "border-transparent bg-brand-gradient text-white shadow-md shadow-primary/30"
                  : "border-border text-foreground hover:bg-accent"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="relative shrink-0 md:w-72 lg:w-80">
        <Search
          size={18}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
        />
        <label htmlFor="event-search" className="sr-only">
          Search events or areas
        </label>
        <input
          id="event-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search events or areas"
          className="h-11 w-full rounded-full border border-border bg-transparent pr-4 pl-11 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
    </div>
  );
};

export default EventsFilterBar;
