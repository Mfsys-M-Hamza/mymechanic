"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/data/content";
import { ChevronIcon, StarIcon } from "@/components/Icons";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-08" → "August 2026"; "2026-08-14" → "14 August 2026". Parsed manually to avoid timezone shifts. */
function formatReviewDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return `${day ? `${day} ` : ""}${MONTHS[(m || 1) - 1]} ${y}`;
}

/**
 * Horizontal review slider: swipe on touch screens, arrow buttons (and arrow keys) on desktop.
 * Uses native scroll-snap, so it works without JavaScript and never auto-advances.
 */
export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el?.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Customer reviews — scroll sideways or use the arrow buttons"
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } }}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:thin] focus-visible:outline-offset-4"
      >
        {reviews.map((r) => (
          <li key={`${r.name}-${r.date}`} className="card flex w-[85%] shrink-0 snap-start flex-col p-6 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
            {r.rating && (
              <div className="flex gap-0.5 text-brand" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} width={18} height={18} className={n <= r.rating! ? "" : "opacity-25"} />)}
              </div>
            )}
            {r.title && <p className="mt-3 font-display text-xl font-bold uppercase text-white">{r.title}</p>}
            <blockquote className={`${r.rating || r.title ? "mt-3" : ""} flex-1 text-soft`}>“{r.text}”</blockquote>
            <footer className="mt-5 text-sm text-metal">
              <span className="font-semibold text-white">{r.name}</span>
              {r.reviewerNote ? ` · ${r.reviewerNote}` : ""}
              {r.vehicle ? ` · ${r.vehicle}` : ""}
              <span className="block">
                {r.source} review · <time dateTime={r.date}>{formatReviewDate(r.date)}</time>
              </span>
            </footer>
          </li>
        ))}
      </ul>
      {reviews.length > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous reviews"
            className="inline-flex h-11 w-11 rotate-180 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white">
            <ChevronIcon />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Next reviews"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white">
            <ChevronIcon />
          </button>
        </div>
      )}
    </div>
  );
}
