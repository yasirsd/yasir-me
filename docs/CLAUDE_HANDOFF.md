# Claude Handoff — Yasir Syed Portfolio

Canonical AI continuation context. A fresh Claude session with zero
access to prior chat should be able to read this file, inspect the
repository, and continue B1.1 without asking us to reconstruct past
decisions.

Status at write time: **Milestone A + B0.2 approved & frozen.**
**Milestone B1 partially approved (mid-to-late open arc). Currently
BLOCKED on the closed / early-open geometry — see §15.** Do not begin
B1.1 without reading §15 and §16 first.

Where this document and source disagree, source wins — see §22. Where
this document notes something as "frozen" or "approved", do not
redesign it without a specific regression or measurement.

---

## 1 · Project identity & objective

**Yasir Syed portfolio** — an award-level personal portfolio site for
a Senior Frontend Engineer with 7.8 years' experience. The site itself
must demonstrate the level of frontend craftsmanship claimed in Yasir's
résumé.

Fundamental principles (do not violate without an explicit user
decision):

- **Mobile-first**, but desktop and mobile receive **separate art
  direction** — mobile is not a scaled-down desktop.
- **Senior engineering credibility within the first viewport** — the
  hero must land the positioning; a recruiter should not need to scroll
  to understand who Yasir is.
- **Design quality proves frontend craftsmanship** — the implementation
  itself is part of the portfolio. Every visual detail must survive
  close inspection.
- **Cinematic but production-disciplined** — no dev-toy effects, no
  "look at my CSS" tricks. Restrained motion, restrained ornament.
- **Native browser scrolling only.** No wheel interception. No scroll
  lock. No `preventDefault`. No scroll hijack.
- **Sophisticated motion, no scroll hijacking** — Motion is used only
  where interaction complexity justifies it. Ordinary interactions use
  CSS/lightweight JS.
- **Performance is part of the portfolio story** — measurable, tracked,
  budgeted (§9). Performance regressions block visual approvals.
- **Accessibility is first-class** — WCAG AA baseline, axe-core in QA,
  respects `prefers-reduced-motion` everywhere.
- **Apple-inspired restraint & craft — not Apple copying.** Editorial
  product-film language. No literal logos, no product-brand imitation.
- **No generic AI developer-template aesthetic** — no glowing cards,
  no gradient blobs on every section, no fake metrics.

**Brand palette (from `styles/tokens.css`):**
- `--red: #EF233C` (brand red — accents & signals; `--red-strong: #C21A30`
  where white text sits on top, for WCAG AA)
- `--yellow: #FDC500` (brand yellow — smaller signals, focus ring on
  dark chapters, restrained highlights)
- Rule: red + yellow are **signals, not decoration**. Approximate
  intended balance is ~85 % neutral / ~10 % red / ~5 % yellow.

---

## 2 · Factual source of truth

**The résumé is the sole source for career facts.** The résumé PDF is
at `public/resume/yasir-syed-resume.pdf` (recovered from git commit
`aac6002` into the current tree) and `_inspect/yasir-resume.pdf` (my
reference cache).

Currently used, verified facts:

- **Name:** Yasir Syed
- **Positioning:** Senior Frontend Engineer / "Senior Software Engineer
  (Frontend) | Frontend UI"
- **Location:** Hyderabad, India
- **Experience:** 7.8 years
- **Core stack:** React, TypeScript, React Native, Next.js
- **Also proficient in (per résumé):** Redux, Angular, Vue,
  Tailwind CSS, Material UI, SCSS, Micro Frontends, Event-Driven
  Architecture, WCAG, Core Web Vitals, AWS, Azure, Vercel, Adobe
  Experience Manager (basics), WordPress, Prismic
- **Companies / clients / products (verbatim, in `data/experience.ts`):**
  - Turing Global (Sept 2025 → Present) · PepsiCo · GSAT
  - Caprus IT (May 2025 → Aug 2025) · ProArch · Chummy Funding
  - Slickbit Technologies (July 2022 → May 2025) · Flow.ai + Moneris
    Go Appetit
  - Trangla (Jan 2019 → July 2022) · Turpy Mobile Apps · PlayAt
- **One résumé-supported quantitative metric:** "30% reduction in load
  time" — currently used in `data/skills.ts` / `CredibilityStrip`
  with the label "Load-time reduction" and sub-label "Load-time
  optimisation" (unattributed to any single company because the
  résumé's phrasing does not tie it to one).

**Prohibited (do not invent):**

- ❌ Invented metrics (client counts, project counts, satisfaction
  percentages)
- ❌ Invented experience durations per individual technology (e.g.,
  "5 years TypeScript" — the résumé gives 7.8 years total frontend, not
  per-language splits)
- ❌ Invented testimonials, awards, certifications
- ❌ Invented company/client relationships
- ❌ Fabricated screenshots of NDA products (use SVG/CSS abstract
  compositions instead)
- ❌ "Available for opportunities" copy — **not currently published**.
  Only publish if the user explicitly confirms. Status line currently
  reads only "Hyderabad, India · 7.8 YRS".

---

## 3 · Technology stack (from `package.json` — read at handoff time)

```
next            16.3.0
react           19.2.8
react-dom       19.2.8
typescript      5.7.3
tailwindcss     4.3.3            (+ @tailwindcss/postcss 4.3.3)
motion          13.0.0           (import from "motion/react")
lucide-react    1.30.0
clsx            2.1.1
tailwind-merge  2.6.0

devDependencies:
@axe-core/playwright   4.10.2   (real WCAG scan, separate from Lighthouse)
@playwright/test       1.62.1   (peer-required by next@16.3.0)
lighthouse             12.8.2   (pinned; requires Node >=18.16 —
                                 in-range for this project's Node 22.13.1)
chrome-launcher        1.1.2
eslint                 9.39.5   (+ @eslint/js 9.39.5,
                                 typescript-eslint 8.20.0,
                                 eslint-plugin-react 7.37.4,
                                 eslint-plugin-react-hooks 5.1.0,
                                 @next/eslint-plugin-next 16.3.0)
postcss                8.5.26
@imgly/background-removal-node  1.4.5   (used only by
                                 scripts/cutout-portrait.mjs — asset prep)
```

**Not installed and not to be added without explicit permission:**
Three.js, GSAP, any charting library, shadcn/ui component library (the
plan reserves shadcn+Base UI seams for later milestones but nothing is
installed yet).

**TypeScript settings** (`tsconfig.json`):

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"noImplicitOverride": true`
- `"noFallthroughCasesInSwitch": true`
- `"moduleResolution": "Bundler"`
- `"jsx": "react-jsx"` (auto-set by Next 16 build)
- `"paths": { "@/*": ["./*"] }`
- Next 16 also auto-manages `next-env.d.ts` and appends
  `.next/dev/types` to `include`.

**Font strategy (finalised in A.3):** Geist Sans only, Latin subset,
variable weight — via `next/font/google` in `app/layout.tsx`. **Geist
Mono was removed** in A.3; `--font-mono` in `styles/tokens.css` points
to a system stack (`ui-monospace, "SF Mono", "Cascadia Mono", "Menlo",
Consolas, "Liberation Mono", monospace`).

**Commands:**

```bash
npm install                                          # once
npm run dev                                          # dev server (Turbopack)
npm run build                                        # production build
npm run start                                        # production server, port 3000 by default
npm run lint                                         # eslint . --max-warnings 0 (no `next lint`)
npm run typecheck                                    # tsc --noEmit
npm run qa:screens                                   # all Playwright specs in qa/
npm run qa:lighthouse                                # qa/lighthouse.mjs (deprecated by newer runners)

