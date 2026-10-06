import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/config/client";
import { featuredServices, services } from "@/data/services";
import { homeFaqs, processSteps, stats, whyChooseUs } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { Hero3D } from "@/components/hero/Hero3D";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { BrandFilm } from "@/components/sections/BrandFilm";
import { WorkshopPhotos } from "@/components/sections/WorkshopPhotos";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { ArrowRightIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  description: client.seo.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden carbon" aria-labelledby="hero-title">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div data-parallax="0.12" className="absolute -left-40 top-10 h-[620px] w-[620px] bg-[radial-gradient(circle,rgb(245_179_1/.14),transparent_65%)]" />
          <div data-parallax="0.2" className="absolute -right-20 bottom-0 h-[520px] w-[520px] bg-[radial-gradient(circle,rgb(196_138_0/.18),transparent_65%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
          {/* garage light beams */}
          <div className="absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_42%,rgb(255_255_255/.04)_48%,transparent_54%)]" />
        </div>
        <div className="container-x relative grid items-center gap-10 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-16">
          <div>
            <p className="eyebrow rise">Since {client.foundingYear} · {client.yearsInBusiness} years in Wah Cantt</p>
            <h1 id="hero-title" className="rise mt-4 text-[2.6rem] font-extrabold uppercase leading-[.95] sm:text-6xl lg:text-7xl" style={{ ["--d" as string]: "90ms" }}>
              <span className="metal-text">Professional Auto Repair</span>{" "}
              <span className="brand-text">&amp; Advanced Vehicle Services</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-mist" style={{ ["--d" as string]: "180ms" }}>
              {client.name} is a car workshop with two branches in Wah Cantt. We start every job with computerized diagnostics, explain what we
              find in plain language and only repair what you approve — for drivers across Wah Cantt and Taxila.
            </p>
            <ContactButtons className="rise mt-8" />
            <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-mist" style={{ ["--d" as string]: "320ms" }}>
              {["EFI & hybrid specialists", "4.6★ on Google · 134 reviews", "Two branches in Wah Cantt"].map((t) => (
                <li key={t} className="flex items-center gap-2"><ShieldIcon width={18} height={18} className="text-brand" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rise" style={{ ["--d" as string]: "150ms" }}>
            <Hero3D />
          </div>
        </div>
      </section>

      <BrandFilm />

      {/* --------------------------------------------------------- Services */}
      <section className="section carbon garage-light" aria-labelledby="services-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="services-title"
              eyebrow="What we do"
              title={<>Repair &amp; <span className="brand-text">advanced services</span></>}
              intro="From a quick computerized scan to hybrid system diagnosis, everything your car needs is handled under one roof."
            />
            <Link href="/services" className="reveal btn btn-outline shrink-0">All {services.length} services <ArrowRightIcon width={18} height={18} /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.slice(0, 9).map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Why choose us */}
      <section className="section" aria-labelledby="why-title">
        <div className="container-x">
          <SectionHeading
            id="why-title"
            align="center"
            eyebrow="Why My Mechanic.pk"
            title={<>Evidence first. <span className="brand-text">Repairs second.</span></>}
            intro="We built the workshop around a simple promise: you should understand what is wrong with your car before you pay to fix it."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((w, i) => (
              <div key={w.title} className="reveal reveal-tilt card card-hover p-6 text-center" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <Animated className="tilt mx-auto h-24 w-24">
                  <MechanicalArt kind={w.icon} className="h-full w-full" />
                </Animated>
                <h3 className="mt-4 text-2xl font-bold uppercase text-white">{w.title}</h3>
                <p className="mt-2 text-mist">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Process */}
      <section className="section carbon" aria-labelledby="process-title">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal reveal-zoom relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(245_179_1/.12),transparent_65%)]" aria-hidden="true" />
            <Animated className="relative mx-auto max-w-[520px]">
              <MechanicalArt kind="inspection" className="h-auto w-full" label="Animated illustration of a car being scanned during inspection" />
            </Animated>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading id="process-title" eyebrow="How it works" title={<>Our inspection <span className="brand-text">&amp; repair process</span></>} />
            <ol className="mt-8 grid gap-4">
              {processSteps.map((s, i) => (
                <li key={s.title} className="reveal reveal-right flex gap-4" style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/50 bg-brand/10 font-display text-2xl font-extrabold text-brand">
                    {i + 1}
                    <span className="absolute inset-0 rounded-xl ring-2 ring-brand/60 a-glow" style={{ animationDelay: `${i * 0.5}s` }} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold uppercase text-white">{s.title}</h3>
                    <p className="text-mist">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Stats */}
      <section aria-label="Workshop at a glance" className="border-y border-white/8 band-warm">
        <div className="container-x">
          <dl className="grid grid-cols-2 divide-white/8 md:grid-cols-4 md:divide-x">
            {stats.map((s, i) => (
              <div key={s.label} className="reveal reveal-blur flex flex-col-reverse px-4 py-10 text-center" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <dt className="mt-1 text-sm uppercase tracking-wider text-metal">{s.label}</dt>
                <dd className="font-display text-5xl font-extrabold brand-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WorkshopPhotos />

      {/* ------------------------------------------------------- Reviews */}
      <section className="section" aria-labelledby="reviews-title">
        <div className="container-x">
          <SectionHeading id="reviews-title" eyebrow="Customer reviews" title={<>What customers <span className="brand-text">say</span></>} />
          <div className="mt-10"><ReviewsBlock limit={3} /></div>
        </div>
      </section>

      <ServiceArea />

      {/* ----------------------------------------------------------- FAQ */}
      <section className="section carbon" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title={<>Frequently asked <span className="brand-text">questions</span></>} intro="Can't find your answer? Message us on WhatsApp — we're happy to help." />
            <Animated className="reveal reveal-left mt-8 hidden max-w-[260px] lg:block">
              <MechanicalArt kind="engine" className="h-auto w-full" />
            </Animated>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
