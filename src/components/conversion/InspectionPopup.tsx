"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { inspections } from "@/data/inspections";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { ArrowRightIcon, CheckIcon, CloseIcon } from "@/components/Icons";

/** sessionStorage key: the pop-up shows once per visit (browser session). */
const SEEN_KEY = "mm-inspection-popup";
const DELAY_MS = 1500;
const HIGHLIGHTS = ["general", "pre-purchase", "scan", "hybrid"];

/**
 * Pop-up card shown shortly after the site opens, promoting the car inspection page.
 * Once per visit; never on /car-inspection itself. Closes with the ✕, Esc or a click outside.
 */
export function InspectionPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname?.startsWith("/car-inspection")) return;
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
    // Only on first load of the visit, not on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    lastFocus.current?.focus?.();
  }

  if (!open) return null;
  const items = HIGHLIGHTS.map((id) => inspections.find((i) => i.id === id)).filter((i) => i !== undefined);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" role="presentation">
      <div className="popup-backdrop absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspection-popup-title"
        className="popup-card relative w-full max-w-md overflow-hidden rounded-[1.75rem] border-2 border-brand/60 bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/.8),0_0_0_1px_rgb(245_179_1/.15)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-brand hover:text-[#111111]"
        >
          <CloseIcon width={20} height={20} />
        </button>

        <div className="relative flex h-36 items-center justify-center bg-[radial-gradient(circle_at_50%_60%,rgb(245_179_1/.28),transparent_70%)] bg-coal">
          <MechanicalArt kind="inspection" className="h-32 w-32" />
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#111111]">
            New · Car inspection
          </span>
        </div>

        <div className="p-6">
          <h2 id="inspection-popup-title" className="font-display text-3xl font-extrabold uppercase leading-tight text-white">
            We offer <span className="brand-text">car inspections</span>
          </h2>
          <p className="mt-2 text-mist">Buying a used car or want peace of mind about your own? Choose the inspection you need:</p>
          <ul className="mt-4 grid gap-2">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-2 text-sm text-soft">
                <CheckIcon width={16} height={16} className="shrink-0 text-brand" /> {i.title}
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-soft">
              <CheckIcon width={16} height={16} className="shrink-0 text-brand" /> …and more
            </li>
          </ul>
          <Link href="/car-inspection" onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full">
            View car inspections <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
