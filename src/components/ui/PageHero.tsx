import type { ReactNode } from "react";
import type { VisualKey } from "@/data/services";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";

/** Header block for inner pages: breadcrumb, single H1, intro and an animated visual. */
export function PageHero({
  crumbs, eyebrow, title, intro, visual = "gear", children,
}: { crumbs: Crumb[]; eyebrow?: string; title: ReactNode; intro?: ReactNode; visual?: VisualKey; children?: ReactNode }) {
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
        <Animated className="relative mx-auto hidden w-full max-w-[320px] a-float md:block">
          <MechanicalArt kind={visual} className="h-auto w-full drop-shadow-[0_25px_40px_rgba(0,0,0,.6)]" />
        </Animated>
      </div>
    </section>
  );
}
