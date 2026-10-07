import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/config/client";
import { getService, relatedServices, services } from "@/data/services";
import { posts } from "@/data/blog";
import { galleryItems, type GalleryItem } from "@/data/content";
import { asset } from "@/lib/basePath";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { serviceInquiryMessage, whatsappHref } from "@/lib/links";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/ui/Faq";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { LoopVideo } from "@/components/visuals/LoopVideo";
import { AlertIcon, CalendarIcon, CheckCircleIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { telHref } from "@/lib/links";

type Props = { params: Promise<{ slug: string }> };

/** Real workshop photo or looping clip linked to this service (galleryItems[].service). */
function ServiceMedia({ item, className, sizes }: { item: GalleryItem; className: string; sizes: string }) {
  return item.video ? (
    <LoopVideo src={item.video} poster={item.src!} label={item.alt} className={className} />
  ) : (
    <Image src={asset(item.src!)} alt={item.alt} width={item.width} height={item.height} sizes={sizes} className={className} />
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = relatedServices(s);
  const articles = client.features.blog ? posts.filter((p) => p.relatedServices.includes(s.slug)).slice(0, 3) : [];
  const bookHref = `/book-appointment?service=${s.slug}`;
  const waHref = whatsappHref(serviceInquiryMessage(s.name));
  const media = galleryItems.filter((g) => g.service === s.slug && g.src && g.width && g.height);

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }, { name: s.shortName, path: `/services/${s.slug}` }]}
        eyebrow={`${s.shortName} · Wah Cantt & Taxila`}
        title={s.name}
        intro={<p>{s.summary} Available at both our branches in Wah Cantt.</p>}
        visual={s.visual}
      >
        <div className="flex flex-wrap gap-3">
          <Link href={bookHref} className="btn btn-primary"><CalendarIcon /> Book an Appointment</Link>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><WhatsAppIcon /> WhatsApp Inquiry</a>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_360px] lg:py-20">
        <div className="min-w-0">
          <section aria-labelledby="what-title" className="reveal">
            <h2 id="what-title" className="text-3xl font-extrabold uppercase text-white sm:text-4xl">About {s.name}</h2>
            <div className="prose-garage mt-4">{s.intro.map((p) => <p key={p}>{p}</p>)}</div>
          </section>

          {media.length > 1 && (
            <section aria-labelledby="workshop-title" className="reveal mt-12">
              <h2 id="workshop-title" className="text-3xl font-extrabold uppercase text-white">In our <span className="brand-text">workshop</span></h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {media.slice(1).map((m) => (
                  <figure key={m.id} className="card relative overflow-hidden">
                    <ServiceMedia item={m} className="aspect-[4/5] w-full object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
                    <figcaption className="absolute bottom-3 left-3 right-3 rounded-lg bg-black/65 px-3 py-1.5 text-sm font-semibold text-[#fff] backdrop-blur-sm">{m.title}</figcaption>
                  </figure>
                ))}
              </div>
              <Link href="/gallery" className="mt-4 inline-flex items-center gap-1 font-semibold text-brand hover:underline">See more in our gallery</Link>
            </section>
          )}

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <section aria-labelledby="signs-title" className="reveal card p-6">
              <h2 id="signs-title" className="flex items-center gap-3 text-2xl font-bold uppercase text-white">
                <AlertIcon className="text-[#ff8a3d]" /> Common warning signs
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {s.signs.map((x) => <li key={x} className="flex gap-3 text-mist"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8a3d]" aria-hidden="true" />{x}</li>)}
              </ul>
            </section>
            <section aria-labelledby="benefits-title" className="reveal card p-6" style={{ ["--d" as string]: "90ms" }}>
              <h2 id="benefits-title" className="flex items-center gap-3 text-2xl font-bold uppercase text-white">
                <CheckCircleIcon className="text-brand" /> Benefits
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {s.benefits.map((x) => <li key={x} className="flex gap-3 text-mist"><CheckIcon className="mt-1 shrink-0 text-brand" width={18} height={18} />{x}</li>)}
              </ul>
            </section>
          </div>

          <section aria-labelledby="included-title" className="reveal mt-12">
            <h2 id="included-title" className="text-3xl font-extrabold uppercase text-white sm:text-4xl">What&apos;s included</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.included.map((x, i) => (
                <li key={x} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[.02] p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 font-display text-lg font-extrabold text-brand">{i + 1}</span>
                  <span className="text-soft">{x}</span>
                </li>
              ))}
            </ol>
          </section>

          <aside className="reveal mt-10 flex gap-4 rounded-2xl border border-[#ff8a3d]/30 bg-[#ff8a3d]/5 p-5" aria-label="Pricing disclaimer">
            <AlertIcon className="mt-0.5 shrink-0 text-[#ff8a3d]" />
            <p className="text-sm text-mist">
              <strong className="text-white">Please note:</strong> the final cost and repair time depend on inspection of your vehicle. We will explain our
              findings and share an estimate for your approval before any work begins.
            </p>
          </aside>

          {s.faqs.length > 0 && (
            <section aria-labelledby="faq-title" className="mt-14">
              <h2 id="faq-title" className="reveal mb-6 text-3xl font-extrabold uppercase text-white sm:text-4xl">{s.shortName} FAQs</h2>
              <Faq items={s.faqs} />
            </section>
          )}

          {articles.length > 0 && (
            <section aria-labelledby="reading-title" className="reveal mt-14">
              <h2 id="reading-title" className="text-2xl font-bold uppercase text-white">Helpful reading</h2>
              <ul className="mt-4 grid gap-2">
                {articles.map((a) => (
                  <li key={a.slug}><Link href={`/blog/${a.slug}`} className="text-brand underline-offset-4 hover:underline">{a.title}</Link></li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label={`Book ${s.shortName}`}>
          <div className="card overflow-hidden">
            {media[0] ? (
              <ServiceMedia item={media[0]} className="h-56 w-full object-cover" sizes="360px" />
            ) : (
              <Animated className="relative h-48 bg-[radial-gradient(circle_at_50%_60%,rgb(245_179_1/.18),transparent_70%)]">
                <MechanicalArt kind={s.visual} className="absolute inset-0 m-auto h-40 w-40" />
              </Animated>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold uppercase text-white">Book {s.shortName}</h2>
              <p className="mt-2 text-sm text-mist">Your requested time will be confirmed by our team through WhatsApp or telephone.</p>
              <div className="mt-5 grid gap-3">
                <Link href={bookHref} className="btn btn-primary w-full"><CalendarIcon /> Book an Appointment</Link>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full"><WhatsAppIcon /> WhatsApp Inquiry</a>
                <a href={telHref} className="btn btn-outline w-full"><PhoneIcon /> Call {client.phone.display}</a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section carbon pt-16" aria-labelledby="related-title">
          <div className="container-x">
            <h2 id="related-title" className="reveal text-3xl font-extrabold uppercase text-white sm:text-4xl">Related <span className="brand-text">services</span></h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => <ServiceCard key={r.slug} service={r} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Book ${s.name} in Wah Cantt`} />
    </>
  );
}
