# Portfolio Design & Engineering Constitution

**Source of truth for every implementation decision on yasir-me.**  
Do not implement features that violate this document. Do not ship a résumé rendered as a website.

---

## Confirmed product decisions

| Decision | Value |
|---|---|
| Framework | Next.js App Router + React + TypeScript |
| UI | Tailwind CSS + shadcn/ui + Motion for React |
| Deploy | Vercel |
| Domain | TBD — never invent a production domain |
| Site URL config | `NEXT_PUBLIC_SITE_URL` via typed central site config |
| Primary font | **Geist Sans** only for v1 (no decorative typefaces yet) |
| Theme | **Dark-only in v1**; tokens stay semantic for a future light theme |
| Theme toggle | Do **not** expose until a real light theme exists |
| Résumé | Include supplied PDF; offer **View Résumé** and **Download Résumé** |

---

## Project

| Field | Value | Verification |
|---|---|---|
| Owner | Yasir Syed | — |
| Positioning | Senior Frontend Engineer / Frontend UI Engineer | Résumé |
| Experience | 7.8 years | Résumé |
| Location | Hyderabad, India | Résumé |
| Email | syedyasir1450@gmail.com | Confirmed (PDF + owner) |
| Phone | +91-8885627274 | Résumé |
| LinkedIn | https://www.linkedin.com/in/yasir-syed10/ | Verified via PDF hyperlink |

### Must communicate

Engineering depth + Design sensibility + Performance + Motion + Product thinking

### Must feel like

A premium digital product launch where Yasir is the product being introduced.

### Must not feel like

Generic web developer site, freelancer template, or résumé-as-website.

### Stack / domain signals (content, not logo clouds)

React, TypeScript, JavaScript, React Native, Next.js, Redux / Redux Toolkit, Material UI, Tailwind CSS, design systems, frontend architecture, accessibility / WCAG, Core Web Vitals, rendering optimisation, responsive UI, REST integrations, enterprise applications, mobile applications, AI-assisted products, micro frontends, event-driven architecture, AWS, Azure, Vercel.

---

## Core creative concept

**GRAPHITE × LIQUID GLASS × SIGNAL**

Inspired by Apple product storytelling, premium editorial sites, high-end launches, cutting-edge frontend portfolios, modern interaction design.

**Do not** clone Apple, reproduce Apple components, or imitate Apple pixel-for-pixel.

Take: restraint, typography, composition, whitespace, hierarchy, motion choreography, materials, cinematic scroll storytelling.

---

## Color system

### Accents (never full-page dominant)

- Signal Red: `#EF233C` — emphasis, energy, action, primary signals
- CTA-accessible red: slightly darker where contrast requires
- Electric Gold: `#FDC500` — highlights, achievements, subtle attention, micro details

### Base (default surface language — dark v1)

- Main background: `#08080A`
- Elevated background: `#111216`
- Graphite surface: `#191A1F`
- Primary text: `#F7F7F5`
- Secondary text: `#A5A5AC`
- Hairlines: `rgba(255,255,255,0.10)`

### Future light theme (tokens only in v1)

- Light theme background approx: `#F6F5F2`
- Tokens must be semantic (`--background`, `--foreground`, `--surface`, `--accent-signal`, etc.) so light theme can be added later without rewriting components
- Do not build or expose light UI / Toggle Theme in v1

**Do not** create giant red/yellow gradients everywhere. Most of the site stays neutral, sophisticated, cinematic.

---

## Typography

Primary face: **Geist Sans** (variable). Do not introduce multiple decorative typefaces yet.

Achieve editorial personality through type scale, weight, tracking, line-height, wrapping, spacing, and composition — not font novelty.

Hierarchy relies on:

- large display typography
- controlled line lengths
- negative space
- contrast between huge headlines and small technical labels
- restrained uppercase metadata

Avoid: excessive font weights, tiny unreadable text, giant paragraphs, generic SaaS typography layouts.

