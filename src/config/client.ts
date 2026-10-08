/**
 * ============================================================================
 *  CLIENT CONFIGURATION — the single place to edit business details.
 * ============================================================================
 *
 *  To reuse this website for another workshop:
 *    1. Edit the values in this file.
 *    2. Replace assets/source/logo-original.png and run `npm run assets`.
 *    3. Review service copy in src/data/services.ts and blog posts in src/data/blog.ts.
 *
 *  Anything marked `confirmed: false` (or listed in `pendingConfirmation`) is
 *  information the business owner still needs to verify. The site handles these
 *  gracefully: unconfirmed hours are not published in structured data, the
 *  emergency service stays hidden, and so on.
 * ============================================================================
 */

export type DayHours = { day: string; schemaDay: string; opens?: string; closes?: string; closed?: boolean };

export type Branch = {
  id: string;
  /** Short label, e.g. "Branch 1". */
  label: string;
  /** Landmark name used in headings, e.g. "Laiq Ali Chowk". */
  name: string;
  street: string;
  area: string;
  /** Map pin. When `confirmed` is false the map and directions search by address instead. */
  geo: { lat: number; lng: number; confirmed: boolean };
  /** Google Maps listing for this branch, if it has one. */
  mapsUrl: string;
};

/** Workshop locations. The first branch with a confirmed pin is used for the main map and schema. */
const branches: Branch[] = [
  {
    id: "laiq-ali-chowk",
    label: "Branch 1",
    name: "Laiq Ali Chowk",
    street: "Shop-07, Laiq Ali Chowk",
    area: "Wah Cantt",
    /** Pin from the Google Business Profile listing "My Mechanic Auto Workshop (EFI & Hybrid Specialists)" (plus code QQ83+GH). */
    geo: { lat: 33.7663133, lng: 72.7539142, confirmed: true },
    mapsUrl: "https://maps.google.com/?cid=15759953553984945602",
  },
  {
    id: "new-city",
    label: "Branch 2",
    name: "New City Phase-1",
    street: "Shop No. 19, Taj Market, New City Phase-1",
    area: "Wah Cantt",
    /**
     * Pin from the Google listing "My Mecahinc.pk (Branch-2)" (plus code QQ34+X9).
     * Google currently shows this listing as "Permanently closed" — the owner confirmed the
     * branch is open, so they should correct it in Google Business Profile.
     */
    geo: { lat: 33.7549993, lng: 72.7558992, confirmed: true },
    mapsUrl: "https://maps.google.com/?cid=6405627770873787592",
  },
];

export const primaryBranch = branches.find((b) => b.geo.confirmed) ?? branches[0];

