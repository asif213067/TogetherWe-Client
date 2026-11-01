import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section id="newsletter" className="scroll-mt-18 py-20 sm:py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-12 text-white sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-highlight/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-pink-400/40 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                <Mail size={24} />
              </span>
              <h2 className="mt-5 font-heading text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                Stay connected
              </h2>
              <p className="mt-3 max-w-md text-base text-white/90 sm:text-lg">
                Get community updates and new events near you, once a week.
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-black/20 focus-within:ring-4 focus-within:ring-white/40 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
              />
              <button
                type="button"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