Desktop headings may be extremely large. Mobile typography is independently tuned (not desktop÷N). Use `clamp()` intelligently.

---

## Shape language

Apple-inspired soft geometry. Allowed radii: **12 / 16 / 20 / 24 / 28 / 32 px**.

- Large surfaces ≈ 28–32px
- Interactive surfaces ≈ 16–24px
- Pills only where semantically appropriate
- No random mixed radii

### SURFACE ≠ CARD

Rounded surfaces must earn their place through **grouping**, **interaction**, **material**, or **elevation**.

Future sections may use pure typography, whitespace, hairlines, imagery, layered composition, and floating metadata — **without** wrapping content in containers by default.

Prefer tonal difference, specular highlights, transparency, and shadow over outlining every element with a full 1px grey border.

---

## Glassmorphism hierarchy

Glass is important; not every card is glass.

| Level | Use | Treatment |
|---|---|---|
| 0 | Normal content | No glass |
| 1 | Elevated editorial surfaces | Very subtle transparency |
| 2 | Interactive project/nav surfaces | Moderate translucent material |
| 3 | Nav, floating controls, transient UI | Premium liquid-glass material |

Glass combines: translucency, subtle border, background luminosity, controlled blur, soft highlight, restrained shadow.

Avoid `backdrop-filter: blur(40px)` on dozens of simultaneous elements. Performance > visual gimmicks.

---

## Motion philosophy

**SPECTACLE → SILENCE → SPECTACLE → SILENCE**

If everything moves, nothing feels special.

| Category | Duration | Examples |
|---|---|---|
| Micro | 120–220ms | Buttons, icons, states |
| Interface | 300–500ms | Cards, menus, overlays |
| Cinematic | 600–1100ms or scroll-driven | Hero, storytelling |

Prefer `transform` + `opacity`. Avoid layout-triggering properties during continuous animations.

**Never:**

- update React state every animation frame
- attach heavy work directly to scroll listeners
- hijack native scrolling
- prevent wheel/touch scrolling to force storytelling
- create permanent `requestAnimationFrame` loops for decorative effects

Sticky sequences OK while document continues scrolling normally. Respect `prefers-reduced-motion`. Reduced-motion must still look intentionally designed.

### Preferred scroll-linked architecture

```
useScroll → MotionValue → useTransform → optional useSpring → transform/opacity styles
```

- `useSpring` is perceptual smoothing — **not** a scroll-throttling architecture
- No artificial scroll throttling unless a specific non-Motion calculation requires it
- No redundant scroll listeners

### LazyMotion

If LazyMotion is adopted:

- Prefer lightweight `m` inside LazyMotion-managed trees
- Do **not** casually import full `motion` in the same tree (defeats bundle savings)
- Baseline feature bundle: `domAnimation`
- Use `domMax` only when a section genuinely needs drag / pan / layout animations
- Do not globally ship `domMax` for hypothetical future needs
- If isolated lazy chunks need different feature bundles, document the decision

### Motion must earn idle cost

Animations must stop consuming unnecessary work when irrelevant. Where appropriate gate on:

- intersection visibility
- document / tab visibility
- reduced motion
- responsive gating

If `useAnimationFrame` is required: justify it, and pause when offscreen or when the document is hidden.

---

## Performance philosophy

**THE PORTFOLIO MUST EARN ITS COMPLEXITY.**

Every expensive visual effect must justify:

1. what it communicates  
2. why a simpler implementation is insufficient  
3. what its runtime cost is  
4. how it behaves on mobile  
5. how it behaves with reduced motion  

No effect exists merely because it can be built.

### Performance tactics (measured / justified)

- Optimised hero image; lazy below-fold; responsive images; AVIF/WebP
- Code splitting; lazy expensive experiences behind intentional client boundaries
- Avoid huge bundles, unnecessary deps, constant backdrop-filter, layout thrashing, persistent `will-change`
- Clean up observers/listeners; rAF only when required; CSS when CSS suffices
- Target smooth 60fps on normal modern mobile hardware

