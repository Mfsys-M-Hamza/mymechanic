"use client";

import type { ReactNode } from "react";
import { AlertIcon } from "@/components/Icons";

export type Errors = Record<string, string>;

/** Labelled field wrapper that wires up hint and error text for screen readers. */
export function Field({
  id, label, required, hint, error, children, className = "",
}: { id: string; label: string; required?: boolean; hint?: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="font-normal text-metal">(optional)</span>}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="error" role="alert">{error}</p>}
    </div>
  );
}

/** aria props for an input given its id/error/hint state. */
export function aria(id: string, errors: Errors, hint = false) {
  const describedBy = [hint ? `${id}-hint` : "", errors[id] ? `${id}-error` : ""].filter(Boolean).join(" ");
  return {
    id,
    name: id,
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

export function ErrorSummary({ errors, labels }: { errors: Errors; labels: Record<string, string> }) {
  const keys = Object.keys(errors).filter((k) => k !== "form");
  if (!keys.length && !errors.form) return null;
  return (
    <div id="error-summary" tabIndex={-1} role="alert" className="rounded-2xl border border-[#ff6b6b]/40 bg-[#ff6b6b]/8 p-5 outline-none">
      <p className="flex items-center gap-2 font-bold text-white"><AlertIcon className="text-[#ff8a8a]" /> Please check the form</p>
      {errors.form && <p className="mt-2 text-sm text-[#ffb3b3]">{errors.form}</p>}
      {keys.length > 0 && (
        <ul className="mt-3 grid gap-1 text-sm">
          {keys.map((k) => (
            <li key={k}><a href={`#${k}`} className="text-[#ffb3b3] underline underline-offset-2">{labels[k] ?? k}: {errors[k]}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Visually hidden trap field that humans never see or fill. */
export function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label htmlFor="company_website">Leave this field empty</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
