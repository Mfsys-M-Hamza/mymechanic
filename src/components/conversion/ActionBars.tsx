import Link from "next/link";
import { client } from "@/config/client";
import { telHref, whatsappHref } from "@/lib/links";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

/** Sticky bottom action bar on phones/tablets. Body has bottom padding so it never hides content. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-3 gap-2 px-3 py-2.5">
        <li>
          <a href={telHref} className="flex min-h-[52px] flex-col items-center justify-center rounded-xl border border-white/12 text-xs font-semibold text-white" aria-label={`Call ${client.phone.display}`}>
            <PhoneIcon width={20} height={20} /> Call
          </a>
        </li>
        <li>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] flex-col items-center justify-center rounded-xl bg-[#13803f] text-xs font-semibold text-[#fff]" aria-label={`WhatsApp ${client.whatsapp.display}`}>
            <WhatsAppIcon width={20} height={20} /> WhatsApp
          </a>
        </li>
        <li>
          <Link href="/book-appointment" className="flex min-h-[52px] flex-col items-center justify-center rounded-xl bg-brand text-xs font-bold text-[#111111]">
            <CalendarIcon width={20} height={20} /> Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/** Floating WhatsApp button on desktop (mobile uses the action bar instead). */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(`Hello ${client.name}, I'd like to ask about my car.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${client.name} on WhatsApp`}
      className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-[#13803f] pl-4 pr-4 text-[#fff] shadow-[0_12px_30px_-6px_rgba(31,174,84,.7)] transition-all hover:gap-2 hover:pr-5 lg:flex"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#13803f] a-glow" aria-hidden="true" />
      <WhatsAppIcon width={26} height={26} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold transition-all duration-300 group-hover:max-w-[160px] group-focus-visible:max-w-[160px]">
        WhatsApp us
      </span>
    </a>
  );
}
