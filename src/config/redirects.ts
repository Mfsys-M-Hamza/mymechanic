/**
 * Friendly/legacy URLs → canonical pages. Add old-site URLs here when migrating.
 * Server hosts (Vercel/Node) send real 301/308 redirects; the GitHub Pages build
 * generates small HTML redirect pages instead (scripts/static-redirects.mjs).
 */
export const redirects: { source: string; destination: string }[] = [
  { source: "/home", destination: "/" },
  { source: "/about-us", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/appointment", destination: "/book-appointment" },
  { source: "/book", destination: "/book-appointment" },
  { source: "/testimonials", destination: "/reviews" },
  { source: "/privacy", destination: "/privacy-policy" },
  { source: "/terms", destination: "/terms-and-conditions" },
  { source: "/services/computerized-vehicle-scanning", destination: "/services/computerized-scanning" },
  { source: "/services/ac-repair", destination: "/services/ac-heater-maintenance" },
  { source: "/services/brakes", destination: "/services/brake-service" },
];
