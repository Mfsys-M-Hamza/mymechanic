"use client";

import { useRef, useState, type FormEvent } from "react";
import { client } from "@/config/client";
import { whatsappHref } from "@/lib/links";
import { clean, cooldownRemaining, displayPhone, looksLikeBot, normalisePhone, patterns, startCooldown } from "@/lib/validation";
import { ErrorSummary, Field, Honeypot, aria, type Errors } from "./FormParts";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

const LABELS: Record<string, string> = { name: "Your name", mobile: "Mobile number", message: "Message", consent: "Consent" };

/** General enquiry form — composes a WhatsApp message (no data stored on the site). */
export function ContactForm() {
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = clean(fd.get("name"), 60);
    const mobile = clean(fd.get("mobile"), 20);
    const message = clean(fd.get("message"), 1000, true);
    const errs: Errors = {};
    if (looksLikeBot(String(fd.get("company_website") ?? ""), startedAt.current)) {
      errs.form = "Something went wrong. Please wait a moment and try again, or message us directly on WhatsApp.";
    } else {
      if (!patterns.name.test(name)) errs.name = "Enter your name (letters only, at least 2 characters).";
      if (!patterns.pkMobile.test(normalisePhone(mobile))) errs.mobile = "Enter a valid Pakistani mobile number, e.g. 0300-1234567.";
      if (message.length < 10) errs.message = "Please write at least 10 characters.";
      if (fd.get("consent") !== "yes") errs.consent = "Please confirm you agree to be contacted.";
      const wait = cooldownRemaining("mm-contact", 30);
      if (!Object.keys(errs).length && wait) errs.form = `Please wait ${wait} seconds before sending another message.`;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }
    const href = whatsappHref(`*Website enquiry — ${client.name}*\n\n*Name:* ${name}\n*Mobile:* ${displayPhone(mobile)}\n\n${message}`);
    startCooldown("mm-contact");
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    setDone(href);
    requestAnimationFrame(() => document.getElementById("contact-success")?.focus());
  }

  if (done) {
    return (
      <div id="contact-success" tabIndex={-1} role="status" className="card p-8 outline-none">
        <CheckCircleIcon width={44} height={44} className="text-brand" />
        <h2 className="mt-4 text-2xl font-extrabold uppercase text-white">Message ready in WhatsApp</h2>
        <p className="mt-2 text-mist">Press <strong className="text-white">Send</strong> in WhatsApp so our team receives your message. We&apos;ll reply as soon as we can.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={done} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><WhatsAppIcon /> Open WhatsApp</a>
          <button type="button" className="btn btn-outline" onClick={() => { setDone(null); startedAt.current = Date.now(); }}>Write another message</button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="card relative grid gap-5 p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold uppercase text-white">Send us a message</h2>
      <ErrorSummary errors={errors} labels={LABELS} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={LABELS.name} required error={errors.name}>
          <input {...aria("name", errors)} type="text" autoComplete="name" maxLength={60} required />
        </Field>
        <Field id="mobile" label={LABELS.mobile} required error={errors.mobile}>
          <input {...aria("mobile", errors)} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} required />
        </Field>
      </div>
      <Field id="message" label={LABELS.message} required error={errors.message}>
        <textarea {...aria("message", errors)} rows={5} maxLength={1000} required />
      </Field>
      <div className="field">
        <label className="flex cursor-pointer items-start gap-3 font-normal" htmlFor="consent">
          <input id="consent" name="consent" type="checkbox" value="yes" className="mt-1 h-5 w-5 shrink-0 accent-[#f5b301]" style={{ minHeight: 0, width: 20 }}
            aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span className="text-mist">I agree that {client.name} may contact me by WhatsApp or phone about this message. <span className="req" aria-hidden="true">*</span></span>
        </label>
        {errors.consent && <p id="consent-error" className="error" role="alert">{errors.consent}</p>}
      </div>
      <Honeypot />
      <div>
        <button type="submit" className="btn btn-primary"><WhatsAppIcon /> Send via WhatsApp</button>
        <p className="mt-3 text-sm text-metal">Submitting opens WhatsApp with your message addressed to {client.whatsapp.display}. Nothing is stored on this website.</p>
      </div>
    </form>
  );
}