export const client = {
  /* ---------------------------------------------------------------- Identity */
  name: "My Mechanic.pk",
  legalName: "My Mechanic.pk",
  tagline: "EFI & Hybrid Specialists in Wah Cantt since 1998",
  description:
    "My Mechanic.pk is a car repair and maintenance workshop in Wah Cantt, established in 1998, with two branches — Shop-07, Laiq Ali Chowk and Taj Market, New City Phase-1. EFI and hybrid specialists offering computerized diagnostics, engine repair, tuning, AC servicing, brakes, suspension, maintenance and customization for drivers across Wah Cantt and Taxila.",
  /** Year the business was established (confirmed by the owner). */
  foundingYear: 1998 as number | null,
  /** "27+ years in business", as stated by the owner. */
  yearsInBusiness: "27+",

  /** Public site URL. NEXT_PUBLIC_SITE_URL overrides this at build time. */
  siteUrl: "https://www.mymechanic.pk",

  /* ------------------------------------------------------------------- Logo */
  logo: {
    /** Dark-background version of the shop-sign logo (`npm run logo-dark`, then `npm run assets`) */
    src: "/brand/mm-logo-gold.webp",
    fallbackPng: "/brand/mm-logo-gold.png",
    /** Intrinsic proportions of the generated logo — keep in sync to avoid distortion. */
    width: 640,
    height: 422,
    alt: "My Mechanic.pk Auto Workshop logo — a fist holding a spanner above a steel badge, with the name in yellow",
  },

  /* ---------------------------------------------------------------- Contact */
  phone: {
    display: "0312-5045678",
    e164: "+923125045678",
  },
  whatsapp: {
    display: "0312-5045678",
    /** International format without "+" — used in https://wa.me/<number> */
    number: "923125045678",
  },
  /** Leave empty until the business provides a monitored email address. */
  email: "",

  branches,

  /** Primary address — Branch 1, the main Google listing. Used for schema and single-address spots. */
  address: {
    street: "Shop-07",
    area: "Laiq Ali Chowk",
    city: "Wah Cantt",
    region: "Punjab",
    postalCode: "47040",
    country: "Pakistan",
    countryCode: "PK",
  },

  /**
   * Map coordinates of the primary branch. When `confirmed` is false the
   * coordinates are NOT published in structured data and the map uses the address search.
   */
  geo: primaryBranch.geo,

  /** Google Business Profile (Maps listing, by cid). */
  googleBusinessProfileUrl: primaryBranch.mapsUrl,
  /**
   * "Leave a review" link. Points at the Maps listing (which has a Write a review button);
   * swap in the direct search.google.com/local/writereview?placeid=… link when available.
   */
  googleReviewUrl: primaryBranch.mapsUrl,

  /**
   * Google rating of the main listing (Branch 1), shown as a badge with a link to read the
   * reviews on Google. Update when it changes. Not used for structured data.
   */
  googleRating: { value: 4.6, count: 134, checked: "2026-10" },

  /**
   * Car inspection charges in PKR, shown on /car-inspection. null = not published yet:
   * the card shows "Ask for price" with a WhatsApp link. Set the owner's real prices here.
   */
  inspectionPrices: {
    suv: null as number | null, // SUVs, 4x4, Jeeps & German cars
    mid: null as number | null, // 1001cc – 2000cc
    small: null as number | null, // up to 1000cc
    newCar: null as number | null, // new car pre-delivery inspection
  },

  /**
   * Site sections that can be switched off without deleting them.
   * blog: false hides the Blog from the menu, footer, sitemap and service pages, and the
   * /blog pages show "page not found" (noindex). Set to true to publish it again.
   */
  features: { blog: false },

  /**
   * Payment methods accepted at both branches (owner, October 2026). Shown on the home page,
   * in the footer and in structured data (paymentAccepted). `icon` picks the icon in PaymentMethods.tsx.
   */
  payments: [
    { name: "Cash", note: "Pay at the counter at either branch", icon: "cash" },
    { name: "Debit / Credit Card", note: "Visa, Mastercard and UnionPay cards", icon: "card" },
    { name: "Easypaisa", note: "Mobile wallet and Easypaisa account", icon: "wallet" },
    { name: "JazzCash", note: "Mobile wallet and JazzCash account", icon: "wallet" },
    { name: "Online Bank Transfer", note: "Internet and mobile banking (IBFT / Raast)", icon: "online" },
  ],

  /* ------------------------------------------------------------------ Offer */
  offer: {
    /** Master switch for the top banner and the /special-offers page. */
    active: true,
    title: "Free Computerized Scanning & General Vehicle Check-Up",
    /** Short line for the top banner (after the bold "FREE"). */
    banner: "computerized scanning & general check-up",
    summary:
      "Bring your car to either of our Wah Cantt branches for a free computerized OBD scan and a general check-up. We'll explain what we find in plain language — there's no obligation to book any repair.",
    /** ISO date-time with Pakistan offset. The banner and page switch off automatically after this. */
    endsAt: "2026-12-31T23:59:59+05:00",
    endsLabel: "31 December 2026",
    includes: [
      "Computerized OBD-II fault-code scan of the engine and supported modules",
      "Reading of stored and pending fault codes, with a plain-language explanation",
      "Visual general check-up: fluids, belts, hoses, tyres, lights and battery condition",
      "Advice on what needs attention now and what can wait",
    ],
    /** Editable terms — confirm with the owner. */
    terms: [
      "Valid until 31 December 2026 at both My Mechanic.pk branches in Wah Cantt.",
      "One free scan and check-up per vehicle.",
      "Please book in advance by WhatsApp or phone so we can reserve a slot.",
      "Repairs, parts, advanced module programming and road tests are not included and are quoted separately after inspection.",
      "Some vehicles or modules may not be readable with standard diagnostic equipment.",
      "My Mechanic.pk may update or withdraw these terms; any change will be shown on this page.",
    ],
  },

  /* ------------------------------------------------------------------ Hours */
  hours: {
    /** 9 AM–9 PM confirmed by the owner (October 2026); Friday closed as on Google. */
    confirmed: true,
    note: "Please call or WhatsApp before visiting on public holidays.",
    days: [
      { day: "Monday", schemaDay: "Monday", opens: "09:00", closes: "21:00" },
      { day: "Tuesday", schemaDay: "Tuesday", opens: "09:00", closes: "21:00" },
      { day: "Wednesday", schemaDay: "Wednesday", opens: "09:00", closes: "21:00" },
      { day: "Thursday", schemaDay: "Thursday", opens: "09:00", closes: "21:00" },
      { day: "Friday", schemaDay: "Friday", closed: true },
      { day: "Saturday", schemaDay: "Saturday", opens: "09:00", closes: "21:00" },
      { day: "Sunday", schemaDay: "Sunday", opens: "09:00", closes: "21:00" },
    ] as DayHours[],
  },

  /* ------------------------------------------------------------------ Social */
  social: {
    handle: "@mymechanic.pk",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/p/My-MechanicPk-100083210360615/" },
      { label: "Instagram", href: "https://www.instagram.com/mymechanic.pk/" },
    ],
  },

  /* ------------------------------------------------------------ Service area */
  serviceAreas: {
    /** Cities served (owner, October 2026). Also published as areaServed in structured data. */
    primary: ["Wah Cantt", "Taxila", "Islamabad", "Rawalpindi", "Hasan Abdal"],
    /** Nearby localities mentioned in copy. Keep to areas the workshop genuinely serves. */
    nearby: [
      "Laiq Ali Chowk",
      "New City Phase-1 & 2",
      "Wah Model Town",
      "Taxila Cantt",
      "Sangjani",
      "Barahma Bahtar",
      "Tarnol",
      "Golra Mor",
      "Attock",
      "Kamra",
      "GT Road & Motorway corridor",
    ],
  },

  /* ------------------------------------------------------------ Brand colors */
  /** Mirrors the CSS tokens in src/app/globals.css (@theme). Used for manifest/meta. */
  colors: {
    brand: "#f5b301",
    brandDeep: "#c48a00",
    background: "#0c0d0f",
    surface: "#17191d",
    metal: "#9ba1a9",
  },

  /* -------------------------------------------------------------------- SEO */
  seo: {
    /** Google Search Console HTML-tag verification token (content of google-site-verification). */
    googleSiteVerification: "",
    defaultTitle: "My Mechanic.pk | Car Repair Workshop in Wah Cantt",
    titleTemplate: "%s | My Mechanic.pk",
    defaultDescription:
      "EFI & hybrid specialists in Wah Cantt since 1998. Two branches — Laiq Ali Chowk and New City Phase-1. Computerized scanning, engine, tuning, AC, brakes and suspension. Rated 4.6★ on Google.",
    keywords: [
      "car mechanic Wah Cantt",
      "EFI specialist Wah Cantt",
      "hybrid car repair Wah Cantt",
      "car repair workshop Wah Cantt",
      "auto workshop New City Wah",
      "car mechanic Laiq Ali Chowk",
      "car computerized scanning Wah Cantt",
      "car repair Taxila",
      "car AC repair Wah Cantt",
    ],
    ogImage: "/brand/og-image.jpg",
    locale: "en_PK",
    twitterHandle: "",
  },

  /* ---------------------------------------------------------------- Privacy */
  analytics: {
    /**
     * Google Analytics 4 measurement ID (e.g. "G-XXXXXXX"). Leave empty to load no
     * analytics at all — in that case no cookie banner is shown because the site
     * sets no non-essential cookies.
     */
    ga4Id: "",
  },

  /** Last date the legal pages were reviewed. */
  legalUpdated: "2026-10-06",
} as const;

