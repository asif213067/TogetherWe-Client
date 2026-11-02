import GalleryViewer from "@/components/gallery/gallery-viewer";
import { getGalleryItems } from "@/lib/api";

const GalleryGrid = async () => {
  const items = await getGalleryItems();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">
          No photos yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Photos from community events will appear here soon.
        </p>
      </div>
    );
  }

  return <GalleryViewer items={items} />;
};

export default GalleryGrid;
