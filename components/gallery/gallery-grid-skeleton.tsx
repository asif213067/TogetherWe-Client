const GalleryGridSkeleton = () => {
  return (
    <div role="status" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading gallery</span>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-4/3 animate-pulse rounded-2xl bg-muted"
        />
      ))}
    </div>
  );
};

export default GalleryGridSkeleton;
