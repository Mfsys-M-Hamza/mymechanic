"use client";

import { useState } from "react";
import { client, fullAddress, primaryBranch } from "@/config/client";
import { directionsHref, mapEmbedSrc } from "@/lib/links";
import { DirectionsIcon, PinIcon } from "@/components/Icons";

/**
 * Click-to-load Google Map. No third-party request (or cookies) until the visitor
 * chooses to load it — faster pages and better privacy.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-coal ${className}`}>
      {loaded ? (
        <iframe
          src={mapEmbedSrc}
          title={`Map showing ${client.name} at ${fullAddress}`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, filter: "grayscale(.3) contrast(1.05)" }}
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "linear-gradient(rgb(245 179 1 / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(245 179 1 / .12) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
            aria-hidden="true"
          />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-[#111111] shadow-[0_0_40px_rgba(245,179,1,.6)]">
            <PinIcon width={28} height={28} />
          </span>
          <p className="relative text-xs font-bold uppercase tracking-[.14em] text-brand">{primaryBranch.label} · {primaryBranch.name}</p>
          <p className="relative -mt-2 max-w-sm font-semibold text-white">{fullAddress}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-outline btn-sm">Load interactive map</button>
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <DirectionsIcon width={16} height={16} /> Get directions
            </a>
          </div>
          <p className="relative text-xs text-metal">Loading the map connects to Google Maps.</p>
        </div>
      )}
    </div>
  );
}
