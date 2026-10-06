/**
 * Editable page content: FAQs, reviews, gallery, process steps and About copy.
 */
import type { VisualKey } from "./services";

export const homeFaqs = [
  {
    q: "Where is My Mechanic.pk located?",
    a: "We have two branches in Wah Cantt: Branch 1 at Shop-07, Laiq Ali Chowk and Branch 2 at Shop No. 19, Taj Market, New City Phase-1. Use the directions buttons on the Contact page to navigate to either one.",
  },
  {
    q: "How long have you been in business?",
    a: "My Mechanic was established in 1998 — more than 27 years of repairing and maintaining cars in Wah Cantt. Today we specialise in EFI and hybrid vehicles alongside general mechanical work.",
  },
  {
    q: "What are your opening hours?",
    a: "Saturday to Thursday, 8 AM to 9 PM. We are closed on Fridays. Call or WhatsApp 0312-5045678 before visiting on public holidays.",
  },
  {
    q: "Do you publish repair prices?",
    a: "No. The cost of a repair depends on your vehicle and what the inspection finds. We explain the problem and give you an estimate before starting any work.",
  },
  {
    q: "Do you repair hybrid cars?",
    a: "Yes. We scan hybrid systems, check battery and cooling health and carry out routine hybrid maintenance. Message your car's details on WhatsApp so we can confirm before you visit.",
  },
  {
    q: "Which areas do you serve?",
    a: "Our two branches are in Wah Cantt, and we welcome customers from across Wah Cantt and Taxila, including New City, Wah Model Town, Hasan Abdal and the GT Road corridor.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the Book Appointment form, or call or WhatsApp us at 0312-5045678. Let us know which branch suits you and our team will confirm your time slot.",
  },
];

export const whyChooseUs: { title: string; text: string; icon: VisualKey }[] = [
  { title: "Diagnosis before repair", text: "We scan and test first, so you pay to fix the real problem — not for guesswork.", icon: "scanner" },
  { title: "Transparent estimates", text: "You get a clear explanation and estimate before work begins. Nothing is done without your approval.", icon: "inspection" },
  { title: "EFI & hybrid specialists", text: "EFI, computerized tuning and hybrid systems are part of our everyday work — backed by experience since 1998.", icon: "hybrid" },
  { title: "One-stop workshop", text: "Maintenance, repair and customization — engine, electrical, AC, brakes and suspension at two branches in Wah Cantt.", icon: "gear" },
];

export const processSteps = [
  { title: "Book", text: "Send your request via the form, WhatsApp or phone. We confirm a time that suits you." },
  { title: "Scan & inspect", text: "Computerized scan plus a physical check of the related systems." },
  { title: "Explain & estimate", text: "We explain what we found in plain language and share an estimate." },
  { title: "Repair with approval", text: "Work starts only after you approve it. We keep you updated." },
  { title: "Test & hand over", text: "Post-repair scan and road test, then we walk you through the work done." },
];

/**
 * Stats shown on the home page. Only verifiable facts — established year and years in
 * business confirmed by the owner; rating from the Branch 1 Google listing (Oct 2026).
 */
export const stats = [
  { value: "1998", label: "Established" },
  { value: "27+", label: "Years in business" },
  { value: "4.6★", label: "Google rating · 134 reviews" },
  { value: "2", label: "Branches in Wah Cantt" },
];

/**
 * Genuine customer reviews ONLY — copied word-for-word from the source platform.
 *
 * - `rating`: fill in only from the actual star rating on the platform. Leave it out
 *   if unknown; no stars are shown and no rating is sent to Google for that review.
 * - AggregateRating schema is published only when EVERY listed review has a rating,
 *   so the average can never be based on a partial set.
 * - `date`: ISO date or month ("2026-08"). Google shows relative dates ("a month ago"),
 *   so month precision is used for these.
 */
export type Review = {
  name: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  title?: string;
  text: string;
  date: string;
  source: string;
  reviewerNote?: string;
  vehicle?: string;
};
/** Full, untruncated reviews from the Branch 2 Google listing (copied October 2026). Star ratings not captured. */
export const reviews: Review[] = [
  {
    name: "Muhammad Abbas",
    text: "Great Service, Experienced Staff. They clearly explained what needed to be done and gave a fair estimate. Highly Recommended!!",
    date: "2025-10",
    source: "Google",
  },
  {
    name: "Muhammad Ashraf",
    text: "Mr. Shoib, the chief mechanic is very professional also his team. The quality of work is very good, neat and clean. They are cooperative too.",
    date: "2025-11",
    source: "Google",
    reviewerNote: "Local Guide",
  },
  {
    name: "Ahmed Ali",
    text: "I am very satisfied with the service nd the machinc is also very cooperative.",
    date: "2026-03",
    source: "Google",
  },
];

/**
 * Gallery: real workshop photos only (no illustrations).
 * To add media: drop the original in assets/media, run `npm run media`, then add an
 * entry with `src` (photo, or the video's poster), `width`, `height`, `video` for a clip,
 * and `service` (a service slug) to also show it on that service's page.
 * `visual` is only the fallback when there is no `src`.
 */
export type GalleryItem = {
  id: string;
  category: "Workshop" | "Diagnostics" | "Repairs" | "Before & After";
  title: string;
  alt: string;
  visual: VisualKey;
  illustration: boolean;
  src?: string;
  video?: string;
  /** Service slug (src/data/services.ts) whose page should show this media. */
  service?: string;
  width?: number;
  height?: number;
};

