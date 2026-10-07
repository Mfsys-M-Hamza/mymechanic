import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important information about the general nature of advice, illustrations and service descriptions on the My Mechanic.pk website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer">
      <h2>General information only</h2>
      <p>
        Articles, FAQs and service descriptions on this website are general guidance for vehicle owners. Every vehicle is different, and none of
        this content replaces a physical inspection by a qualified technician. If you think your vehicle is unsafe, stop driving it and seek help.
      </p>

      <h2>Costs and repair times</h2>
      <p>We do not publish prices. The final cost and repair time for any job depend on inspection of your vehicle and the availability of parts.</p>

      <h2>Illustrations</h2>
      <p>
        Illustrations and animations on this website are original artwork created to explain our services. Unless clearly stated otherwise, they are
        not photographs of our premises, equipment or customer vehicles.
      </p>

      <h2>Vehicle brands</h2>
      <p>
        Vehicle makes, models and logos shown on this website are trademarks of their respective owners and are used only to describe the vehicles we work on. {client.name} is an independent
        workshop and is not affiliated with or endorsed by any vehicle manufacturer.
      </p>

      <h2>Availability</h2>
      <p>Services, offers and opening hours may change. Please contact us to confirm before visiting.</p>
    </LegalPage>
  );
}
