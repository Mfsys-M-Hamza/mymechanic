import Link from "next/link";
import { client } from "@/config/client";
import { reviews } from "@/data/content";
import { whatsappHref } from "@/lib/links";
import { StarIcon, WhatsAppIcon } from "@/components/Icons";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} width={18} height={18} className={n <= rating ? "" : "opacity-25"} />)}
    </div>
  );
}

/**
 * Shows genuine reviews from src/data/content.ts. While none exist, shows an honest
 * invitation instead of invented testimonials.
 */
export function ReviewsBlock({ limit }: { limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  const reviewHref = client.googleReviewUrl || whatsappHref(`Hello ${client.name}, I'd like to share feedback about my visit.\n\n`);
  const reviewExternal = true;

  if (list.length === 0) {
    return (
      <div className="reveal grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="card p-8">
          <p className="eyebrow">Customer feedback</p>
          <h3 className="mt-3 text-3xl font-extrabold uppercase text-white">Share your experience</h3>
          <p className="mt-4 text-mist">
            We are bringing our customer reviews onto this website. We only publish genuine feedback from real customers — never
            invented testimonials. If we have worked on your car at either branch, we would value your honest opinion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={reviewHref} target={reviewExternal ? "_blank" : undefined} rel="noopener noreferrer" className="btn btn-primary">
              <StarIcon /> Leave a review
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><WhatsAppIcon /> Share feedback on WhatsApp</a>
          </div>
        </div>
        <ul className="grid gap-4" aria-label="Review slots awaiting genuine customer feedback">
          {[0, 1, 2].map((i) => (
            <li key={i} className="rounded-2xl border border-dashed border-white/12 p-5 text-metal">
              <div className="flex gap-0.5 opacity-30" aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} width={16} height={16} />)}</div>
              <p className="mt-2 text-sm">Review slot — awaiting genuine customer feedback.</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const g = client.googleRating;
  return (
    <>
      {g && (
        <div className="reveal card mb-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <p className="font-display text-6xl font-extrabold leading-none brand-text">{g.value.toFixed(1)}</p>
            <div>
              <div className="flex gap-0.5 text-brand" role="img" aria-label={`Rated ${g.value} out of 5 on Google`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarIcon key={n} width={20} height={20} className={n <= Math.floor(g.value) ? "" : g.value - Math.floor(g.value) >= 0.25 && n === Math.floor(g.value) + 1 ? "opacity-60" : "opacity-25"} />
                ))}
              </div>
              <p className="mt-1 font-semibold text-white">{g.count} Google reviews</p>
              <p className="text-sm text-metal">Main branch, Laiq Ali Chowk</p>
            </div>
          </div>
          {client.googleBusinessProfileUrl && (
            <a href={client.googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline self-start sm:self-auto">
              Read all reviews on Google
            </a>
          )}
        </div>
      )}
      <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <figure key={`${r.name}-${r.date}`} className="reveal card p-6" style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
            {r.rating && <Stars rating={r.rating} />}
            {r.title && <p className="mt-3 font-display text-xl font-bold uppercase text-white">{r.title}</p>}
            <blockquote className={`${r.rating || r.title ? "mt-3" : ""} text-soft`}>“{r.text}”</blockquote>
            <figcaption className="mt-5 text-sm text-metal">
              <span className="font-semibold text-white">{r.name}</span>
              {r.reviewerNote ? ` · ${r.reviewerNote}` : ""}
              {r.vehicle ? ` · ${r.vehicle}` : ""}
              <span className="block">
                {r.source} review · <time dateTime={r.date}>{formatReviewDate(r.date)}</time>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="reveal mt-8 flex flex-wrap items-center gap-3">
        {limit && reviews.length > list.length && (
          <Link href="/reviews" className="btn btn-outline">Read all {reviews.length} reviews</Link>
        )}
        <a href={reviewHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><StarIcon /> Leave a review</a>
        <p className="text-sm text-metal">Reviews are shown word-for-word from {Array.from(new Set(reviews.map((r) => r.source))).join(" and ")}.</p>
      </div>
    </>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-08" → "August 2026"; "2026-08-14" → "14 August 2026". Parsed manually to avoid timezone shifts. */
function formatReviewDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return `${day ? `${day} ` : ""}${MONTHS[(m || 1) - 1]} ${y}`;
}
