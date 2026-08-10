"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "span" | "li";
}

/**
 * Fade + rise on entering the viewport.
 *
 * Pure IntersectionObserver + CSS transition — no Motion runtime. Used
 * for below-fold pillar reveals where a Motion feature bundle wouldn't
 * be justified. Respects `prefers-reduced-motion` at the CSS level: the
 * transition rule is disabled inside the media query, so children paint
 * in their final state without an animation.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  amount = 0.35,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, shown]);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-distance": `${distance}px`,
  } as React.CSSProperties;

  const El = as;
  return (
    <El
      ref={ref as never}
      style={style}
      data-shown={shown ? "true" : "false"}
      className={cn("reveal", className)}
    >
      {children}
    </El>
  );
}
