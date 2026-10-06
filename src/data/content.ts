/**
 * Editable page content: FAQs, reviews, gallery, process steps and About copy.
 */
import type { VisualKey } from "./services";

export const homeFaqs = [
  {
    q: "Where is My Mechanic.pk located?",
    a: "We have two branches in Wah Cantt: Branch 1 at Laiq Ali Chowk and Branch 2 at New City Phase-1, Main GT Road. Use the directions buttons on the Contact page to navigate to either one.",
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
  { title: "Modern & hybrid ready", text: "EFI, computerized tuning and hybrid systems are part of our everyday work.", icon: "hybrid" },
  { title: "One-stop workshop", text: "Engine, electrical, AC, brakes, suspension and servicing under one roof, at two branches in Wah Cantt.", icon: "gear" },
];

export const processSteps = [
  { title: "Book", text: "Send your request via the form, WhatsApp or phone. We confirm a time that suits you." },
  { title: "Scan & inspect", text: "Computerized scan plus a physical check of the related systems." },
  { title: "Explain & estimate", text: "We explain what we found in plain language and share an estimate." },
  { title: "Repair with approval", text: "Work starts only after you approve it. We keep you updated." },
  { title: "Test & hand over", text: "Post-repair scan and road test, then we walk you through the work done." },
];

/**
 * Stats shown on the home page. Only verifiable facts — do not add
 * "cars serviced" or "years of experience" until the business supplies real numbers.
 */
export const stats = [
  { value: "2", label: "Branches in Wah Cantt" },
  { value: "16", label: "Workshop services" },
  { value: "OBD", label: "Computerized scanning" },
  { value: "1", label: "Number for both branches" },
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
export const reviews: Review[] = [];

/**
 * Gallery. Authentic workshop photos and videos come first; the remaining entries
 * use the site's own illustrations and are clearly captioned as illustrations.
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

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "Diagnostics", title: "Computerized OBD scanning", alt: "Illustration of a diagnostic scanner showing live engine data", visual: "scanner", illustration: true },
  { id: "g2", category: "Diagnostics", title: "Electrical fault tracing", alt: "Illustration of an electrical circuit being tested", visual: "electrical", illustration: true },
  { id: "g3", category: "Workshop", title: "Engine bay work", alt: "Illustration of a car engine with moving pistons", visual: "engine", illustration: true },
  { id: "g5", category: "Repairs", title: "Brake disc & caliper service", alt: "Illustration of a spinning brake disc and caliper", visual: "brake", illustration: true },
  { id: "g6", category: "Repairs", title: "Suspension repair", alt: "Illustration of a coil spring and shock absorber compressing", visual: "suspension", illustration: true },
  { id: "g7", category: "Repairs", title: "AC system service", alt: "Illustration of an AC condenser fan with cool airflow", visual: "ac", illustration: true },
  { id: "g8", category: "Before & After", title: "Injector spray: clogged vs clean", alt: "Illustration comparing an uneven injector spray with a clean even spray", visual: "injector", illustration: true },
  { id: "g9", category: "Before & After", title: "Carbon cleaning", alt: "Illustration of a piston with carbon deposits being cleaned", visual: "piston", illustration: true },
  { id: "g10", category: "Workshop", title: "Battery testing station", alt: "Illustration of a car battery on charge", visual: "battery", illustration: true },
];

/**
 * About page copy. Values and standards describe how the workshop intends to
 * operate — confirm wording with the owner. Team details are intentionally empty
 * until verified information is supplied.
 */
export const about = {
  story: [
    "My Mechanic.pk is an auto workshop in Wah Cantt, now with two branches — Laiq Ali Chowk and New City Phase-1 on Main GT Road — built on a simple idea: drivers deserve a workshop that explains what is wrong with their car before asking them to pay for a repair.",
    "Cars have changed. Electronic fuel injection, engine computers, hybrid systems and dozens of sensors mean that many faults can no longer be found by ear alone. We set up the workshop around computerized diagnostics so that every job starts with evidence.",
    "We build our reputation one car at a time — which is why we focus on clear communication, honest advice and work you can check.",
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