/**
 * Things the business owner still needs to confirm or supply.
 * Surfaced in CLIENT-CHECKLIST.md — keep the two in sync.
 */
export const pendingConfirmation = [
  "Branch 2 hours, if different from Branch 1 (client.hours uses the Branch 1 Google listing)",
  "Fix Branch 2's \"Permanently closed\" status and the \"Mecahinc\" spelling on Google Business Profile",
  "Phone numbers on the Google listing (+92 300 5147210) and shop sign (0300-5147250) differ from the site's 0312-5045678",
  "Services actually offered and any specialist equipment (src/data/services.ts)",
  "Business email address (client.email)",
  "Direct Google \"write a review\" link (client.googleReviewUrl currently opens the Maps listing)",
  "Whether emergency breakdown assistance is offered (services.ts → emergency-breakdown-assistance)",
  "Which photos belong to which branch (gallery captions currently say \"our workshop\")",
  "Technician names, qualifications and experience (About page)",
  "Final domain name (client.siteUrl)",
] as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || client.siteUrl).replace(/\/$/, "");

export const branchAddress = (b: Branch) => [b.street, b.area].filter(Boolean).join(", ");

export const fullAddress = [client.address.street, client.address.area, client.address.city, client.address.country]
  .filter(Boolean)
  .join(", ");

/** ["A", "B", "C"] → "A, B and C". */
export const listJoin = (items: readonly string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/** "Wah Cantt, Taxila, Islamabad, Rawalpindi and Hasan Abdal" */
export const servedCities = listJoin(client.serviceAreas.primary);
