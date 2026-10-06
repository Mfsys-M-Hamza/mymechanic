"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { client } from "@/config/client";
import { partCategories, spareParts, type PartCategory } from "@/data/spareParts";
import { asset } from "@/lib/basePath";
import { whatsappHref } from "@/lib/links";
import { PartArt } from "@/components/visuals/PartArt";
import { SearchIcon, WhatsAppIcon } from "@/components/Icons";

type Filter = "All" | PartCategory;
const artFor = Object.fromEntries(partCategories.map((c) => [c.name, c.art])) as Record<PartCategory, (typeof partCategories)[number]["art"]>;

const askMessage = (part: string) =>
  `Hello ${client.name}, do you have ${part.toLowerCase()} available?\n\nVehicle (make/model/year): \nFront/rear or left/right (if relevant): `;

/** Filterable spare-parts grid. No prices: each part links to a pre-filled WhatsApp enquiry. */
export function PartsCatalog() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return spareParts.filter(
      (p) => (filter === "All" || p.category === filter) && (!q || `${p.name} ${p.note} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: spareParts.length };
    spareParts.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div role="group" aria-label="Filter spare parts by category" className="flex flex-wrap gap-2">
          {(["All", ...partCategories.map((c) => c.name)] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                filter === c ? "border-brand bg-brand text-[#111111]" : "border-white/15 text-mist hover:border-brand hover:text-brand"
              }`}
            >
              {c} <span className={filter === c ? "opacity-70" : "text-metal"}>({counts[c] ?? 0})</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full shrink-0 lg:w-72">
          <span className="sr-only">Search spare parts</span>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-metal" width={18} height={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parts, e.g. headlight"
            className="min-h-11 w-full rounded-xl border border-white/15 bg-white/[.03] pl-10 pr-3 text-white placeholder:text-metal focus:border-brand focus:outline-none"
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} parts shown</p>

      {shown.length === 0 ? (
        <div className="mt-8 card p-8 text-center">
          <p className="font-semibold text-white">No parts match “{query}”.</p>
          <p className="mt-2 text-mist">We source many more parts than are listed here — just ask.</p>
          <a href={whatsappHref(askMessage(query || "a part"))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5">
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p) => (
            <li key={p.id} className="card card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgb(245_179_1/.16),transparent_70%)] bg-coal">
                {p.image ? (
                  <Image
                    src={asset(p.image.src)}
                    alt={p.name}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <PartArt kind={artFor[p.category]} className="absolute inset-[12%] h-[76%] w-[76%] transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-[#fff] backdrop-blur-sm">Photo coming soon</span>
                  </>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-brand">{p.category}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-mist">{p.note}</p>
                <a
                  href={whatsappHref(askMessage(p.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm mt-4 self-start"
                  aria-label={`Ask about ${p.name} on WhatsApp`}
                >
                  <WhatsAppIcon width={16} height={16} /> Ask availability
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
