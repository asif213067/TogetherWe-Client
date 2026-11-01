import { CalendarPlus, Compass, ListChecks, Users } from "lucide-react";
import SectionHeading from "../shared/section-heading";


const features = [
  {
    title: "Discover",
    description: "Browse upcoming events by type and location near you.",
    icon: Compass,
    tone: "from-brand-from to-brand-to",
  },
  {
    title: "Organize",
    description: "Publish your own event in under two minutes.",
    icon: CalendarPlus,
    tone: "from-brand-via to-pink-400",
  },
  {
    title: "Connect",
    description: "See who has joined and meet the people beside you.",
    icon: Users,
    tone: "from-brand-from to-brand-via",
  },
  {
    title: "Track",
    description: "Keep every event you joined together in one place.",
    icon: ListChecks,
    tone: "from-brand-to to-highlight",
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-18 py-20 sm:py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <SectionHeading
          title="Why communities choose TogetherWe"
          description="Everything you need to find good work nearby and bring people along."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-xl bg-linear-to-br text-white ${feature.tone}`}
              >
                <feature.icon size={24} />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
