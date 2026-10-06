import type { MetadataRoute } from "next";
import { client } from "@/config/client";
import { asset } from "@/lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: client.name,
    short_name: client.name,
    description: client.seo.defaultDescription,
    start_url: asset("/"),
    display: "standalone",
    background_color: client.colors.background,
    theme_color: client.colors.background,
    icons: [
      { src: asset("/brand/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/brand/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
