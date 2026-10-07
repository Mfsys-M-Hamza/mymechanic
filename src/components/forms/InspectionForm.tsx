"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { client } from "@/config/client";
import { inspections } from "@/data/inspections";
import { whatsappHref } from "@/lib/links";
import { asset } from "@/lib/basePath";
import {
  clean, cooldownRemaining, displayPhone, looksLikeBot, normalisePhone, patterns, startCooldown, todayISO,
} from "@/lib/validation";
import { ErrorSummary, Field, Honeypot, aria, type Errors } from "./FormParts";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/Icons";

/** Inspection slots within opening hours (9 AM–9 PM); the last slot leaves time to finish. */
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const slotLabel = (t: string) => {
  const h = Number(t.slice(0, 2));
  return `${((h + 11) % 12) + 1}:00 ${h >= 12 ? "pm" : "am"}`;
};
const FUELS = ["Petrol", "Hybrid", "Diesel", "CNG / LPG", "Electric"];
const GEARBOXES = ["Automatic", "Manual", "CVT"];
const PURPOSES = ["Buying a used car", "Checking my own car", "Before selling my car", "After an accident"];

const LABELS: Record<string, string> = {
  name: "Your name",
  mobile: "Mobile number",
  make: "Vehicle make",
  model: "Vehicle model",
  year: "Model year",
  fuel: "Fuel type",
  gearbox: "Transmission",
  mileage: "Mileage (km)",
  registration: "Registration number",
  inspection: "Inspection type",
  purpose: "Reason for inspection",
  branch: "Preferred branch",
  date: "Preferred date",
  time: "Preferred time",
  notes: "Anything else we should know",
  consent: "Consent",
};

type Data = Record<keyof typeof LABELS, string>;

/** Day of week for a YYYY-MM-DD date (0 = Sunday … 5 = Friday), timezone-safe. */
const weekday = (iso: string) => new Date(`${iso}T12:00:00`).getDay();

function validate(d: Data): Errors {
  const e: Errors = {};
  const maxYear = new Date().getFullYear() + 1;
  if (!patterns.name.test(d.name)) e.name = "Enter your name (letters only, at least 2 characters).";
  if (!patterns.pkMobile.test(normalisePhone(d.mobile))) e.mobile = "Enter a valid Pakistani mobile number, e.g. 0300-1234567.";
  if (!patterns.vehicleText.test(d.make)) e.make = "Enter the vehicle make, e.g. Toyota.";
  if (!patterns.vehicleText.test(d.model)) e.model = "Enter the vehicle model, e.g. Corolla.";
  const y = Number(d.year);
  if (!/^\d{4}$/.test(d.year) || y < 1960 || y > maxYear) e.year = `Enter a 4-digit year between 1960 and ${maxYear}.`;
  if (!FUELS.includes(d.fuel)) e.fuel = "Choose the fuel type.";
  if (d.gearbox && !GEARBOXES.includes(d.gearbox)) e.gearbox = "Choose a transmission or leave it blank.";
  if (d.mileage && !/^\d{1,7}$/.test(d.mileage.replace(/[,\s]/g, ""))) e.mileage = "Enter the mileage in numbers only, e.g. 85000.";
  if (d.registration && !patterns.registration.test(d.registration)) e.registration = "Use letters, numbers, spaces or dashes only.";
  if (!d.inspection) e.inspection = "Choose an inspection (or “Not sure”).";
  if (!PURPOSES.includes(d.purpose)) e.purpose = "Choose the reason for the inspection.";
  if (!client.branches.some((b) => b.id === d.branch)) e.branch = "Choose a branch.";
  if (!d.date) e.date = "Choose a preferred date.";
  else if (d.date < todayISO()) e.date = "The preferred date can't be in the past.";
  else if (weekday(d.date) === 5) e.date = "We're closed on Fridays — please choose another day.";
  if (!TIME_SLOTS.includes(d.time)) e.time = "Choose a preferred time.";
  if (d.consent !== "yes") e.consent = "Please confirm you agree to be contacted about this request.";
  return e;
}

