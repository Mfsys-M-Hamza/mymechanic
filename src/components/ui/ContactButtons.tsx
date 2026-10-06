import Link from "next/link";
import { client } from "@/config/client";
import { telHref, whatsappHref } from "@/lib/links";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

/** Book / WhatsApp / Call trio used across the site. */
export function ContactButtons({
  bookHref = "/book-appointment", whatsappMessage, className = "",
}: { bookHref?: string; whatsappMessage?: string; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href={bookHref} className="btn btn-primary"><CalendarIcon /> Book an Appointment</Link>
      <a href={whatsappHref(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
        <WhatsAppIcon /> WhatsApp Us
      </a>
      <a href={telHref} className="btn btn-outline" aria-label={`Call now: ${client.phone.display}`}><PhoneIcon /> Call Now</a>
    </div>
  );
}