# Ad-hoc measurement runners in qa/ (use directly):
node qa/lighthouse-a3.mjs                            # baseline vs / vs home, sim + devtools
node qa/lighthouse-b1.mjs                            # single-run measurement of /qa/laptop-motion
node qa/lighthouse-5.mjs                             # 5-run controlled Lighthouse
node qa/lcp-debug.mjs                                # dumps LCP audit structure
node qa/axe-debug.mjs                                # dumps axe incompletes

# Playwright specs (see qa/*.spec.ts):
npx playwright test --config qa/playwright.config.ts                  # all
npx playwright test --config qa/playwright.config.ts qa/laptop-motion.spec.ts  # B1 QA
```

QA specs assume `next start -p 4321` is already running (see
`qa/playwright.config.ts` — `baseURL: http://localhost:4321`). Start
the prod server manually before running Playwright or Lighthouse
scripts.

**Playwright browsers installed:** Chromium, WebKit, Firefox (needed
for B1 cross-browser QA).

---

## 4 · Repository architecture

**Directory layout** (real, from repo — irrelevant generated files
excluded):

```
app/
  layout.tsx                    Root: html/body/fonts/skip-link/main/JSON-LD.
                                No global nav — that lives in the (site) group.
  manifest.ts                   PWA manifest.
  robots.ts · sitemap.ts        SEO.
  (site)/
    layout.tsx                  Adds ScrollProgress + FloatingNav + MobileNav.
    page.tsx                    Home page — Hero, Credibility, About,
                                + zero-DOM anchor sentinels for
                                #work #experience #skills #chat #contact.
  qa/
    baseline/page.tsx           `/qa/baseline` — framework + hero markup, NO nav
                                (uses root layout only). For isolation
                                measurement.
    baseline-nav/               `/qa/baseline-nav` — framework + hero markup
      layout.tsx                + optimized nav.
      page.tsx
    laptop/page.tsx             `/qa/laptop` — STATIC B0.2 laptop
                                (LaptopFrame), for visual approval.
    laptop-motion/page.tsx      `/qa/laptop-motion` — B1 scroll-driven
                                choreography (LaptopStory).

components/
  hero/
    Hero.tsx                    Server. Composes desktop + mobile hero.
    HeroPortrait.tsx            Server. LCP owner. next/image + cutout PNG.
    HeroTypography.tsx          Server. FRONTEND / ENGINEER back-plane type,
                                CSS keyframe entrance (.hero-enter).
    HeroMeta.tsx                Server. CTA pair. CSS keyframe entrance.
    HeroChips.tsx               Client. Rotating specialism chip. Vanilla
                                setInterval + CSS transition (.chip-swap).
                                Layout width driven by a same-flow ghost of
                                the longest label.
    portraitBlur.ts             Auto-generated (scripts/optimize-portrait.mjs).
                                Base64 blur placeholder for hero portrait.
  signal/
    CredibilityStrip.tsx        Server. Résumé-only metrics.
  about/
    AboutCompact.tsx            Server. "I don't just build screens." + 4 pillars.
    Pillar.tsx                  Server. Wrapped in <Reveal>.
    PillarDiagrams.tsx          Server. Four small editorial SVG diagrams
                                (Product UI / Architecture / Performance /
                                Accessibility). ~1.75× baseline size.
  layout/
    Section.tsx                 Server. tone="dark|light" cascades
                                CSS custom properties (palette + focus).
    FloatingNav.tsx             Client. Desktop capsule. Motion-free —
                                sliding pill is a single absolutely-
                                positioned <span> whose left/width are
                                measured off DOM in useLayoutEffect and
                                transitioned in CSS.
    MobileNav.tsx               Client. Bottom bar. Motion-free — visible
                                is a boolean driven by rAF-throttled
                                scroll-direction listener; render uses CSS
                                transform+opacity toggled by [data-visible].
                                Hidden on hero (scroll < 240px), retreat
                                on scroll-down, reveal on scroll-up or
                                220ms idle. 160px fade shim behind bar.
    ScrollProgress.tsx          Server. Pure CSS via
                                `@supports (animation-timeline: scroll())`.
                                Zero JS, zero Motion. Missing on non-Chromium
                                (acceptable — decorative).
    Section.tsx                 (see above)
    useActiveSection.ts         Client hook. IntersectionObserver-based
                                active-section tracking.
    InViewMount.tsx             Client primitive. Reserves layout height,
                                mounts children when wrapper is within one
                                viewport of the fold. UNUSED YET — will
                                gate LaptopStory when integrated into home.
  motion/
    Reveal.tsx                  Client. Pure IntersectionObserver + CSS
                                transition. NO Motion runtime.
                                (MotionProvider was removed in A.3.)
  work/laptop-story/
    LaptopFrame.tsx             Server. Static B0.2 composition — single
                                SVG at viewBox 1600×1300. Used by /qa/laptop
                                and by reduced-motion path in LaptopStory.
    LaptopStory.tsx             Client. Scroll-driven B1 choreography.
                                Renders four piece SVGs stacked in a CSS-3D
                                perspective wrapper. See §13.
    pieces/LaptopParts.tsx      Shared SVG assemblies as JSX fragments +
                                full piece SVGs (GroundingSVG, DeckSVG,
                                LidFrontSVG, LidBackSVG). See §12.

data/
  profile.ts                    Yasir facts (name, role, bio, specialisms).
  experience.ts                 Career history verbatim from résumé.
  projects.ts                   5 projects: GSAT, Chummy, Flow.ai (featured);
                                Moneris, PlayAt (more-systems).
  skills.ts                     7 categories with capabilities.
  principles.ts                 4 About pillars.
  navigation.ts                 primaryNav + mobileNav.

lib/
  cn.ts                         clsx + tailwind-merge wrapper.
  seo.ts                        Person + WebSite JSON-LD, siteUrl helper.

motion/
  tokens.ts                     durations/easings/springs — semantic
                                animation tokens.
  features-dom-max.ts           `export default domMax` — the domMax feature
                                bundle target for future Motion-heavy
                                interactions (LaptopStory-class only).
                                UNUSED YET (currently the QA route imports
                                Motion directly since it's the whole point
                                of that route).
  features-dom-animation.ts     `export default domAnimation` — smaller
                                feature bundle for lighter reveals. UNUSED YET.

styles/
  tokens.css                    Design tokens (palette, radii, spacing,
                                type, focus). Both dark + light chapter
                                variables.
  materials.css                 mat-a / mat-b / mat-c glass tiers + focus
                                ring rule.
  globals.css                   Tailwind v4 @theme mapping + reset +
                                utilities + hero entrance keyframes
                                (.hero-enter, .chip-swap, .reveal,
                                .scroll-progress, .nav-capsule,
                                .mobile-nav-shell, .mobile-nav-shim).

qa/
  playwright.config.ts          baseURL localhost:4321.
  screenshot.spec.ts            Milestone A screenshots at 390/768/1440.
  screenshot-a1.spec.ts         A.1 desktop + mobile-scrolled.
  screenshot-a2.spec.ts         A.2 desktop + mobile initial + scroll
                                positions.
  screenshot-a3.spec.ts         A.3 desktop + mobile initial + awkward
                                positions.
  chip.spec.ts                  Specialism chip longest-label proof.
  a11y.spec.ts                  Keyboard + reduced-motion + console-error
                                (Milestone A).
  axe.spec.ts                   Real @axe-core/playwright scan against /.
  axe-debug.mjs                 Dumps axe "incomplete" details.
  laptop.spec.ts                B0 static screenshots at 4 viewports + crops.
  laptop-b01.spec.ts            B0.1 refined laptop.
  laptop-b02.spec.ts            B0.2 deck-ergonomics pass.
  laptop-motion.spec.ts         B1 — contact sheet at 9 progress checkpoints,
                                cross-browser (chromium/webkit/firefox),
                                reduced-motion, fast-scroll.
  lighthouse.mjs                Original A-era 3-run runner (deprecated).
  lighthouse-5.mjs              5-run controlled runner.
  lighthouse-a2.mjs             A.2 runner.
  lighthouse-a3.mjs             A.3 two-benchmark runner (simulated gate +
                                devtools diagnostic).
  lighthouse-b1.mjs             B1 single-run runner for /qa/laptop-motion.
  lighthouse-debug.mjs · lcp-debug.mjs   Ad-hoc dumps.
  lighthouse/                   Recorded reports: A.md, A1.md, A2.md, A3.md,
                                A3-preCV.md, A3-withCV.md, B1-motion.md,
                                axe-A1.md.
  screenshots/                  A/ A1/ A2/ A3/ B0/ B0.1/ B0.2/ B1/.

scripts/
  optimize-portrait.mjs         Sharp: PNG → JPEG 1440px + base64 blur.
  cutout-portrait.mjs           @imgly/background-removal-node: segment
                                Yasir from source PNG → transparent PNG.
  polish-cutout.mjs             Sharp: matte decontamination against
                                black background.

public/
  images/portrait/              yasir-cutout.png (production LCP asset,
                                background removed), yasir-cutout.raw.png
                                (pre-polish), yasir-formal-rect.jpg
                                (fallback), plus originals.
  resume/                       yasir-syed-resume.pdf.

docs/
  CLAUDE_HANDOFF.md             this file.
```

