"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Tasteful parallax: elements with data-parallax="0.15" drift at that fraction of
 * scroll speed. One rAF-throttled listener, transform-only (no layout), disabled
 * for reduced-motion users.
 */
export function ParallaxManager() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.parentElement?.getBoundingClientRect();
        if (!r || r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.1");
        el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  return null;
}
