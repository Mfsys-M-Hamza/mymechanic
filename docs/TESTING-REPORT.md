# Testing Report

> **Note:** this report was produced for the previous template client (Auto Garage One). Re-run `npm run qa` against the My Mechanic.pk build before launch.

**Build tested:** production build (`next build` + `next start`), 23 September 2026
**Tools:** automated suite `scripts/qa.mjs` (Puppeteer + Chrome + axe-core 4), Lighthouse 12, TypeScript `tsc --noEmit`
**Result: 103 automated checks passed, 0 failed.** Type check clean. Production build: 42 routes pre-rendered, no warnings.

Re-run any time:

```bash
npm run build && npm start            # terminal 1
npm run qa -- http://localhost:3000   # terminal 2 → writes qa-report.json
```

---

## 1. Pages, mobile and desktop

All **35 sitemap URLs** were audited at **1366×900 (desktop)** and **390×844 (mobile, touch)**, 70 page loads in total.
Every page load passed all of these checks:

| Check | Result |
|---|---|
| HTTP 200 | ✅ 70/70 |
| No console errors, page errors or failed requests | ✅ 70/70 |
| Exactly one `<h1>` | ✅ 70/70 |
| Meta description, canonical, Open Graph image, Twitter card | ✅ 70/70 |
| All JSON-LD blocks parse as valid JSON | ✅ 70/70 |
| Every `<img>` has an `alt` attribute | ✅ 70/70 |
| No horizontal scrolling | ✅ 70/70 |
| **axe-core WCAG 2.0/2.1/2.2 A + AA: zero violations** | ✅ 70/70 |
| Unique `<title>` and meta description across all pages | ✅ |

## 2. Links

| Check | Result |
|---|---|
| All 51 unique internal link targets return 200 | ✅ |
| All 20 WhatsApp link variants use `https://wa.me/923334548008` | ✅ |
| All telephone links use `tel:+92518898534` | ✅ |
| Redirects `/appointment`, `/about-us`, `/offers` (and others) → canonical URLs (308) | ✅ |
| Unknown URL → custom 404 page with status 404 | ✅ |
| Unknown service slug → 404 (no empty pages) | ✅ |

External social links (`facebook.com/autogarageonepk` and others) follow the supplied handle. **The owner still needs to confirm that each profile exists.**

## 3. Appointment form → WhatsApp

| Check | Result |
|---|---|
| `?service=` in the URL preselects the service (used by every "Book" button on service pages) | ✅ |
| Empty submit shows errors on all 10 required fields and moves focus to an error summary with jump links | ✅ |
| Invalid Pakistani mobile number rejected (`12345`) | ✅ |
| Past dates blocked (`min` attribute plus validation) | ✅ |
| Valid submit opens WhatsApp to 923334548008 with a formatted message | ✅ |
| Markup in input is stripped (`<script>` → `script`) | ✅ |
| Success message says the appointment is **not confirmed yet** and will be confirmed by WhatsApp or telephone | ✅ |
| Repeat submission within 45 s is blocked (cooldown) | ✅ |
| Bot-speed submission (under 3 s) and honeypot are blocked (contact form) | ✅ |
| Popup blockers: if WhatsApp can't open, the success panel offers an "Open WhatsApp to send" button | ✅ (code path) |

Sample generated message:

```
*Appointment Request — Auto Garage One*

*Name:* Ali Khan
*Mobile:* 0300-1234567
*Email:* ali@example.com

*Vehicle:* Toyota Aqua (2016)
*Registration:* ABC-123
*Service:* Hybrid Car Repair & Maintenance
*Preferred date:* Thu, 24 Sept 2026
*Preferred time:* 11:00 am

*Issue:*
Hybrid warning light scriptalert(1)/script and low average.

_Please confirm if this time is available. Thank you._
```

## 4. Navigation, keyboard and accessibility

| Check | Result |
|---|---|
| First Tab focuses "Skip to main content" | ✅ |
| Mobile menu: `aria-expanded`, focus moves into the menu, focus is trapped, Escape closes it and returns focus | ✅ |
| Sticky mobile action bar (Call, WhatsApp, Book) is present; body padding keeps it from covering content | ✅ |
| Gallery lightbox: dialog role, focus trap, Escape and arrow keys, focus returns to the thumbnail | ✅ (implemented; exercised manually) |
| FAQ uses native `<details>`, so it works without JavaScript | ✅ |
| Visible focus ring on every interactive element | ✅ |
| Colour contrast (axe) | ✅ (the WhatsApp button green was darkened to `#13803f` to pass) |

## 5. 3D, animation and fallbacks

