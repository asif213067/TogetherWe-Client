// import { HeartHandshake } from "lucide-react";

// type JoinedHeroProps = {
//   count: number | null;
// };

// const JoinedHero = ({ count }: JoinedHeroProps) => {
//   return (
//     <section className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-10 text-white sm:px-10 sm:py-12">
//       <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-transparent" />
//       <div className="pointer-events-none absolute -top-32 -right-20 size-80 rounded-full bg-highlight/45 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-36 -left-16 size-80 rounded-full bg-pink-400/35 blur-3xl" />

//       <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
//         <div className="max-w-xl">
//           <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
//             Your Community Journey
//           </h2>
//           <p className="mt-3 text-base text-white/90 sm:text-lg">
//             Every event you join is a neighbour helped and a community made
//             stronger. Keep showing up.
//           </p>
//         </div>

//         <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-white/15 px-5 py-4 ring-1 ring-white/25 backdrop-blur">
//           <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
//             <HeartHandshake size={26} />
//           </span>

//           {count === null ? (
//             <div className="h-6 w-44 animate-pulse rounded-md bg-white/30" />
//           ) : count === 0 ? (
//             <p className="text-base font-bold sm:text-lg">
//               You haven&apos;t joined any events yet.
//             </p>
//           ) : (
//             <p className="text-base font-bold sm:text-lg">
//               You have joined <span className="text-highlight">{count}</span>{" "}
//               {count === 1 ? "event" : "events"}!
//             </p>
//           )}
//         </div>
//       </div>
//     </section>

//   );
// };

// export default JoinedHero;

// Secound version of the code with the same functionality but with a different approach

type JoinedHeroProps = {
  count: number | null;
};

const JoinedHero = ({ count }: JoinedHeroProps) => {
  if (count === null) return null;

  return (
    <p className="text-base font-medium text-foreground">
      {count === 0
        ? "You haven't joined any events yet."
        : `You have joined ${count} ${count === 1 ? "event" : "events"}!`}
    </p>
  );
};

export default JoinedHero;