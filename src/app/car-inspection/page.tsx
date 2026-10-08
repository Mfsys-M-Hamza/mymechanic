import type { Metadata } from "next";
import Image from "next/image";
import { client, branchAddress } from "@/config/client";
import { inspectionFaqs, inspectionSteps } from "@/data/inspections";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/links";
import { asset } from "@/lib/basePath";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { InspectionForm } from "@/components/forms/InspectionForm";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import type { VisualKey } from "@/data/services";
import { CheckIcon, PinIcon, ShieldIcon, StarIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Car Inspection in Wah Cantt — Used & New Car Inspection",
  description:
    "Pre-purchase used car inspection and new car pre-delivery inspection at My Mechanic.pk, Wah Cantt. Engine, accident check, suspension, electrics, AC and road test. Book online, confirm on WhatsApp.",
  path: "/car-inspection",
});

const PHOTO = { src: "/media/inspection-corolla-cross.webp", width: 1200, height: 1600, alt: "My Mechanic technician inspecting the engine bay of a Toyota Corolla Cross hybrid with the bonnet open" };
const PHOTO2 = { src: "/media/inspection-markx.webp", width: 1200, height: 900, alt: "My Mechanic technician checking the engine of a white Toyota Mark X outside the workshop, beside a Liqui Moly sign" };
const p = client.inspectionPrices;
/** Car pictures for the charges cards (built by scripts/build-inspection-cars.mjs). */
const CAR_IMG = {
  suv: { src: "/inspection/suv.webp", width: 322, height: 212, alt: "Red compact SUV" },
  sedan: { src: "/inspection/sedan.webp", width: 533, height: 321, alt: "Silver sedan" },
  hatch: { src: "/inspection/hatchback.webp", width: 479, height: 295, alt: "White Toyota Yaris hatchback" },
  newCar: { src: "/inspection/new-car-gift.webp", width: 307, height: 299, alt: "New white car wrapped in a red gift ribbon and bow" },
};
function CarPic({ car, className }: { car: keyof typeof CAR_IMG; className: string }) {
  const c = CAR_IMG[car];
  return <Image src={asset(c.src)} alt={c.alt} width={c.width} height={c.height} sizes="200px" className={`object-contain ${className}`} />;
}
const priceAsk = (what: string) => whatsappHref(`Hello ${client.name}, what is the price of a ${what}?\n\nVehicle (make/model/year): `);

function Price({ value, ask }: { value: number | null; ask: string }) {
  return value ? (
    <p className="whitespace-nowrap font-display text-2xl font-extrabold text-white sm:text-3xl">PKR {value.toLocaleString("en-US")}</p>
  ) : (
    <a href={ask} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 whitespace-nowrap font-display text-xl font-extrabold uppercase text-brand hover:text-brand-bright sm:text-2xl">
      <WhatsAppIcon width={20} height={20} className="shrink-0" /> Ask for price
    </a>
  );
}

const whyInspect: { title: string; text: string; icon: VisualKey }[] = [
  { title: "Hidden faults", text: "Accident repairs, worn parts and engine or gearbox problems are easy to hide from a quick look or a short test drive.", icon: "inspection" },
  { title: "More than a quick look", text: "A proper check needs the right tools — a computerized scan, a lift or pit, and mechanics who know what to look for.", icon: "scanner" },
  { title: "Negotiate smarter", text: "Use what we find to agree a fairer price with the seller — or walk away before you buy a problem.", icon: "gear" },
];

const whyUs = [
  { big: `${client.yearsInBusiness}`, small: "Years in business", text: `Repairing cars in Wah Cantt since ${client.foundingYear}.` },
  { big: `${client.googleRating.value}★`, small: `${client.googleRating.count} Google reviews`, text: "Rated by customers at our main branch, Laiq Ali Chowk." },
  { big: "EFI & Hybrid", small: "Specialists", text: "Modern fuel injection, hybrid systems and Japanese imports are our everyday work." },
  { big: "2", small: "Branches", text: "Laiq Ali Chowk and New City Phase-1 — choose the one closest to you." },
];

const coverage: { title: string; points: string; icon: VisualKey }[] = [
  { title: "Engine", points: "Leaks, noises, smoke, idle and power", icon: "engine" },
  { title: "Computerized scan", points: "Stored & pending fault codes, live data", icon: "scanner" },
  { title: "Accident history", points: "Repainted panels, gaps, signs of repair", icon: "inspection" },
  { title: "Exterior & body frame", points: "Paint, rust, chassis and structure", icon: "gear" },
  { title: "Suspension & steering", points: "Shocks, bushes, joints and play", icon: "suspension" },
  { title: "Brakes", points: "Pads, discs, fluid and ABS warnings", icon: "brake" },
  { title: "Electrical", points: "Battery, charging, lights and controls", icon: "electrical" },
  { title: "Interior & AC", points: "Cooling, blower, seats and features", icon: "ac" },
  { title: "Hybrid system", points: "Hybrid battery and system codes", icon: "hybrid" },
  { title: "Road test", points: "Gearbox, brakes and handling on the move", icon: "gear" },
];

