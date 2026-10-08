"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { client } from "@/config/client";
import { inspections } from "@/data/inspections";
import { whatsappHref } from "@/lib/links";
import { asset } from "@/lib/basePath";
import { clean, cooldownRemaining, displayPhone, looksLikeBot, normalisePhone, patterns, startCooldown, todayISO } from "@/lib/validation";
import { ErrorSummary, Field, Honeypot, aria, type Errors } from "./FormParts";
import { CheckCircleIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";

/**
 * Car inspection booking form, laid out like a booking widget: car type tabs, location,
 * branch, car details, a date for the coming week and a time slot. Submitting opens
 * WhatsApp with the details filled in (no backend, nothing stored).
 */

const CAR_TYPES = [
  { id: "used", label: "Used Car", hint: "Buying a used car", reason: "Buying a used car (pre-purchase)" },
  { id: "new", label: "New Car", hint: "Pre-delivery check", reason: "New car (pre-delivery inspection)" },
] as const;
type CarType = (typeof CAR_TYPES)[number]["id"];

const POPULAR_MAKES = ["Toyota", "Suzuki", "Honda", "Daihatsu"];
const OTHER_MAKES = [
  "Audi", "BMW", "Changan", "Chevrolet", "DFSK", "FAW", "Haval", "Hyundai", "Isuzu", "Kia", "Land Rover", "Lexus",
  "Mazda", "Mercedes-Benz", "MG", "Mitsubishi", "Nissan", "Peugeot", "Prince", "Proton", "Subaru", "United", "Volkswagen",
];
const ALL_MAKES = [...POPULAR_MAKES, ...OTHER_MAKES, "Other"];
/** Model suggestions for the most common makes (free text is still allowed). */
const MODEL_HINTS: Record<string, string[]> = {
  Toyota: ["Corolla", "Corolla Cross", "Yaris", "Aqua", "Prius", "Vitz", "Passo", "Fortuner", "Hilux", "Land Cruiser", "Prado", "Camry", "C-HR", "Raize"],
  Suzuki: ["Alto", "Cultus", "Wagon R", "Swift", "Mehran", "Bolan", "Every", "Vitara", "Jimny", "Ciaz"],
  Honda: ["Civic", "City", "BR-V", "HR-V", "Vezel", "Fit", "Accord", "N-WGN", "N-Box"],
  Daihatsu: ["Mira", "Cuore", "Move", "Hijet", "Tanto", "Boon", "Rocky"],
  Hyundai: ["Tucson", "Elantra", "Sonata", "Santa Fe"],
  Kia: ["Sportage", "Picanto", "Stonic", "Sorento"],
  Changan: ["Alsvin", "Oshan X7", "Karvaan"],
  MG: ["HS", "ZS", "MG4"],
  Haval: ["H6", "Jolion"],
  Nissan: ["Dayz", "Note", "Juke", "X-Trail"],
};
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const slotLabel = (t: string) => {
  const h = Number(t.slice(0, 2));
  return `${((h + 11) % 12) + 1}:00 ${h >= 12 ? "PM" : "AM"}`;
};
/** Next 7 open days (Friday closed), starting today. */
function bookingDays(now = new Date()) {
  const out: { iso: string; top: string; bottom: string }[] = [];
  for (let i = 0; out.length < 7 && i < 10; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 12);
    if (d.getDay() === 5) continue;
    const iso = todayISO(d);
    const top = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short" });
    out.push({ iso, top, bottom: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) });
  }
  return out;
}

const LABELS: Record<string, string> = {
  city: "City",
  area: "Area",
  branch: "Service location",
  year: "Model year",
  make: "Make",
  model: "Model",
  version: "Version",
  inspection: "Inspection",
  date: "Date",
  time: "Time",
  name: "Your name",
  mobile: "Mobile number",
  consent: "Consent",
};
type Data = Record<keyof typeof LABELS, string> & { carType: CarType };

