"use client";

import { useEffect, useRef, useState } from "react";
import { MechanicalArt } from "@/components/visuals/Mechanical";
import { Animated } from "@/components/visuals/Animated";

/**
 * Hero visual. Shows a lightweight animated SVG immediately (also the permanent
 * fallback on phones, low-memory devices, Save-Data, or without WebGL), then
 * upgrades to the Three.js scene on first interaction (or after a short delay).
 */
export function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const capable =
      window.matchMedia("(min-width: 768px)").matches &&
      !nav.connection?.saveData &&
      (nav.deviceMemory === undefined || nav.deviceMemory >= 4) &&
      (() => {
        try {
          const c = document.createElement("canvas");
          return !!(c.getContext("webgl2") || c.getContext("webgl"));
        } catch {
          return false;
        }
      })();
    if (!capable) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let handle: { dispose: () => void } | undefined;
    let cancelled = false;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      removeTriggers();
      import("./heroScene")
        .then(({ createHeroScene }) => {
          if (cancelled) return;
          handle = createHeroScene(el, { animate: !reduce });
          setReady(true);
        })
        .catch(() => {/* keep SVG fallback */});
    };

    // Load the WebGL scene on the visitor's first interaction, or after a quiet
    // delay — so the ~150 KB Three.js bundle never competes with initial page load.
    const triggers = ["pointermove", "scroll", "keydown", "touchstart"] as const;
    const onTrigger = () => start();
    function removeTriggers() {
      triggers.forEach((t) => window.removeEventListener(t, onTrigger));
    }
    triggers.forEach((t) => window.addEventListener(t, onTrigger, { passive: true, once: true }));
    const timer = window.setTimeout(start, 6000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      removeTriggers();
      handle?.dispose();
    };
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      <div className="absolute inset-[8%] bg-[radial-gradient(circle,rgb(245_179_1/.22),transparent_68%)]" aria-hidden="true" />
      <Animated className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <div className="relative h-full w-full">
          {/* Same concept as the 3D scene: a car under a diagnostic scan. */}
          <MechanicalArt kind="inspection" className="absolute inset-[6%] h-[88%] w-[88%] drop-shadow-[0_20px_40px_rgba(0,0,0,.45)]" />
          <MechanicalArt kind="scanner" className="absolute right-[2%] top-[4%] h-[28%] w-[28%] opacity-90" />
        </div>
      </Animated>
      <div ref={mount} className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />
      {ready && (
        // Attribution required by the car illustration's licence (see docs/ASSET-LICENSES.md).
        <p className="absolute bottom-1 right-2 text-[10px] text-metal">
          Car illustration:{" "}
          <a href="https://www.vexels.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">Vexels</a>
        </p>
      )}
    </div>
  );
}
