"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight reduced-motion preference hook for non-Motion contexts.
 * Inside Motion trees prefer `useReducedMotion` from motion/react.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
