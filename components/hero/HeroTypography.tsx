/**
 * Desktop back-plane display type.
 *
 * Server component — entrance animation runs from CSS keyframes
 * (`.hero-enter` in globals.css) so this doesn't drag the Motion
 * runtime into the hero's critical path.
 *
 * A horizontal mask gradient fades the type toward the right edge so
 * the depth cue remains strong around the portrait/left region while
 * the readable right-column copy is never fighting it for attention.
 */
export function HeroBackType() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden select-none md:block"
      style={{
        // Strong through ~55%, sharp falloff by ~85%. Yasir sits roughly
        // in the middle-right of the left column and the letters we want
        // "behind him" fall inside the strong band.
        maskImage:
          "linear-gradient(90deg, #000 0%, #000 55%, rgba(0,0,0,0.35) 78%, transparent 92%)",
        WebkitMaskImage:
          "linear-gradient(90deg, #000 0%, #000 55%, rgba(0,0,0,0.35) 78%, transparent 92%)",
      }}
    >
      <div
        className="hero-enter absolute inset-0 flex flex-col justify-center leading-[0.82] tracking-[-0.045em]"
        style={
          {
            fontSize: "clamp(6rem, 15vw, 15rem)",
            fontWeight: 700,
            color: "color-mix(in oklab, var(--text) 16%, transparent)",
            "--delay": "120ms",
            "--dur": "700ms",
          } as React.CSSProperties
        }
      >
        <div className="pl-[3vw]">FRONTEND</div>
        <div
          className="pl-[9vw]"
          style={{
            color: "color-mix(in oklab, var(--text) 22%, transparent)",
          }}
        >
          ENGINEER
        </div>
      </div>
    </div>
  );
}