### `content-visibility`

Do **not** apply `content-visibility: auto` blindly.

- Do **not** use it on the active sticky laptop storytelling container unless profiling proves it safe and beneficial
- Reserve for large below-the-fold / relatively static sections where it actually helps
- No cargo-cult performance properties

---

## Scroll experience

Native, predictable, buttery. Cinematic scroll-linked animation without fighting the browser.

- No smooth-scroll library by default
- No nested scrolling regions unless necessary
- No scroll locking
- Smooth-scroll engine only later if measurable benefit

---

## Mobile-first rule

Mobile is **not** a scaled desktop site.

Shared: brand, content, visual language.  
Different allowed: composition, animation choreography, navigation, storytelling interactions, content ordering.

Design first for ~360–430px, then enhance: tablet → laptop → desktop → large desktop. Breakpoints from design needs, not device nicknames.

---

## Site structure

1. Hero  
2. Proof / Metrics  
3. Signature Scroll Story  
4. Selected Work  
5. Engineering System  
6. Career Journey  
7. Performance / Frontend Quality  
8. Frontend Playground / Lab  
9. About  
10. Contact  
11. Minimal Footer  

Case-study routes are separate. Homepage does not contain every project detail.

### Internal design-system route

Keep an internal design-system / visual QA route for development infrastructure.

It must **not**:

- appear in public navigation
- appear in the sitemap
- be indexed in production (`noindex`)

---

## Section briefs

### Hero

- Primary visual: **professional formal portrait** (not casual sunset)
- Brand: YASIR SYED / Senior Frontend Engineer
- Headline: “I build interfaces that feel fast.”
- Support: 7.8 years turning complex products into high-performance digital experiences.
- Tech line: React · TypeScript · React Native · Frontend Architecture · Performance · Accessibility
- CTAs: Explore My Work · View Résumé (inspectable; do not force download)
- Subtle pointer parallax on portrait (desktop). Soft red/gold illumination field behind portrait. No excessive float.

### Proof

Verified résumé metrics only (elegant reveal, no cheesy counters):

- 7.8 — Years Building Products
- 14+ — Connected Enterprise Workflows (GSAT interconnected modules)
- 30% — Load-Time Improvement
- Web + Mobile — React / React Native

### Signature desktop

Scroll-controlled laptop sequence (CSS 3D + Motion, no WebGL unless necessary):

- 0–15% closed laptop emerges  
- 15–42% lid opens  
- 42–55% screen illuminates  
- 55–75% interfaces / disciplines appear  
- 75–92% camera approaches display  
- 92–100% transitions into Selected Work  

Sophisticated geometry/shadows — not a toy laptop.

### Signature mobile

**Do not** shrink the laptop scene. Separate sequence: floating premium glass interface; layers UI / STATE / API / PERFORMANCE separate then collapse. Message: “Frontend engineering is more than making screens look good.” Touch-first.

### Selected work

Editorial case studies, not 3-column card grids. Featured: PepsiCo GSAT, Chummy Funding, Flow.ai / Moneris (+ smaller additional). No NDA leaks. Abstract UI when screenshots confidential. Each featured project: Problem → Complexity → Engineering → Experience → Result. Tech labels secondary.

### Engineering system (skills)

Never logo clouds. Framing: “My frontend stack isn't a list. It's a system.”

Layers: Experience / State / Interface / Motion / Engineering / Delivery. Desktop interactive; mobile stacked/swipeable.

### Career

| When | Company | Notes |
|---|---|---|
| 2019–2022 | Trangla | Employment chronology |
| 2022–2025 | Slickbit Technologies | Employment chronology |
| May 2025 – Aug 2025 | Caprus IT | Use employment dates; see date flag below |
| Sept 2025 – Present | Turing | Current |

Per role: company, role, product/domain, one meaningful contribution. No pasted résumé bullets. Desktop alternating; mobile vertical native.

#### Date inconsistency flag (do not silently invent)

