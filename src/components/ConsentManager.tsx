"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { client } from "@/config/client";

/**
 * Cookie consent — only active when a non-essential tracker is configured
 * (client.analytics.ga4Id). Analytics is never loaded before the visitor accepts.
 * With no analytics configured this renders nothing.
 */
export function ConsentManager() {
  const id = client.analytics.ga4Id;
  const [choice, setChoice] = useState<"granted" | "denied" | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    try {
      const v = localStorage.getItem("mm-consent");
      setChoice(v === "granted" || v === "denied" ? v : null);
    } catch {
      setChoice(null);
    }
  }, [id]);

  if (!id || choice === undefined) return null;

  const decide = (v: "granted" | "denied") => {
    try { localStorage.setItem("mm-consent", v); } catch {}
    setChoice(v);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div role="region" aria-label="Cookie consent" className="fixed inset-x-3 bottom-[92px] z-50 mx-auto max-w-xl rounded-2xl border border-white/10 bg-coal/95 p-5 shadow-2xl lg:bottom-6">
          <p className="text-sm text-mist">
            We would like to use analytics cookies to understand how visitors use this site. They are optional and only set if you accept.{" "}
            <Link href="/cookie-policy" className="text-brand underline">Cookie Policy</Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => decide("granted")}>Accept analytics</button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => decide("denied")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
