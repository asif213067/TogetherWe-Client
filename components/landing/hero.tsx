import Link from "next/link";
import { ArrowRight, CalendarPlus, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative scroll-mt-18 overflow-hidden bg-brand-gradient text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-40 -right-32 size-130 rounded-full bg-highlight/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-120 rounded-full bg-pink-400/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-300 flex-col items-center px-4 pt-16 pb-24 text-center sm:px-6 sm:pt-20 sm:pb-28 lg:pt-16 lg:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium ring-1 ring-white/25 backdrop-blur">
          <Sparkles size={16} className="text-highlight" />
          Community starts with you
        </span>

        <h1 className="mt-6 max-w-4xl font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-7xl">
          Make an Impact.
          <span className="block text-highlight">Together.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          Small acts, big impact! Discover local events, help those in need, and
          bring your community together to create meaningful change.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            href="/events"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-brand-from shadow-lg shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            Explore Upcoming Events
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/create-event"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/70 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15 sm:w-auto"
          >
            <CalendarPlus size={18} />
            Create an Event
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
