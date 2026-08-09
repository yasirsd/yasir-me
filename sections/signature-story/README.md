# Signature Story — Phase 3 loading contract

This directory is intentionally empty of cinematic implementations in Phase 1.

## Required modules (Phase 3)

- `SignatureStoryShell` — server-friendly shell + client gate
- `DesktopLaptopStory` — expensive desktop-only cinematic module
- `MobileLayerStory` — mobile-only layered glass sequence
- `ReducedMotionStory` — intentional reduced-motion presentation

## Bundle rules (binding)

1. **Do not** statically import Desktop, Mobile, and ReducedMotion into the shell and hide unused ones with CSS/`matchMedia`.
2. Dynamically load **only** the selected experience so mobile users do not download the desktop laptop implementation.
3. Perform dynamic import from an appropriate **Client Component** boundary.
4. No server-side viewport sniffing.
5. No UA sniffing.
6. No hydration mismatch / no duplicate active scenes.
7. Prefer `ssr: false` only when the selected cinematic module truly cannot SSR, and only from a Client Component.

## Suggested selection order

1. Prefer reduced motion when `prefers-reduced-motion: reduce`
2. Else choose mobile or desktop via client media query after mount
3. Render a lightweight stable placeholder until the selected chunk resolves
