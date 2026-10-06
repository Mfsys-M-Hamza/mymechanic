"use client";

import { useLayoutEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { THEME_COLORS, THEME_KEY, type Theme } from "@/lib/theme";

/** Sun/moon button that switches between the dark and light themes. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  // The boot script (layout.tsx) applies the saved theme before first paint. In development,
  // React's Strict Mode remount resets <html> attributes and clears it, so re-apply the saved
  // value here, before paint. In production this is a no-op.
  useLayoutEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch {}
    const current: Theme = saved === "light" ? "light" : "dark";
    if (current === "light") document.documentElement.setAttribute("data-theme", "light");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[current]);
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    if (next === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[next]);
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    window.setTimeout(() => root.classList.remove("theme-switching"), 400);
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      <span className="transition-transform duration-500 group-hover:rotate-45">
        {theme === "light" ? <MoonIcon width={20} height={20} /> : <SunIcon width={20} height={20} />}
      </span>
    </button>
  );
}
