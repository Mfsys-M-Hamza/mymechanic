import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/data/content";
import { asset } from "@/lib/basePath";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/Icons";

/** Home-page highlight of the workshop's two flagship machines (gallery items e1, e2). */
const FEATURES = [
  {
    id: "e1",
    badge: "Ultrasonic cleaning",
    title: "Ultrasonic fuel injector cleaning machine",
    text: "Our AMT GDI injector bench tests and cleans up to six injectors at once — including modern direct-injection (GDI) injectors — with an ultrasonic bath that removes deposits a fuel additive can't reach.",
    points: ["Flow-rate & spray-pattern test", "Leak test before and after", "Ultrasonic deep clean"],
    href: "/services/fuel-injector-cleaning",
    cta: "Fuel injector cleaning",
  },
  {
    id: "e2",
    badge: "Advanced tuning",
    title: "Advanced tuning kit",
    text: "A pressurised fuel-system cleaning and tuning kit with adapters for most engines, so injectors, the fuel rail and the throttle can be cleaned on the car — no stripping down — for a smoother idle and better average.",
    points: ["Cleans without removing parts", "Adapters for most engines", "Smoother idle, better average"],
    href: "/services/engine-tuning",
    cta: "Engine tuning",
  },
];

export function SpecialistEquipment() {
  const items = FEATURES.map((f) => ({ ...f, img: galleryItems.find((g) => g.id === f.id) })).filter((f) => f.img?.src);
  if (items.length === 0) return null;
  return (
    <section className="section carbon garage-light" aria-labelledby="equipment-title">
      <div className="container-x">
        <SectionHeading
          id="equipment-title"
          align="center"
          eyebrow="Specialist equipment"
          title={<>Tools most workshops <span className="brand-text">don&apos;t have</span></>}
          intro="We invest in professional equipment so your car is diagnosed and repaired properly — not by guesswork."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.map((f, i) => (
            <article
              key={f.id}
              className={`reveal ${i ? "reveal-right" : "reveal-left"} group relative overflow-hidden rounded-[1.75rem] border-2 border-brand/60 bg-surface shadow-[0_0_0_1px_rgb(245_179_1/.15),0_30px_70px_-30px_rgb(245_179_1/.45)] transition-colors hover:border-brand`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset(f.img!.src!)}
                  alt={f.img!.alt}
                  width={f.img!.width}
                  height={f.img!.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 rounded-full bg-brand px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[.14em] text-[#111111] shadow-deep">
                  ★ {f.badge}
                </span>
              </div>
              <div className="relative -mt-10 p-6 sm:p-8">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-tight text-white">{f.title}</h3>
                <p className="mt-3 text-mist">{f.text}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-soft">
                      <CheckCircleIcon className="mt-0.5 shrink-0 text-brand" width={16} height={16} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href={f.href} className="btn btn-primary mt-6">
                  {f.cta} <ArrowRightIcon width={18} height={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
