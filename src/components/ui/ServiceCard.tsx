import Link from "next/link";
import type { Service } from "@/data/services";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { ArrowRightIcon } from "@/components/Icons";

export function ServiceCard({ service, index = 0, headingLevel = "h3" }: { service: Service; index?: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={`reveal ${["reveal-left", "reveal-zoom", "reveal-right"][index % 3]} card card-hover group flex h-full flex-col p-6`} style={{ ["--d" as string]: `${(index % 3) * 90}ms` }}>
      <Animated className="tilt mb-5 h-20 w-20 rounded-2xl bg-ink/60 p-2 ring-1 ring-white/8">
        <MechanicalArt kind={service.visual} className="h-full w-full" />
      </Animated>
      <H className="text-2xl font-bold uppercase text-white">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-[18px] focus-visible:outline-none">
          {service.name}
        </Link>
      </H>
      <p className="mt-3 flex-1 text-mist">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand transition-[gap] group-hover:gap-3" aria-hidden="true">
        Learn more <ArrowRightIcon width={18} height={18} />
      </span>
    </article>
  );
}
