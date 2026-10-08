import type { Metadata } from "next";
import { client, siteUrl } from "@/config/client";
import type { Service } from "@/data/services";
import type { BlogPost } from "@/data/blog";
import { reviews } from "@/data/content";

export const absUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

export function pageMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const image = absUrl(opts.image ?? client.seo.ogImage);
  const title = opts.title ?? client.seo.defaultTitle;
  return {
    title: opts.title ? opts.title : { absolute: client.seo.defaultTitle },
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: opts.type ?? "website",
      url: opts.path,
      siteName: client.name,
      title,
      description: opts.description,
      locale: client.seo.locale,
      images: [{ url: image, width: 1200, height: 630, alt: `${client.name} — ${client.tagline}` }],
      ...(opts.type === "article" ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [image],
      ...(client.seo.twitterHandle ? { site: client.seo.twitterHandle } : {}),
    },
  };
}

/* ------------------------------------------------------------ JSON-LD */

const businessId = `${siteUrl}/#business`;

export function businessSchema() {
  const a = client.address;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": businessId,
    name: client.name,
    description: client.description,
    url: siteUrl,
    logo: absUrl(client.logo.fallbackPng),
    image: absUrl(client.seo.ogImage),
    telephone: client.phone.e164,
    ...(client.foundingYear ? { foundingDate: String(client.foundingYear) } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: `${a.area}, ${a.city}`,
      addressRegion: a.region,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.countryCode,
    },
    areaServed: client.serviceAreas.primary.map((c) => ({ "@type": "City", name: c })),
    sameAs: [...client.social.links.map((l) => l.href), ...(client.googleBusinessProfileUrl ? [client.googleBusinessProfileUrl] : [])],
    contactPoint: [
      { "@type": "ContactPoint", telephone: client.phone.e164, contactType: "customer service", areaServed: "PK", availableLanguage: ["en", "ur"] },
      { "@type": "ContactPoint", telephone: `+${client.whatsapp.number}`, contactType: "reservations", areaServed: "PK", availableLanguage: ["en", "ur"] },
    ],
  };
  if (client.email) schema.email = client.email;
  schema.paymentAccepted = client.payments.map((m) => m.name).join(", ");
  schema.currenciesAccepted = "PKR";
  // Every branch is listed as a department so both locations are discoverable.
  schema.department = client.branches.map((b) => ({
    "@type": "AutoRepair",
    name: `${client.name} — ${b.label}, ${b.name}`,
    telephone: client.phone.e164,
    address: { "@type": "PostalAddress", streetAddress: b.street, addressLocality: b.area, addressRegion: client.address.region, addressCountry: client.address.countryCode },
    ...(b.geo.confirmed ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    ...(b.mapsUrl ? { hasMap: b.mapsUrl } : {}),
  }));
  if (client.geo.confirmed) schema.geo = { "@type": "GeoCoordinates", latitude: client.geo.lat, longitude: client.geo.lng };
  if (client.hours.confirmed) {
    schema.openingHoursSpecification = client.hours.days
      .filter((d) => !d.closed)
      .map((d) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: d.schemaDay, opens: d.opens, closes: d.closes }));
  }
  // Only genuine reviews produce rating markup.
  if (reviews.length > 0) {
    // Use the real Google totals when known — never an average of the few reviews quoted on the site.
    if (client.googleRating) {
      const g = client.googleRating;
      schema.aggregateRating = { "@type": "AggregateRating", ratingValue: g.value.toFixed(1), reviewCount: g.count, bestRating: 5, worstRating: 1 };
    } else if (reviews.every((r) => r.rating)) {
      const avg = reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;
      schema.aggregateRating = { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: reviews.length, bestRating: 5, worstRating: 1 };
    }
    schema.review = reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      ...(r.title ? { name: r.title } : {}),
      reviewBody: r.text,
      publisher: { "@type": "Organization", name: r.source },
      ...(r.rating ? { reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 } } : {}),
    }));
  }
  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: client.name,
    publisher: { "@id": businessId },
    inLanguage: "en-PK",
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.seoDescription,
    url: absUrl(`/services/${s.slug}`),
    provider: { "@id": businessId },
    areaServed: client.serviceAreas.primary.map((c) => ({ "@type": "City", name: c })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function articleSchema(p: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.published,
    dateModified: p.updated,
    author: { "@type": "Organization", name: p.author, url: siteUrl },
    publisher: { "@id": businessId },
    image: absUrl(client.seo.ogImage),
    mainEntityOfPage: absUrl(`/blog/${p.slug}`),
    articleSection: p.category,
    inLanguage: "en-PK",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}
