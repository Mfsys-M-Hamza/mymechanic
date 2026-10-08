import type { ReactNode } from "react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import type { VisualKey } from "@/data/services";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";

type HeroPhoto = { src: string; width: number; height: number; alt: string };

/** Header block for inner pages: breadcrumb, single H1, intro and an animated visual (or a photo). */
export function PageHero({
  crumbs, eyebrow, title, intro, visual = "gear", photo, children,
}: { crumbs: Crumb[]; eyebrow?: string; title: ReactNode; intro?: ReactNode; visual?: VisualKey; photo?: HeroPhoto; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden carbon garage-light border-b border-white/6">
      <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow mt-6 rise">{eyebrow}</p>}
          <h1 className="rise mt-3 text-4xl font-extrabold uppercase text-white sm:text-5xl lg:text-6xl" style={{ ["--d" as string]: "80ms" }}>
            {title}
          </h1>
          {intro && <div className="rise mt-5 max-w-2xl text-lg text-mist" style={{ ["--d" as string]: "160ms" }}>{intro}</div>}
          {children && <div className="rise mt-7" style={{ ["--d" as string]: "240ms" }}>{children}</div>}
        </div>
        {photo ? (
          <div className="rise relative mx-auto w-full max-w-[420px]" style={{ ["--d" as string]: "120ms" }}>
            <div className="absolute -inset-6 bg-[radial-gradient(circle,rgb(245_179_1/.2),transparent_65%)]" aria-hidden="true" />
            <Image
              src={asset(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="relative aspect-[4/5] w-full rounded-[1.75rem] border-2 border-brand/50 object-cover shadow-deep"
            />
          </div>
        ) : (
          <Animated className="relative mx-auto hidden w-full max-w-[320px] a-float md:block">
            <MechanicalArt kind={visual} className="h-auto w-full drop-shadow-[0_25px_40px_rgba(0,0,0,.6)]" />
          </Animated>
        )}
      </div>
    </section>
  );
}
