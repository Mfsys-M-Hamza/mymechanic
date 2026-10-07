import { client } from "./client";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Car Inspection", href: "/car-inspection" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Gallery", href: "/gallery" },
  ...(client.features.blog ? [{ label: "Blog", href: "/blog" }] : []),
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;
