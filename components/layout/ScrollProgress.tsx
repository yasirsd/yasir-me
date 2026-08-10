/**
 * Top scroll-progress hairline.
 *
 * Pure CSS via `animation-timeline: scroll()`. Zero JS, zero Motion
 * runtime — the browser drives the fill directly against page scroll.
 * Chromium 115+ has it; older Safari and Firefox get no bar
 * (acceptable — it's a decorative signal, not a control).
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-[color:var(--red)]"
    />
  );
}
