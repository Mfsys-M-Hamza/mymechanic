"use client";

import { ArrowRightIcon } from "@/components/Icons";

/** Card button: pre-selects this inspection in the booking form (InspectionForm) and scrolls to it. */
export function InspectionPickButton({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`?type=${id}#book`}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("inspection:pick", { detail: id }));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("book")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        window.setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), reduce ? 0 : 600);
      }}
      className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand hover:text-brand-bright"
      aria-label={`Book ${label}`}
    >
      Book this inspection <ArrowRightIcon width={16} height={16} />
    </a>
  );
}
