# Client Checklist: Details Still Needed from My Mechanic.pk

The site is safe to publish as-is. Unconfirmed items are either hidden or worded neutrally.
Supplying the details below will make it stronger. Each item shows where it goes (all paths relative to the project root).

**Already on the site (October 2026), from the owner, both Google listings, Instagram (@mymechanic.pk) and Facebook:**
business name, logo pack and animation, established 1998 / 27+ years, phone and WhatsApp 0312-5045678, both branch
addresses and map pins (Shop-07, Laiq Ali Chowk; Shop No. 19, Taj Market, New City Phase-1), opening hours
(Sat–Thu 8 AM–9 PM, Friday closed — from the Branch 1 listing), the 4.6★ Google rating (134 reviews), three full
Google reviews, 12 workshop photos from Instagram, "EFI & Hybrid Specialists", and the social links.

## Must confirm before launch

| # | Item | Why it matters | Where to change it |
|---|---|---|---|
| 1 | **Branch 2 on Google shows "Permanently closed"** (and the name is misspelled "My Mecahinc.pk"). The owner says the branch is open, so fix both in Google Business Profile | Customers searching Google are told the branch is closed | Google Business Profile |
| 2 | **Phone numbers differ**: the Branch 1 Google listing shows +92 300 5147210 and the shop sign shows 0300-5147250. The site uses 0312-5045678 everywhere, as instructed. Update the listing/sign if 0312 is now the main number | Mismatched numbers confuse customers and weaken local SEO | Google Business Profile, shop signage |
| 3 | **Branch 2 hours**, if different from Branch 1 | The site shows one set of hours for both branches | `client.hours` |
| 4 | **Services offered**: all 16 service pages were kept as they are, as requested. Hide any that My Mechanic.pk does not offer | Service pages must be accurate | `src/data/services.ts` (set `enabled: false` to hide) |
| 5 | **Domain name** (for example `mymechanic.pk`) | Canonical URLs, sitemap, social previews | `NEXT_PUBLIC_SITE_URL` env var or `client.siteUrl` |
| 6 | **Hero car image licence**: the car is a Vexels stock illustration supplied as a watermarked preview. Get the licensed download and re-run `npm run hero-car` | Using unlicensed stock on a business site is a copyright risk | `assets/source/hero-car.jpg`, see `docs/ASSET-LICENSES.md` |
| 7 | **Workshop standards and values wording** (About page) | Must describe what the workshop actually does | `about.standards`, `about.values` in `src/data/content.ts` |
| 7a | **Free scanning offer**: confirm the terms (one per vehicle, book ahead, repairs quoted separately) and the end date, 31 December 2026 | The terms are published on `/special-offers` | `client.offer` (set `active: false` to switch the banner and page off) |

## Strongly recommended

| # | Item | Where |
|---|---|---|
| 8 | **Which photos belong to which branch**, so captions can name the branch | `galleryItems` in `src/data/content.ts` |
| 9 | **More full Google reviews** with star ratings (the Branch 1 reviews visible on Google were truncated, so they are not quoted yet) | `reviews` in `src/data/content.ts` |
| 10 | Direct Google "write a review" link (currently opens the Branch 1 Maps listing) | `client.googleReviewUrl` |
| 11 | **Technician profiles**: names, roles and experience. A Google review mentions "Mr. Shoib, the chief mechanic" — confirm before adding him | `about.team` in `src/data/content.ts` |
| 12 | **Business email address**, if one is monitored | `client.email` |
| 13 | **Emergency breakdown assistance**: is it offered? coverage area? hours? | Set `enabled: true` on `emergency-breakdown-assistance` in `services.ts` and complete its copy |
| 14 | Keep the Google rating current (4.6★ / 134 reviews as of October 2026) | `client.googleRating` |
| 15 | **Spare-part photos**: the Spare Parts page (37 parts in 8 categories) shows placeholder art until real photos arrive. Also confirm which parts are actually stocked or sourced | Photos in `public/parts/`, then `image` on each part in `src/data/spareParts.ts` |

## Optional

- Google Analytics 4 ID (a consent banner is added automatically): `client.analytics.ga4Id`
- Google Search Console verification token: `client.seo.googleSiteVerification`
- Threads (@mymechanic.pk), TikTok or YouTube, if wanted in the footer: `client.social.links`

## Notes on content decisions

- The previous client's promotion was removed; a free scanning offer for My Mechanic.pk was added back at the owner's request (October 2026) — banner plus `/special-offers` page.
- No prices, awards, customer counts or "best/No. 1/guaranteed" claims are published. "Since 1998" and "27+ years" come from the owner.
- The previous template client's photos, videos, reviews and flyer were removed from the site and archived in
  `assets/previous-client/`, which is not published or committed. Delete that folder once it's no longer needed.
- The legal pages (Privacy, Terms, Cookies, Disclaimer) are sensible templates written for this site's actual behaviour.
  **Have them reviewed by a legal adviser before launch.**
