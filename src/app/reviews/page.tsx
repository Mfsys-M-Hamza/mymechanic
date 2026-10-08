import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ReviewsBlock } from "@/components/sections/ReviewsBlock";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Customer Reviews — Car Mechanic in Wah Cantt",
  description: "Genuine customer reviews of My Mechanic.pk, car repair workshop in Wah Cantt. Share your experience and leave a review.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const platforms = [
    ...(client.googleBusinessProfileUrl ? [{ label: "Google", href: client.googleBusinessProfileUrl }] : []),
    ...client.social.links.filter((s) => s.label === "Facebook"),
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
        eyebrow="Reviews"
        title={<>Customer <span className="brand-text">reviews</span></>}
        intro={<p>We publish only genuine feedback from real customers. Your honest review helps other drivers — and helps us improve.</p>}
        visual="inspection"
      />
      <section className="section pt-12" aria-label="Reviews">
        <div className="container-x">
          <ReviewsBlock />
          {platforms.length > 0 && (
            <div className="reveal mt-10">
              <h2 className="text-2xl font-bold uppercase text-white">Find us on</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {platforms.map((p) => (
                  <li key={p.label}><a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">{p.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
