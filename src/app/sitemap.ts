import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { posts } from "@/data/blog";
import { absUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const launch = "2026-09-30";
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/book-appointment", priority: 0.9, freq: "yearly" },
    { path: "/about", priority: 0.7, freq: "yearly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/gallery", priority: 0.5, freq: "monthly" },
    { path: "/reviews", priority: 0.5, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, freq: "yearly" },
    { path: "/cookie-policy", priority: 0.2, freq: "yearly" },
    { path: "/disclaimer", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: absUrl(p.path), lastModified: launch, changeFrequency: p.freq, priority: p.priority })),
    ...services.map((s) => ({ url: absUrl(`/services/${s.slug}`), lastModified: launch, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: absUrl(`/blog/${p.slug}`), lastModified: p.updated, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