**Server/Client philosophy:** Server Components by default. `"use
client"` only where an interaction, hook, or Motion consumer requires
it — never wrap a whole page just to enable one leaf island. Current
client boundaries: `FloatingNav`, `MobileNav`, `HeroChips`, `Reveal`,
`LaptopStory`. `HeroPortrait`, `HeroTypography`, `HeroMeta`, `Hero`,
`Section`, `Pillar`, `AboutCompact`, `CredibilityStrip`,
`LaptopFrame`, and every `data/` module are Server Components.

**Lazy-loading strategy:** No global `<MotionProvider>`. Motion is
imported directly by the two client components that need it
(`LaptopStory` — deliberately; the historical `Reveal` no longer uses
Motion at all). `motion/features-dom-max.ts` and
`motion/features-dom-animation.ts` are prepared for future LazyMotion
usage in below-fold heavy islands but are **not imported anywhere yet**
— when B1 is integrated into `/`, its Motion usage will be gated by
`components/layout/InViewMount.tsx` so the runtime doesn't land in the
homepage initial bundle.

---

## 5 · Design system — current approved state

**Palette (from `styles/tokens.css`, dark chapter):**

- `--bg: #070708` · `--bg-raised: #0D0D0F` · `--surface: #111114` ·
  `--surface-elevated: #17171A`
- `--text: #F5F5F7` · `--text-muted: #A1A1AA` · `--text-subtle: #8A8A92`
  (bumped from `#6b6b74` in A.1 to pass small-text WCAG AA)
- `--border: rgb(255 255 255 / 0.10)` · `--border-strong: 0.18` ·
  `--border-soft: 0.06`
- `--red: #EF233C` · `--red-strong: #C21A30` (used only where white text
  sits on top — AA safe) · `--red-soft` · `--red-glow`
- `--yellow: #FDC500` · `--yellow-soft` · `--yellow-glow`
- `--on-yellow: #0A0A0C` (dark text on yellow — AA safe)

**Light chapter (`[data-tone="light"]`, applied by `<Section
tone="light">`):**

- `--bg: #F5F5F7` · `--bg-raised: #FFFFFF` · `--surface: #FFFFFF` ·
  `--surface-elevated: #F0F0F2`
- `--text: #0A0A0C` · `--text-muted: #4A4A52` · `--text-subtle: #7A7A82`
- Light chapter is **not yet used** — reserved for the future Contact
  section (Milestone D).

**Focus tokens (chapter-scoped):**

- Dark chapters: `--focus-ring: var(--yellow)` (2 px, 2 px offset)
- Light chapters: `--focus-ring: var(--red)` (yellow fails contrast on
  light backgrounds)
- `Section` sets `data-tone` on its root; every focusable descendant
  inherits the correct ring automatically via
  `styles/materials.css` `:focus-visible` rule.

**Radii:** `--r-sm: 12px · --r-md: 18px · --r-lg: 22px · --r-xl: 26px
· --r-2xl: 32px · --r-pill: 999px`.

**Material hierarchy (from `styles/materials.css`):**

- `.mat-a` — near-opaque surface for content-dense components
- `.mat-b` — translucent glass for nav / floating chips / small cards
- `.mat-c` — atmospheric layer (always `aria-hidden`)

**Type:**

- `--font-sans: var(--font-geist-sans), "Inter", ui-sans-serif, …`
- `--font-mono` — **system stack, no webfont** (see §3)
- Fluid scale via `clamp()`: hero `clamp(4rem, 10vw, 11rem)`, section
  headings `clamp(3rem, 7vw, 8rem)`

**Motion tokens (`motion/tokens.ts`):**

- Durations: `fast 0.18 · base 0.32 · slow 0.65 · cinematic 1.0`
- `easeOut = [0.22, 1, 0.36, 1]`
- Spring `{ stiffness: 260, damping: 32 }` — reserved for micro-UI;
  never on scroll-primary values

**Visual rhythm (planned):** dark chapters dominate; single deliberate
light chapter at Contact (Milestone D). Chapter tones alternate subtly
(deep → raised → surface → elevated → back) to avoid twelve identical
black sections.

**Rule:** red and yellow are **signals, not decoration.** Approximate
intended balance ~85 % neutral / 10 % red / 5 % yellow. Do not turn a
whole section red. Do not add ambient gradients to every chapter.

---

## 6 · Milestone roadmap & current status

| Milestone | Scope | Status |
| --- | --- | --- |
| **A** — foundation + Hero + Credibility + About | homepage above-fold + supporting sections | **COMPLETE** (A.3 approved & frozen) |
| **B0** — static laptop object | approve the industrial design before animating | **COMPLETE** (B0.2 approved & frozen) |
| **B1** — laptop opening choreography | scroll-driven, isolated to `/qa/laptop-motion` | **PARTIAL** — mid-to-late arc approved in direction; closed / early-open geometry is the CURRENT BLOCKER (§15) |
| **B1.1** — closed / early-open geometry correction | fix §15 | **NOT STARTED** — this is the next work |
| **B** — full project system on `/` | ProjectDeck (mobile) + MoreSystems + integration | NOT STARTED |
| **B2** — project screens + switching | ProjectScreen frames inside the laptop; hysteresis-based project zones | NOT STARTED |
| **C** — Career timeline + Skills constellation + mobile Skills Explorer | signature interactions 3 & 4 | NOT STARTED |
| **D** — Ask Yasir chat + Contact (light chapter) + Command palette | signature interaction 5 + contact + cmd-K | NOT STARTED |
| **E** — Selected engineering case studies | `/work/pepsico-gsat`, `/work/chummy-funding`, optionally `/work/flow-ai` | NOT STARTED, non-blocking on A/B/C/D |

