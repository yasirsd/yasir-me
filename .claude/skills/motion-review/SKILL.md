---
name: motion-review
description: Reviews animation, parallax, scroll-linked effects, and interaction motion for quality, architecture, and runtime cost. Review skill only; does not generate effects. User-invoked only.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_stop, mcp__Claude_Browser__preview_list, mcp__Claude_Browser__navigate, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__read_page, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_console_messages
---

# Motion Review

Purpose: audit motion, parallax, scroll-linked behavior, and interaction animation for quality and runtime cost. Becomes central from Phase 3 (signature story) onward. This skill reviews; it does not add or rewrite effects.

## Boot sequence

1. Read `PORTFOLIO_CONSTITUTION.md` — motion philosophy sections in particular.
2. Read `.cursor/rules/portfolio-motion-scroll.mdc`.
3. Inspect `motion/` (provider, tokens, primitives) and any `"use client"` motion consumers in `sections/`, `components/`, `ui/`.
4. Enumerate what motion actually runs today before critiquing what could go wrong.

## Philosophy (short — do not re-derive)

- **SPECTACLE → SILENCE → SPECTACLE → SILENCE.** Not everything animates.
- Motion communicates hierarchy, depth, state, continuity, spatial relationship, focus — never "because we can".
- Duration tiers: micro (120–220 ms), interface (300–500 ms), cinematic (600–1100 ms or scroll-driven). Verify against `motion/tokens.ts`.

## Preferred scroll-linked architecture

```
native scroll → useScroll → MotionValue → useTransform → optional useSpring → transform / opacity
```

- `useSpring` = perceptual smoothing, NOT a throttle.
- No React state per frame.
- No redundant scroll listeners.
- No artificial throttling unless a non-Motion calculation forces it.

## Bad patterns to flag

Search the codebase (`Grep`) and inspect running behavior for:

- `setState` inside `onScroll` / `onPointerMove` / `useAnimationFrame`
- `window.addEventListener('scroll', ...)` computing layout every frame
- Wheel or touch event interception (`preventDefault` on `wheel`/`touchmove`)
- Manual scroll locking (`overflow: hidden` on `body` for storytelling)
- Fake smooth-scroll layers or Lenis-style engines without strong justification
- Multiple scroll systems on the same page
- Permanent `requestAnimationFrame` loops for decorative effects
- Large continuous blur animations (animated `backdrop-filter`)
- Animating `top` / `left` / `width` / `height` when `transform` would work
- Persistent `will-change: transform` sprayed across many elements
- Repeated `getBoundingClientRect()` during scroll
- Uncleaned listeners / observers / timers on unmount
- Offscreen sections doing animation work
- Desktop-only effects executing on mobile (and vice versa)
- WebGL / Canvas where CSS or Motion would suffice
- Full `motion` import inside a `LazyMotion` tree that expects `m` (defeats bundle savings)
- `domMax` shipped globally without a documented reason

## Parallax review

For each parallax effect:
- What relationship does it communicate?
- Maximum pixel movement (hero pointer depth must remain tiny — portrait 2–5 px, ambient 6–12 px).
- Does it compete with reading?
- Touch behavior (parallax generally disabled on touch/coarse pointer).
- Reduced-motion fallback.
- Offscreen behavior — must stop.
- Short-height viewport behavior (1366×768).
- CPU / paint cost.

Never accept face rotation, 3D-card portrait tilts, or gimmick perspective transforms on the hero portrait.

## Scroll-story review (Phase 3+)

For any sticky cinematic scene, inspect:

- Section ownership boundaries.
- Sticky entry and release moments.
- Scroll → progress mapping (linear? eased? clamped?).
- Direction change behavior (scrolling back up).
- Fast trackpad flicks and inertia.
- Touch scroll and pointer-cancel.
- Keyboard / Page-Down / Space scroll.
- Overscroll bounce.
- Browser refresh mid-scene (scroll restoration).
- Resize mid-scene.
- Explicit mobile fallback module.
- Reduced-motion fallback module.
- Content after the scene (no dead zone).
- Native scroll restoration not broken.

Never recommend wheel/touch hijacking to force "perfect" timing.

## Motion quality

Flag movement that feels: bouncy, toy-like, floaty, slow-without-reason, over-choreographed, generic-Framer-preset, or uniform across every element.

Preferred qualities: damped, confident, controlled, spatially meaningful. Verify duration and easing come from `motion/tokens.ts`, not ad-hoc numbers.

## Reduced motion

`MotionConfig reducedMotion="user"` is the project baseline. Verify:

- Parallax removed.
- Large translations removed.
- 3D / perspective transforms removed.
- Long cinematics replaced with restrained equivalents.
- Opacity + short transitions still allowed and used intentionally — reduced-motion must not become a broken blank experience.

## Runtime inspection (when browser tooling available)

- Start dev server via `mcp__Claude_Browser__preview_start`.
- Use `javascript_tool` for lightweight debug reads only — do NOT use it to modify behavior.
  - Example checks: count elements with `backdrop-filter`, list active `IntersectionObserver`s if instrumented, read `performance.getEntriesByType('measure')`.
- Check `read_console_messages` for animation-related warnings or dropped frames logs.

## Finding classification

- **CRITICAL** — hijacks native input, corrupts scroll, causes jank on baseline mobile, or violates the constitution's binding motion rules.
- **MAJOR** — significant runtime cost or per-frame React work.
- **MINOR** — quality drift (bouncy easing, over-uniform timing).
- **POLISH** — subtle timing refinements.

Each finding: **WHAT / WHERE (file:line or route) / WHY / SUGGESTED CORRECTION KIND** (not a rewrite).

## Output template

```
1. Motion architecture inspected (files + primitives in use)
2. Effects currently active (list per section)
3. What each effect communicates
4. Runtime risks
5. React-render risks
6. Scroll ownership risks
7. Mobile risks
8. Reduced-motion findings
9. Cleanup / lifecycle findings
10. Ranked findings — CRITICAL / MAJOR / MINOR / POLISH
11. Recommended corrections (non-prescriptive)
```

## Non-goals

- Never rewrites the motion system.
- Never adds new effects.
- Never edits application code.
- Never runs git operations.
- Never advances a project phase.
