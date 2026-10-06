"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { VisualKey } from "@/data/services";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { Animated } from "@/components/visuals/Animated";
import { SearchIcon } from "@/components/Icons";

export type PostCard = {
  slug: string; title: string; description: string; category: string; published: string; minutes: number; visual: VisualKey; imageAlt: string; text: string;
};

export function BlogBrowser({ posts, categories }: { posts: PostCard[]; categories: readonly string[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((p) => (cat === "All" || p.category === cat) && terms.every((t) => p.text.includes(t)));
  }, [posts, cat, q]);
  const used = categories.filter((c) => posts.some((p) => p.category === c));

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-center">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          {["All", ...used].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                cat === c ? "border-brand bg-brand text-[#111111]" : "border-white/15 text-mist hover:border-brand hover:text-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="field relative">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-metal" />
          <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" style={{ paddingLeft: 44 }} />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{results.length} articles found</p>

      {results.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-white/10 p-8 text-center text-mist">No articles match your search. Try another term or category.</p>
      ) : (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                <Animated className="relative aspect-[16/9] bg-[radial-gradient(circle_at_50%_60%,rgb(245_179_1/.16),transparent_70%)]">
                  <MechanicalArt kind={p.visual} label={p.imageAlt} className="absolute inset-0 m-auto h-[70%] w-auto" />
                </Animated>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{p.category}</p>
                  <h2 className="mt-2 text-2xl font-bold uppercase text-white">
                    <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">{p.title}</Link>
                  </h2>
                  <p className="mt-3 flex-1 text-mist">{p.description}</p>
                  <p className="mt-4 text-sm text-metal">
                    <time dateTime={p.published}>{new Date(p.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> · {p.minutes} min read
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
