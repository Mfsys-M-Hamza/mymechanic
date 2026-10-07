import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, branchAddress } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { CalendarIcon, CheckCircleIcon, ClockIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";

const o = client.offer;

export const metadata: Metadata = o.active
  ? pageMetadata({
      title: "Free Computerized Car Scanning in Wah Cantt — Special Offer",
      description: `Free computerized scanning and general vehicle check-up at My Mechanic.pk, Wah Cantt, until ${o.endsLabel}. See what's included and the terms, then book by WhatsApp.`,
      path: "/special-offers",
    })
  : { robots: { index: false, follow: false } };

export default function SpecialOffersPage() {
  if (!o.active) notFound();
  const waMessage = `Hello ${client.name}, I'd like to book the free computerized scan & check-up.\n\nVehicle (make/model/year): \nPreferred branch: \nPreferred day/time: `;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Special Offers", path: "/special-offers" }]}
        eyebrow={`Special offer · until ${o.endsLabel}`}
        title={<><span className="brand-text">Free</span> computerized scanning &amp; general check-up</>}
        intro={<p>{o.summary}</p>}
        visual="scanner"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/book-appointment" className="btn btn-primary"><CalendarIcon /> Book your free scan</Link>
          <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> Book on WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="section pt-12" aria-labelledby="included-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="included-title" className="reveal text-3xl font-extrabold uppercase text-white sm:text-4xl">
              What&apos;s <span className="brand-text">included</span>
            </h2>
            <ul className="reveal mt-6 grid gap-3">
              {o.includes.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-soft">
                  <CheckCircleIcon className="mt-0.5 shrink-0 text-brand" width={20} height={20} />
                  {t}
                </li>
              ))}
            </ul>

            <h2 id="terms-title" className="reveal mt-12 text-2xl font-bold uppercase text-white">Offer terms</h2>
            <ol className="reveal mt-4 grid list-decimal gap-2 pl-5 text-mist marker:text-brand">
              {o.terms.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </div>

          <aside className="reveal card h-fit p-6" aria-label="Offer details">
            <p className="eyebrow">Offer details</p>
            <dl className="mt-4 grid gap-4 text-sm">
              <div className="flex gap-3">
                <ClockIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />
                <div>
                  <dt className="text-metal">Valid until</dt>
                  <dd className="font-semibold text-white">{o.endsLabel}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <PinIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />
                <div>
                  <dt className="text-metal">Where</dt>
                  {client.branches.map((b) => (
                    <dd key={b.id} className="font-semibold text-white">{b.label}: {branchAddress(b)}</dd>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />
                <div>
                  <dt className="text-metal">How to book</dt>
                  <dd className="font-semibold text-white">Call or WhatsApp {client.whatsapp.display}</dd>
                </div>
              </div>
            </dl>
            <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6 w-full">
              <WhatsAppIcon /> Book on WhatsApp
            </a>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
