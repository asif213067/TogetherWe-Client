const stats = [
  { value: "1,200+", label: "Volunteers" },
  { value: "340", label: "Events hosted" },
  { value: "25", label: "Neighbourhoods" },
  { value: "9,800", label: "Hours given" },
];

const Stats = () => {
  return (
    <section className="relative z-10 -mt-10 px-4 sm:-mt-12 sm:px-6">
      <div className="mx-auto grid max-w-300 grid-cols-2 gap-y-8 rounded-2xl border border-border bg-card py-7 shadow-xl shadow-primary/10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center lg:border-l lg:border-border lg:first:border-l-0"
          >
            <p className="font-heading text-3xl font-extrabold text-brand-gradient sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
