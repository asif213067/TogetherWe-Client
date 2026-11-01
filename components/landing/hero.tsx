import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative scroll-mt-18 overflow-hidden bg-brand-gradient text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-40 -right-32 size-130 rounded-full bg-highlight/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-120 rounded-full bg-pink-400/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-300 items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:pt-14 lg:pb-32">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium ring-1 ring-white/25 backdrop-blur">
            <span className="size-2 rounded-full bg-highlight" />
            Community starts with you
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Make an Impact. <span className="text-highlight">Together.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Find a winter clothes drive in Mirpur, join a tree planting in
            Dhanmondi, or organize your own event and invite your neighbours.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/#upcoming-events"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-brand-from shadow-lg shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore events
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/70 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15"
            >
              Create event
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-highlight via-pink-400 to-brand-via shadow-2xl shadow-black/30 ring-1 ring-white/30">
            <div className="absolute -top-10 -left-10 size-48 rounded-full bg-white/25" />
            <div className="absolute right-6 -bottom-16 size-64 rounded-full bg-brand-from/40" />
            <div className="absolute top-1/3 left-1/2 size-24 rounded-full bg-white/30" />
          </div>

          <div className="absolute -top-4 right-3 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-xl sm:-right-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <CalendarDays size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Winter Clothes Drive</p>
              <p className="text-xs text-muted-foreground">
                Sat, 6 Dec · Mirpur 10
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-xl sm:-left-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <Users size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">48 neighbours joined</p>
              <p className="text-xs text-muted-foreground">
                Blanket distribution, Mohammadpur
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
