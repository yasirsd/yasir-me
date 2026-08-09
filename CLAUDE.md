# Yasir Portfolio

Premium mobile-first personal portfolio for Yasir Syed, Senior Frontend Engineer.

Stack: Next.js App Router · React · TypeScript · Tailwind CSS · Motion for React · Vercel.

## Source of truth

Before any major implementation phase, read `PORTFOLIO_CONSTITUTION.md`. It contains the binding design, architecture, motion, performance, accessibility, and content rules.

Existing approved design-system primitives and tokens (`ui/`, `motion/`, `styles/tokens.css`, `styles/materials.css`) must be reused rather than casually redesigned.

## Current phase status

Complete:

- Phase 0 — Constitution / Planning
- Phase 1 — Foundation + Design System
- Phase 1.5 — Visual System Refinement
- Phase 1.6 — Mobile Visual Approval

Current:

- Phase 2 — Navigation + Hero + Proof

Do not automatically begin the next phase after completing the current one. Wait for explicit approval.

## Working process (major phases)

`EXPLORE → PLAN → REVIEW → IMPLEMENT → VERIFY → VISUAL QA → REPORT → STOP`

Do not skip visual QA for visual phases. A successful build is not visual approval.

## Primary visual approval surfaces

- `390 × 844` — mobile baseline
- `1440 × 900` — desktop baseline
- `1366 × 768` — short-laptop viewport, mandatory whenever hero-height behavior changes

Mobile screenshots must use a true mobile viewport (device emulation with the correct width/height and reload), not a resized desktop capture.

## Design principles

- Mobile first. Mobile and desktop may have independent art direction — mobile is not desktop compressed.
- Graphite × Signal Red × Electric Gold. Dark-only in v1.
- Editorial, not generic SaaS or shadcn-default.
- **SURFACE ≠ CARD** — rounded surfaces earn their place through grouping / interaction / material / elevation.
- Glass is hierarchical (Soft / Medium / Strong), not universal.
- Signal Red is a signal, not wallpaper.
- Electric Gold stays a micro accent (dot, rule, focus, current) — never a CTA fill.
- Motion follows **SPECTACLE → SILENCE**.
- No generic developer-portfolio clichés (gradient blobs, bento grids everywhere, typewriter hero, Matrix rain, glowing borders, logo clouds, floating tech logos).

## Engineering principles

- Server Components by default where practical; small Client Component islands only where interaction requires them.
- Native scrolling. No wheel or touch hijacking. No scroll locking.
- No per-frame React state. Prefer MotionValues for continuous interaction.
- Prefer `transform` and `opacity` for animation; avoid layout-triggering properties on the animation path.
- Reduced-motion behavior is mandatory and must remain intentionally designed.
- Accessibility is mandatory (semantic HTML, single H1, landmarks, focus visibility, ≥ 44 px touch targets, keyboard reachability).
- Performance must earn its complexity — every expensive effect must justify what it communicates and what it costs on mobile.
- Do not introduce GSAP, Three.js, Lenis, Canvas, or WebGL without a concrete requirement and explicit approval.
- Do not fabricate metrics, achievements, or résumé claims. Do not expose confidential enterprise data or UI.

## Git

The user manages git manually. Do not `commit`, `push`, `merge`, `rebase`, switch branches, `reset`, `stash`, or run any destructive git command unless the user explicitly requests that specific operation.

Reading git status, diff, log, or blame for inspection is allowed when useful.

## Project skills

Manual review skills live under `.claude/skills/`:

- `/visual-qa` — evidence-based visual QA across real viewports
- `/motion-review` — animation, parallax, and scroll-linked behavior review
- `/phase-verify` — technical completion gate (typecheck, lint, build, runtime, a11y sanity)
- `/performance-audit` — measurement-first performance review

They are intentionally user-invoked. Use their findings as evidence. Passing `/phase-verify` is **not** automatic visual approval — visual approval remains with the user.

## Phase completion

Before claiming a visual phase is complete, verify (as applicable):

- `npm run typecheck` — clean
- `npm run lint` — clean
- `npm run build` — passes
- Runtime sanity (no console errors, no hydration warnings, no failed requests)
- Responsive QA at the primary approval surfaces
- Required screenshots captured

Then **STOP**. Wait for user approval before proceeding to the next phase.
