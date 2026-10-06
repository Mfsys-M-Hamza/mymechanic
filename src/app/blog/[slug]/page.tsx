import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts, readingMinutes, relatedPosts } from "@/data/blog";
import { getService } from "@/data/services";
import { articleSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/ui/CtaBand";
import { Animated } from "@/components/visuals/Animated";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { ArrowRightIcon, CalendarIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    publishedTime: p.published,
    modifiedTime: p.updated,
  });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const services = p.relatedServices.map(getService).filter((s) => s !== undefined);
  const related = relatedPosts(p);

  return (
    <>
      <JsonLd data={articleSchema(p)} />
      <article>
        <header className="relative overflow-hidden carbon garage-light border-b border-white/6">
          <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
              <p className="eyebrow mt-6">{p.category}</p>
              <h1 className="rise mt-3 text-4xl font-extrabold uppercase text-white sm:text-5xl">{p.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-mist">{p.description}</p>
              <p className="mt-5 text-sm text-metal">
                By <span className="text-white">{p.author}</span> · Published <time dateTime={p.published}>{fmt(p.published)}</time>
                {p.updated !== p.published && <> · Updated <time dateTime={p.updated}>{fmt(p.updated)}</time></>} · {readingMinutes(p)} min read
              </p>
            </div>
            <Animated className="relative mx-auto aspect-square w-full max-w-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(245_179_1/.12),transparent_65%)]" aria-hidden="true" />
              <MechanicalArt kind={p.visual} label={p.imageAlt} className="relative h-full w-full" />
            </Animated>
          </div>
        </header>

        <div className="container-x grid gap-12 py-14 lg:grid-cols-[260px_1fr] lg:py-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-labelledby="toc-title" className="card p-5">
              <h2 id="toc-title" className="font-display text-lg font-bold uppercase text-white">On this page</h2>
              <ol className="mt-3 grid gap-2 text-sm">
                {p.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-mist hover:text-brand">{s.heading}</a></li>)}
                {p.faqs.length > 0 && <li><a href="#faqs" className="text-mist hover:text-brand">FAQs</a></li>}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <div className="prose-garage">
              {p.sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {s.paragraphs.map((t) => <p key={t}>{t}</p>)}
                  {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
                </section>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-soft"><strong className="text-white">Need a professional check?</strong> Book a visit to either of our Wah Cantt branches.</p>
              <Link href="/book-appointment" className="btn btn-primary shrink-0"><CalendarIcon /> Book an Appointment</Link>
            </div>

            {p.faqs.length > 0 && (
              <section aria-labelledby="faqs" className="mt-12">
                <h2 id="faqs" className="mb-5 text-3xl font-extrabold uppercase text-white">Frequently asked questions</h2>
                <Faq items={p.faqs} />
              </section>
            )}

            {services.length > 0 && (
              <section aria-labelledby="rel-services" className="mt-12">
                <h2 id="rel-services" className="text-2xl font-bold uppercase text-white">Related services</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="card card-hover flex h-full items-center gap-3 p-4 font-semibold text-white hover:text-brand">
                        <MechanicalArt kind={s.visual} className="h-10 w-10 shrink-0" />{s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section carbon pt-16" aria-labelledby="rel-posts">
          <div className="container-x">
            <h2 id="rel-posts" className="text-3xl font-extrabold uppercase text-white">Related <span className="brand-text">articles</span></h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="card card-hover group flex h-full flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">{r.category}</span>
                    <span className="mt-2 font-display text-xl font-bold uppercase text-white">{r.title}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">Read article <ArrowRightIcon width={16} height={16} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
