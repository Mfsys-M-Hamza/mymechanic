import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/config/client";
import { about, galleryItems } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/basePath";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { CtaBand } from "@/components/ui/CtaBand";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { CheckCircleIcon, ShieldIcon } from "@/components/Icons";
import type { VisualKey } from "@/data/services";

export const metadata: Metadata = pageMetadata({
  title: "About My Mechanic.pk — Car Workshop in Wah Cantt",
  description:
    "My Mechanic.pk has repaired cars in Wah Cantt since 1998 — 27+ years in business. EFI & hybrid specialists with two branches, at Laiq Ali Chowk and Taj Market, New City Phase-1.",
  path: "/about",
});

const valueIcons: VisualKey[] = ["inspection", "scanner", "gear", "electrical"];

export default function AboutPage() {
  const [teamPhoto, shopPhoto] = ["p5", "p3"].map((id) => galleryItems.find((g) => g.id === id));
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow={`${client.foundingYear ? `Est. ${client.foundingYear} · ` : ""}Two branches in Wah Cantt`}
        title={<>About <span className="brand-text">{client.name}</span></>}
        intro={<p>{client.yearsInBusiness} years of car repair in Wah Cantt — EFI and hybrid specialists who believe you should understand the problem before you pay for the repair.</p>}
        visual="gear"
      />

      {/* Story */}
      <section className="section" aria-labelledby="story-title">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="story-title" eyebrow="Our story" title={<>Built around <span className="brand-text">diagnosis</span></>} />
            <div className="prose-garage reveal mt-6">{about.story.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <div className="reveal reveal-right relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-6 bg-[radial-gradient(circle,rgb(245_179_1/.16),transparent_65%)]" aria-hidden="true" />
            {teamPhoto?.src && shopPhoto?.src ? (
              <div className="relative pb-16 pr-16">
                <Image src={asset(teamPhoto.src)} alt={teamPhoto.alt} width={teamPhoto.width} height={teamPhoto.height} sizes="(min-width: 1024px) 380px, 80vw" className="card aspect-[4/5] w-full object-cover" />
                <Image src={asset(shopPhoto.src)} alt={shopPhoto.alt} width={shopPhoto.width} height={shopPhoto.height} sizes="220px" className="card absolute bottom-0 right-0 aspect-square w-[52%] border-4 border-ink object-cover" />
                {client.foundingYear && (
                  <p className="absolute left-4 top-4 rounded-xl bg-brand px-4 py-2 text-center font-display font-extrabold uppercase leading-none text-[#111111] shadow-deep">
                    <span className="block text-xs tracking-[.2em]">Est.</span>
                    <span className="text-3xl">{client.foundingYear}</span>
                  </p>
                )}
              </div>
            ) : (
              <Animated className="relative mx-auto max-w-[440px]">
                <MechanicalArt kind="gear" className="h-auto w-full" label="Animated illustration of turning workshop gears" />
              </Animated>
            )}
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <section className="section carbon garage-light" aria-labelledby="mission-title">
        <div className="container-x">
          <SectionHeading id="mission-title" align="center" eyebrow="Mission & values" title={<>What we <span className="brand-text">stand for</span></>} intro={about.mission} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.title} className="reveal card card-hover p-6" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <Animated className="tilt h-16 w-16"><MechanicalArt kind={valueIcons[i % valueIcons.length]} className="h-full w-full" /></Animated>
                <h3 className="mt-4 text-2xl font-bold uppercase text-white">{v.title}</h3>
                <p className="mt-2 text-mist">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & standards */}
      <section className="section" aria-labelledby="cap-title">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="reveal card p-8">
            <h2 id="cap-title" className="text-3xl font-extrabold uppercase text-white">Technical <span className="brand-text">capabilities</span></h2>
            <ul className="mt-6 grid gap-3">
              {about.capabilities.map((c) => <li key={c} className="flex gap-3 text-mist"><CheckCircleIcon className="mt-0.5 shrink-0 text-brand" />{c}</li>)}
            </ul>
          </div>
          <div className="reveal card p-8" style={{ ["--d" as string]: "90ms" }}>
            <h2 className="text-3xl font-extrabold uppercase text-white">Workshop <span className="brand-text">standards</span></h2>
            <ul className="mt-6 grid gap-3">
              {about.standards.map((c) => <li key={c} className="flex gap-3 text-mist"><ShieldIcon className="mt-0.5 shrink-0 text-brand" />{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Transparent pricing + technicians */}
      <section className="section carbon" aria-labelledby="pricing-title">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading id="pricing-title" eyebrow="Our commitment" title={<>Transparent pricing, <span className="brand-text">reliable repairs</span></>} />
            <div className="prose-garage mt-6">
              <p>
                We don&apos;t publish fixed prices because every car and every fault is different. What we do promise is a clear process: we inspect,
                explain what we found, and give you an estimate. Work only starts after you approve it — and if we find something else along the
                way, we contact you before going further.
              </p>
              <p>If a repair isn&apos;t worth doing, or can safely wait, we&apos;ll tell you that too.</p>
            </div>
            <ContactButtons className="mt-6" />
          </div>
          <div className="reveal card p-8" style={{ ["--d" as string]: "90ms" }}>
            <h2 className="text-3xl font-extrabold uppercase text-white">Our <span className="brand-text">technicians</span></h2>
            {about.team.length > 0 ? (
              <ul className="mt-6 grid gap-5">
                {about.team.map((t) => (
                  <li key={t.name}>
                    <p className="font-display text-xl font-bold text-white">{t.name}</p>
                    <p className="text-sm text-brand">{t.role}</p>
                    <p className="mt-1 text-mist">{t.bio}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-mist">
                Our technicians work with computerized diagnostic equipment and follow a scan-test-explain process on every job. Detailed technician
                profiles will be added here soon.
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