**Homepage integration of any signature section (LaptopStory,
timeline, constellation, chat) is NOT permitted before its own QA
route is approved.**

---

## 7 · Milestone A history & final freeze

A shipped in three revision passes (A → A.1 → A.2 → A.3). Summarised
only as much as needed to interpret the current source:

- **A** — foundation, hero, credibility, about, first Motion setup.
  Missed perf gate on `/` (~57 median); portrait was a rectangular
  photograph with a light background.
- **A.1** — portrait cut out via ML segmentation
  ([scripts/cutout-portrait.mjs](../scripts/cutout-portrait.mjs)). Real
  scene lighting behind the cutout. Localised back-typography mask.
  Mobile nav hides on hero, reveals after scroll. About pillar diagrams
  added and enlarged. Light-chapter focus tokens.
- **A.2** — Lighthouse harness fixed
  (`lighthouse@12.8.2` for Node compatibility). Motion consolidated
  into LazyMotion abstraction (later abandoned — see A.3). Baseline QA
  routes added for isolation measurement. Real `@axe-core/playwright`
  test.
- **A.3** — Motion **removed** from critical nav and from `Reveal`.
  Nav pill is now a JS-measured `<span>` with CSS transitions; mobile
  nav is a `[data-visible]`-toggled `<div>` with CSS transitions.
  `ScrollProgress` is pure CSS (`animation-timeline: scroll()` inside
  `@supports`). Geist Mono removed → system monospace. Temporary
  MilestonePlaceholder sections removed from `/`. content-visibility
  experiment tested and **reverted** (regressed LCP by ~217 ms).
  **Initial homepage JS dropped from ~225.9 KB gzip to ~150.5 KB gzip**
  — see §9.

**FROZEN as of A.3 — do not redesign without a specific regression:**

**Desktop hero:**
- Approved cutout portrait composition (background-removed transparent PNG)
- Background FRONTEND / ENGINEER typographic treatment with localised
  horizontal mask so it fades before the right column
- "Building interfaces people **feel**." — red "feel" only
- Right-rail role/positioning: yellow eyebrow "SENIOR FRONTEND ENGINEER"
  + status pill "Hyderabad, India · 7.8 YRS" + one factual tagline
- CTA hierarchy: red **Explore my work** (with down-arrow) primary +
  glass **Download résumé** (with up-right arrow) secondary
- Current nav visual appearance (compact capsule, YS monogram in
  `--red-strong`, ghost Résumé button with yellow dot signal)

**Mobile hero:**
- YASIR / SYED wordmark (white / brand-red)
- Role immediately below wordmark: yellow eyebrow **SENIOR FRONTEND
  ENGINEER** + mono `7.8 YRS · HYDERABAD`
- Portrait treatment matches desktop (same cutout, same ambient)
- CTA layout: red Explore my work + glass Résumé
- Purpose-built composition — never a scaled-down desktop

**About:**
- "I don't just build screens." headline
- Four pillars (`data/principles.ts`): Product UI, Architecture,
  Performance, Accessibility
- Editorial engineering diagrams under each pillar
  (`components/about/PillarDiagrams.tsx`)
- Current asymmetric grid, current copy

**Credibility strip:**
- Factual metric treatment: 7.8 YRS, 30% load-time reduction (yellow),
  React + TS, Web + Mobile, WCAG, Enterprise
- No fabricated numbers, no company attribution on the 30 %

---

## 8 · Performance history / current baseline

- **Nav is Motion-free** (§10). Motion added +87 KB gz and +308 ms
  median TBT to the baseline route when it was in the nav critical
  path; not justified for a shared-layout pill.
- **Motion remains available** for signature interactions that
  genuinely need it (LaptopStory is the first).
- **Initial homepage JS: ~150.5 KB gzip** (A.3 measurement, unchanged
  since). Budget: **< 180 KB gzip** on `/`. Currently ~29.5 KB of
  headroom.
- **System monospace replaced Geist Mono** — 6 woff2 files dropped from
  the build (~70 KB on disk, ~23 KB of preloaded Latin subset
  transfer). `--font-mono` in `styles/tokens.css` uses the OS stack.
- **Temporary `MilestonePlaceholder` chapters were removed** from `/`
  (component file deleted). Anchor sentinels `<span id="…"
  aria-hidden/>` in place for `#work #experience #skills #chat
  #contact` so nav hrefs stay valid.
- **content-visibility experiment on `#about` reverted.** With
  `content-visibility: auto; contain-intrinsic-size: auto 720px`, perf
  dropped 2 points and LCP grew by ~217 ms on the simulated gate.
  Report: `qa/lighthouse/A3-withCV.md`.
- **Local Lighthouse environment is noisy on Windows.** Same build
  produced perf medians ranging from 69 to 90 across sessions on the
  same machine. `qa/lighthouse-a3.mjs` runs a **5-run simulated gate
  + 3-run devtools diagnostic** — the two modes are reported
  separately and **must not be compared numerically**. Canonical clean
  benchmark environment (CI runner or fresh Vercel preview) is a
  carry-forward item (§20).
- **137.9 KB is the OBSERVED baseline** for this project's isolated
  QA route (`/qa/baseline`), **not** a universal React 19 + Next 16
  framework floor. Do not describe it as such.

**Latest measurements (from `qa/lighthouse/`):**

| Route | Simulated perf median | Simulated JS gz | DevTools LCP median | Notes |
| --- | --- | --- | --- | --- |
| `/qa/baseline` | ~85–95 | 137.9 KB | ~2.2 s | framework + hero markup only |
| `/qa/baseline-nav` | ~74–79 | 224.9 KB | ~2.3 s | A.2 measurement; A.3 nav is Motion-free so this route would need re-measurement to reflect current code |
| `/` (home) | ~89–90 on rested machine, ~69–78 loaded | 150.5 KB | ~2.9–3.8 s | A.3 measurement |
| `/qa/laptop-motion` | 95 (single run) | 175.9 KB | 1.7 s | B1 measurement; +25 KB gz for Motion runtime is deliberate |

---

## 9 · Motion architecture

**Motion is not globally banned.** It is only removed from places where
it wasn't justified.

Rules:

- **Never a global `<MotionProvider>` at the app root.** Removed in
  A.3; do not reinstate.
- **Critical nav / scroll-progress / reveal** → CSS + rAF-throttled
  vanilla JS. See `FloatingNav`, `MobileNav`, `ScrollProgress`,
  `Reveal`.
- **Signature sections** (LaptopStory, future timeline / constellation
  / chat) → Motion, but scoped to that section's client boundary and
  **gated by `InViewMount`** when integrated into `/` so the runtime
  doesn't land in the initial bundle.
- **`Reveal` (`components/motion/Reveal.tsx`) is Motion-free** — pure
  `IntersectionObserver` + CSS transition. Do not add Motion back to
  it without a specific interaction requirement.

