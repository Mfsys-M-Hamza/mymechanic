import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { PartsCatalog } from "@/components/PartsCatalog";
import { CtaBand } from "@/components/ui/CtaBand";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Car Spare Parts in Wah Cantt — Body Parts, Lights, Engine & More",
  description:
    "Car spare parts at My Mechanic.pk, Wah Cantt: body parts, headlights and tail lights, engine, brake and suspension parts, oils and filters, batteries and AC parts. Ask on WhatsApp for availability.",
  path: "/spare-parts",
});

const promises = [
  "Parts matched to your exact make, model and year",
  "Quality and genuine options explained before you buy",
  "Professional fitting at either of our branches",
];

export default function SparePartsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Spare Parts", path: "/spare-parts" }]}
        eyebrow="Spare parts"
        title={<>Car <span className="brand-text">spare parts</span></>}
        intro={
          <p>
            From bumpers and headlights to brake pads, filters and batteries — we source the right part for your car and can fit it for you.
            Prices and availability depend on the vehicle, so send us your car details on WhatsApp.
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
