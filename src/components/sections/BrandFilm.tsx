import { client, branchAddress } from "@/config/client";
import { branchDirectionsHref } from "@/lib/links";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { LoopVideo } from "@/components/visuals/LoopVideo";
import { DirectionsIcon, PinIcon } from "@/components/Icons";

/** Home-page brand section: the animated logo film beside a short introduction and both branches. */
export function BrandFilm() {
  return (
    <section className="section overflow-hidden" aria-labelledby="brand-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading
            id="brand-title"
            eyebrow={`Meet ${client.name}`}
            title={<>Your mechanic, <span className="brand-text">two branches</span> in Wah Cantt</>}
            intro="Since 1998 — over 27 years of honest diagnosis, clear estimates and careful repairs, whether you drop in at Laiq Ali Chowk or at Taj Market, New City Phase-1. One number reaches both branches."
          />
          <ul className="reveal reveal-left mt-8 grid gap-4 sm:grid-cols-2">
            {client.branches.map((b, i) => (
              <li key={b.id} className="card card-hover flex flex-col p-5" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand">
                  <PinIcon width={16} height={16} /> {b.label}
                </span>
                <p className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-white">{b.name}</p>
                <p className="mt-1 text-sm text-mist">{branchAddress(b)}</p>
                <a href={branchDirectionsHref(b)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-brand hover:text-brand-bright">
                  <DirectionsIcon width={16} height={16} /> Directions
                </a>
              </li>
            ))}
          </ul>
          <ContactButtons className="reveal mt-8" />
        </div>

        <figure className="reveal reveal-zoom relative mx-auto w-full max-w-[340px]" style={{ ["--d" as string]: "120ms" }}>
          <div className="absolute -inset-10 bg-[radial-gradient(circle,rgb(245_179_1/.28),transparent_65%)]" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-surface p-2 shadow-deep">
            <LoopVideo
              src="/media/logo-animation.mp4"
              poster="/media/logo-animation-poster.webp"
              label={`${client.name} animated logo: a gear and spanner drop onto a steel plate as the name appears`}
              className="aspect-[9/16] w-full rounded-[1.6rem] object-cover"
            />
          </div>
          <figcaption className="sr-only">{client.name} — Auto Workshop, Wah Cantt</figcaption>
        </figure>
      </div>
    </section>
  );
}