**Prepared feature modules for later lazy loading:**

- `motion/features-dom-max.ts` — `export default domMax` (includes
  layout animations / layoutId). Target for LaptopStory-class.
- `motion/features-dom-animation.ts` — `export default domAnimation`
  (smaller, no layout). Target for lighter reveal-style animations.

Neither is imported anywhere in the current code — `LaptopStory` (the
only Motion consumer today) imports directly from `motion/react`
because it's the sole thing on its dedicated QA route (§13). When
`LaptopStory` moves onto `/`, wrap it in `<InViewMount>` and switch to
the LazyMotion + `m` + `features={loader}` pattern using
`features-dom-max.ts`.

---

## 10 · B0 / B0.1 / B0.2 history

The laptop object went through three visual approval passes:

- **B0** — first static SVG. Correct silhouette, but the deck read as
  a thin shelf; the keyboard-scaled-grid transform looked like heater
  vents. Rejected.
- **B0.1** — proper 5-row × 14-column keyboard field, real trackpad,
  material separation (deck lighter than lid → up-facing surface),
  hinge shadow, ambient red/yellow bounces, YASIR chin ghost removed,
  camera pinhole removed. Deck was still slightly too shallow for a
  believable palm rest.
- **B0.2** — deck-internal ergonomics pass. Deeper trapezoidal deck
  (260 units of depth in the 1300-unit-tall viewBox). Keyboard field
  occupies 55 % of usable deck; palm rest 41 %; trackpad centred in
  palm rest. SVG restructured into physical `<g id="…">` assemblies so
  B1 can animate whole parts. **APPROVED & FROZEN.**

**Approved B0.2 laptop characteristics (from
`components/work/laptop-story/LaptopFrame.tsx` and
`components/work/laptop-story/pieces/LaptopParts.tsx`):**

- **viewBox:** `0 0 1600 1300`
- **Lid:** `<rect x="80" y="40" width="1440" height="900" rx="22">` — 16:10
- **Bezel:** `<rect x="100" y="60" width="1400" height="852" rx="10">`
- **Screen active area:** `<rect x="120" y="76" width="1360" height="816"
  rx="4">` — 1.667 : 1
- **Chin:** 48 units (5.3 % of lid height)
- **Hinge:** `<rect x="82" y="944" width="1436" height="8">` + a 16-unit
  gradient shadow onto the deck at y=952
- **Deck outer polygon:** `points="90,952  1510,952  1595,1212  5,1212"`
  — trapezoidal, wider at the front due to shallow top-down foreshortening
- **Front lip:** `points="5,1212  1595,1212  1568,1236  32,1236"`
- **Keyboard well polygon:** `points="316,974  1284,974  1310,1120  290,1120"`
- **Keyboard field bounds:** `x: 358→1242 (884 wide), y: 984→1116 (132 tall)`
- **Per-key:** 58 × 24 CSS-units (aspect 2.42 : 1), 5 rows × 14 cols,
  `gapX=5`, `gapY=3`, `rx=4`
- **Row 2 & 3 outer keys:** 1.35× wider (suggested modifier variation
  for visual plausibility — not "correct", no literal Tab/Caps Lock)
- **Row 5:** 9-element modifier / spacebar layout, spacebar spans ~6
  columns
- **Trackpad:** `<rect x="540" y="1121" width="520" height="80" rx="8">`
  with a 4-unit top inset shadow and a 1 px bottom highlight
- **Ambient grounding:** two very faint radial gradients (red at
  `rgba(239,35,60,0.055)`, yellow at `rgba(253,197,0,0.04)`) sitting
  below the deck, plus a wide contact ellipse at y=1270
- **Screen clipPath:** `<clipPath id="screenClip"><rect x="120" y="76"
  width="1360" height="816" rx="4"/></clipPath>` — ready for B2's
  `ProjectScreen`
- **Materials (graphite palette, do not change):**
  - Lid `#3C3C43 → #2B2B32 → #1C1C22` with 14 % lateral sheen and
    40 %-alpha top-edge highlight
  - Bezel `#08080A → #040405`
  - Screen (display-off) `#0D0D12 → #08080C → #05050A`
  - Hinge `#0A0A0C → #1C1C22 → #0A0A0C`
  - Deck (slightly lighter than lid, reads as up-facing surface)
    `#38383F → #2C2C32 → #20202A`
  - Deck front `#1A1A20 → #0A0A10`
  - Key face `#1E1E24 → #17171C → #101015`
  - Trackpad `#33333A → #25252C`

**Do not redesign B0.2 industrial design during future milestones**
unless an animation geometry failure requires a transform-layer change
(see §15).

---

## 11 · Current laptop SVG physical hierarchy

Actual current IDs / component names in source
(`components/work/laptop-story/pieces/LaptopParts.tsx`,
`components/work/laptop-story/LaptopFrame.tsx`):

```
GroundingSVG        (viewBox 1600×1300)
  <g id="grounding">
    <ellipse ambientRed/>
    <ellipse ambientYellow/>
    <ellipse contact/>

DeckSVG             (viewBox 1600×1300)
  <g id="deck">
    <g id="deck-shell">
      deck polygon + sheen + front lip + seam lines
    <g id="hinge">
      hinge rect + hingeShadow rect
    <g id="deck-keyboard">
      kbWell polygon + 65 <g> key groups (each = face rect + top sheen)
    <g id="deck-trackpad">
      trackpad rect + inset rect + bottom highlight line

LidFrontSVG         (viewBox 1600×1300)  — accepts optional {children}, screenTint, screenLightOpacity
  <g id="lid-front">
    <g id="lid-shell">
      alu rect + sheen + top highlight + chamfer stroke
    <g id="lid-screen">
      bezel rect + screen rect + gloss rect
      + optional screenTint rect
      + optional <g id="screen-content" clipPath="url(#screenClip)">{children}</g>

LidBackSVG          (viewBox 1600×1300)  — the exterior face used when closed
  <g id="lid-back">
    alu rect + sheen + top highlight + chamfer stroke
```

**Note:** `hinge` is nested inside `<g id="deck">` in the extracted
pieces (`DeckSVG`), even though physically it belongs to the lid
assembly. This was a pragmatic decision — the hinge is visually and
compositionally attached to the deck's top edge and does not rotate
with the lid; keeping it inside the deck SVG lets it render as a
non-rotating element without a separate SVG. If B1.1's redesign needs
the hinge to be a first-class fifth assembly, hoist it out — nothing
in `LaptopStory` depends on its current location.

**What B1 / B2 may target independently:** `#grounding`, `#deck`,
`#deck-shell`, `#hinge`, `#deck-keyboard`, `#deck-trackpad`,
`#lid-front`, `#lid-shell`, `#lid-screen`, `#screen-content` (once
present), `#lid-back`.

The `screenClip` clipPath is independent of any assembly and is ready
for B2's `ProjectScreen`.

---

## 12 · B1 current architecture

Source:
- `components/work/laptop-story/LaptopStory.tsx` (348 lines)
- `components/work/laptop-story/pieces/LaptopParts.tsx` (419 lines)
- `app/qa/laptop-motion/page.tsx` (QA route)

**Isolated QA route:** `http://localhost:4321/qa/laptop-motion`. Not
linked from anywhere. Robots noindex. Loads Motion immediately
(deliberate — animation is the whole purpose of this route).