| Check | Result |
|---|---|
| Desktop: Three.js hero loads only after the first interaction (or after 6 s), so it never blocks page load | ✅ |
| Phones (under 768 px), Save-Data, low-memory devices: animated SVG hero only, no WebGL download | ✅ |
| WebGL unavailable: SVG fallback stays in place | ✅ |
| `prefers-reduced-motion`: all content visible, looping animations off, 3D rendered as a single still frame | ✅ |
| Off-screen animations pause (IntersectionObserver); the WebGL loop stops when hidden or the tab is inactive | ✅ |
| Content is visible with JavaScript disabled (`@media (scripting: none)`) | ✅ |

## 6. SEO and structured data

| Item | Status |
|---|---|
| `sitemap.xml` (35 URLs), `robots.txt` (points to the sitemap), `manifest.webmanifest` | ✅ |
| `AutoRepair` (LocalBusiness) + `WebSite` schema on every page | ✅ |
| `Service` schema on 16 service pages | ✅ |
| `FAQPage` schema only where FAQs are visible on the page | ✅ |
| `BlogPosting` schema on articles; `BreadcrumbList` on every inner page | ✅ |
| `Review` schema for the 4 genuine Google reviews; `reviewRating` only where the star rating is known; `AggregateRating` withheld until every review has a known rating | ✅ (deliberate) |
| `openingHoursSpecification` and `geo` withheld until confirmed | ✅ (deliberate) |
| Lighthouse SEO score | **100** on every page tested |

Recommended after launch: run Google's Rich Results Test against the live URL.

## 7. Performance (Lighthouse 12, local production server)

| Page | Desktop Perf | Mobile Perf | A11y | Best Practices | SEO | CLS |
|---|---|---|---|---|---|---|
| Home | 98 | 88 | 100 | 100 | 100 | 0 |
| About | 99 | 87 | 100 | 100 | 100 | 0 |
| Service (EFI) | 99 | 84 | 100 | 100 | 100 | 0 |
| Book appointment | 100 | 82 | 100 | 100 | 100 | 0 |
| Contact | 99 | 83 | 100 | 100 | 100 | 0 |
| Blog article | 100 | 88 | 100 | 100 | 100 | 0 |

**Desktop meets the target of 90+ in every category. Mobile Performance is 82–88, below the 90 target.**
Accessibility, Best Practices and SEO score 100 on mobile too.

Why mobile Performance is below 90: in Lighthouse's observed run, LCP happens at **0.35–1.2 s** (equal to first paint)
with **zero layout shift**. The "Performance" score, however, uses a *simulated* slow-4G/4×-CPU model in which the
~160 KB React + Next.js runtime counts toward LCP (simulated LCP about 3.3 s). The remaining cost is framework
hydration rather than images or 3D: the WebGL scene no longer loads on page load, and the page uses no image-heavy media.

Optimisations already applied:

- Transform-only entrance animations, so text paints immediately.
- Body font uses `display: optional`, so there is no late font-swap repaint.
- CSS gradients instead of `filter: blur()` glow layers.
- `content-visibility: auto` on below-the-fold sections.
- Favicon shrunk from 257 KB to 16 KB.
- The Three.js bundle is deferred until interaction.

Further options if the client needs 90+ on mobile: remove the scroll-reveal and parallax scripts, cut the number of
animated SVGs on the home page, or measure on the real host with CDN compression (a local `next start` is not a CDN).
**Field data (Chrome UX Report / Search Console Core Web Vitals) after launch is the real measure.**

## 8. Security

| Check | Result |
|---|---|
| Content-Security-Policy, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP | ✅ present |
| `X-Powered-By` removed | ✅ |
| No secrets in frontend code (no backend keys exist) | ✅ |
| Forms: sanitisation, validation, honeypot, time trap, cooldown | ✅ |
| Third-party requests: none on page load (the Google Map loads only on click) | ✅ |
| `npm audit` | 0 vulnerabilities |

The CSP allows `'unsafe-inline'` scripts because Next.js injects inline hydration scripts on statically generated pages.
Nonces would force every page to render on each request. This is a conscious trade-off, noted here.

## 9. Browser compatibility

Automated tests ran in Chrome (Chromium engine, which also covers Edge, Samsung Internet and Opera).
The code uses widely supported features: CSS grid, `backdrop-filter` with a `-webkit-` prefix, IntersectionObserver
with a fallback, and WebGL with a feature check. `content-visibility` degrades gracefully in older Safari (it is simply ignored).
**Not yet tested on real devices:** Safari iOS and Firefox. A quick manual pass on an iPhone and an Android phone is recommended before launch.

## 10. Not covered by automated tests

- Real-device testing (iOS Safari, a low-end Android phone on a 3G/4G connection).
- The live WhatsApp app hand-off. The test captures the generated `wa.me` URL but does not send a message.
- Screen-reader walkthrough (NVDA or VoiceOver). axe covers the programmatic rules; a human pass is still recommended.
