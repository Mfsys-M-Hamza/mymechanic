# Asset Licensing & Attribution

Every visual asset in this project is supplied by the client or created specifically for this site, **except the
hero car illustration, which is third-party stock from Vexels** (see the first row). No manufacturer logos are used.

> **Action needed before launch:** the hero car image was supplied as a small watermarked preview found online
> (`designed by vexels`). Download the illustration from vexels.com under a licence that covers commercial
> websites (Vexels' free licence requires attribution; paid plans remove that requirement), replace
> `assets/source/hero-car.jpg` with the licensed file, adjust `CROP` in `scripts/build-hero-car.mjs` if the
> framing differs, and run `npm run hero-car`. Keep or remove the on-page credit to match the licence.

| Asset | Location | Source | Licence / status |
|---|---|---|---|
| Hero car illustration (side view, yellow coupé SUV) | `assets/source/hero-car.jpg` → `public/media/hero-car.png` (cut-out) and `public/media/hero-car-holo.png` (hologram version), via `scripts/build-hero-car.mjs` | Vexels (vexels.com), supplied by the client as a watermarked preview | **Licence not yet confirmed.** Credited on the page under the hero ("Car illustration: Vexels"). Replace with the licensed download before launch (see note above). |
| Workshop photos (12) | `assets/media/*.jpg` → `public/media/*.webp` via `npm run media` | The client's own Instagram posts (@mymechanic.pk), downloaded October 2026 | Client-owned. Used on the client's own website. |
| My Mechanic.pk logo pack (transparent, dark, white, yellow; PNG and SVG) | `assets/source/logo-pack/`, `assets/source/logo-original.png` (the transparent-for-dark-bg version) | Supplied by the client | Client-owned. Used with permission. |
| Animated logo film | `assets/media/logo-animation.mp4` → `public/media/logo-animation.mp4` + poster | Supplied by the client; poster frame grabbed by `scripts/build-media.mjs` | Client-owned. Used with permission. |
| Transparent logo, favicons, app icons | `public/brand/*`, `src/app/icon.png`, `src/app/apple-icon.png` | Generated from the client logo by `scripts/build-assets.mjs` (trimmed only; not recoloured or distorted) | Client-owned (derivative of the supplied logo) |
| Social sharing image | `public/brand/og-image.jpg` | Generated from the client logo and site text by `scripts/build-assets.mjs` | Client-owned |
| Animated mechanical illustrations (engine, scanner, brake disc, injector, AC, battery and others) | `src/components/visuals/Mechanical.tsx` | Original SVG artwork written for this project | Owned by the project; no third-party rights |
| 3D hero scene (wheel, brake, gears, pistons) | `src/components/hero/heroScene.ts` | Built in code from Three.js primitives; no downloaded models | Owned by the project |
| UI icons (phone, WhatsApp glyph, calendar and others) | `src/components/Icons.tsx` | Hand-written simple SVG paths | Owned by the project. The WhatsApp, Facebook, Instagram, TikTok and YouTube glyphs are used only to link to those services, which their brand guidelines allow. |
| Fonts: Barlow Condensed, Inter | Loaded through `next/font`, self-hosted at build time | Google Fonts | SIL Open Font License 1.1 |

## Software libraries (main)

| Library | Licence |
|---|---|
| Next.js, React, React DOM | MIT |
| Three.js | MIT |
| Tailwind CSS | MIT |
| sharp (build-time image processing) | Apache-2.0 |
| Puppeteer-core, axe-core (QA only, dev dependencies) | Apache-2.0 / MPL-2.0 |

## Rules for future media

- Add authentic workshop photos only if the business owns them or holds written permission.
- Label any illustration or stock image clearly; never present it as the actual premises or customer work (the gallery already does this).
- Do not use vehicle manufacturer logos without permission.
- If an asset requires attribution, add a row to the table above **and** a visible credit (for example in the gallery caption or footer).
