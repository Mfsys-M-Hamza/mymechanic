import type { Metadata } from "next";
import Link from "next/link";
import { featuredServices } from "@/data/services";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="carbon garage-light relative overflow-hidden">
      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 text-5xl font-extrabold uppercase text-white sm:text-7xl">
            Wrong <span className="brand-text">turn</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-mist">
            We couldn&apos;t find the page you were looking for. It may have moved, or the link may be mistyped. Try one of these instead:
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li><Link href="/" className="btn btn-outline btn-sm">Home</Link></li>
            <li><Link href="/services" className="btn btn-outline btn-sm">All services</Link></li>
            {featuredServices.slice(0, 3).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="btn btn-outline btn-sm">{s.shortName}</Link></li>
            ))}
            <li><Link href="/contact" className="btn btn-outline btn-sm">Contact</Link></li>
          </ul>
          <ContactButtons className="mt-8" />
        </div>
        <Animated className="mx-auto w-full max-w-[360px]">
          <MechanicalArt kind="tow" className="h-auto w-full" />
        </Animated>
      </div>
    </section>
  );
}
