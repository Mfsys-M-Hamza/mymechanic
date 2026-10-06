import type { NextConfig } from "next";
import { client } from "./src/config/client";
import { redirects } from "./src/config/redirects";

const isDev = process.env.NODE_ENV !== "production";
const analytics = Boolean(client.analytics.ga4Id);

/**
 * Content Security Policy. Next.js injects small inline scripts for hydration, so
 * 'unsafe-inline' is required for scripts on a statically generated site (nonces
 * would force every page to render dynamically). Everything else is locked down.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${analytics ? " https://www.googletagmanager.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${analytics ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
  "font-src 'self'",
  `connect-src 'self'${analytics ? " https://*.google-analytics.com https://*.analytics.google.com" : ""}${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/**
 * GitHub Pages build (STATIC_EXPORT=true, set by .github/workflows/deploy-pages.yml):
 * plain HTML export served from a sub-path. Static hosts can't send headers or
 * redirects, so those are only configured for server hosts (Vercel / Node).
 */
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  compress: true,
  ...(staticExport
    ? {
        output: "export",
        basePath: basePath || undefined,
        // No image server on static hosting; images are already optimised WebP.
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [
            { source: "/(.*)", headers: securityHeaders },
            { source: "/brand/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
          ];
        },
        async redirects() {
          return redirects.map((r) => ({ ...r, permanent: true }));
        },
      }),
};

export default nextConfig;
