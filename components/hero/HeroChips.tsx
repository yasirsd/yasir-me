"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/profile";

const ROTATE_MS = 2600;

/**
 * Rotating specialist chip.
 *
 * - The rotating container is `aria-hidden` — decorative ambient motion.
 * - The label slot reserves width via a same-flow, visibility-hidden
 *   copy of the longest label. **No absolute-positioned measurement**
 *   — the earlier `offsetWidth` on an absolutely-positioned element
 *   returned the parent's width instead of the label's natural width,
 *   which caused mid-length labels (TypeScript, Performance, Accessibility)
 *   to clip. The visible label is stacked on top with `position:absolute`
 *   inside a `position:relative` slot; the invisible copy alone drives
 *   the layout size, so zero CLS and zero clipping.
 * - Rotation is CSS-only (`.chip-swap` keyframe replays when the key
 *   changes). Respects `prefers-reduced-motion` at the CSS media-query
 *   level (see globals.css).
 */
export function HeroChips() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
  const longest = useMemo(
    () =>
      profile.specialisms.reduce(
        (max, s) => (s.length > max.length ? s : max),
        profile.specialisms[0] ?? "",
      ),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % profile.specialisms.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const current = profile.specialisms[i] ?? profile.specialisms[0] ?? "";

  return (
    <>
      <div
        aria-hidden
        className="mat-b inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
      >
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--yellow)]"
          aria-hidden
        />
        <span className="text-[color:var(--text-muted)]">Specialism</span>
        <span
          className="mx-1 h-3 w-px shrink-0 bg-[color:var(--border-strong)]"
          aria-hidden
        />
        <RotatingSlot longest={longest} current={current} />
      </div>
      <span className="sr-only">
        Specialisms: {profile.specialisms.join(", ")}.
      </span>
    </>
  );
}

function RotatingSlot({
  longest,
  current,
}: {
  longest: string;
  current: string;
}) {
  return (
    <span
      className="relative inline-block whitespace-nowrap align-baseline"
      style={{ lineHeight: "1.25em" }}
    >
      {/* Layout-consuming ghost of the LONGEST label. Sits in normal
          flow, invisible via visibility:hidden so it reserves width but
          takes no ink. This is what drives the slot's width. */}
      <span aria-hidden style={{ visibility: "hidden" }}>
        {longest}
      </span>
      {/* Visible label — absolutely positioned on top of the ghost.
          Keyed on the current value so React swaps the DOM node and the
          CSS `chip-swap` animation replays. */}
      <span
        key={current}
        className="chip-swap absolute inset-0 text-[color:var(--text)]"
      >
        {current}
      </span>
    </span>
  );
}