Résumé lists Caprus employment as **May 2025 – Aug 2025**, but the ProArch client line says **May 2025 – Present**.  
**Do not automatically publish the inconsistent client date.** Prefer employment chronology unless client dates are later explicitly confirmed.

### Performance

“Designed beautifully. Engineered responsibly.” Visualise LCP / INP / CLS / bundle / a11y. **Do not fabricate numbers** — real metrics only after measurement.

### Lab

Small craft playground (Motion Physics, Scroll Engine, Interface States, Rendering, Accessibility). Not gimmick collection.

### About

Casual sunset photograph. “Engineer by profession. Designer by instinct.” Human after technical storytelling. Natural confident writing — no buzzword soup.

### Contact

Cinematic minimal. “I've spent 7.8 years building products for other people. Maybe we build the next one together.” Actions: Let's Talk · Email · LinkedIn · View / Download Résumé. No giant generic footer.

---

## Navigation

- **Desktop:** Floating glass nav — Work, Engineering, Journey, About + CTA Let's Talk; optional ⌘K
- **Mobile:** Floating bottom dock — Home, Work, About, Contact; safe areas; don't block content

### Command palette (desktop)

⌘K / Ctrl+K commands (v1):

- View Projects
- About Yasir
- View Résumé / Download Résumé
- Copy Email
- LinkedIn
- Reduce Motion

Easter egg `> whoami` → “Senior Frontend Engineer.” Keep subtle.

**Do not** include Toggle Theme until a genuine light theme exists.

---

## Image rules

Priority: (1) real photographs (2) real public project imagery (3) custom interface representations (4) contextual stock only if it serves story.

**Never:** random laptop stock, programming keyboards, AI robots, meaningless tech abstracts, random office people.

Asset mapping:

- Hero → formal professional portrait
- About → casual sunset portrait
- Résumé PDF → portfolio asset with View + Download paths (View does not force download)

---

## Accessibility

Product requirement: semantic HTML, heading order, keyboard nav, visible focus, ARIA where needed, min target sizes, reduced motion, contrast, SR labels, skip nav, accessible dialog/command palette. Never sacrifice a11y for animation.

---

## SEO & domain / metadata strategy

- Semantic content, metadata, Open Graph, Twitter cards, structured data where appropriate
- Canonical URLs, robots, sitemap, meaningful titles/descriptions, social preview
- Case studies get own metadata
- Central typed site config reads `NEXT_PUBLIC_SITE_URL`
- Development may resolve to localhost where appropriate
- **Never** emit production canonical / OG URLs that point at localhost
- If production site URL is unset, omit or carefully degrade absolute canonical/OG URLs rather than inventing a domain

---

## Architecture

### Stack

Next.js App Router · React · TypeScript · Tailwind CSS · shadcn/ui · Motion for React · Vercel. TS/TSX throughout — no random JS/TS mix.

### Suggested tree

```
app/
  layout.tsx
  page.tsx
  work/[slug]/page.tsx          # Phase 8
  design-system/page.tsx         # internal QA; noindex; not in nav/sitemap
  robots.ts
  sitemap.ts
  opengraph-image.*              # when site URL strategy allows
components/
  nav/
  command-palette/
  footer/
sections/
  hero/
  proof/
  signature-story/
    SignatureStoryShell.tsx
    DesktopLaptopStory.tsx       # desktop-only module
    MobileLayerStory.tsx         # mobile-only module
    ReducedMotionStory.tsx
  selected-work/
  engineering-system/
  career/
  performance/
  lab/
  about/
  contact/
ui/                              # shadcn primitives
motion/                          # LazyMotion setup, variants, features
hooks/
lib/
  site.ts                        # typed site config (NEXT_PUBLIC_SITE_URL)
  seo.ts
data/                            # typed content modules — source of copy
styles/                          # semantic design tokens
public/
  images/
  resume/
```

No giant 800-line section components. No premature abstraction — abstract when repetition/complexity justifies it.

