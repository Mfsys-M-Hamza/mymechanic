"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "@/config/client";
import { LEGACY_OFFER_BANNER_KEY, isOfferLive } from "@/lib/offer";
import { CloseIcon } from "@/components/Icons";

/**
 * Offer bar above the header. Closing it hides it only until the next page load (it is
 * not remembered), so every new visit or refresh shows the offer again. It switches off
 * automatically after client.offer.endsAt.
 */
export function OfferBanner() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Clear the old "closed for good" flag so visitors who dismissed it earlier see it again.
    try { localStorage.removeItem(LEGACY_OFFER_BANNER_KEY); } catch {}
    if (!isOfferLive()) setHidden(true);
  }, []);

  if (!client.offer.active || hidden) return null;

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
        onClick={() => setHidden(true)}
        aria-label="Close offer banner"
        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-black/10 sm:right-4"
      >
        <CloseIcon width={18} height={18} />
      </button>
    </div>
  );
}
