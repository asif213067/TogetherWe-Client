"use client";

import { useState } from "react";
import Image from "next/image";

type EventThumbnailProps = {
  src: string;
  alt: string;
  eager?: boolean;
};

const EventThumbnail = ({ src, alt, eager = false }: EventThumbnailProps) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return <div className="absolute inset-0 bg-brand-gradient" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      loading={eager ? "eager" : "lazy"}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
};

export default EventThumbnail;
