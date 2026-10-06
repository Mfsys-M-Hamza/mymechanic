"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps an animated illustration and only lets its CSS animations run while it is
 * on screen (see [data-anim] rules in globals.css). Saves battery and main-thread time.
 */
export function Animated({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.setAttribute("data-inview", "true");
      return;
    }
    const io = new IntersectionObserver(([e]) => el.setAttribute("data-inview", String(e.isIntersecting)), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-anim="" className={className}>
      {children}
    </div>
  );
}