**Sticky-scroll test environment:**
- Outer `<section style={{ height: "300vh" }}>` (`sectionHeight` prop
  default)
- Inner `<div style={{ position: "sticky", top: 0, height: "100svh",
  overflow: "hidden" }}>` — the fixed viewport that holds the scene
- Stage inside: `width: min(88vw, 1200px, calc(100svh * 1.231))`,
  `aspect-ratio: 1600 / 1300`

**HTML perspective wrapper:**
- Stage `perspective: 2400px` (bumped from initial 1800 to reduce
  near-horizontal perspective magnification)
- `perspective-origin: 50% 42%` (camera slightly above vertical
  centre)
- Rig (child of stage): `transformStyle: preserve-3d`, animated
  `y + z + scale` from scroll (see keyframes below)

**Motion useScroll / useTransform design:**
- Section-scoped `useScroll({ target: sectionRef, offset: ["start
  start", "end end"] })`
- Every animated value is `useTransform(scrollYProgress, INPUTS,
  OUTPUTS)` — pure derivative of scroll position
- **No `useSpring`** on any primary value (lid angle, translate,
  scale, opacity). No mush on trackpad.
- **No React state updates per scroll frame** — MotionValues flow
  directly into style props

**Current keyframes (from `LaptopStory.tsx`, tune arrays to change
mapping):**

```ts
PROGRESS_ANGLE_INPUTS  = [0, 0.10, 0.28, 0.48, 0.62, 1.00];
PROGRESS_ANGLE_OUTPUTS = [-90, -90, -55, -15, +15, +15];  // rotateX degrees

PROGRESS_TRANSLATE_INPUTS  = [0, 0.12, 1.0];
PROGRESS_TRANSLATE_OUTPUTS = [56, 0, 0];                  // Y in CSS px

PROGRESS_SCALE_INPUTS  = [0, 0.12, 1.0];
PROGRESS_SCALE_OUTPUTS = [0.96, 1.0, 1.0];

PROGRESS_Z_INPUTS  = [0, 0.28, 0.62, 1.0];
PROGRESS_Z_OUTPUTS = [-350, -180, 0, 0];                  // Z pull-back

PROGRESS_GROUND_INPUTS  = [0, 0.12, 0.62, 1.0];
PROGRESS_GROUND_OUTPUTS = [0.35, 1.0, 1.0, 1.0];          // grounding opacity

PROGRESS_SCREEN_INPUTS  = [0.68, 0.88, 1.0];
PROGRESS_SCREEN_OUTPUTS = [0, 0.55, 0.6];                 // screen-tint opacity

// Angle-driven opacity crossfade for lid front/back
frontOpacity = useTransform(lidAngle, [-100, -60, -50, 20], [0, 0, 1, 1])
backOpacity  = useTransform(lidAngle, [-100, -60, -50, 20], [1, 1, 0, 0])
```

**Sign convention** (CSS 3D right-hand rule, cited in the source
comment): positive `rotateX` tilts the top of the element away from
viewer; negative tilts it toward viewer. The lid box is oriented
"standing up" as default (rotateX 0 = vertical). Closing (tip forward
and down onto the deck) is NEGATIVE. Working angle is a small positive
past vertical (+15° for the ~105° open resting position).

**Lid rig transform-origin:** `50% 72.6%` — the hinge line at
y=944 in the 1300-tall viewBox.

**Lid front/back implementation** (CURRENT — see §15 for why this may
need to change):
- Both faces are child `<motion.div>`s inside `<motion.div
  className="lid-rig">` with `transformStyle: preserve-3d`
- `.lid-back` has pre-rotation `transform: rotateY(180deg)` so its
  content faces the opposite way in the rig's local space
- **`backface-visibility: hidden` is NOT used** — at exactly
  rotateX(−90°) both faces are edge-on and the CSS backface test
  hides them both, producing a frame with no lid
- Instead, front/back visibility is controlled by an **angle-driven
  opacity crossfade** (10° window: −60° → −50°)
- **Concern:** once B2 puts bright project content on the screen, the
  crossfade may become visibly incorrect at the boundary — the lid
  will appear semi-transparent as the screen fades in from behind
  the exterior. Flagged in §15.

**Exterior lid face (`LidBackBody`):** minimal aluminium rectangle
with the same shell material, lateral sheen, and specular top-edge
highlight as the lid-shell front. No logo. No wordmark. No brand
marks. Silhouette exactly matches the front (same rounded rectangle
at same coordinates) so no angle exposes a mismatch.

**Screen wake overlay:** a `<motion.rect>` inside a passive
`<svg viewBox="0 0 1600 1300">` inside the `.lid-front` wrapper. Fill
`#1A1A24`, opacity driven by `screenWake` motion value. Fades from
0 → 0.55 between progress 0.68 → 0.88, holds at 0.6 through 1.0.

**Reduced-motion implementation:** `useReducedMotion()` at the top of
`LaptopStory`. When true, `<LaptopStoryReducedMotion />` renders a
normal-height `<section>` (no sticky, no 300vh) containing
`<LaptopFrame maxWidth={1200} />` — the exact approved B0.2 open
static laptop. The choreography does not run. Screen sits at its
display-off gradient. Reviewer sees the approved final state directly.

**Reverse-scroll design:** every animated value is a pure
`useTransform` derivative of `scrollYProgress` — no state machines,
no one-way triggers, no `.get()`-based side effects. Scrolling up
produces the exact inverse of scrolling down at any position.

**Fast-scroll determinism:** no `useSpring` anywhere on primary
values. Motion re-derives every output on the next rAF from the
current scroll position. No interpolation "chasing" scroll. Fast
trackpad flicks resolve to the correct physical state within one
frame — verified by `qa/laptop-motion.spec.ts` `fastscroll-*` shots.

**Stale comment note:** the top-of-file docstring in `LaptopStory.tsx`
still mentions `perspective: 1800px` and `backface-visibility:
hidden` — both stale from an earlier revision. Actual current values
are `perspective: 2400px` and opacity-crossfade front/back. Fix the
comment when you next touch that file.

---

## 13 · B1 — what is approved

Approved in direction (do not casually redesign):

- ✅ Native browser scroll ownership — always
- ✅ No wheel interception, no `preventDefault`, no scroll lock
- ✅ Direct scroll-progress derivation of every animated value
- ✅ No React state per scroll frame
- ✅ Reversibility in both directions
- ✅ Fast trackpad-flick response (correct final state within one rAF)
- ✅ Isolated QA route `/qa/laptop-motion`, not on `/`
- ✅ Reduced-motion collapses to the approved static open state (B0.2)
- ✅ Restrained late-open motion direction — the choreography from
  approximately progress **0.48 → 1.00** (primary open decelerating to
  final working angle, then settle, then screen wake, then hold)
- ✅ Final working angle at +15° rotateX (~105° from closed)
- ✅ Settle stillness (no "breathing" lid motion at rest)
- ✅ Screen-wake restraint — subtle warm graphite overlay, max 0.55
  opacity, no glow, no colour
- ✅ No project content yet (screen aperture remains empty)
- ✅ No homepage integration yet

The mid-to-late arc **is not the problem.** Do not touch it in B1.1.

---

## 14 · B1 current failure — CURRENT BLOCKER

**Work paused here. B1.1 must solve this before anything else.**

