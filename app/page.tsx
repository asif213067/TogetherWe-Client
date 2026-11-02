import Features from "@/components/landing/features";
import Gallery from "@/components/landing/gallery";
import Hero from "@/components/landing/hero";
import Newsletter from "@/components/landing/newsletter";
import RecentEvents from "@/components/landing/recent-events";
import Stats from "@/components/landing/stats";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </main>
  );
}
