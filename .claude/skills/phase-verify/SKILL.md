---
name: phase-verify
description: Technical completion gate before a project phase is reported complete. Verifies evidence — typecheck, lint, build, runtime, interaction, a11y sanity. Does not decide visual approval. User-invoked only.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_stop, mcp__Claude_Browser__preview_list, mcp__Claude_Browser__preview_logs, mcp__Claude_Browser__navigate, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__read_page, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__read_network_requests, mcp__Claude_Browser__computer
---

# Phase Verify

Purpose: act as the technical completion gate before a phase is declared done. Confirms real evidence exists (builds pass, no runtime errors, interactions work, a11y basics hold). Visual approval remains with the user and with `/visual-qa`.

## Boot sequence

1. Read `PORTFOLIO_CONSTITUTION.md`, especially the canonical phase plan.
2. Ask (or infer from context) **which phase** is being verified. Do not guess silently.
3. Read `package.json` to confirm the exact script names available. Do not invent script names.
4. Verify only requirements relevant to the implemented phase. Missing future-phase sections are not defects.

## Commands (only if present in package.json)

Confirmed present today: `dev`, `build`, `start`, `lint`, `typecheck`.

Run — in order, capturing full output:

```bash
npm run typecheck
npm run lint
npm run build
```

Rules:
- If a script is missing, report it explicitly. Do not substitute a different command without saying so.
- Do not skip the production `build` — it catches issues that `dev` hides.
- Warnings are not automatic failures, but must be listed.

## Runtime verification

Start the dev server via `mcp__Claude_Browser__preview_start`. Then, per route in scope for the phase:

- `mcp__Claude_Browser__navigate` to the route.
- `read_console_messages` — flag every error, React warning, hydration warning, Next/Image warning, invalid nesting warning.
- `read_network_requests` — flag 404s, failed requests, obviously oversized responses.
- `read_page` — flag broken links (empty `href`, `href="#"` where a real destination is intended), obvious overflow, or missing landmarks.

## Interaction verification (per phase scope)

- Keyboard navigation reaches every interactive control in a sensible order.
- `:focus-visible` renders visibly on every focusable element.
- `Escape` closes any open disclosure / popover / tray.
- Popover / disclosure semantics correct (`aria-expanded`, `aria-controls`; focus returns to trigger on close; non-modal popovers do NOT trap focus).
- External links use `target="_blank"` + `rel="noopener noreferrer"` where appropriate.
- PDF links open as intended (per constitution: View does not force download; opens in new tab).
- `env(safe-area-inset-*)` respected on iOS notch simulation.
- Fixed navigation / dock does not overlap content at any tested viewport.
- Anchor navigation lands on the intended section with correct scroll offset.
- Pointer-only interactions have a keyboard equivalent.
- Touch behavior works at mobile viewports (dock, tray, CTAs).

## Accessibility sanity

Not a full WCAG audit. Sanity-level checks:

- Exactly one appropriate `<h1>` per route.
- Heading order sensible (no `h1 → h3` skips).
- Landmarks present: `<nav aria-label>`, `<main>`, `<section aria-labelledby>` where relevant.
- Interactive controls use correct semantics (`<button>` vs `<a>`).
- Every focusable element has an accessible name.
- Focus visibility on all interactive elements.
- Mobile touch targets ≥ 44×44 where the constitution requires it.
- `prefers-reduced-motion` respected (verify at least one animated element degrades correctly).
- No information conveyed by hover alone.
- Any obviously failing contrast (spot-check primary text and CTA text against their real background).

Never claim "full WCAG AA compliance" from this pass.

## Responsive sanity

Whenever UI work was performed, inspect at minimum:

- `390 × 844`
- `1366 × 768`
- `1440 × 900`

Plus any secondary viewport the phase explicitly targets (e.g., 768 tablet for Phase 2).

## Security / repository safety

- Grep for accidental secrets (`API_KEY`, `SECRET`, `TOKEN`, `.env` values inlined into code).
- Report referenced local env files that may not exist in prod.
- Report unsafe npm TLS config (`strict-ssl=false`, custom CA env vars) if surfaced.
- Report dependency warnings surfaced by `npm run build`.
- **Never** commit, push, merge, rebase, change branches, or run `git clean` / `git reset --hard` / any destructive git command. Git is user-controlled.

## Evidence rule

Every reported item is one of:

- **PASS** — check ran, result clean.
- **FAIL** — check ran, result bad. Cite the exact output line.
- **NOT CHECKED** — could not be run this session. Say why.
- **NOT APPLICABLE** — not in scope for this phase. Say why.

Never write "all good" without listing what was actually run.

## Output template

```
1. Phase being verified (e.g., "Phase 2 — Navigation + Hero + Proof")
2. Commands run (exact, with exit codes)
3. Typecheck — PASS / FAIL + notable output
4. Lint — PASS / FAIL + notable output
5. Production build — PASS / FAIL + route sizes if surfaced
6. Runtime / browser findings (per route)
7. Console / hydration findings
8. Interaction findings
9. Accessibility sanity
10. Responsive sanity (per viewport)
11. Security / repository findings
12. Remaining blockers (concrete, actionable)
13. Final technical verdict — PASS / PASS WITH WARNINGS / FAIL
```

## Non-goals

- Does not decide visual approval — that stays with the user + `/visual-qa`.
- Does not automatically start the next phase.
- Does not edit application code.
- Does not run any git operation.
- Does not deploy.
