import type { Metadata } from "next";
import { client, branchAddress, primaryBranch } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { branchDirectionsHref, directionsHref, telHref, whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { HoursList } from "@/components/HoursList";
import { ClockIcon, DirectionsIcon, PhoneIcon, PinIcon, WhatsAppIcon, socialIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact My Mechanic.pk — Car Workshop in Wah Cantt",
  description:
    "Contact My Mechanic.pk at Laiq Ali Chowk or New City Phase-1, Main GT Road, Wah Cantt. Call or WhatsApp 0312-5045678. Get directions to either branch.",
  path: "/contact",
});

export default function ContactPage() {
  const cards = [
    { icon: WhatsAppIcon, title: "WhatsApp", value: client.whatsapp.display, href: whatsappHref(), external: true, cta: "Chat on WhatsApp" },
    { icon: PhoneIcon, title: "Telephone", value: client.phone.display, href: telHref, external: false, cta: "Call now" },
    ...client.branches.map((b) => ({ icon: PinIcon, title: b.label, value: branchAddress(b), href: branchDirectionsHref(b), external: true, cta: "Get directions" })),
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Get in touch"
        title={<>Contact <span className="brand-text">us</span></>}
        intro={<p>WhatsApp is the quickest way to reach us. You can also call, send a message below, or visit either of our branches in Wah Cantt.</p>}
        visual="electrical"
      />

      <section className="section pt-12" aria-label="Contact details">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((c, i) => (
              <li key={c.title} className="reveal card card-hover flex flex-col p-6" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <c.icon width={28} height={28} className="text-brand" />
                <h2 className="mt-3 text-2xl font-bold uppercase text-white">{c.title}</h2>
                <p className="mt-1 flex-1 text-mist">{c.value}</p>
                <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-outline btn-sm mt-5 self-start">{c.cta}</a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <ContactForm />
            <div className="grid content-start gap-5">
              <div className="reveal card p-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold uppercase text-white"><ClockIcon className="text-brand" /> Business hours</h2>
                <div className="mt-3"><HoursList /></div>
              </div>
              <div className="reveal card p-6">
                <h2 className="text-2xl font-bold uppercase text-white">Service area</h2>
                <p className="mt-2 text-mist">
                  We serve customers across {client.serviceAreas.primary.join(" and ")}, including {client.serviceAreas.nearby.slice(0, 5).join(", ")} and
                  nearby areas.
                </p>
              </div>
              <div className="reveal card p-6">
                <h2 className="text-2xl font-bold uppercase text-white">Follow us</h2>
                <p className="mt-1 text-sm text-metal">{client.social.handle}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {client.social.links.map((s) => {
                    const Icon = socialIcon[s.label];
                    return (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                          {Icon && <Icon width={16} height={16} />} {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <h2 className="reveal text-3xl font-extrabold uppercase text-white sm:text-4xl">Find <span className="brand-text">{primaryBranch.label}</span></h2>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><DirectionsIcon /> Directions</a>
            </div>
            <MapEmbed className="aspect-[4/3] w-full sm:aspect-[21/9]" />
          </div>
        </div>
      </section>
    </>
  );
}
