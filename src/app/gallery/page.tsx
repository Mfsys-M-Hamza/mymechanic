import type { Metadata } from "next";
import { galleryItems } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Workshop Gallery — Diagnostics, Repairs & Maintenance",
  description:
    "Illustrations of the diagnostics, repairs and maintenance at My Mechanic.pk, car workshop in Wah Cantt. Workshop photos from both branches coming soon.",
  path: "/gallery",
});

export default function GalleryPage() {
  const onlyIllustrations = galleryItems.every((g) => g.illustration);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        eyebrow="Gallery"
        title={<>Workshop <span className="brand-text">gallery</span></>}
        intro={<p>Illustrations of the diagnostics, repairs and maintenance we do. Photos from our Wah Cantt branches are coming soon.</p>}
        visual="brake"
      />
      <section className="section pt-12" aria-label="Gallery">
        <div className="container-x">
          {onlyIllustrations && (
            <p className="mb-8 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm text-mist">
              <strong className="text-white">Please note:</strong> the images below are illustrations of the services we offer, not photographs of our
              premises or customer vehicles. Authentic workshop photographs will be added soon.
            </p>
          )}
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
