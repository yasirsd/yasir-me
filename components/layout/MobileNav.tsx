"use client";

import { Home, Layers, Sparkles, MessageCircle, Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mobileNav } from "@/data/navigation";
import { useActiveSection } from "./useActiveSection";
import { cn } from "@/lib/cn";
import type { ComponentType, SVGProps } from "react";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  hero: Home,
  work: Layers,
  skills: Sparkles,
  chat: MessageCircle,
  contact: Mail,
};
const SECTION_IDS = mobileNav.map((i) => i.id);
const REVEAL_THRESHOLD_PX = 240;
const IDLE_REVEAL_MS = 220;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Bottom mobile bar — Motion-free.
 *
 *   · Hidden while in the initial hero (scroll < threshold).
 *   · Past threshold + scrolling UP    →  revealed.
 *   · Past threshold + scrolling DOWN  →  retreats.
 *   · Idle after a brief pause         →  revealed.
 *
 * All rendering is server-side + CSS transitions gated on
 * `[data-visible]`. Only the scroll-direction JS runs — a rAF-throttled
 * listener with no per-frame React state churn beyond the visibility
 * boolean and the active-section pill.
 *
 * A 160 px dark shim renders behind the bar, ramping to fully opaque
 * `--bg` right underneath the toolbar so scrolling copy fades to
 * background before the bar is reached — no visual competition.
 */
export function MobileNav() {
  const active = useActiveSection(SECTION_IDS);
  const [visible, setVisible] = useState(false);

  const lastYRef = useRef(0);
  const idleTimerRef = useRef<number | null>(null);
  const rafPendingRef = useRef(false);

  useEffect(() => {
    const check = () => {
      rafPendingRef.current = false;
      const y = window.scrollY;
      const last = lastYRef.current;
      lastYRef.current = y;

      if (y <= REVEAL_THRESHOLD_PX) {
        setVisible(false);
        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
        return;
      }
      const goingDown = y > last;
      setVisible((v) => {
        if (goingDown && v) return false;
        if (!goingDown && !v) return true;
        return v;
      });
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        if (window.scrollY > REVEAL_THRESHOLD_PX) setVisible(true);
      }, IDLE_REVEAL_MS);
    };

    const onScroll = () => {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Active-item pill — same JS-measured + CSS-transitioned technique as
  // FloatingNav. No Motion.
  const listRef = useRef<HTMLUListElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );
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
  }, [active, visible]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[40] md:hidden">
      {/* Full-opacity fade shim — 160 px tall. Ramp is:
          0% (top)        →  transparent
          45%             →  var(--bg) 60%
          80%             →  var(--bg) 100%
          bottom          →  var(--bg) 100%
          Effectively opaque immediately behind the nav so no readable
          text is ever visually competing with the toolbar. */}
      <div
        aria-hidden
        data-visible={visible ? "true" : "false"}
        className="mobile-nav-shim absolute inset-x-0 bottom-0 h-[160px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(7,7,8,0.55) 30%, rgba(7,7,8,0.92) 55%, var(--bg) 78%, var(--bg) 100%)",
        }}
      />

      <div
        data-visible={visible ? "true" : "false"}
        className="mobile-nav-shell relative flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2"
      >
        <nav
          aria-label="Primary (mobile)"
          className="mat-b pointer-events-auto w-full max-w-md rounded-full px-2 py-1.5"
        >
          <ul
            ref={listRef}
            className="relative flex items-stretch justify-between gap-1"
          >
            {/* Sliding pill */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 h-full rounded-full bg-white/[0.09] ring-1 ring-white/20"
              style={{
                left: 0,
                transform: pill
                  ? `translateX(${pill.left}px)`
                  : "translateX(0)",
                width: pill ? `${pill.width}px` : 0,
                opacity: pill ? 1 : 0,
                transition:
                  "transform 320ms cubic-bezier(0.22,1,0.36,1), width 320ms cubic-bezier(0.22,1,0.36,1), opacity 200ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            {mobileNav.map((item) => {
              const isActive = active === item.id;
              const Icon = ICONS[item.id] ?? Home;
              return (
                <li key={item.id} className="relative flex-1">
                  <a
                    href={item.href}
                    data-nav-item={item.id}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative z-10 flex flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-medium transition-colors",
                      isActive
                        ? "text-[color:var(--text)]"
                        : "text-[color:var(--text-muted)]",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
