# Asset Licensing & Attribution

Every visual asset in this project is supplied by the client or created specifically for this site, **except the
car pictures (hero car and inspection charges cards), which the client supplied from the web with no stated source**.

> **Action needed before launch:** confirm the client has the right to use the hero car photo and the inspection
> car pictures (rows below), or replace them with licensed or owned photos and re-run `npm run hero-car` /
> `node scripts/build-inspection-cars.mjs`.

| Asset | Location | Source | Licence / status |
|---|---|---|---|
| Hero car photo (side view, yellow BMW saloon) | `assets/source/hero-car-photo.jpg` → `hero-car-photo-cut.png` (rembg) → `public/media/hero-car.png` (mirrored, glass tinted, shadow) and `public/media/hero-car-holo.png` (hologram version), via `scripts/build-hero-car.mjs` | Supplied by the client (October 2026); original source not stated | **Licence not confirmed** — looks like a stock/web image. Confirm the client has the right to use it, or replace. Replaces the earlier Vexels illustration (`assets/source/hero-car.jpg`, no longer used). |
| Workshop photos (12) | `assets/media/*.jpg` → `public/media/*.webp` via `npm run media` | The client's own Instagram posts (@mymechanic.pk), downloaded October 2026 | Client-owned. Used on the client's own website. |
| Inspection charges car pictures (red SUV, silver sedan, white Yaris, white car with a red gift bow for the New Car card) | `assets/source/inspection-cars/` → `public/inspection/*.webp` via `scripts/build-inspection-cars.mjs` (backgrounds removed with rembg) | Supplied by the client (October 2026); original sources not stated | **Licence not confirmed** — they look like stock/web images. Confirm the client has the right to use them, or replace. |
| New-car (ribbon) picture — **not used** | `assets/source/inspection-cars/new-car-pngtree-watermarked.png` | pngtree free preview with its watermark | Not published. Needs a licensed, watermark-free download from pngtree before use; the New Car card uses a different supplied ribbon-car photo instead. |
| Car-make logos (home-page brand strip) | `src/components/sections/BrandMarquee.tsx` | [Simple Icons](https://simpleicons.org) npm package (`simple-icons`) | SVG data CC0-1.0. The marks themselves are trademarks of each manufacturer, used only to identify vehicles serviced; no affiliation implied. |
| My Mechanic.pk logo — fist and spanner (the shop-sign logo) | `assets/source/logo-yellow.jpg` (original on yellow) → `assets/source/logo-original.png` (dark-background version by `scripts/build-logo-dark.mjs`: yellow removed, black ink recoloured to brand yellow / charcoal) | Supplied by the client (October 2026) | Client-owned. Used with permission. |
| Earlier gear-and-spanner logo pack (transparent, dark, white, yellow; PNG and SVG) | `assets/source/logo-pack/` | Supplied by the client | Client-owned. Kept for reference; no longer used on the site. |
| Animated logo film (fist-and-spanner logo, 1920×1080, 6 s) | `assets/media/logo-animated.mp4` → `public/media/logo-animated.mp4` + poster | Supplied by the client (October 2026); poster frame grabbed by `scripts/build-media.mjs` | Client-owned. Used with permission. |
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
- Vehicle manufacturer logos appear only in the home-page "We service all makes" strip, to identify the makes we work on
  (Simple Icons SVG data, CC0; brands not in that set are shown as text). They remain trademarks of their owners, the
  Disclaimer page states there is no affiliation, and they must not be used in a way that implies endorsement.
- If an asset requires attribution, add a row to the table above **and** a visible credit (for example in the gallery caption or footer).
