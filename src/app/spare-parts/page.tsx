import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { PartsCatalog } from "@/components/PartsCatalog";
import { CtaBand } from "@/components/ui/CtaBand";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Engine Oils, Fluids & Car Care Products in Wah Cantt",
  description:
    "Genuine and branded engine oils, transmission fluids, brake fluids, coolants and fuel-system treatments at My Mechanic.pk, Wah Cantt — Toyota, Honda, Liqui Moly, Shell, ZIC, Kixx, Motul and more. Ask on WhatsApp for availability.",
  path: "/spare-parts",
});

const promises = [
  "The right grade for your exact make, model and year",
  "Genuine and trusted brands — Toyota, Honda, Liqui Moly, Shell, ZIC and more",
  "Fitted or topped up by our team at either branch",
];

export default function SparePartsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Spare Parts", path: "/spare-parts" }]}
        eyebrow="Spare parts"
        title={<>Oils, fluids &amp; <span className="brand-text">car care</span></>}
        intro={
          <p>
            Genuine and branded engine oils, transmission and brake fluids, coolants and fuel-system treatments — stocked at our workshop and
            matched to your car. Send us your car details on WhatsApp for the right product and current availability.
          </p>
        }
        visual="gear"
      >
        <a
          href={whatsappHref(`Hello ${client.name}, I'm looking for a spare part.\n\nPart: \nVehicle (make/model/year): `)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
        >
          <WhatsAppIcon /> Ask for a part on WhatsApp
        </a>
      </PageHero>

      <section className="section pt-12" aria-label="Spare parts catalogue">
        <div className="container-x">
          <ul className="reveal mb-10 grid gap-3 sm:grid-cols-3" aria-label="Why buy parts from us">
            {promises.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm text-mist">
                <CheckCircleIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />
                {t}
              </li>
            ))}
          </ul>
          <PartsCatalog />
          <p className="mt-10 text-sm text-metal">
            Don&apos;t see your part? We source many more than are listed here — call or WhatsApp {client.whatsapp.display}.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
