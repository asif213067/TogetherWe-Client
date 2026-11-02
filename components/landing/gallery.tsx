import Image from "next/image";

import SectionHeading from "@/components/shared/section-heading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryItems = [
  {
    src: "/images/image1.jpg",
    title: "Winter clothes distribution",
    location: "Mirpur 10, Dhaka",
  },
  {
    src: "/images/image2.jpg",
    title: "Blanket distribution",
    location: "Mohammadpur, Dhaka",
  },
  {
    src: "/images/image3.jpg",
    title: "Neighbourhood tree planting",
    location: "Dhanmondi, Dhaka",
  },
  {
    src: "/images/image4.jpg",
    title: "Lakeside cleanup morning",
    location: "Gulshan, Dhaka",
  },
  {
    src: "/images/image5.jpg",
    title: "Free health camp",
    location: "Uttara, Dhaka",
  },
  {
    src: "/images/image6.jpg",
    title: "Books for street children",
    location: "Farmgate, Dhaka",
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="scroll-mt-18 bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-300 px-4 sm:px-6">
        <SectionHeading
          title="Our community in action"
          description="Moments from events organised by people like you."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure
              key={item.src}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-brand-gradient shadow-sm"
            >
              <Image
                src={item.src}
                alt={`${item.title} in ${item.location}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent p-5 pt-12 text-white">
                <p className="font-heading text-base font-bold">{item.title}</p>
                <p className="text-sm text-white/80">{item.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:justify-end">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            View full gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
