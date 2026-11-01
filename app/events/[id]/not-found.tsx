import Link from "next/link";

export default function EventNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-extrabold text-foreground">
        Event not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        This event may have been removed, or the link is incorrect.
      </p>
      <Link
        href="/events"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white shadow-md shadow-primary/25"
      >
        Browse upcoming events
      </Link>
    </main>
  );
}
