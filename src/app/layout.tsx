import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { client, siteUrl } from "@/config/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp, MobileActionBar } from "@/components/conversion/ActionBars";
import { RevealManager } from "@/components/RevealManager";
import { ConsentManager } from "@/components/ConsentManager";
import { ParallaxManager } from "@/components/ParallaxManager";
import { SvgDefs } from "@/components/visuals/Mechanical";
import { JsonLd } from "@/components/JsonLd";
import { absUrl, businessSchema, websiteSchema } from "@/lib/seo";
import { themeBootScript } from "@/lib/theme";
import { InlineScript } from "@/components/InlineScript";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-barlow", display: "swap" });
// Body font uses "optional": no late font-swap repaint, so text paints once (better LCP on slow mobiles).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: client.seo.defaultTitle, template: client.seo.titleTemplate },
  description: client.seo.defaultDescription,
  applicationName: client.name,
  keywords: [...client.seo.keywords],
  authors: [{ name: client.name }],
  creator: client.name,
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: client.name,
    locale: client.seo.locale,
    images: [{ url: absUrl(client.seo.ogImage), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  verification: { google: client.seo.googleSiteVerification },
};

export const viewport: Viewport = {
  themeColor: client.colors.background,
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script may set data-theme before React hydrates.
    <html lang="en-PK" className={`${barlow.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={themeBootScript} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">Skip to main content</a>
        <SvgDefs />
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
        <ConsentManager />
        <RevealManager />
        <ParallaxManager />
      </body>
    </html>
  );
}