**The CLOSED → EARLY-OPEN geometry is not visually approved.**

Specific issues (from user review of the B1 contact sheet
`qa/screenshots/B1/`):

1. **At progress 0.00 the laptop does not convincingly read as
   closed.** The exterior lid appears as a horizontal slab hovering
   over a still-visible keyboard/deck — you can see the deck top
   surface with the keyboard peeking out from under the closed lid.
   Not physically believable.

2. **Keyboard / trackpad remain visible too early.** By the time the
   lid has begun opening (progress 0.12–0.24), the deck contents
   should still be mostly occluded. Instead they are visible from the
   very beginning because the deck is drawn statically with its own
   perspective (baked into the SVG illustration), while the lid is
   projected independently by CSS 3D `rotateX`.

3. **At low opening angles the lid becomes a disproportionately large
   trapezoidal plane.** The near-horizontal lid extends forward in Z
   under CSS 3D perspective, magnifying the top edge dramatically —
   the fully-open lid at ~10-20° open dominates the frame instead of
   reading as a subtle crack.

4. **Root cause: two disagreeing projection models.** The deck's
   trapezoidal foreshortening is *drawn* into the SVG geometry
   (`polygon "90,952  1510,952  1595,1212  5,1212"` implies a
   top-down camera). The lid's rotation is *computed* by CSS 3D
   `rotateX` with `perspective: 2400px`. These two projection systems
   agree at rotateX = 0° (lid vertical, no perspective effect on the
   lid) but disagree strongly as the lid approaches horizontal — the
   CSS-3D-projected horizontal lid does not match the perspective
   baked into the deck's drawn geometry.

5. **The current workaround — moving fast through the problematic
   region (progress 0.10 → 0.28 covers −90° → −55°) — is not a
   sufficient fix.** It reduces dwell time in the ugly range but the
   frames are still visibly wrong when the user does scroll slowly
   through them.

6. **Front/back face handling currently uses opacity crossfade.** Fine
   for the display-off screen we have now. Once B2 puts bright project
   content on the screen, the crossfade window (angle −60° → −50°)
   will be visible as a moment where the lid is semi-transparent and
   the exterior aluminium is showing through the project screen.
   Wrong.

7. **Lid needs a clearer physical thickness / edge treatment at
   near-edge-on angles.** The current lid is a zero-thickness plane;
   when nearly horizontal, its projected height collapses to a
   hairline and the lid physically "disappears" through the transition.

**This is what B1.1 must solve.**

---

## 15 · B1.1 approved direction

**Preferred first approach: optically projected low-angle lid
geometry.**

The goal is **optical product-film correctness**, not pure CSS-3D
mathematical correctness. It's acceptable to control the lid's
apparent shape by directly interpolating measurements rather than
relying on the browser to project a rotating plane.

Low-angle lid geometry may explicitly control / interpolate the
following as a function of `lidAngle`:

- Apparent lid height in the viewport
- Projected top-edge Y (in CSS px)
- Projected hinge-edge Y (should match the deck's hinge line at all
  angles)
- Top width (perspective narrowing)
- Bottom width (perspective narrowing)
- Mild horizontal skew if it helps read the tilt
- Apparent body scale
- Deck occlusion — how much of the keyboard/trackpad the lid covers
  at each angle

**Closed state must cover keyboard/trackpad appropriately.** At
progress 0.00 the deck's top face (with keyboard and trackpad) should
be effectively hidden by the closed lid.

Approximate visual occlusion intent (**optical tuning ranges, not
absolute laws**):

- **0–8°** — keyboard + trackpad effectively hidden
- **8–18°** — very narrow physical gap
- **18–35°** — keyboard begins revealing
- **35°+** — deck increasingly visible

By approximately **45–55° open**, the system may transition to the
existing successful upright presentation (the mid-to-late arc that is
already approved). The handoff between the optical low-angle
projection and the current CSS-3D rotation must be seamless — no jump,
no colour shift, no scale jump.

**Alternative approach (only if the optical approach cannot be made
to work cleanly):** rebuild deck + lid into one consistent CSS 3D
world/camera — the deck itself becomes a horizontal plane in 3D
space, and the lid rotates around its back edge in the same 3D
world. This removes the projection-model disagreement at the cost of
significant refactor. **Do not introduce Three.js.**

---

## 16 · B1.1 things that MUST NOT change

Explicitly frozen — do not modify without a specific regression:

- ❌ B0.2 industrial design (any dimension in §10)
- ❌ Screen / bezel proportions
- ❌ Approved keyboard / trackpad design
- ❌ Graphite materials (all gradient stops in §10)
- ❌ Late-open choreography (progress 0.48 → 1.00) unless the optical
  low-angle solution requires a small handoff adjustment
- ❌ No springs on primary lid angle
- ❌ No overshoot at final open state
- ❌ Native scrolling only
- ❌ Settle pause (progress ~0.62 → 0.72) — no lid micro-motion at rest
- ❌ Restrained screen wake (max opacity 0.55, warm graphite `#1A1A24`,
  no colour, no glow)
- ❌ Reduced-motion behavior (collapse to `LaptopFrame` open static)
- ❌ No B2 project content — screen aperture stays empty
- ❌ No homepage integration — B1.1 stays on `/qa/laptop-motion`
- ❌ Approved A visual/layout system (Hero, About, Credibility, Nav)

---

## 17 · B1.1 required QA

**Dense progress-checkpoint contact sheet:**

```
0.00, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.42, 0.48, 0.62, 1.00
```

Update `qa/laptop-motion.spec.ts` `CHECKPOINTS` array to this
sequence, or create a new spec (e.g. `qa/laptop-motion-b11.spec.ts`)
targeting `qa/screenshots/B1.1/`.

**Key approval questions to answer with the screenshots:**

- **0.00:** Does this immediately read as a closed laptop? (No visible
  keyboard/trackpad. Deck occluded by lid.)
- **0.16:** Does it look like the lid has *just* begun to open?
  (Narrow gap. No dramatic lid dominance.)
- **0.28:** Is the lid's size/projection physically believable relative
  to the deck? (No oversized trapezoid. No perspective mismatch.)
- **0.48:** Has the previously successful mid-open state been
  preserved? (Compare pixel-for-pixel to current
  `qa/screenshots/B1/checkpoint-048.png`.)

**Also required:**

- Reverse-scroll QA — same sequence played in reverse must produce
  the same intermediate states
- Fast-flick QA — sequence `[0.20, 0.60, 0.05, 0.85, 0.35, 0.95, 0.00]`
  must each resolve to the correct physical state within one rAF
- Cross-browser: Chromium + Playwright WebKit + Playwright Firefox
  — same file structure as `qa/laptop-motion.spec.ts` `cross-browser`
  tests
- Reduced-motion — must still collapse to static `LaptopFrame` open

**Precise reporting language:** Playwright WebKit is a WebKit build
maintained by the Playwright team, **not literal Safari.** Real Safari
QA requires a physical device. Describe engine coverage as
"Chromium + Playwright WebKit + Playwright Firefox" — don't claim
Safari coverage.

---

## 18 · B2 and future — do not start yet

Milestone B2 (project screens + project switching + project metadata)
**must not begin until B1.1 physical opening is approved.** No
homepage LaptopStory integration until B1.1 is approved.

Planned B2 scope (for context only — do not implement any of this
now):

