import { client } from "@/config/client";

/**
 * Old localStorage key: the banner used to stay closed for good once dismissed.
 * It now reappears on every page load, so this key is only cleared (see OfferBanner).
 */
export const LEGACY_OFFER_BANNER_KEY = "mm-offer-banner";
const endsAtMs = new Date(client.offer.endsAt).getTime();

/** Offer is live if switched on and the end date has not passed. */
export function isOfferLive(now: number = Date.now()) {
  return client.offer.active && now < endsAtMs;
}

/**
 * Inline <head> script: hides the banner before first paint once the offer has expired
 * (pages are pre-built, so the HTML still contains it). Paired with the CSS rule
 * html[data-offer-banner="closed"] .offer-banner { display: none } in globals.css.
 */
export const offerBannerBootScript = `try{if(Date.now()>${endsAtMs})document.documentElement.setAttribute('data-offer-banner','closed')}catch(e){}`;
