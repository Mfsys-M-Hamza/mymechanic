import type { Metadata } from "next";
import { blogCategories, posts, readingMinutes } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { BlogBrowser, type PostCard } from "@/components/BlogBrowser";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Car Care Blog — Maintenance Advice for Wah Cantt Drivers",
  description:
    "Practical car maintenance advice from My Mechanic.pk: engine diagnostics, fuel efficiency, hybrid care, brakes, AC and seasonal tips for Wah Cantt and Taxila drivers.",
  path: "/blog",
});

export default function BlogPage() {
  const cards: PostCard[] = [...posts]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      published: p.published,
      minutes: readingMinutes(p),
      visual: p.visual,
      imageAlt: p.imageAlt,
      text: [p.title, p.description, p.category, ...p.sections.map((s) => s.heading)].join(" ").toLowerCase(),
    }));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Car care advice"
        title={<>The workshop <span className="brand-text">blog</span></>}
        intro={<p>Plain-language advice to help you understand your car, spot problems early and spend less on repairs.</p>}
        visual="oil"
      />
      <section className="section pt-12" aria-label="Articles">
        <div className="container-x">
          <BlogBrowser posts={cards} categories={blogCategories} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