- `ProjectScreen` frames per project (PepsiCo GSAT, Chummy Funding,
  Flow.ai) rendered inside the `screenClip` clipPath — abstract
  NDA-safe SVG/CSS UI compositions per project (see
  `data/projects.ts` `visualKind`)
- Project-zone hysteresis logic (`useProjectZone`) — discretised
  active-project index computed from scroll progress with threshold
  hysteresis to prevent flicker at boundaries
- Project meta write-on animation on a side rail
- `ProjectDeck` — the mobile-only alternative (cards stacking) that
  substitutes for LaptopStory on touch/lg-and-below

---

## 19 · Current performance carry-forward items

These are unresolved but **not immediate B1.1 blockers**. Do not
distract B1.1 with unrelated performance archaeology.

- **Hero image LCP inspection.** Before considering any format change
  to `public/images/portrait/yasir-cutout.png`, inspect the actual
  `/_next/image?...` response the browser fetches:
  - Request URL
  - Content-Type (probably `image/webp` or `image/avif` — Next
    optimises supported browsers)
  - Selected variant (width, quality)
  - `transferSize` / `encodedBodySize`
  - Decoded dimensions
  - Selected `srcset` candidate
  - Whether the response is already WebP / AVIF
  Only change the source format if measurement demonstrates a real
  benefit. Don't assume a 521 KB source PNG means a 521 KB network
  response.
- **Hero `sizes` verification.** Verify `HeroPortrait`'s current
  `sizes` prop actually matches the rendered portrait width at mobile
  / tablet / desktop; verify which srcset candidate the browser
  selects. Only tighten `sizes` if the browser is downloading an image
  materially larger than the rendered slot.
- **Canonical clean Lighthouse benchmark environment.** The Windows
  local runner is noisy (up to 20-point perf swing between sessions
  on the same build). Before Milestone B1 real animation gate,
  establish either a CI runner (Lighthouse CI on GitHub Actions
  against a static build) or a fresh Vercel preview measured from a
  clean machine. Two measurement modes stay separate: **A) simulated
  score gate** (perf ≥ 90 goal) and **B) devtools diagnostic** (phase
  timings, main-thread investigation).
- **LaptopStory Motion cost.** When LaptopStory moves onto `/`, wrap
  in `<InViewMount>` and use the LazyMotion + `motion/features-dom-max`
  seam — Motion runtime must NOT land in the homepage initial bundle.
- **Static-vs-motion QA baseline pair.** If measuring incremental
  animation cost becomes valuable, compare equivalent static and
  animated laptop routes side by side.

---

## 20 · Git / working tree state (at handoff time)

```
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  .env.example
  .gitignore
  Sd Yasir Resume 2.pdf                    ← duplicate of _inspect/yasir-resume.pdf
  _inspect/                                 ← my reference cache (portraits + résumé)
  app/
  components/
  data/
  eslint.config.mjs
  lib/
  motion/
  next.config.ts
  package-lock.json
  package.json
  postcss.config.mjs
  public/
  qa/
  scripts/
  styles/
  tsconfig.json

nothing added to commit but untracked files present
$ git log --oneline -5
89a6381 Restart
39d0a70 Claude Setup
aac6002 Initialize project structure with Next.js, TypeScript, and Tailwind CSS.
```

**⚠️ Everything since `89a6381 Restart` is uncommitted.** All of
Milestones A (through A.3), B0 (through B0.2), and B1 lives in the
working tree only.

**Recommended checkpoint commit before B1.1 begins.** A single logical
commit representing "A + B0.2 approved + B1 QA route (early-open
blocker known)" would give a fresh session an unambiguous restart
point. Suggested message:

```
Checkpoint: Milestones A.3 + B0.2 approved, B1 mid-to-late open approved

- Milestone A (Hero, Credibility, About) frozen at A.3.
- Milestone B0 (static laptop) frozen at B0.2.
- Milestone B1 (LaptopStory scroll choreography) shipped to /qa/laptop-motion
  in isolated form. Mid-to-late open arc approved. Closed / early-open
  geometry is BLOCKED — see docs/CLAUDE_HANDOFF.md §15.

QA baseline routes at /qa/baseline, /qa/baseline-nav, /qa/laptop.
All measurements in qa/lighthouse/*.md.
```

**Do NOT force-push, do NOT rewrite history, do NOT delete
`Sd Yasir Resume 2.pdf` without confirming with the user (it's a
duplicate of the résumé in `_inspect/` but not something I created).**

If the checkpoint is not made, the fresh session should treat the
current working tree as canonical and proceed against it.

---

## 21 · START HERE IN A FRESH CLAUDE SESSION

Execute in order. Do not skip.

1. **Read this entire document (docs/CLAUDE_HANDOFF.md) — top to
   bottom.** Do not scan.
2. **Inspect these current source files** (read fully, not just
   listed):
   - `components/work/laptop-story/LaptopStory.tsx` — B1 choreography
   - `components/work/laptop-story/LaptopFrame.tsx` — B0.2 static
   - `components/work/laptop-story/pieces/LaptopParts.tsx` — piece SVGs
   - `app/qa/laptop-motion/page.tsx` — B1 QA route
   - `app/qa/laptop/page.tsx` — B0.2 QA route
   - `styles/tokens.css` — design tokens
   - `data/profile.ts` — verified facts
3. **Run `git status`** to check if any changes have landed since this
   handoff was written. If yes, treat source as canonical and note the
   drift.
4. **Run `npm run build && npm run typecheck`** to confirm the tree
   builds clean. If it doesn't, fix the build error FIRST — do not
   assume any other work is possible with a broken build.
5. **Open the existing B1 QA route in a browser:**
   - Start `npx next start -p 4321`
   - Visit `http://localhost:4321/qa/laptop-motion`
   - Scroll slowly through the 300vh section
   - Personally observe the closed / early-open frames failing per §15
   - Personally observe the mid-to-late arc succeeding per §14
6. **Do NOT redesign** any A hero/About/nav/credibility work, and do
   NOT redesign B0.2 industrial design. Both are frozen (§7, §10, §16).
7. **Continue ONLY with Milestone B1.1** — closed / early-open
   geometry correction. Follow the approved direction in §16 (optical
   projected low-angle geometry preferred). Do NOT solve it by
   further compressing scroll dwell time — the user explicitly
   rejected that (§14 item 5).
8. **Return the required B1.1 checkpoint screenshots + report.** Use
   the checkpoint list in §17. Include the four key approval-question
   answers explicitly. Do reverse-scroll + fast-flick + cross-browser
   + reduced-motion QA.
9. **STOP before Milestone B2.** Do not implement `ProjectScreen`, do
   not implement project switching, do not integrate LaptopStory into
   `/`. Wait for B1.1 approval.

If the user's next message contradicts anything in this handoff,
**assume the user's message is correct and mark the discrepancy.**

---

## 22 · Document authorship note

This document was written at the checkpoint immediately after B1 QA
delivery (Chromium contact sheet + Safari-engine + Firefox +
reduced-motion + JS-cost report), with B1.1 rejected before starting.
Every fact was verified against the current repository state at write
time; every dimension in §10 was cross-referenced against source; the
stale comment in `LaptopStory.tsx` (§12) is called out rather than
silently repeated.

Where this document and the current source code disagree, **current
source code wins.** Note the drift and update the doc — do not
silently rewrite source to match the doc.
