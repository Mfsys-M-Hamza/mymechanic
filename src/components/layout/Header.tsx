"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/navigation";
import { client } from "@/config/client";
import { telHref, whatsappHref } from "@/lib/links";
import { Logo } from "./Logo";
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    // Start the panel directly under the header
    setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 72);
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a,button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
          scrolled || open ? "bg-[var(--header-bg-solid)] backdrop-blur-lg border-white/8 shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)]" : "bg-[var(--header-bg)] backdrop-blur-sm border-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo size={62} priority />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-lg px-3 py-2 text-[.95rem] font-semibold transition-colors hover:text-brand-bright ${
                      isActive(item.href) ? "text-brand" : "text-mist"
                    } after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-brand after:transition-transform after:origin-left ${
                      isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={telHref} className="btn btn-outline btn-sm hidden xl:inline-flex" aria-label={`Call ${client.phone.display}`}>
              <PhoneIcon width={16} height={16} /> {client.phone.display}
            </a>
            <Link href="/book-appointment" className="btn btn-primary btn-sm hidden sm:inline-flex">
              <CalendarIcon width={16} height={16} /> Book Appointment
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu. Rendered outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed panel and collapse it to zero height. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        style={{ top: panelTop }}
        className="lg:hidden fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-ink carbon"
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="grid gap-1">
            {mainNav.map((item, i) => (
              <li key={item.href} className="rise" style={{ ["--d" as string]: `${i * 40}ms` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex min-h-[52px] items-center justify-between rounded-xl px-4 text-lg font-semibold ${
                    isActive(item.href) ? "bg-brand/10 text-brand" : "text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reviews" className="flex min-h-[52px] items-center rounded-xl px-4 text-lg font-semibold text-white hover:bg-white/5">
                Reviews
              </Link>
            </li>
          </ul>
          <div className="mt-6 grid gap-3">
            <Link href="/book-appointment" className="btn btn-primary w-full">
              <CalendarIcon /> Book Appointment
            </Link>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
              <WhatsAppIcon /> WhatsApp {client.whatsapp.display}
            </a>
            <a href={telHref} className="btn btn-outline w-full">
              <PhoneIcon /> Call {client.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