function validate(d: Data, days: string[]): Errors {
  const e: Errors = {};
  const maxYear = new Date().getFullYear() + 1;
  if (!client.serviceAreas.primary.includes(d.city as never) && d.city !== "Other") e.city = "Choose your city.";
  if (d.area && !/^[\p{L}\p{N} .,'\-/#]{2,60}$/u.test(d.area)) e.area = "Use letters, numbers and simple punctuation only.";
  if (!client.branches.some((b) => b.id === d.branch)) e.branch = "Choose a branch.";
  const y = Number(d.year);
  if (!/^\d{4}$/.test(d.year) || y < 1970 || y > maxYear) e.year = "Choose the model year.";
  if (!ALL_MAKES.includes(d.make)) e.make = "Choose the make.";
  if (!patterns.vehicleText.test(d.model)) e.model = "Enter the model, e.g. Corolla.";
  if (d.version && !patterns.vehicleText.test(d.version)) e.version = "Use letters, numbers, spaces or dashes only.";
  if (!d.inspection) e.inspection = "Choose an inspection (or “Not sure”).";
  if (!days.includes(d.date)) e.date = "Choose a date.";
  if (!TIME_SLOTS.includes(d.time)) e.time = "Choose a time slot.";
  if (!patterns.name.test(d.name)) e.name = "Enter your name (letters only, at least 2 characters).";
  if (!patterns.pkMobile.test(normalisePhone(d.mobile))) e.mobile = "Enter a valid Pakistani mobile number, e.g. 0300-1234567.";
  if (d.consent !== "yes") e.consent = "Please confirm you agree to be contacted about this booking.";
  return e;
}

function buildMessage(d: Data) {
  const type = CAR_TYPES.find((t) => t.id === d.carType)!;
  const inspection = inspections.find((i) => i.id === d.inspection)?.title ?? "Not sure — please advise";
  const branch = client.branches.find((b) => b.id === d.branch);
  const date = new Date(`${d.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const lines: (string | null)[] = [
    `*Car Inspection Booking — ${client.name}*`,
    "",
    `*For:* ${type.reason}`,
    `*Inspection:* ${inspection}`,
    "",
    `*Car:* ${d.year} ${d.make} ${d.model}${d.version ? ` ${d.version}` : ""}`,
    "",
    `*City:* ${d.city}${d.area ? ` — ${d.area}` : ""}`,
    `*Service location:* ${branch ? `${branch.label} — ${branch.name}` : ""}`,
    `*Date:* ${date}`,
    `*Time:* ${slotLabel(d.time)}`,
    "",
    `*Name:* ${d.name}`,
    `*Mobile:* ${displayPhone(d.mobile)}`,
    "",
    "_Please confirm if this slot is available. Thank you._",
  ];
  return lines.filter((l): l is string => l !== null).join("\n").replace(/\n{3,}/g, "\n\n");
}

/** Pill-style radio option (keeps native radio semantics for keyboard and screen readers). */
function Choice({ name, value, checked, onChange, children, className = "" }: {
  name: string; value: string; checked: boolean; onChange: (v: string) => void; children: React.ReactNode; className?: string;
}) {
  return (
    <label className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
      checked ? "border-brand bg-brand text-[#111111]" : "border-white/15 bg-white/[.03] text-mist hover:border-brand hover:text-white"
    } ${className}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {children}
    </label>
  );
}

export function InspectionForm() {
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [carType, setCarType] = useState<CarType>("used");
  const [inspection, setInspection] = useState("pre-purchase");
  const [branch, setBranch] = useState<string>(client.branches[0].id);
  const [make, setMake] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState<ReturnType<typeof bookingDays>>([]);
  const [nowHour, setNowHour] = useState(0);
  const [done, setDone] = useState<{ href: string; opened: boolean } | null>(null);

  useEffect(() => {
    // Dates depend on the visitor's clock, so they are built after mount (no hydration mismatch).
    setDays(bookingDays());
    setNowHour(new Date().getHours());
    const pre = new URLSearchParams(window.location.search).get("type");
    if (pre && inspections.some((i) => i.id === pre)) {
      setInspection(pre);
      if (pre === "new-car") setCarType("new");
    }
  }, []);

  // Switching tab selects the matching inspection (still changeable below).
  function chooseType(t: CarType) {
    setCarType(t);
    setInspection((cur) => (t === "new" ? "new-car" : cur === "new-car" ? "pre-purchase" : cur));
  }

  const years = useMemo(() => {
    const max = new Date().getFullYear() + 1;
    return Array.from({ length: max - 1970 + 1 }, (_, i) => String(max - i));
  }, []);
  const isToday = days[0] && date === days[0].iso;
  const slots = TIME_SLOTS.filter((t) => !isToday || Number(t.slice(0, 2)) > nowHour);

  function reset() {
    setErrors({});
    setCarType("used"); setInspection("pre-purchase"); setBranch(client.branches[0].id);
    setMake(""); setDate(""); setTime("");
    startedAt.current = Date.now();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string, max = 60) => clean(fd.get(k), max);
    const data: Data = {
      carType,
      city: get("city", 40),
      area: get("area", 60),
      branch,
      year: get("year", 4),
      make: get("make", 40),
      model: get("model", 40),
      version: get("version", 40),
      inspection,
      date,
      time,
      name: get("name"),
      mobile: get("mobile", 20),
      consent: fd.get("consent") === "yes" ? "yes" : "",
    };

    if (looksLikeBot(String(fd.get("company_website") ?? ""), startedAt.current)) {
      setErrors({ form: "Something went wrong. Please wait a moment and try again, or message us directly on WhatsApp." });
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }
    const errs = validate(data, days.map((d) => d.iso));
    const wait = cooldownRemaining("mm-inspection", 45);
    if (!Object.keys(errs).length && wait) errs.form = `You've just sent a booking. Please wait ${wait} seconds before sending another.`;
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
        <h3 className="mt-4 text-3xl font-extrabold uppercase text-white">Your booking is ready to send</h3>
        <p className="mt-3 text-mist">
          {done.opened ? "WhatsApp has opened in a new tab with your booking details. " : ""}
          Please press <strong className="text-white">Send</strong> in WhatsApp so our team receives it. You can also share photos of the car or the
          seller&apos;s advert in the same chat.
        </p>
        <p className="mt-3 rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm text-soft">
          Your slot is <strong>not confirmed yet</strong> — our team will confirm it by WhatsApp or phone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={done.href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> {done.opened ? "Open WhatsApp again" : "Open WhatsApp to send"}
          </a>
          <button type="button" className="btn btn-outline" onClick={() => { setDone(null); reset(); }}>Book another inspection</button>
        </div>
      </div>
    );
  }

  const fieldErr = (k: string) => (errors[k] ? <p id={`${k}-error`} className="error" role="alert">{errors[k]}</p> : null);

  return (
    <form noValidate onSubmit={onSubmit} onReset={reset} className="card relative grid gap-6 overflow-hidden p-0" aria-label="Book a car inspection">
      {/* Car type tabs */}
      <div role="radiogroup" aria-label="What are you inspecting?" className="grid grid-cols-2 border-b border-white/10">
        {CAR_TYPES.map((t) => (
          <label key={t.id} className={`cursor-pointer px-4 py-4 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-brand ${
            carType === t.id ? "border-b-2 border-brand bg-brand/10 text-white" : "text-metal hover:text-white"
          }`}>
            <input type="radio" name="carType" value={t.id} checked={carType === t.id} onChange={() => chooseType(t.id)} className="sr-only" />
            <span className="block font-display text-xl font-bold uppercase">{t.label}</span>
            <span className="block text-xs">{t.hint}</span>
          </label>
        ))}
      </div>

      <div className="grid gap-6 px-6 pb-6 sm:px-8 sm:pb-8">
        <ErrorSummary errors={errors} labels={LABELS} />

        {/* Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="city" label={LABELS.city} required error={errors.city}>
            <select {...aria("city", errors)} required defaultValue="">
              <option value="">Select city…</option>
              {client.serviceAreas.primary.map((c) => <option key={c} value={c}>{c}</option>)}
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field id="area" label={LABELS.area} error={errors.area} hint="e.g. New City, Satellite Town">
            <input {...aria("area", errors, true)} type="text" maxLength={60} autoComplete="address-level3" />
          </Field>
        </div>

        <fieldset aria-describedby={errors.branch ? "branch-error" : undefined}>
          <legend className="mb-2 text-sm font-semibold text-soft">{LABELS.branch} <span className="req" aria-hidden="true">*</span></legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {client.branches.map((b) => (
              <Choice key={b.id} name="branch" value={b.id} checked={branch === b.id} onChange={setBranch} className="justify-start gap-3 py-3 text-left">
                <PinIcon width={18} height={18} className="shrink-0" />
                <span>
                  <span className="block">{b.label} — {b.name}</span>
                  <span className={`block text-xs font-normal ${branch === b.id ? "text-[#111111]/75" : "text-metal"}`}>{b.street}</span>
                </span>
              </Choice>
            ))}
          </div>
          {fieldErr("branch")}
        </fieldset>

        {/* Car */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="year" label={LABELS.year} required error={errors.year}>
            <select {...aria("year", errors)} required defaultValue="">
              <option value="">Select year…</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
          <Field id="make" label={LABELS.make} required error={errors.make}>
            <select {...aria("make", errors)} required value={make} onChange={(e) => setMake(e.target.value)}>
              <option value="">Select make…</option>
              <optgroup label="Popular">{POPULAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}</optgroup>
              <optgroup label="Others">{OTHER_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}</optgroup>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field id="model" label={LABELS.model} required error={errors.model}>
            <input {...aria("model", errors)} type="text" required maxLength={40} list="model-options" placeholder={MODEL_HINTS[make]?.[0] ? `e.g. ${MODEL_HINTS[make][0]}` : "e.g. Corolla"} />
            <datalist id="model-options">{(MODEL_HINTS[make] ?? []).map((m) => <option key={m} value={m} />)}</datalist>
          </Field>
          <Field id="version" label={LABELS.version} error={errors.version} hint="e.g. GLi, Altis, Hybrid Z">
            <input {...aria("version", errors, true)} type="text" maxLength={40} />
          </Field>
          <Field id="inspection" label={LABELS.inspection} required error={errors.inspection} className="sm:col-span-2">
            <select {...aria("inspection", errors)} required value={inspection} onChange={(e) => setInspection(e.target.value)}>
              {inspections.map((i) => <option key={i.id} value={i.id}>{i.title}</option>)}
              <option value="not-sure">Not sure — please advise</option>
            </select>
          </Field>
        </div>

        {/* Date & time */}
        <fieldset aria-describedby={errors.date ? "date-error" : undefined}>
          <legend className="mb-2 text-sm font-semibold text-soft">{LABELS.date} <span className="req" aria-hidden="true">*</span> <span className="font-normal text-metal">· next 7 days, Friday closed</span></legend>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((d) => (
              <Choice key={d.iso} name="date" value={d.iso} checked={date === d.iso} onChange={(v) => { setDate(v); setTime(""); }} className="flex-col px-1 py-2">
                <span className="text-xs font-bold uppercase">{d.top}</span>
                <span className="text-xs font-normal">{d.bottom}</span>
              </Choice>
            ))}
          </div>
          {fieldErr("date")}
        </fieldset>

        <fieldset aria-describedby={errors.time ? "time-error" : undefined}>
          <legend className="mb-2 text-sm font-semibold text-soft">{LABELS.time} <span className="req" aria-hidden="true">*</span></legend>
          {!date ? (
            <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-metal">Choose a date to see available time slots.</p>
          ) : slots.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-metal">No slots left today — please choose another date.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((t) => <Choice key={t} name="time" value={t} checked={time === t} onChange={setTime}>{slotLabel(t)}</Choice>)}
            </div>
          )}
          {fieldErr("time")}
        </fieldset>

        {/* Contact */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label={LABELS.name} required error={errors.name}>
            <input {...aria("name", errors)} type="text" autoComplete="name" required maxLength={60} />
          </Field>
          <Field id="mobile" label={LABELS.mobile} required error={errors.mobile} hint="e.g. 0300-1234567">
            <input {...aria("mobile", errors, true)} type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} />
          </Field>
        </div>

        <div className="field">
          <label className="flex cursor-pointer items-start gap-3 font-normal" htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" value="yes" required className="mt-1 h-5 w-5 shrink-0 accent-[#f5b301]" style={{ minHeight: 0, width: 20 }}
              aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "consent-error" : undefined} />
            <span className="text-mist">
              I agree that {client.name} may contact me by WhatsApp or phone about this booking, as described in the{" "}
              <a href={asset("/privacy-policy")} className="text-brand underline" target="_blank" rel="noopener">Privacy Policy</a>. <span className="req" aria-hidden="true">*</span>
            </span>
          </label>
          {fieldErr("consent")}
        </div>

        <Honeypot />

        <div className="flex flex-wrap items-center gap-3">
          <button type="reset" className="btn btn-outline">Cancel</button>
          <button type="submit" className="btn btn-primary flex-1 sm:flex-none"><WhatsAppIcon /> Confirm booking</button>
          <p className="w-full text-xs text-metal">Confirm opens WhatsApp with your booking addressed to {client.whatsapp.display} — nothing is stored on this website.</p>
        </div>
      </div>
    </form>
  );
}
