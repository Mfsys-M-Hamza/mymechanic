import Image from "next/image";
import Link from "next/link";
import { client } from "@/config/client";
import { galleryItems, type GalleryItem } from "@/data/content";
import { asset } from "@/lib/basePath";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, InstagramIcon } from "@/components/Icons";

/**
 * Home-page photo mosaic. Each tile is a gallery item (src/data/content.ts) plus its
 * place in the grid. Mobile: 2 columns; desktop: 4 columns, the team photo as the feature.
 */
const TILES: { id: string; className: string; sizes: string }[] = [
  { id: "w1", className: "col-span-2 row-span-2", sizes: "(min-width: 1024px) 50vw, 100vw" },
  { id: "w2", className: "row-span-2", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w3", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w4", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w5", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w6", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w7", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { id: "w8", className: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
];

function Photo({ item, className, sizes, delay }: { item: GalleryItem; className: string; sizes: string; delay: number }) {
  return (
    <figure className={`reveal reveal-zoom group card relative overflow-hidden ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>
      <Image
        src={asset(item.src!)}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={sizes}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
      <figcaption className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-[#fff]">{item.title}</figcaption>
    </figure>
  );
}

export function WorkshopPhotos() {
  const tiles = TILES.map((t) => ({ ...t, item: galleryItems.find((g) => g.id === t.id) })).filter(
    (t): t is typeof t & { item: GalleryItem } => Boolean(t.item?.src && t.item.width && t.item.height),
  );
  if (tiles.length === 0) return null;
  const instagram = client.social.links.find((l) => l.label === "Instagram");
  return (
    <section className="section" aria-labelledby="workshop-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="workshop-title"
            eyebrow="Inside the workshop"
            title={<>Real tools. <span className="brand-text">Real work.</span></>}
            intro={`Since ${client.foundingYear}, our team has looked after cars from across Wah Cantt — here is a look at a normal working day.`}
          />
          <div className="reveal flex shrink-0 flex-wrap gap-3">
            <Link href="/gallery" className="btn btn-outline">View gallery <ArrowRightIcon width={18} height={18} /></Link>
            {instagram && (
              <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <InstagramIcon width={18} height={18} /> {client.social.handle}
              </a>
            )}
          </div>
        </div>
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Photo key={t.id} item={t.item} className={t.className} sizes={t.sizes} delay={(i % 4) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
