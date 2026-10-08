"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Animated } from "@/components/visuals/Animated";
import { asset } from "@/lib/basePath";

/**
 * Hero visual. Shows the car photo on a turntable with a CSS scan beam immediately
 * (also the permanent version on phones, low-memory devices, Save-Data, or without
 * WebGL), then upgrades to the Three.js scene on first interaction (or after a delay).
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
        .catch(() => {/* keep the photo version */});
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
    <div className="relative mx-auto aspect-[5/3] w-full max-w-[560px] md:aspect-square">
      <div className="absolute inset-[8%] bg-[radial-gradient(circle,rgb(245_179_1/.22),transparent_68%)]" aria-hidden="true" />
      <Animated className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        {/* Same concept as the 3D scene: the car on a turntable under a diagnostic scan. */}
        <div className="relative aspect-[1090/520] w-[94%]">
          <div className="hero-turntable absolute inset-x-0 bottom-[16%] h-[34%]" aria-hidden="true" />
          <Image
            src={asset("/media/hero-car.webp")}
            alt="Yellow saloon car on the diagnostic turntable"
            width={1090}
            height={386}
            priority
            sizes="(min-width: 1024px) 520px, 94vw"
            className="absolute inset-x-0 top-0 h-auto w-full"
          />
          <div className="hero-scan" aria-hidden="true" />
        </div>
      </Animated>
      <div ref={mount} className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
