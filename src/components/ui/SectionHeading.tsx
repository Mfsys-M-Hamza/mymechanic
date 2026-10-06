import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow, title, intro, align = "left", id,
}: { eyebrow?: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center"; id?: string }) {
  return (
    <div className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-3 text-3xl font-extrabold uppercase text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-mist">{intro}</p>}
    </div>
  );
}
