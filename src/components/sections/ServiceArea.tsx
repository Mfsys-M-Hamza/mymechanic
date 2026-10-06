import { client, branchAddress } from "@/config/client";
import { branchDirectionsHref } from "@/lib/links";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoursList } from "@/components/HoursList";
import { ClockIcon, DirectionsIcon, PinIcon } from "@/components/Icons";

export function ServiceArea() {
  return (
    <section className="section" aria-labelledby="area-title">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="area-title"
            eyebrow="Service area"
            title={<>Two branches in <span className="brand-text">Wah Cantt</span></>}
            intro={`Visit us at Shop-07, Laiq Ali Chowk or at Taj Market, New City Phase-1 — convenient for drivers across Wah Cantt, Taxila and the GT Road corridor.`}
          />
          <ul className="reveal mt-6 flex flex-wrap gap-2" aria-label="Nearby areas we serve">
            {client.serviceAreas.nearby.map((a) => (
              <li key={a} className="rounded-full border border-white/12 bg-white/[.03] px-3.5 py-1.5 text-sm text-mist">{a}</li>
            ))}
          </ul>
          <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
            {client.branches.map((b) => (
              <div key={b.id} className="card flex flex-col p-5">
                <PinIcon className="text-brand" />
                <p className="mt-2 text-xs font-bold uppercase tracking-[.14em] text-brand">{b.label}</p>
                <h3 className="font-display text-xl font-bold uppercase text-white">{b.name}</h3>
                <p className="mt-1 text-mist">{branchAddress(b)}</p>
                <a href={branchDirectionsHref(b)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-brand hover:text-brand-bright">
                  <DirectionsIcon width={16} height={16} /> Get directions
                </a>
              </div>
            ))}
            <div className="card p-5 sm:col-span-2">
              <ClockIcon className="text-brand" />
              <h3 className="mt-2 font-display text-xl font-bold uppercase text-white">Opening hours</h3>
              <div className="mt-1 text-sm"><HoursList compact /></div>
            </div>
          </div>
        </div>
        <MapEmbed className="reveal reveal-right aspect-[4/3] w-full" />
      </div>
    </section>
  );
}
