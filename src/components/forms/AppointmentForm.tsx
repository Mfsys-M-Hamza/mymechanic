"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { client } from "@/config/client";
import { services } from "@/data/services";
import { whatsappHref } from "@/lib/links";
import { asset } from "@/lib/basePath";
import {
  clean, cooldownRemaining, displayPhone, looksLikeBot, normalisePhone, patterns, startCooldown, todayISO,
} from "@/lib/validation";
import { ErrorSummary, Field, Honeypot, aria, type Errors } from "./FormParts";
import { CalendarIcon, CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const slotLabel = (t: string) => {
  const h = Number(t.slice(0, 2));
  return `${((h + 11) % 12) + 1}:00 ${h >= 12 ? "pm" : "am"}`;
};

const LABELS: Record<string, string> = {
  name: "Your name",
  mobile: "Mobile number",
  email: "Email address",
  make: "Vehicle make",
  model: "Vehicle model",
  year: "Model year",
  registration: "Registration number",
  service: "Required service",
  date: "Preferred date",
  time: "Preferred time",
  issue: "Description of the issue",
  consent: "Consent",
};

type Data = Record<keyof typeof LABELS, string>;

function validate(d: Data): Errors {
  const e: Errors = {};
  const maxYear = new Date().getFullYear() + 1;
  if (!patterns.name.test(d.name)) e.name = "Enter your name (letters only, at least 2 characters).";
  if (!patterns.pkMobile.test(normalisePhone(d.mobile))) e.mobile = "Enter a valid Pakistani mobile number, e.g. 0300-1234567.";
  if (d.email && !patterns.email.test(d.email)) e.email = "Enter a valid email address or leave it blank.";
  if (!patterns.vehicleText.test(d.make)) e.make = "Enter the vehicle make, e.g. Toyota.";
  if (!patterns.vehicleText.test(d.model)) e.model = "Enter the vehicle model, e.g. Corolla.";
  const y = Number(d.year);
  if (!/^\d{4}$/.test(d.year) || y < 1960 || y > maxYear) e.year = `Enter a 4-digit year between 1960 and ${maxYear}.`;
  if (d.registration && !patterns.registration.test(d.registration)) e.registration = "Use letters, numbers, spaces or dashes only.";
  if (!d.service) e.service = "Choose the service you need (or “Not sure”).";
  if (!d.date) e.date = "Choose a preferred date.";
  else if (d.date < todayISO()) e.date = "The preferred date can't be in the past.";
  if (!TIME_SLOTS.includes(d.time)) e.time = "Choose a preferred time.";
  if (d.issue.length < 10) e.issue = "Please describe the issue in at least 10 characters.";
  if (d.consent !== "yes") e.consent = "Please confirm you agree to be contacted about this request.";
  return e;
}

function buildMessage(d: Data) {
  const serviceName = services.find((s) => s.slug === d.service)?.name ?? "Not sure — please advise";
  const date = new Date(`${d.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const lines: (string | null)[] = [
    `*Appointment Request — ${client.name}*`,
    "",
    `*Name:* ${d.name}`,
    `*Mobile:* ${displayPhone(d.mobile)}`,
    d.email ? `*Email:* ${d.email}` : null,
    "",
    `*Vehicle:* ${d.make} ${d.model} (${d.year})`,
    d.registration ? `*Registration:* ${d.registration.toUpperCase()}` : null,
    `*Service:* ${serviceName}`,
    `*Preferred date:* ${date}`,
    `*Preferred time:* ${slotLabel(d.time)}`,
    "",
    `*Issue:*`,
    d.issue,
    "",
    "_Please confirm if this time is available. Thank you._",
  ];
  return lines.filter((l): l is string => l !== null).join("\n").replace(/\n{3,}/g, "\n\n");
}

export function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState("");
  const [minDate, setMinDate] = useState<string>();
  const [maxDate, setMaxDate] = useState<string>();
  const [issueLen, setIssueLen] = useState(0);
  const [done, setDone] = useState<{ href: string; opened: boolean } | null>(null);

  useEffect(() => {
    const now = new Date();
    setMinDate(todayISO(now));
    setMaxDate(todayISO(new Date(now.getTime() + 120 * 86_400_000)));
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre && services.some((s) => s.slug === pre)) setService(pre);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string, max = 60, ml = false) => clean(fd.get(k), max, ml);
    const data: Data = {
      name: get("name"),
      mobile: get("mobile", 20),
      email: get("email", 120),
      make: get("make", 40),
      model: get("model", 40),
      year: get("year", 4),
      registration: get("registration", 15),
      service: get("service", 80),
      date: get("date", 10),
      time: get("time", 5),
      issue: get("issue", 1000, true),
      consent: fd.get("consent") === "yes" ? "yes" : "",
    };

    if (looksLikeBot(String(fd.get("company_website") ?? ""), startedAt.current)) {
      setErrors({ form: "Something went wrong. Please wait a moment and try again, or message us directly on WhatsApp." });
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }

    const errs = validate(data);
    const wait = cooldownRemaining("mm-appt", 45);
    if (!Object.keys(errs).length && wait) errs.form = `You've just sent a request. Please wait ${wait} seconds before sending another.`;
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }

    const href = whatsappHref(buildMessage(data));
    startCooldown("mm-appt");
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    setDone({ href, opened: win !== null });
    requestAnimationFrame(() => document.getElementById("form-success")?.focus());
  }

  if (done) {
    return (
      <div id="form-success" tabIndex={-1} role="status" className="card p-8 outline-none">
        <CheckCircleIcon width={48} height={48} className="text-brand" />
        <h2 className="mt-4 text-3xl font-extrabold uppercase text-white">Your request is ready to send</h2>
        <p className="mt-3 text-mist">
          {done.opened ? "WhatsApp has opened in a new tab with your appointment details filled in. " : ""}
          Please press <strong className="text-white">Send</strong> in WhatsApp so our team receives your request. You can also attach photos of your
          vehicle or the problem in the same chat.
        </p>
        <p className="mt-3 rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm text-soft">
          Your appointment is <strong>not confirmed yet</strong>. Your requested appointment time will be confirmed by our team through WhatsApp or telephone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={done.href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> {done.opened ? "Open WhatsApp again" : "Open WhatsApp to send"}
          </a>
          <button type="button" className="btn btn-outline" onClick={() => { setDone(null); startedAt.current = Date.now(); }}>
            Make another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="card relative grid gap-6 p-6 sm:p-8" aria-describedby="form-intro">
      <p id="form-intro" className="text-sm text-mist">
        Fields marked <span className="req">*</span> are required. Submitting opens WhatsApp with your details addressed to {client.whatsapp.display} — nothing
        is stored on this website.
      </p>
      <ErrorSummary errors={errors} labels={LABELS} />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold uppercase text-white">Your details</legend>
        <Field id="name" label={LABELS.name} required error={errors.name}>
          <input {...aria("name", errors)} type="text" autoComplete="name" required maxLength={60} />
        </Field>
        <Field id="mobile" label={LABELS.mobile} required error={errors.mobile} hint="e.g. 0300-1234567">
          <input {...aria("mobile", errors, true)} type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} />
        </Field>
        <Field id="email" label={LABELS.email} error={errors.email} className="sm:col-span-2">
          <input {...aria("email", errors)} type="email" autoComplete="email" maxLength={120} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold uppercase text-white">Your vehicle</legend>
        <Field id="make" label={LABELS.make} required error={errors.make} hint="e.g. Toyota, Honda, Suzuki">
          <input {...aria("make", errors, true)} type="text" required maxLength={40} />
        </Field>
        <Field id="model" label={LABELS.model} required error={errors.model} hint="e.g. Corolla, City, Aqua">
          <input {...aria("model", errors, true)} type="text" required maxLength={40} />
        </Field>
        <Field id="year" label={LABELS.year} required error={errors.year}>
          <input {...aria("year", errors)} type="text" inputMode="numeric" pattern="\d{4}" required maxLength={4} placeholder="YYYY" />
        </Field>
        <Field id="registration" label={LABELS.registration} error={errors.registration}>
          <input {...aria("registration", errors)} type="text" maxLength={15} autoCapitalize="characters" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold uppercase text-white">Appointment</legend>
        <Field id="service" label={LABELS.service} required error={errors.service} className="sm:col-span-2">
          <select {...aria("service", errors)} required value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select a service…</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            <option value="not-sure">Not sure — please advise</option>
          </select>
        </Field>
        <Field id="date" label={LABELS.date} required error={errors.date}>
          <input {...aria("date", errors)} type="date" required min={minDate} max={maxDate} />
        </Field>
        <Field id="time" label={LABELS.time} required error={errors.time}>
          <select {...aria("time", errors)} required defaultValue="">
            <option value="">Select a time…</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{slotLabel(t)}</option>)}
          </select>
        </Field>
        <Field id="issue" label={LABELS.issue} required error={errors.issue} hint={`${issueLen}/1000 — symptoms, warning lights, noises, when it happens.`} className="sm:col-span-2">
          <textarea {...aria("issue", errors, true)} required maxLength={1000} rows={5} onChange={(e) => setIssueLen(e.target.value.length)} />
        </Field>
      </fieldset>

      <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4 text-sm text-mist">
        <p className="font-semibold text-white">Vehicle photos</p>
        <p className="mt-1">
          To keep your data safe, this website doesn&apos;t store uploads. After WhatsApp opens, you can attach photos of your vehicle or the
          problem directly in the chat.
        </p>
      </div>

      <div className="field">
        <label className="flex cursor-pointer items-start gap-3 font-normal" htmlFor="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[#f5b301]"
            style={{ minHeight: 0, width: 20 }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="text-mist">
            I agree that {client.name} may contact me by WhatsApp or phone about this request, as described in the{" "}
            <a href={asset("/privacy-policy")} className="text-brand underline" target="_blank" rel="noopener">Privacy Policy</a>. <span className="req" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && <p id="consent-error" className="error" role="alert">{errors.consent}</p>}
      </div>

      <Honeypot />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary"><CalendarIcon /> Send request via WhatsApp</button>
        <p className="text-sm text-metal">Your requested appointment time will be confirmed by our team through WhatsApp or telephone.</p>
      </div>
    </form>
  );
}
