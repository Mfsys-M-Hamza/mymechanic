import type { Metadata } from "next";
import { client } from "@/config/client";
import { inspectionFaqs, inspectionSteps, inspections } from "@/data/inspections";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { InspectionForm } from "@/components/forms/InspectionForm";
import { InspectionPickButton } from "@/components/InspectionPickButton";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { CalendarIcon, CheckIcon, ShieldIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Car Inspection in Wah Cantt — Used Car & Pre-Purchase Inspection",
  description:
    "Car inspection at My Mechanic.pk, Wah Cantt: general check-ups, pre-purchase used car inspections, computerized scans, accident checks, engine, brakes, suspension and hybrid systems. Book on WhatsApp.",
  path: "/car-inspection",
});

const promises = [
  "Inspected by experienced mechanics — EFI & hybrid specialists since 1998",
  "Every finding explained in plain language before you decide",
  "No repairs without your approval — inspection only, if that's all you need",
];

export default function CarInspectionPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Car Inspection", path: "/car-inspection" }]}
        eyebrow="Car inspection · Wah Cantt"
        title={<>Know your car <span className="brand-text">inside out</span></>}
        intro={
          <p>
            Whether you&apos;re buying a used car or want peace of mind about your own, our mechanics check it thoroughly and explain exactly what they
            find — at Laiq Ali Chowk or New City Phase-1.
          </p>
        }
        visual="inspection"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#book" className="btn btn-primary"><CalendarIcon /> Book an inspection</a>
          <a
            href={whatsappHref(`Hello ${client.name}, I'd like to book a car inspection.\n\nVehicle (make/model/year): \nInspection needed: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Why us */}
      <section className="section pb-0 pt-12" aria-label="Why inspect with us">
        <ul className="container-x grid gap-3 sm:grid-cols-3">
          {promises.map((t, i) => (
            <li key={t} className="reveal flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm text-mist" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <ShieldIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Inspection services */}
      <section className="section" aria-labelledby="inspections-title">
        <div className="container-x">
          <SectionHeading
            id="inspections-title"
            eyebrow="Inspection services"
            title={<>Choose the <span className="brand-text">inspection</span> you need</>}
            intro="From a quick general check-up to a full pre-purchase inspection — pick one below, or tell us what you need and we'll advise."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inspections.map((it, i) => (
              <li key={it.id} className={`reveal ${["reveal-left", "reveal-zoom", "reveal-right"][i % 3]} card card-hover group flex flex-col p-6`} style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
                <Animated className="tilt mb-5 h-16 w-16 rounded-2xl bg-ink/60 p-2 ring-1 ring-white/8">
                  <MechanicalArt kind={it.visual} className="h-full w-full" />
                </Animated>
                <h3 className="text-2xl font-bold uppercase leading-tight text-white">{it.title}</h3>
                <p className="mt-2 text-mist">{it.text}</p>
                <ul className="mt-4 grid gap-1.5">
                  {it.checks.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-soft">
                      <CheckIcon width={16} height={16} className="shrink-0 text-brand" /> {c}
                    </li>
                  ))}
                </ul>
                <InspectionPickButton id={it.id} label={it.title} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section carbon" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading id="process-title" align="center" eyebrow="How it works" title={<>Four simple <span className="brand-text">steps</span></>} />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {inspectionSteps.map((s, i) => (
              <li key={s.title} className="reveal reveal-zoom card p-6" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/50 bg-brand/10 font-display text-2xl font-extrabold text-brand">{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold uppercase text-white">{s.title}</h3>
                <p className="mt-1 text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="section scroll-mt-24" aria-labelledby="book-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="book-title"
              eyebrow="Book an inspection"
              title={<>Book your <span className="brand-text">car inspection</span></>}
              intro="Fill in the details and press the button — WhatsApp opens with everything ready to send to our team. We'll confirm your slot by WhatsApp or phone."
            />
            <div className="reveal mt-8 card p-6 text-sm text-mist">
              <p className="font-semibold text-white">Opening hours</p>
              <p className="mt-1">Saturday – Thursday, 9 AM – 9 PM · Friday closed</p>
              <p className="mt-4 font-semibold text-white">Prefer to talk?</p>
              <p className="mt-1">Call or WhatsApp {client.whatsapp.display}</p>
            </div>
          </div>
          <InspectionForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section carbon" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title={<>Frequently asked <span className="brand-text">questions</span></>}
            intro="Can't find your answer? Message us on WhatsApp — we're happy to help."
          />
          <Faq items={inspectionFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
