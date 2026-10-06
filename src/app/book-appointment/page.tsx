import type { Metadata } from "next";
import { client } from "@/config/client";
import { pageMetadata } from "@/lib/seo";
import { telHref, whatsappHref } from "@/lib/links";
import { PageHero } from "@/components/ui/PageHero";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { HoursList } from "@/components/HoursList";
import { ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Book a Car Repair Appointment in Wah Cantt",
  description:
    "Request a workshop appointment at My Mechanic.pk, Wah Cantt — Laiq Ali Chowk or New City Phase-1. Fill in your vehicle details and send your request via WhatsApp — our team confirms your time.",
  path: "/book-appointment",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Book Appointment", path: "/book-appointment" }]}
        eyebrow="Book a visit"
        title={<>Book an <span className="brand-text">appointment</span></>}
        intro={
          <p>
            Tell us about your car and the problem, pick a preferred date and time, and send your request through WhatsApp.{" "}
            <strong className="text-white">Your requested appointment time will be confirmed by our team through WhatsApp or telephone.</strong>
          </p>
        }
        visual="inspection"
      />
      <section className="section pt-12" aria-label="Appointment form">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
          <AppointmentForm />
          <aside className="grid content-start gap-5" aria-label="Other ways to book">
            <div className="card p-6">
              <h2 className="text-2xl font-bold uppercase text-white">Prefer to talk?</h2>
              <div className="mt-4 grid gap-3">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full"><WhatsAppIcon /> {client.whatsapp.display}</a>
                <a href={telHref} className="btn btn-outline w-full"><PhoneIcon /> {client.phone.display}</a>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="flex items-center gap-2 text-2xl font-bold uppercase text-white"><ClockIcon className="text-brand" /> Hours</h2>
              <div className="mt-3 text-sm"><HoursList /></div>
            </div>
            <div className="card p-6 text-sm text-mist">
              <h2 className="text-2xl font-bold uppercase text-white">How it works</h2>
              <ol className="mt-3 grid list-decimal gap-2 pl-5 marker:text-brand">
                <li>Fill in the form and press send.</li>
                <li>WhatsApp opens with your details — press Send.</li>
                <li>Our team replies to confirm or suggest a time.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
