import { client } from "@/config/client";

/** localStorage key remembering that the visitor closed the offer banner. */
export const OFFER_BANNER_KEY = "mm-offer-banner";
const endsAtMs = new Date(client.offer.endsAt).getTime();

/** Offer is live if switched on and the end date has not passed. */
export function isOfferLive(now: number = Date.now()) {
  return client.offer.active && now < endsAtMs;
}

/**
 * Inline <head> script: hides the banner before first paint if the visitor closed it
 * or the offer has expired (no layout jump). Paired with the CSS rule
 * html[data-offer-banner="closed"] .offer-banner { display: none } in globals.css.
 */
export const offerBannerBootScript = `try{var d=document.documentElement;if(localStorage.getItem('${OFFER_BANNER_KEY}')==='closed'||Date.now()>${endsAtMs})d.setAttribute('data-offer-banner','closed')}catch(e){}`;
