"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently most-visible in the viewport.
 * Uses IntersectionObserver — no per-scroll React state churn.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const targets: HTMLElement[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) targets.push(el);
    }
    if (targets.length === 0) return;

    // Track per-section intersection ratios and pick the highest each tick.
    const ratios = new Map<string, number>();
    for (const t of targets) ratios.set(t.id, 0);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = active;
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0 && bestId !== active) setActive(bestId);
      },
      {
        // Middle-of-viewport bias so the pill switches when a section
        // occupies the reading zone, not the moment it enters/exits.
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const t of targets) io.observe(t);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|")]);

  return active;
}
