import type { Metadata } from "next";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Car Repair & Maintenance Services in Wah Cantt",
  description:
    "Car repair and maintenance services in Wah Cantt: EFI, computerized scanning & tuning, hybrid, AC, brakes, suspension, oil change, battery and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Our services"
        title={<>Car repair &amp; maintenance <span className="brand-text">in Wah Cantt</span></>}
        intro={
          <p>
            Every service starts with diagnosis. We explain what we find and share an estimate before any work begins. Final cost and repair time
            always depend on inspection — which is why we don&apos;t publish fixed prices.
          </p>
        }
        visual="engine"
      >
        <ContactButtons />
      </PageHero>

      <section className="section" aria-label="All services">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} headingLevel="h2" />)}
        </div>
      </section>

      <CtaBand title="Not sure which service you need?" text="Describe the problem on WhatsApp or book a computerized scan — we'll help you figure out the next step." />
    </>
  );
}