### Content model

- Keep major portfolio copy in **typed data modules** (`data/`), not embedded in section components
- Source-conscious: do not invent achievements
- Verified résumé facts only for claims (7.8 years, 30% load-time, 14+ GSAT modules, React/TS/RN)
- Flag résumé inconsistencies; do not silently guess

### Server / Client boundary strategy

Goal:

**SERVER-RENDER AS MUCH CONTENT AS PRACTICAL + HYDRATE ONLY THE INTERACTION THAT NEEDS IT.**

Rules:

- Preserve Server Components by default
- Introduce explicit `"use client"` boundaries for interaction
- Do **not** treat `dynamic(..., { ssr: false })` as a generic Server Component escape hatch
- If `ssr: false` is genuinely required, perform the dynamic import from an appropriate **Client Component**
- Do **not** disable SSR merely because a component uses Motion
- Many Motion components may live inside intentionally scoped Client Components while surrounding content remains server-rendered

### Signature responsive loading strategy

Conceptual modules:

```
SignatureStory/
  SignatureStoryShell
  DesktopLaptopStory
  MobileLayerStory
  ReducedMotionStory
```

Requirements:

- Separate desktop cinematic and mobile cinematic modules
- Mobile must not download/execute the expensive desktop laptop implementation unnecessarily
- Use an intentional responsive/client loading boundary — **not** fragile server-side viewport detection
- No hydration mismatch
- No UA sniffing unless absolutely necessary
- No duplicate active scenes
- Reduced-motion gets its own intentional presentation

---

## No-generic-AI-design rule

Forbidden clichés: gradient blobs everywhere, excessive glowing borders, endless bento grids, everything-in-cards, dozens of pills, random glass panels, huge logo clouds, pointless particles, typewriter hero, Matrix rain, floating tech logos, neon cyberpunk, fake terminal half-hero, meaningless 3D spheres.

Every visual decision needs a reason.

---

## Quality bar (ask for every section)

1. Credible for an engineer shipping large enterprise products?
2. Custom-designed?
3. Does motion communicate something?
4. Beautiful at 390px?
5. Performant?
6. Accessible?
7. Still excellent with animation disabled?

If any answer is no — keep refining.

---

## Canonical phase plan

| Phase | Name | Status |
|---|---|---|
| **0** | Constitution / Planning | **COMPLETE** |
| **1** | Foundation + Design System | **COMPLETE** |
| **1.5** | Visual System Refinement + Foundation Hardening | **COMPLETE** |
| **1.6** | Mobile Visual Approval Checkpoint | **COMPLETE** |
| **2** | Navigation + Hero + Proof | Pending |
| **3** | Signature Story (Desktop Laptop + Mobile Engineering Layers) | Pending |
| **4** | Selected Work | Pending |
| **5** | Engineering System + Career | Pending |
| **6** | Performance + Lab | Pending |
| **7** | About + Contact | Pending |
| **8** | Case Studies | Pending |
| **9** | Performance / Accessibility / Responsive QA | Pending |
| **10** | Final Premium Polish | Pending |

This numbering is canonical. Do not invent alternate phase schemes in future prompts.

---

## Testing strategy

### Early (from Phase 1)

- TypeScript / typecheck
- Lint
- Production build
- Accessibility sanity checks
- Responsive visual QA (esp. via internal design-system route)

Do not overbuild test infrastructure during initial scaffolding.

### Later (before / during Phases 8–9)

Playwright coverage for critical interactions:

- Desktop navigation
- Mobile navigation
- Command palette
- Anchor navigation
- Reduced-motion mode
- Signature-scene entry/exit
- Keyboard navigation
- Case-study navigation

---

## Development process

**Do not implement the entire website in one pass.**

Order: inspect → understand → propose architecture → design tokens → motion architecture → responsive strategy → performance risks → implementation plan → **wait for explicit approval** → implement by canonical phases.

Do not start a new major phase without clear go-ahead when the user has requested phased approval.