function buildMessage(d: Data) {
  const inspection = inspections.find((i) => i.id === d.inspection)?.title ?? "Not sure — please advise";
  const branch = client.branches.find((b) => b.id === d.branch);
  const date = new Date(`${d.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const mileage = d.mileage ? `${Number(d.mileage.replace(/[,\s]/g, "")).toLocaleString("en-US")} km` : "";
  const lines: (string | null)[] = [
    `*Car Inspection Request — ${client.name}*`,
    "",
    `*Name:* ${d.name}`,
    `*Mobile:* ${displayPhone(d.mobile)}`,
    "",
    `*Vehicle:* ${d.make} ${d.model} (${d.year})`,
    `*Fuel:* ${d.fuel}${d.gearbox ? ` · ${d.gearbox}` : ""}`,
    mileage ? `*Mileage:* ${mileage}` : null,
    d.registration ? `*Registration:* ${d.registration.toUpperCase()}` : null,
    "",
    `*Inspection:* ${inspection}`,
    `*Reason:* ${d.purpose}`,
    `*Branch:* ${branch ? `${branch.label} — ${branch.name}` : ""}`,
    `*Preferred date:* ${date}`,
    `*Preferred time:* ${slotLabel(d.time)}`,
    d.notes ? "" : null,
    d.notes ? `*Notes:*` : null,
    d.notes || null,
    "",
    "_Please confirm if this slot is available. Thank you._",
  ];
  return lines.filter((l): l is string => l !== null).join("\n").replace(/\n{3,}/g, "\n\n");
}

export function InspectionForm() {
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [inspection, setInspection] = useState("");
  const [minDate, setMinDate] = useState<string>();
  const [maxDate, setMaxDate] = useState<string>();
  const [notesLen, setNotesLen] = useState(0);
  const [done, setDone] = useState<{ href: string; opened: boolean } | null>(null);

  useEffect(() => {
    const now = new Date();
    setMinDate(todayISO(now));
    setMaxDate(todayISO(new Date(now.getTime() + 90 * 86_400_000)));
    // Inspection cards link here with ?type=<id>#book.
    const pre = new URLSearchParams(window.location.search).get("type");
    if (pre && inspections.some((i) => i.id === pre)) setInspection(pre);
    const onPick = (ev: Event) => setInspection((ev as CustomEvent<string>).detail);
    window.addEventListener("inspection:pick", onPick);
    return () => window.removeEventListener("inspection:pick", onPick);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string, max = 60, ml = false) => clean(fd.get(k), max, ml);
    const data: Data = {
      name: get("name"),
      mobile: get("mobile", 20),
      make: get("make", 40),
      model: get("model", 40),
      year: get("year", 4),
      fuel: get("fuel", 20),
      gearbox: get("gearbox", 20),
      mileage: get("mileage", 12),
      registration: get("registration", 15),
      inspection: get("inspection", 40),
      purpose: get("purpose", 40),
      branch: get("branch", 40),
      date: get("date", 10),
      time: get("time", 5),
      notes: get("notes", 600, true),
      consent: fd.get("consent") === "yes" ? "yes" : "",
    };

    if (looksLikeBot(String(fd.get("company_website") ?? ""), startedAt.current)) {
      setErrors({ form: "Something went wrong. Please wait a moment and try again, or message us directly on WhatsApp." });
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }

    const errs = validate(data);
    const wait = cooldownRemaining("mm-inspection", 45);
    if (!Object.keys(errs).length && wait) errs.form = `You've just sent a request. Please wait ${wait} seconds before sending another.`;
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }

    const href = whatsappHref(buildMessage(data));
    startCooldown("mm-inspection");
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    setDone({ href, opened: win !== null });
    requestAnimationFrame(() => document.getElementById("form-success")?.focus());
  }

  if (done) {
    return (
      <div id="form-success" tabIndex={-1} role="status" className="card p-8 outline-none">
        <CheckCircleIcon width={48} height={48} className="text-brand" />
        <h3 className="mt-4 text-3xl font-extrabold uppercase text-white">Your inspection request is ready</h3>
        <p className="mt-3 text-mist">
          {done.opened ? "WhatsApp has opened in a new tab with your details filled in. " : ""}
          Please press <strong className="text-white">Send</strong> in WhatsApp so our team receives it. You can also attach photos of the car or the
          seller&apos;s advert in the same chat.
        </p>
        <p className="mt-3 rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm text-soft">
          Your slot is <strong>not confirmed yet</strong> — our team will confirm it by WhatsApp or phone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={done.href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> {done.opened ? "Open WhatsApp again" : "Open WhatsApp to send"}
          </a>
          <button type="button" className="btn btn-outline" onClick={() => { setDone(null); startedAt.current = Date.now(); }}>
            Book another inspection
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="card relative grid gap-6 p-6 sm:p-8" aria-describedby="inspection-form-intro">
      <p id="inspection-form-intro" className="text-sm text-mist">
        Fields marked <span className="req">*</span> are required. Submitting opens WhatsApp with your details addressed to {client.whatsapp.display} —
        nothing is stored on this website.
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
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold uppercase text-white">The car</legend>
        <Field id="make" label={LABELS.make} required error={errors.make} hint="e.g. Toyota, Honda, Suzuki">
          <input {...aria("make", errors, true)} type="text" required maxLength={40} />
        </Field>
        <Field id="model" label={LABELS.model} required error={errors.model} hint="e.g. Corolla, City, Aqua">
          <input {...aria("model", errors, true)} type="text" required maxLength={40} />
        </Field>
        <Field id="year" label={LABELS.year} required error={errors.year}>
          <input {...aria("year", errors)} type="text" inputMode="numeric" pattern="\d{4}" required maxLength={4} placeholder="YYYY" />
        </Field>
        <Field id="fuel" label={LABELS.fuel} required error={errors.fuel}>
          <select {...aria("fuel", errors)} required defaultValue="">
            <option value="">Select…</option>
            {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </Field>
        <Field id="gearbox" label={LABELS.gearbox} error={errors.gearbox}>
          <select {...aria("gearbox", errors)} defaultValue="">
            <option value="">Select…</option>
            {GEARBOXES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field id="mileage" label={LABELS.mileage} error={errors.mileage} hint="As shown on the odometer">
          <input {...aria("mileage", errors, true)} type="text" inputMode="numeric" maxLength={12} placeholder="e.g. 85000" />
        </Field>
        <Field id="registration" label={LABELS.registration} error={errors.registration} className="sm:col-span-2">
          <input {...aria("registration", errors)} type="text" maxLength={15} autoCapitalize="characters" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold uppercase text-white">Inspection</legend>
        <Field id="inspection" label={LABELS.inspection} required error={errors.inspection}>
          <select {...aria("inspection", errors)} required value={inspection} onChange={(e) => setInspection(e.target.value)}>
            <option value="">Select an inspection…</option>
            {inspections.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}
            <option value="not-sure">Not sure — please advise</option>
          </select>
        </Field>
        <Field id="purpose" label={LABELS.purpose} required error={errors.purpose}>
          <select {...aria("purpose", errors)} required defaultValue="">
            <option value="">Select…</option>
            {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field id="branch" label={LABELS.branch} required error={errors.branch} className="sm:col-span-2">
          <select {...aria("branch", errors)} required defaultValue="">
            <option value="">Select a branch…</option>
            {client.branches.map((b) => <option key={b.id} value={b.id}>{b.label} — {b.name}</option>)}
          </select>
        </Field>
        <Field id="date" label={LABELS.date} required error={errors.date} hint="Closed on Fridays">
          <input {...aria("date", errors, true)} type="date" required min={minDate} max={maxDate} />
        </Field>
        <Field id="time" label={LABELS.time} required error={errors.time}>
          <select {...aria("time", errors)} required defaultValue="">
            <option value="">Select a time…</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{slotLabel(t)}</option>)}
          </select>
        </Field>
        <Field id="notes" label={LABELS.notes} error={errors.notes} hint={`${notesLen}/600 — e.g. warning lights, noises, or where the car is being sold.`} className="sm:col-span-2">
          <textarea {...aria("notes", errors, true)} maxLength={600} rows={4} onChange={(e) => setNotesLen(e.target.value.length)} />
        </Field>
      </fieldset>

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
        <button type="submit" className="btn btn-whatsapp"><WhatsAppIcon /> Book inspection via WhatsApp</button>
        <p className="text-sm text-metal">Our team will confirm your slot by WhatsApp or phone.</p>
      </div>
    </form>
  );
}
