# Client Checklist: Details Still Needed from My Mechanic.pk

The site is safe to publish as-is. Unconfirmed items are either hidden or worded neutrally.
Supplying the details below will make it stronger. Each item shows where it goes (all paths relative to the project root).

**Already set up from the Google listing, Instagram (@mymechanic.pk) and Facebook:** business name, logo pack and animation,
phone 0312-5045678, both branch locations, the Google Maps pin for Branch 2, and the social links.

## Must confirm before launch

| # | Item | Why it matters | Where to change it |
|---|---|---|---|
| 1 | **WhatsApp number**: the site assumes 0312-5045678 is also the WhatsApp number | Every form and WhatsApp button sends to it | `client.whatsapp` |
| 2 | **Opening hours** for each branch, and whether they differ | Hidden until confirmed; the site shows "please call before visiting" | `client.hours` (set `confirmed: true`) |
| 3 | **Branch 1 details**: full street address at Laiq Ali Chowk and its Google Maps link, if it has one | Branch 1 directions currently search by name and area | `client.branches[0]` (`street`, `geo`, `mapsUrl`) |
| 4 | **Services offered**: all 16 service pages were kept as they are, as requested. Hide any that My Mechanic.pk does not offer | Service pages must be accurate | `src/data/services.ts` (set `enabled: false` to hide) |
| 5 | **Domain name** (for example `mymechanic.pk`) | Canonical URLs, sitemap, social previews | `NEXT_PUBLIC_SITE_URL` env var or `client.siteUrl` |
| 6 | **Nearby areas served**: currently Laiq Ali Chowk, New City, GT Road, Wah Model Town, Hasan Abdal, Sangjani | Local SEO accuracy | `client.serviceAreas.nearby` |
| 7 | **Workshop standards and values wording** (About page) | Must describe what the workshop actually does | `about.standards`, `about.values` in `src/data/content.ts` |
| 8 | **Hero car image licence**: the car is a Vexels stock illustration supplied as a watermarked preview. Get the licensed download and re-run `npm run hero-car` | Using unlicensed stock on a business site is a copyright risk | `assets/source/hero-car.jpg`, see `docs/ASSET-LICENSES.md` |

## Strongly recommended

| # | Item | Where |
|---|---|---|
| 8 | **Workshop photos and videos** of both branches (no photos are published yet; the gallery shows illustrations) | Originals in `assets/media/`, run `npm run media`, then `galleryItems` in `src/data/content.ts` |
| 9 | **Genuine Google reviews**, copied word for word, with their star ratings | `reviews` in `src/data/content.ts` |
| 10 | Direct Google "write a review" link (currently opens the Branch 2 Maps listing) | `client.googleReviewUrl` |
| 12 | **Year established** | `client.foundingYear` |
| 13 | **Business email address**, if one is monitored | `client.email` |
| 14 | **Technician profiles**: names, roles, genuine qualifications and experience | `about.team` in `src/data/content.ts` |
| 15 | **Emergency breakdown assistance**: is it offered? coverage area? hours? | Set `enabled: true` on `emergency-breakdown-assistance` in `services.ts` and complete its copy |
| 16 | The Google listing name is spelled **"My Mecahinc.pk (Branch-2)"**. Correct it in Google Business Profile | Google Business Profile |

## Optional

- Google Analytics 4 ID (a consent banner is added automatically): `client.analytics.ga4Id`
- Google Search Console verification token: `client.seo.googleSiteVerification`
- TikTok or YouTube channels, if any: `client.social.links`

## Notes on content decisions

- The previous client's promotion (free scanning offer, banner, popup and the `/special-offers` page) was removed completely.
- No prices, awards, years of experience, customer counts or "best/No. 1/guaranteed" claims are published.
- The previous template client's photos, videos, reviews and flyer were removed from the site and archived in
  `assets/previous-client/`, which is not published. Delete that folder once it's no longer needed.
- The legal pages (Privacy, Terms, Cookies, Disclaimer) are sensible templates written for this site's actual behaviour.
  **Have them reviewed by a legal adviser before launch.**
