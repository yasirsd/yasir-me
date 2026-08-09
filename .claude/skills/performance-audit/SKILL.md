---
name: performance-audit
description: Evidence-driven frontend performance audit, especially after introducing cinematic motion, glass, imagery, or scroll-linked interaction. Audit only — does not rewrite the implementation. User-invoked only.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_stop, mcp__Claude_Browser__preview_list, mcp__Claude_Browser__preview_logs, mcp__Claude_Browser__navigate, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__read_page, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__read_network_requests, mcp__Claude_Browser__javascript_tool
---

# Performance Audit

Purpose: measurement-first performance review after visual work lands. Audits current cost, then recommends changes ranked by impact / effort / visual risk. Never applies large refactors automatically.

## Boot sequence

1. Read `PORTFOLIO_CONSTITUTION.md` — especially the performance philosophy.
2. Inspect what is actually running: `sections/`, `components/`, `ui/`, `motion/`, `styles/materials.css`, `next.config.ts`.
3. Enumerate visible effects (glass surfaces, ambient fields, scroll-linked transforms, parallax, cinematic sequences) before judging their cost.

## Core principle

**The portfolio must earn its complexity.** For every expensive effect:

1. What does it communicate?
2. Is there a materially simpler implementation?
3. What does it do on mobile?
4. What does it do under `prefers-reduced-motion`?
5. Does it stop when not visible?
6. Does it materially increase JS / paint / memory?
7. Is the visual improvement worth the runtime cost?

If any answer is weak, flag the effect.

## Audit areas

### Images

- Source dimensions and file size (`Read` the asset; use `Bash` `stat` / `file` for size only if needed).
- `Next/Image` usage: `src`, `width`, `height`, `sizes`, `priority`, `fetchPriority`.
- `next.config.ts` `images.formats` includes `avif` / `webp`.
- LCP candidate identified (usually the hero portrait).
- CLS risk: intrinsic aspect locked; wrapper does not reflow.
- When browser tooling is available, `read_network_requests` for actual served format and transferred size.

Never report estimated bytes as measured bytes.

### JavaScript

- Client component scope: every `"use client"` file listed. Justify each.
- Bundle size deltas from `npm run build` output (First Load JS per route).
- Unnecessary client boundaries pulling server-safe children into hydration.
- Dynamic imports where a heavy module is optional (Phase 3 signature story).
- Expensive dependencies (grep `package.json` and `import` statements).
- Desktop-only code reaching mobile bundles, and vice versa.

Don't obsess over tiny abstractions while ignoring a large dep.

### React

- `useState` / `useReducer` inside scroll or pointer handlers.
- `useMemo` / `useCallback` used where actually needed; not sprayed for cargo-cult reasons.
- Context providers causing broad rerenders.
- Event handlers re-created every render forcing child rerenders.
- `useEffect` re-registering listeners on every render (missing deps or unstable identities).

### Motion

- `transform` / `opacity` only during continuous animation; no `top`/`left`/`width`/`height` on the animation path.
- No permanent `requestAnimationFrame` loops.
- Springs settle to rest (not oscillating forever).
- `MotionValue`s idle when offscreen.
- Excessive `IntersectionObserver` / `ResizeObserver` instances.
- Hidden or offscreen cinematic components still doing work.
- Large painted gradients or shadows animated continuously.
- Animated `backdrop-filter` (should be effectively never).

### Glass

Count visually active `backdrop-filter` surfaces on-screen at each fold. Flag when > 2 without a strong reason. Special attention to fixed nav, mobile dock, sticky scenes, large modal panels.

### Scroll

- Native / passive scrolling everywhere; no `preventDefault` on `wheel` or `touchmove`.
- No manual scroll listeners performing layout reads every frame.
- Sticky sections do not trap or hijack.
- No layout thrashing (`getBoundingClientRect` in loops with immediate style writes).
- No duplicate motion / scroll systems on the same route.

### CSS / paint

- Giant radial gradients on huge fixed pseudo-elements.
- Large fixed overlays covering the viewport.
- `mix-blend-mode` used sparingly.
- Filter chains (`filter: blur() saturate() contrast()`).
- Paint-heavy shadows (`box-shadow` with very large blur radius, many stops).
- Persistent `will-change` on many elements.
- Huge fixed pseudo-elements (`::before` / `::after` covering the viewport permanently).

### Lifecycle / cleanup

Verify `useEffect` / event listener / observer / timer / rAF setup has a matching cleanup:

- `addEventListener` → `removeEventListener`
- `IntersectionObserver` → `.disconnect()`
- `ResizeObserver` → `.disconnect()`
- `MutationObserver` → `.disconnect()`
- `setTimeout` / `setInterval` → `clearTimeout` / `clearInterval`
- `requestAnimationFrame` → `cancelAnimationFrame`

Confirm hidden / offscreen cinematic components genuinely stop.

### Mobile

Treat mobile performance separately. Inspect at 390×844:
- Effect gating (`useMediaQuery`, `matchMedia`, hover/pointer capability).
- Desktop-only effects that leak into the mobile bundle.
- Frame budget on lower-end devices (assumption, not measurement, unless a real device is used).

## Measurement

Collect real evidence where the environment allows:

- `npm run build` output — First Load JS per route, largest chunks.
- Browser network panel via `read_network_requests` — actual transferred size and format of the LCP image and other large assets.
- Browser console via `read_console_messages` — warnings and long-task logs.
- `javascript_tool` for lightweight reads only (e.g., `document.querySelectorAll('[style*="backdrop-filter"]').length`, `performance.getEntriesByType('resource').filter(...)`). Do not mutate the page.

**Never invent numbers.** If LCP, INP, CLS, FPS, or transferred size was not actually measured this session, mark that finding **NOT MEASURED** and explain what tooling would produce a real number.

## Finding priority

- **P0 Critical** — jank on baseline mobile, oversized LCP image on slow networks, per-frame React state during scroll, uncleaned observers.
- **P1 High** — significant unnecessary hydration, unnecessary WebGL/Canvas, large simultaneous blur count.
- **P2 Medium** — bundle inefficiencies, missing image format conversion, mid-size CSS paint issues.
- **P3 Polish** — micro-optimizations, minor cleanup.

Each finding: **WHAT / WHERE / EVIDENCE (or NOT MEASURED) / IMPACT / SUGGESTED CORRECTION KIND / VISUAL RISK OF CORRECTION**.

## Output template

```
1. Audit scope (phase + effects reviewed)
2. Bundle / client JS findings (with build output evidence)
3. Image / LCP findings (with network evidence where available)
4. React rendering findings
5. Motion findings
6. Glass / paint findings
7. Scroll findings
8. Lifecycle / cleanup findings
9. Mobile findings
10. Measurements actually collected (list) — measurements NOT collected (list)
11. Ranked findings — P0 / P1 / P2 / P3
12. Recommended changes — ranked by impact / effort / visual risk
13. Final performance verdict
```

## Non-goals

- Does not apply large refactors automatically.
- Does not edit application code without an explicit follow-up request.
- Does not run any git operation.
- Does not advance a project phase.
- Does not publish performance numbers that were not measured this session.
