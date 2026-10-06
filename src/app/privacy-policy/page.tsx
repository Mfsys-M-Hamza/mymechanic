import type { Metadata } from "next";
import Link from "next/link";
import { client, fullAddress } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How My Mechanic.pk handles personal information submitted through its website, WhatsApp and telephone.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <p>
        This policy explains how {client.name} (&quot;we&quot;, &quot;us&quot;) handles personal information when you use this website or contact
        us. We collect only what we need to respond to you and service your vehicle.
      </p>

      <h2>Information we collect</h2>
      <p>This website does not store form submissions on a server. When you use the appointment or contact form:</p>
      <ul>
        <li>Your details (such as name, mobile number, optional email, vehicle information and a description of the issue) are placed into a WhatsApp message on your own device.</li>
        <li>Nothing is sent to us until you choose to press Send in WhatsApp.</li>
        <li>Messages you send through WhatsApp are also subject to WhatsApp&apos;s own privacy policy.</li>
      </ul>
      <p>If you call or message us directly, we receive the information you share in that conversation.</p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and confirm or arrange appointments.</li>
        <li>To diagnose, repair and maintain your vehicle and keep a record of work carried out.</li>
        <li>To contact you about your vehicle or appointment.</li>
      </ul>
      <p>We do not sell your personal information and we do not use it for unrelated marketing without your permission.</p>

      <h2>Cookies and local storage</h2>
      <p>
        This website does not set advertising cookies. It stores a few small preferences in your browser (for example, the time of your last form
        submission) and does not share them with anyone. See our <Link href="/cookie-policy">Cookie Policy</Link> for details.
      </p>

      <h2>Third-party services</h2>
      <ul>
        <li><strong>WhatsApp</strong> — used when you choose to send us a message.</li>
        <li><strong>Google Maps</strong> — the interactive map only loads if you choose to load it, at which point Google may process data under its own policies.</li>
        <li><strong>Google Fonts</strong> — fonts are served from this website&apos;s own domain; no request is made to Google.</li>
      </ul>

      <h2>How long we keep information</h2>
      <p>We keep enquiry and service records only as long as needed to serve you, maintain vehicle service history and meet legal or accounting obligations.</p>

      <h2>Your choices</h2>
      <p>You can ask us what information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Contact us using the details below.</p>

      <h2>Contact</h2>
      <p>
        {client.name}, {fullAddress}.<br />
        WhatsApp {client.whatsapp.display} · Telephone {client.phone.display}
        {client.email ? <> · Email {client.email}</> : null}
      </p>
    </LegalPage>
  );
}
