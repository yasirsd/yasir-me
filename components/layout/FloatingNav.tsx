"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = primaryNav.filter((i) => i.section).map((i) => i.id);

// SSR-safe layout effect (avoids the React warning in Node envs).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Desktop floating nav — Motion-free.
 *
 *   · Compaction on scroll uses a class toggled from a rAF-throttled
 *     scroll listener; CSS transitions handle the visual change.
 *   · The active-section pill is a single absolutely-positioned element
 *     whose `left` and `width` are measured off the DOM in a layout
 *     effect and animated with CSS transitions. Same visual behavior as
 *     Motion's `layoutId` shared-element — none of the runtime cost.
 */
export function FloatingNav() {
  const active = useActiveSection(SECTION_IDS);
  const [compact, setCompact] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );

  // rAF-throttled scroll listener — no Motion, no re-renders per frame.
  useEffect(() => {
    let rafPending = false;
    const check = () => {
      rafPending = false;
      const next = window.scrollY > 40;
      setCompact((prev) => (prev === next ? prev : next));
    };
    check();
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure active pill position off DOM. Runs on `active` change and on
  // resize (viewport width shift can move nav items).
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector<HTMLElement>(
      `[data-nav-item="${active}"]`,
    );
    if (!activeEl) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setPill({ left: itemRect.left - listRect.left, width: itemRect.width });
  }, [active, compact]);

  useEffect(() => {
    const onResize = () => {
      const list = listRef.current;
      if (!list) return;
      const activeEl = list.querySelector<HTMLElement>(
        `[data-nav-item="${active}"]`,
      );
      if (!activeEl) return;
      const listRect = list.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      setPill({ left: itemRect.left - listRect.left, width: itemRect.width });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[40] hidden justify-center md:flex"
      role="presentation"
    >
      <nav
        aria-label="Primary"
        data-compact={compact ? "true" : "false"}
        className={cn(
          "mat-b nav-capsule pointer-events-auto flex items-center gap-1.5 rounded-full",
          "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        )}
      >
        <a
          href="#hero"
          className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--red-strong)] text-white ring-1 ring-white/10"
          aria-label={`${profile.name} — home`}
        >
          <span className="font-mono text-[14px] font-semibold tracking-tight">
            YS
          </span>
        </a>

        <ul ref={listRef} className="relative flex items-center gap-0.5">
          {/* Sliding active-pill background — one shared element, CSS
              transitions on transform+width. Hidden until first measurement. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 h-full rounded-full bg-white/[0.09] ring-1 ring-white/20"
            style={{
              left: 0,
              transform: pill ? `translateX(${pill.left}px)` : "translateX(0)",
              width: pill ? `${pill.width}px` : 0,
              opacity: pill ? 1 : 0,
              transition:
                "transform 320ms cubic-bezier(0.22,1,0.36,1), width 320ms cubic-bezier(0.22,1,0.36,1), opacity 200ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {primaryNav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  data-nav-item={item.id}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                    isActive
                      ? "text-[color:var(--text)]"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text)]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={profile.resumeUrl}
          className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-[color:var(--text)] transition-colors hover:bg-white/[0.08]"
          download
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--yellow)]"
          />
          Résumé
        </a>
      </nav>
    </div>
  );
}
