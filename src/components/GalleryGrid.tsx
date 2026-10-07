"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/data/content";
import { asset } from "@/lib/basePath";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { Animated } from "@/components/visuals/Animated";
import { ChevronIcon, CloseIcon, PlayIcon } from "@/components/Icons";

const CATEGORIES = ["All", "Workshop", "Diagnostics", "Repairs", "Tools & equipment", "Before & After"] as const;

function Media({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  if (large && item.video) {
    return (
      <video
        key={item.video}
        src={asset(item.video)}
        poster={item.src && asset(item.src)}
        aria-label={item.alt}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-contain"
      />
    );
  }
  if (item.src && item.width && item.height) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={asset(item.src)}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading={large ? "eager" : "lazy"}
          sizes={large ? "90vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={`h-full w-full ${large ? "object-contain" : "object-cover"}`}
        />
        {item.video && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-brand ring-2 ring-brand/70 backdrop-blur-sm">
              <PlayIcon width={24} height={24} />
            </span>
          </span>
        )}
      </div>
    );
  }
  return (
    <Animated className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_55%,rgb(245_179_1/.16),transparent_70%)]">
      <MechanicalArt kind={item.visual} label={item.alt} className={large ? "h-[70%] w-[70%]" : "h-[62%] w-[62%]"} />
    </Animated>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const shown = filter === "All" ? items : items.filter((i) => i.category === filter);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const f = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button,video") ?? []);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
        {CATEGORIES.filter((c) => c === "All" || items.some((i) => i.category === c)).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
              filter === c ? "border-brand bg-brand text-[#111111]" : "border-white/15 text-mist hover:border-brand hover:text-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} items shown</p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i); }}
              className="card card-hover group block w-full overflow-hidden text-left"
              aria-label={`${item.video ? "Play video" : "View larger"}: ${item.title}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-coal">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105"><Media item={item} /></div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-metal">{item.category}{item.video ? " · Video" : ""}{item.illustration ? " · Illustration" : ""}</p>
                </div>
                <ChevronIcon className="text-brand" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Portalled to <body>: .section uses content-visibility (paint containment), which would
          otherwise become the containing block for this fixed overlay. */}
      {current && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[70] flex flex-col bg-black/92 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between gap-4 p-4">
            <p className="text-sm text-mist">{(open ?? 0) + 1} / {shown.length}</p>
            <button type="button" data-autofocus onClick={close} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white hover:border-brand" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && close()}>
            <button type="button" onClick={() => step(-1)} className="absolute left-3 z-10 inline-flex h-12 w-12 rotate-180 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand hover:text-black" aria-label="Previous image">
              <ChevronIcon />
            </button>
            <figure className="flex h-full max-h-[78vh] w-full max-w-4xl flex-col">
              <div className="min-h-0 flex-1 overflow-hidden rounded-2xl bg-coal"><Media item={current} large /></div>
              <figcaption className="mt-3 text-center text-mist">
                <span className="font-semibold text-white">{current.title}</span> — {current.alt}
                {current.illustration && <span className="block text-xs text-metal">Illustration. Authentic workshop photographs will replace these images.</span>}
              </figcaption>
            </figure>
            <button type="button" onClick={() => step(1)} className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand hover:text-black" aria-label="Next image">
              <ChevronIcon />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
