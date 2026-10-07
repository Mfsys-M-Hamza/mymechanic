import Link from "next/link";
import { client, branchAddress, servedCities } from "@/config/client";
import { legalNav, mainNav } from "@/config/navigation";
import { services } from "@/data/services";
import { branchDirectionsHref, telHref, whatsappHref } from "@/lib/links";
import { Logo } from "./Logo";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon, socialIcon } from "@/components/Icons";
import { HoursList } from "@/components/HoursList";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto border-t border-white/8 carbon">
      <div className="divider-glow" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size={96} />
          <p className="mt-5 max-w-sm text-mist">
            {client.tagline}. Computerized diagnostics and honest repairs at two branches, serving drivers across {servedCities}.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {client.social.links.map((s) => {
              const Icon = socialIcon[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${client.name} on ${s.label} (${client.social.handle})`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-mist transition-colors hover:border-brand hover:text-brand"
                  >
                    {Icon ? <Icon width={18} height={18} /> : s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-sm text-metal">{client.social.handle}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Explore</h2>
          <ul className="mt-4 grid gap-2">
            {[...mainNav, { label: "Reviews", href: "/reviews" }, { label: "Book Appointment", href: "/book-appointment" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-mist hover:text-brand">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular services">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Services</h2>
          <ul className="mt-4 grid gap-2">
            {services.slice(0, 9).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-mist hover:text-brand">{s.shortName}</Link>
              </li>
            ))}
            <li><Link href="/services" className="font-semibold text-brand hover:text-brand-bright">All services →</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Visit our branches</h2>
          <address className="mt-4 grid gap-4 not-italic text-mist">
            {client.branches.map((b) => (
              <p key={b.id} className="flex gap-3">
                <PinIcon className="mt-1 shrink-0 text-brand" />
                <a href={branchDirectionsHref(b)} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  <span className="block text-xs font-bold uppercase tracking-[.14em] text-metal">{b.label}</span>
                  {branchAddress(b)}
                </a>
              </p>
            ))}
            <p className="flex gap-3">
              <WhatsAppIcon className="mt-1 shrink-0 text-brand" />
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">WhatsApp {client.whatsapp.display}</a>
            </p>
            <p className="flex gap-3">
              <PhoneIcon className="mt-1 shrink-0 text-brand" />
              <a href={telHref} className="hover:text-brand">Tel {client.phone.display}</a>
            </p>
            <div className="flex gap-3">
              <ClockIcon className="mt-1 shrink-0 text-brand" />
              <HoursList compact />
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-x flex flex-wrap items-center gap-x-3 gap-y-2 py-4 text-sm text-metal">
          <span className="font-semibold text-mist">We accept:</span>
          {client.payments.map((m) => (
            <span key={m.name} className="rounded-full border border-white/12 bg-white/[.03] px-3 py-1 text-xs text-mist">{m.name}</span>
          ))}
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-metal md:flex-row md:items-center md:justify-between">
          <p>© {year} {client.legalName}. All rights reserved.{client.foundingYear ? ` Est. ${client.foundingYear}.` : ""}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <p className="container-x border-t border-white/5 py-4 text-center text-xs text-metal">
          Developed by{" "}
          <a
            href="https://www.widewebtechnologies.site/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-mist underline decoration-white/25 underline-offset-2 hover:text-brand hover:decoration-brand"
          >
            WideWeb Technologies
          </a>{" "}
          · Contact:{" "}
          <a href="tel:+923040500121" className="whitespace-nowrap hover:text-brand">+92 3040500121</a>
        </p>
      </div>
    </footer>
  );
}