const trust = [
  "Experienced mechanics — EFI & hybrid specialists in business since 1998",
  "Japanese imports, local cars and hybrids inspected every day",
  "Every finding explained in plain language — you can watch the inspection",
  "Inspection only if that's all you need — no pressure to book repairs",
];

export default function CarInspectionPage() {
  return (
    <>
      {/* 1. Booking form at the top */}
      <section className="relative overflow-hidden carbon garage-light border-b border-white/6" aria-labelledby="inspection-title">
        <div id="book" className="container-x grid scroll-mt-24 gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.25fr] lg:py-16">
          <div className="flex flex-col">
            <Breadcrumbs items={[{ name: "Car Inspection", path: "/car-inspection" }]} />
            <p className="eyebrow mt-6 rise">Car inspection · Wah Cantt</p>
            <h1 id="inspection-title" className="rise mt-3 text-4xl font-extrabold uppercase text-white sm:text-5xl" style={{ ["--d" as string]: "80ms" }}>
              Book a <span className="brand-text">car inspection</span>
            </h1>
            <p className="rise mt-4 max-w-xl text-lg text-mist" style={{ ["--d" as string]: "160ms" }}>
              Buying a used car or collecting a new one? Our mechanics check it thoroughly and explain exactly what they find — at Laiq Ali Chowk or
              New City Phase-1.
            </p>
            <div className="rise relative mt-8 hidden min-h-0 flex-1 flex-col gap-5 lg:flex" style={{ ["--d" as string]: "220ms" }}>
              <div className="absolute -inset-6 bg-[radial-gradient(circle,rgb(245_179_1/.18),transparent_65%)]" aria-hidden="true" />
              <Image src={asset(PHOTO.src)} alt={PHOTO.alt} width={PHOTO.width} height={PHOTO.height} priority sizes="(min-width: 1024px) 40vw, 0px"
                className="relative min-h-[220px] w-full flex-1 basis-0 rounded-[1.75rem] border-2 border-brand/50 object-cover shadow-deep" />
              <Image src={asset(PHOTO2.src)} alt={PHOTO2.alt} width={PHOTO2.width} height={PHOTO2.height} sizes="(min-width: 1024px) 40vw, 0px"
                className="relative min-h-[220px] w-full flex-1 basis-0 rounded-[1.75rem] border-2 border-brand/50 object-cover shadow-deep" />
            </div>
          </div>
          <div className="rise" style={{ ["--d" as string]: "120ms" }}>
            <InspectionForm />
          </div>
        </div>
      </section>

      {/* 2. Image (phones and tablets; on desktop it sits beside the form) */}
      <section className="container-x pt-10 lg:hidden" aria-label="Inspection in progress">
        <Image src={asset(PHOTO.src)} alt={PHOTO.alt} width={PHOTO.width} height={PHOTO.height} sizes="100vw"
          className="aspect-[4/3] w-full rounded-[1.75rem] border-2 border-brand/50 object-cover shadow-deep" />
      </section>

      {/* 3. Charges */}
      <section className="section" aria-labelledby="charges-title">
        <div className="container-x">
          <SectionHeading id="charges-title" eyebrow="Charges" title={<>What are car inspection <span className="brand-text">charges?</span></>} />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
            <div className="reveal reveal-left card p-6 sm:p-8">
              <h3 className="text-2xl font-bold uppercase text-white">Used car inspection</h3>
              <p className="mt-1 text-sm text-metal">At either of our Wah Cantt branches, Saturday – Thursday</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-5 sm:col-span-2">
                  <div className="min-w-0"><Price value={p.suv} ask={priceAsk("used SUV / 4x4 / German car inspection")} /><p className="mt-1 text-mist">SUVs, 4x4, Jeeps &amp; German cars</p></div>
                  <CarPic car="suv" className="h-20 w-28 shrink-0 sm:h-28 sm:w-44" />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-5">
                  <div className="min-w-0"><Price value={p.mid} ask={priceAsk("used car inspection (1001–2000cc)")} /><p className="mt-1 text-mist">1001cc – 2000cc</p></div>
                  <CarPic car="sedan" className="h-16 w-24 shrink-0 xl:h-20 xl:w-32" />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-5">
                  <div className="min-w-0"><Price value={p.small} ask={priceAsk("used car inspection (up to 1000cc)")} /><p className="mt-1 text-mist">Up to 1000cc</p></div>
                  <CarPic car="hatch" className="h-16 w-24 shrink-0 xl:h-20 xl:w-32" />
                </div>
              </div>
            </div>
            <div className="reveal reveal-right card flex flex-col p-6 sm:p-8">
              <h3 className="text-2xl font-bold uppercase text-white">New car inspection</h3>
              <p className="mt-1 text-sm text-metal">Before you accept delivery — at our branch</p>
              <div className="mt-6 flex flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-white/[.03] p-5">
                <div><Price value={p.newCar} ask={priceAsk("new car pre-delivery inspection")} /><p className="mt-1 text-mist">Pre-delivery inspection</p></div>
                <CarPic car="newCar" className="mx-auto mt-6 h-36 w-52 sm:h-44 sm:w-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why get a pre-purchase inspection */}
      <section className="section carbon" aria-labelledby="why-inspect-title">
        <div className="container-x">
          <SectionHeading id="why-inspect-title" align="center" eyebrow="Before you buy" title={<>Why get a <span className="brand-text">pre-purchase inspection?</span></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {whyInspect.map((w, i) => (
              <div key={w.title} className="reveal reveal-tilt card card-hover p-6 text-center" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <Animated className="mx-auto h-20 w-20"><MechanicalArt kind={w.icon} className="h-full w-full" /></Animated>
                <h3 className="mt-4 text-2xl font-bold uppercase text-white">{w.title}</h3>
                <p className="mt-2 text-mist">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why choose My Mechanic */}
      <section className="section" aria-labelledby="why-us-title">
        <div className="container-x">
          <SectionHeading id="why-us-title" align="center" eyebrow={`Why ${client.name}`} title={<>Why choose <span className="brand-text">My Mechanic?</span></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <div key={w.small} className="reveal reveal-zoom card p-6 text-center" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <p className="font-display text-4xl font-extrabold brand-text">{w.big}</p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[.12em] text-white">{w.small}</p>
                <p className="mt-3 text-sm text-mist">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How it works */}
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

      {/* 7. What the inspection covers */}
      <section className="section" aria-labelledby="covers-title">
        <div className="container-x">
          <SectionHeading id="covers-title" eyebrow="What we check" title={<>What our inspection <span className="brand-text">covers</span></>}
            intro="Every check is explained to you in plain language once the inspection is done." />
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {coverage.map((c, i) => (
              <li key={c.title} className="reveal reveal-zoom card card-hover flex flex-col items-center p-5 text-center" style={{ ["--d" as string]: `${(i % 5) * 60}ms` }}>
                <Animated className="h-14 w-14"><MechanicalArt kind={c.icon} className="h-full w-full" /></Animated>
                <h3 className="mt-3 font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-metal">{c.points}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Areas */}
      <section className="section carbon" aria-labelledby="areas-title">
        <div className="container-x">
          <SectionHeading id="areas-title" align="center" eyebrow="Service area" title={<>Serving <span className="brand-text">{client.serviceAreas.primary.length} cities</span></>}
            intro="Bring your car to either of our Wah Cantt branches — customers come to us from all of these cities and nearby areas." />
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {client.serviceAreas.primary.map((c) => (
              <li key={c} className="reveal flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 font-semibold text-white">
                <PinIcon width={16} height={16} className="text-brand" /> {c}
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {client.serviceAreas.nearby.map((a) => (
              <li key={a} className="rounded-full border border-white/12 bg-white/[.03] px-3.5 py-1.5 text-sm text-mist">{a}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {client.branches.map((b) => (
              <div key={b.id} className="reveal card flex items-start gap-3 p-5">
                <PinIcon className="mt-0.5 shrink-0 text-brand" />
                <p><span className="block text-xs font-bold uppercase tracking-[.14em] text-brand">Inspection centre · {b.label}</span>
                  <span className="font-semibold text-white">{b.name}</span><span className="block text-sm text-mist">{branchAddress(b)}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Trust */}
      <section className="section" aria-labelledby="trust-title">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="trust-title" eyebrow="Peace of mind" title={<>A pre-purchase inspection <span className="brand-text">you can trust</span></>}
              intro={`For ${client.yearsInBusiness} years, drivers across Wah Cantt, Taxila, Islamabad and Rawalpindi have trusted our mechanics with their cars. A used car is a big purchase — we make sure you know exactly what you're getting.`} />
            <ul className="reveal mt-6 grid gap-3">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-3 text-soft"><ShieldIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-right card p-8 text-center">
            <div className="flex justify-center gap-1 text-brand" aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} width={26} height={26} className={n <= 4 ? "" : "opacity-60"} />)}</div>
            <p className="mt-3 font-display text-6xl font-extrabold brand-text">{client.googleRating.value}</p>
            <p className="mt-1 font-semibold text-white">{client.googleRating.count} Google reviews</p>
            <p className="text-sm text-metal">Main branch, Laiq Ali Chowk</p>
            <a href="#book" className="btn btn-primary mt-6"><CheckIcon /> Book your inspection</a>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section carbon" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={<>Car inspection <span className="brand-text">FAQs</span></>}
            intro="Can't find your answer? Message us on WhatsApp — we're happy to help." />
          <Faq items={inspectionFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