/** Real photos from the workshop's Instagram (@mymechanic.pk), October 2026. */
export const galleryItems: GalleryItem[] = [
  { id: "p1", category: "Workshop", title: "Our workshop", alt: "My Mechanic.pk workshop front with its yellow sign and a Liqui Moly motor-oil banner, a white Toyota Yaris parked in the service bay", visual: "gear", illustration: false, src: "/media/yaris-in-bay.webp", width: 1080, height: 1917, service: "suspension-repair" },
  { id: "p2", category: "Diagnostics", title: "Computerized diagnostics", alt: "Technician at the diagnostic computer inside the workshop, with shelves of oils and parts behind", visual: "scanner", illustration: false, src: "/media/diagnostic-computer.webp", width: 1080, height: 1920, service: "computerized-scanning" },
  { id: "p3", category: "Workshop", title: "Motor oils, additives & car care", alt: "My Mechanic.pk sign above a blue Liqui Moly 'Motor oils, additives, car care' banner at the shop entrance", visual: "oil", illustration: false, src: "/media/shop-sign-liqui-moly.webp", width: 1080, height: 1350, service: "oil-filter-change" },
  { id: "p4", category: "Repairs", title: "Cylinder head work", alt: "Mechanic's hands working on an engine block with the cylinder head removed", visual: "engine", illustration: false, src: "/media/engine-head-work.webp", width: 640, height: 1136, service: "engine-diagnostics" },
  { id: "p5", category: "Workshop", title: "Our team at work", alt: "Two My Mechanic technicians working under the open bonnet of a car outside the workshop", visual: "gear", illustration: false, src: "/media/technicians-at-work.webp", width: 640, height: 1136, service: "general-inspection" },
  { id: "p6", category: "Workshop", title: "Oils & fluids ready for a service", alt: "Engine oil, coolant and filters on a yellow trolley beside a car with its bonnet open", visual: "oil", illustration: false, src: "/media/oil-service-cart.webp", width: 1080, height: 1920, service: "preventive-maintenance" },
  { id: "p7", category: "Repairs", title: "Valve train inspection", alt: "Exposed camshaft and valve train of an engine during inspection", visual: "engine", illustration: false, src: "/media/camshaft-valve-train.webp", width: 640, height: 1136, service: "engine-tuning" },
  { id: "p8", category: "Diagnostics", title: "Suzuki Cultus PCV valve issue", alt: "Mechanic checking the PCV valve on a Suzuki Cultus engine", visual: "scanner", illustration: false, src: "/media/pcv-valve.webp", width: 720, height: 1280, service: "efi-specialist" },
  { id: "p9", category: "Repairs", title: "Toyota Vitz suspension check", alt: "Engine bay of a Toyota Vitz during a suspension and engine-mount check", visual: "suspension", illustration: false, src: "/media/vitz-engine-bay.webp", width: 720, height: 1280 },
  { id: "p10", category: "Workshop", title: "Coolant service", alt: "Mechanic topping up coolant in an engine bay", visual: "engine", illustration: false, src: "/media/coolant-service.webp", width: 640, height: 1136, service: "ac-heater-maintenance" },
  { id: "p11", category: "Workshop", title: "Outside the workshop", alt: "My Mechanic.pk shop front with its sign and banner, a customer's car parked in front", visual: "gear", illustration: false, src: "/media/shopfront-cultus.webp", width: 640, height: 1136 },
  { id: "p12", category: "Workshop", title: "Customers' cars at the shop", alt: "A white Mercedes-Benz parked outside the My Mechanic workshop", visual: "gear", illustration: false, src: "/media/shopfront-mercedes.webp", width: 1080, height: 1350 },
];

/**
 * About page copy. Values and standards describe how the workshop intends to
 * operate — confirm wording with the owner. Team details are intentionally empty
 * until verified information is supplied.
 */
export const about = {
  story: [
    "My Mechanic has been repairing cars in Wah Cantt since 1998 — more than 27 years in business. Today we run two branches, at Shop-07, Laiq Ali Chowk and at Taj Market, New City Phase-1, specialising in automotive maintenance, repair and customization.",
    "Cars have changed a lot since we opened. Electronic fuel injection, engine computers, hybrid systems and dozens of sensors mean that many faults can no longer be found by ear alone. That is why we became EFI and hybrid specialists and built every job around computerized diagnostics — so each repair starts with evidence.",
    "Our customers rate us 4.6★ on Google from more than 130 reviews. We keep that reputation one car at a time, with clear communication, honest advice and work you can check.",
  ],
  mission:
    "To give drivers in Wah Cantt and Taxila accurate diagnosis, reliable repairs and straightforward advice — so they can make informed decisions about their vehicles.",
  values: [
    { title: "Honesty", text: "We tell you what we find, including when a repair can wait or is not worth doing." },
    { title: "Transparency", text: "Estimates before work, approval before extra work, and old parts available to see on request." },
    { title: "Precision", text: "Data-driven diagnosis and methodical repair instead of trial-and-error part swapping." },
    { title: "Respect", text: "Respect for your time, your car and your budget." },
  ],
  capabilities: [
    "Computerized OBD-II scanning and live data analysis",
    "EFI system diagnosis, throttle body and sensor service",
    "Computerized engine tuning and relearn procedures (where supported)",
    "Hybrid system scanning and battery cooling maintenance",
    "AC and heater system diagnosis and servicing",
    "Brake, suspension and steering inspection and repair",
    "Battery testing and charging facility",
    "Electrical fault tracing",
  ],
  standards: [
    "Seat, steering and floor covers used to protect your interior",
    "Pre-repair scan and post-repair verification scan",
    "Work explained and approved before it begins",
    "Clean, organised workbays and correct tools for the job",
    "Safe handling procedures for hybrid high-voltage components",
  ],
  /** Add verified technician details here, e.g. { name, role, experience }. */
  team: [] as { name: string; role: string; bio: string }[],
};
