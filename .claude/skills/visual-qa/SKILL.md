---
name: visual-qa
description: Evidence-based visual QA of the current portfolio implementation across real browser viewports. Reviews what exists; does not invent a new design. User-invoked only.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__preview_stop, mcp__Claude_Browser__preview_list, mcp__Claude_Browser__preview_logs, mcp__Claude_Browser__navigate, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__read_page, mcp__Claude_Browser__computer, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__get_page_text
---

# Visual QA

Purpose: review the currently implemented portfolio against the approved visual language using real browser rendering. This skill audits — it does not redesign, refactor, or edit application code.

## Boot sequence (do first, every time)

1. Read `PORTFOLIO_CONSTITUTION.md` in full.
2. Read `.cursor/rules/portfolio-visual-system.mdc` and `.cursor/rules/portfolio-motion-scroll.mdc`.
3. Inspect what is actually implemented: `app/`, `sections/`, `ui/`, `styles/`, `data/`. Determine which canonical phase(s) are live.
4. Do not report missing future-phase sections as defects. A phase-2 review does not fail because Selected Work is absent.

## Viewports

Primary approval surfaces (always inspected when relevant UI exists):
- `390 × 844` — mobile baseline
- `1440 × 900` — desktop baseline
- `1366 × 768` — short laptop; mandatory whenever hero-height behavior is in scope

Secondary (inspect when the change touches them):
- `360 × 800`, `430 × 932`, `768 × 1024`, `1920 × 1080`

Rendering rule: use `mcp__Claude_Browser__resize_window` with the correct preset or width/height before each capture. Never resize a desktop screenshot afterwards and label it mobile. Reload after size changes so load-time gates re-run.

## Setup

- Start the dev server via `mcp__Claude_Browser__preview_start` (project's `npm run dev` on the default Next port). Do not start it via raw `Bash` if a preview server is already running — check `preview_list` first.
- Navigate to the relevant route(s). The public homepage is `/`. The internal QA route `/design-system` is noindex and out of scope for this skill unless the user explicitly asks for it.

## Review areas

For each, cite specific viewport + coordinates or element when reporting.

**Art direction**
- Composition intentional, not template-shaped.
- Asymmetry meaningful, whitespace doing work.
- Not shadcn-default, not SaaS-landing.

**Mobile**
- Independently art-directed, not desktop compressed.
- Above-the-fold content is discoverable at 390×844 with the fixed dock accounted for.
- Dock does not overlap CTAs or content.
- Safe areas respected (`env(safe-area-inset-*)`).
- Touch targets ≥ 44×44.

**Typography**
- Headline wrap deliberate, not orphan-prone.
- Hierarchy readable at every viewport including 1366×768.
- Measure, leading, tracking consistent with tokens.
- Metadata not too small; centered typography not overused.

**Portrait / imagery** (when present)
- Face clearly visible, not tinted or blurred out.
- Integrated with typography (overlap/crossing, not pasted beside).
- `object-position` sane per breakpoint.
- No awkward clipping, no fake round crops re-emerging.
- Relationship with negative space intentional.

**Materials (Soft / Medium / Strong glass)**
- Used per hierarchy — not glass everywhere.
- No bronze/brown nav tint.
- No cheap grey outlines on every surface.
- Content readable through the material.
- Simultaneous `backdrop-filter` surfaces on-screen ≤ 2 unless justified.

**Color**
- Signal Red behaves as a signal, not wallpaper.
- Electric Gold remains micro (dot, rule, focus, current) — never CTA fill.
- No gradient blobs, no neon, no cyberpunk drift.
- Flag any red/gold combination that fails a real contrast check.

**SURFACE ≠ CARD**
- Flag sections that turn into rounded card grids, bento layouts, KPI dashboards, or pill clouds where a typographic composition would carry the meaning.

**Motion state**
- Capture at motion-complete state.
- Capture again with `prefers-reduced-motion: reduce` (browser DevTools emulation or `resize_window({ colorScheme })`-style emulation if available; otherwise document that the reduced-motion capture was not performed).
- Page must remain visually strong with all animation disabled.

## Behavior rules

- Provide evidence, never bare claims like "looks premium" or "responsive verified".
- Do not redesign the application. Describe defects, not replacements.
- Do not edit code. Do not commit, push, merge, rebase, or change branches.
- If a defect requires design judgment (e.g., "the portrait crop feels off"), say so and hand the decision back to the user.

## Defect classification

- **CRITICAL** — breaks the page, violates the constitution's binding rules, or blocks a primary use case (e.g., CTA unreachable, dock overlapping content, hydration mismatch visible).
- **MAJOR** — significantly weakens the composition or accessibility (e.g., portrait feels pasted, contrast fails at CTA text).
- **MINOR** — visible but non-blocking (e.g., awkward headline wrap at 1366×768).
- **POLISH** — refinement suggestions.

For every defect, report: **WHAT** is wrong, **WHERE** (viewport + selector/coordinates), **WHY** it weakens the design (tie to constitution when applicable), **WHAT KIND** of correction is appropriate (do not prescribe the exact code).

## Output template

```
1. Viewports inspected
2. Screenshots captured (paths + viewport per shot)
3. Overall visual verdict (one line + one paragraph)
4. Mobile findings
5. Desktop findings
6. Typography findings
7. Portrait / image findings
8. Materials / color findings
9. Accessibility-visible issues (contrast, focus visibility, target size)
10. Ranked defects — CRITICAL / MAJOR / MINOR / POLISH
11. Recommended next corrections (bulleted, non-prescriptive)
```

## Non-goals

- Not a full WCAG audit — use a real a11y skill/tool for that.
- Not a performance audit — hand that to `/performance-audit`.
- Not a motion architecture review — hand that to `/motion-review`.
- Never begins or advances a project phase.
- Never runs git operations.
