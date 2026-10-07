import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Which cookies and browser storage the My Mechanic.pk website uses, and how to control them.",
  path: "/cookie-policy",
});

export default function CookiePage() {
  const analytics = Boolean(client.analytics.ga4Id);
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy">
      <p>This page explains what this website stores in your browser and why.</p>

      <h2>Essential browser storage</h2>
      <p>We use your browser&apos;s local storage (not tracking cookies) to remember a few choices, so the site behaves as you expect:</p>
      <ul>
        <li><strong>mm-appt / mm-contact</strong> — the time of your last form submission, used to prevent accidental duplicate requests.</li>
        <li><strong>mm-consent</strong> — your analytics choice, if analytics is enabled.</li>
      </ul>
      <p>These never leave your device and are not used to track you.</p>

      <h2>Analytics</h2>
      {analytics ? (
        <p>
          With your permission, we use Google Analytics to understand how visitors use the site. Analytics cookies are only set after you click
          &quot;Accept analytics&quot; and you can decline without any effect on the website.
        </p>
      ) : (
        <p>This website currently uses no analytics or advertising cookies, so no consent banner is shown.</p>
      )}

      <h2>Third-party content</h2>
      <p>
        The Google Map on our Contact and Home pages loads only when you click &quot;Load interactive map&quot;. Google may then set cookies under its own
        policy. Links to WhatsApp and social media open those services, which have their own cookie policies.
      </p>

      <h2>Managing storage</h2>
      <p>You can clear local storage and cookies at any time from your browser settings. The website will continue to work normally.</p>
    </LegalPage>
  );
}
