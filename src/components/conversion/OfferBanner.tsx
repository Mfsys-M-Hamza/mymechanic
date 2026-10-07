"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { client } from "@/config/client";
import { OFFER_BANNER_KEY, isOfferLive } from "@/lib/offer";
import { CloseIcon } from "@/components/Icons";

/**
 * Dismissible offer bar above the header. The head boot script hides it before first paint
 * for visitors who closed it (or after the offer ends); this component re-checks on mount
 * because React's dev-mode remount clears the <html> attribute the script sets.
 */
export function OfferBanner() {
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    let closed = false;
    try { closed = localStorage.getItem(OFFER_BANNER_KEY) === "closed"; } catch {}
    if (closed || !isOfferLive()) setHidden(true);
  }, []);

  if (!client.offer.active || hidden) return null;

  const close = () => {
    try { localStorage.setItem(OFFER_BANNER_KEY, "closed"); } catch {}
    document.documentElement.setAttribute("data-offer-banner", "closed");
    setHidden(true);
  };

  return (
    <div className="offer-banner relative z-[60] bg-brand text-[#111111]" role="region" aria-label="Special offer">
      <div className="container-x flex min-h-11 items-center justify-center gap-3 py-2 pr-10 text-center text-sm sm:text-[.95rem]">
        <p>
          <strong className="font-extrabold">FREE</strong> {client.offer.banner} until {client.offer.endsLabel}.{" "}
          <Link href="/special-offers" className="font-semibold underline underline-offset-2 hover:no-underline">
            See offer details
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Close offer banner"
        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-black/10 sm:right-4"
      >
        <CloseIcon width={18} height={18} />
      </button>
    </div>
  );
}
