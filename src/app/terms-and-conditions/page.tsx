import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the My Mechanic.pk website, requesting appointments and using our workshop services.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the website.</p>

      <h2>Appointment requests</h2>
      <ul>
        <li>Submitting the appointment form prepares a request; it does not confirm an appointment.</li>
        <li>Your requested appointment time will be confirmed by our team through WhatsApp or telephone.</li>
        <li>We may suggest a different time depending on workshop availability.</li>
      </ul>

      <h2>Estimates and pricing</h2>
      <ul>
        <li>We do not publish fixed prices. The final cost and repair time depend on inspection of your vehicle.</li>
        <li>We will share an estimate before starting work, and work begins only with your approval.</li>
        <li>If additional faults are found during a repair, we will contact you before carrying out further work.</li>
      </ul>

      <h2>Website content</h2>
      <p>
        Articles and service descriptions on this website are general information and are not a substitute for an inspection of your vehicle. See our{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>Intellectual property</h2>
      <p>The {client.name} name, logo, text and illustrations on this website belong to {client.name} or are used with permission. Please do not copy them without written permission.</p>

      <h2>External links</h2>
      <p>This website links to third-party services such as WhatsApp, Google Maps and social media. We are not responsible for their content or policies.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they were last changed.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Pakistan.</p>
    </LegalPage>
  );
}
