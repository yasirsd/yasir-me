import type { CSSProperties, ReactNode } from "react";

interface LaptopFrameProps {
  /** Optional content mounted inside the screen aperture. */
  children?: ReactNode;
  /** Rendered max-width in CSS. The SVG scales inside. */
  maxWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Signature laptop object — pure SVG + CSS, zero client JS.
 *
 * B0.2 focus: deck-internal ergonomics. Outer silhouette, lid, bezel,
 * hinge visuals, grounding, ambient lighting and viewBox are unchanged
 * from B0.1. Only the *contents* of the deck (keyboard bounds, key
 * proportions, keyboard-well contrast, palm rest, trackpad size)
 * have been re-tuned.
 *
 * Additionally, the SVG hierarchy is now organised into physical
 * assemblies so that B1 opening choreography can animate whole parts
 * (`#lid`, `#hinge`, `#deck`) rather than arbitrary shape lists.
 *
 * Proportions (viewBox 1600 × 1300 — unchanged):
 *   - Lid:               1440 × 900   at (80, 40)   — 16:10
 *   - Bezel:             1400 × 852   at (100, 60)
 *   - Screen aperture:   1360 × 816   at (120, 76)
 *   - Chin:              48 units
 *   - Hinge:             8 units      at y=944
 *   - Deck outer:        260 units    y=952 → 1212, trapezoidal (unchanged)
 *   - Deck usable:       y=970 → 1210 (240 units)
 *   - Keyboard field:    132 units  → 55% of usable   (y=980 → 1112)
 *   - Palm rest:         98 units   → 41% of usable   (y=1112 → 1210)
 *   - Trackpad:          520 × 80   → centred in palm rest (y=1121 → 1201)
 *   - Keys:              58 × 24 (aspect 2.42:1), 5 rows × 14 cols
 */
export function LaptopFrame({
  children,
  maxWidth = 1200,
  className,
  style,
}: LaptopFrameProps) {
  return (
    <div
      className={className}
      style={{ maxWidth, margin: "0 auto", ...style }}
    >
      <svg
        viewBox="0 0 1600 1300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Laptop"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <defs>
          {/* Aluminium (lid) */}
          <linearGradient id="alu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3c3c43" />
            <stop offset="42%" stopColor="#2b2b32" />
            <stop offset="100%" stopColor="#1c1c22" />
          </linearGradient>
          <linearGradient id="aluSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="7%" stopColor="rgba(255,255,255,0)" />
            <stop offset="93%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.16)" />
          </linearGradient>
          <linearGradient id="aluTopHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Bezel */}
          <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08080a" />
            <stop offset="100%" stopColor="#040405" />
          </linearGradient>
          {/* Screen (display-off) */}
          <linearGradient id="screen" x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#0d0d12" />
            <stop offset="50%" stopColor="#08080c" />
            <stop offset="100%" stopColor="#05050a" />
          </linearGradient>
          <linearGradient id="gloss" x1="0" y1="0" x2="0.55" y2="1.1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Hinge */}
          <linearGradient id="hinge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0c" />
            <stop offset="50%" stopColor="#1c1c22" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <linearGradient id="hingeShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          {/* Deck */}
          <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38383f" />
            <stop offset="55%" stopColor="#2c2c32" />
            <stop offset="100%" stopColor="#20202a" />
          </linearGradient>
          <linearGradient id="deckSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="8%" stopColor="rgba(255,255,255,0)" />
            <stop offset="92%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
          <linearGradient id="deckFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a20" />
            <stop offset="100%" stopColor="#0a0a10" />
          </linearGradient>
          {/* Keyboard-well — softened relative to B0.1 so the recess reads
              as machined into the deck rather than a separate black panel. */}
          <linearGradient id="kbWell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="45%" stopColor="rgba(0,0,0,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
          </linearGradient>
          {/* Key face */}
          <linearGradient id="keyFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1e24" />
            <stop offset="55%" stopColor="#17171c" />
            <stop offset="100%" stopColor="#101015" />
          </linearGradient>
          {/* Trackpad */}
          <linearGradient id="trackpad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#33333a" />
            <stop offset="100%" stopColor="#25252c" />
          </linearGradient>
          <linearGradient id="trackpadInset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.65)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          {/* Grounding */}
          <radialGradient id="contact" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="rgba(0,0,0,0.82)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0.34)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="ambientRed" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="rgba(239,35,60,0.055)" />
            <stop offset="100%" stopColor="rgba(239,35,60,0)" />
          </radialGradient>
          <radialGradient id="ambientYellow" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="rgba(253,197,0,0.04)" />
            <stop offset="100%" stopColor="rgba(253,197,0,0)" />
          </radialGradient>
          <clipPath id="screenClip">
            <rect x="120" y="76" width="1360" height="816" rx="4" />
          </clipPath>
        </defs>

        {/* ============================================================
             #grounding — floor shadow + ambient bounces.
             ============================================================ */}
        <g id="grounding">
          <ellipse cx="260" cy="1240" rx="560" ry="180" fill="url(#ambientRed)" />
          <ellipse cx="1340" cy="1240" rx="560" ry="180" fill="url(#ambientYellow)" />
          <ellipse cx="800" cy="1270" rx="820" ry="32" fill="url(#contact)" />
        </g>

        {/* ============================================================
             #lid — the whole upper half (shell + screen). B1 opening
             choreography will rotate this whole group around the hinge.
             ============================================================ */}
        <g id="lid">
          <g id="lid-shell">
            <rect x="80" y="40" width="1440" height="900" rx="22" fill="url(#alu)" />
            <rect x="80" y="40" width="1440" height="900" rx="22" fill="url(#aluSheen)" />
            <rect x="83" y="41" width="1434" height="5" rx="2.5" fill="url(#aluTopHighlight)" />
            <rect
              x="80.5"
              y="40.5"
              width="1439"
              height="899"
              rx="22"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
            />
          </g>
          <g id="lid-screen">
            <rect x="100" y="60" width="1400" height="852" rx="10" fill="url(#bezel)" />
            <rect x="120" y="76" width="1360" height="816" rx="4" fill="url(#screen)" />
            <rect x="120" y="76" width="1360" height="816" rx="4" fill="url(#gloss)" />
            {/* Injected screen content — clipped to the aperture. Available
                for B2's ProjectScreen frames. */}
            {children ? <g id="screen-content" clipPath="url(#screenClip)">{children}</g> : null}
          </g>
        </g>

        {/* ============================================================
             #hinge — thin dark band + small contact shadow onto deck.
             B1 keeps this static (rotation origin lives here).
             ============================================================ */}
        <g id="hinge">
          <rect x="82" y="944" width="1436" height="8" fill="url(#hinge)" />
          <rect x="90" y="952" width="1420" height="16" fill="url(#hingeShadow)" />
        </g>

        {/* ============================================================
             #deck — deck shell, keyboard assembly, trackpad assembly.
             B1 will animate keyboard/trackpad opacity separately when
             the screen illuminates.
             ============================================================ */}
        <g id="deck">
          <g id="deck-shell">
            <polygon
              points="90,952  1510,952  1595,1212  5,1212"
              fill="url(#deck)"
            />
            <polygon
              points="90,952  1510,952  1595,1212  5,1212"
              fill="url(#deckSheen)"
            />
            <polygon
              points="5,1212  1595,1212  1568,1236  32,1236"
              fill="url(#deckFront)"
            />
            <line x1="94" y1="952" x2="1506" y2="952" stroke="rgba(255,255,255,0.12)" />
            <line x1="8" y1="1212.5" x2="1592" y2="1212.5" stroke="rgba(255,255,255,0.06)" />
          </g>

          {/* ---- keyboard ---- */}
          <g id="deck-keyboard">
            {/* Softened recess — reads as machined, not a separate panel.
                Slightly tapered to match deck foreshortening. */}
            <polygon
              points="316,974  1284,974  1310,1120  290,1120"
              fill="url(#kbWell)"
            />
            {(() => {
              /* Keyboard geometry, 5 rows × 14 cols.
                 Field bounds inside the well:
                   x: 358 → 1242  (884 wide)
                   y: 984 → 1116  (132 tall)
                 Per-key: 58 × 24 (aspect 2.42:1). Row gap 3, col gap 5. */
              const xL = 358;
              const xR = 1242;
              const yT = 984;
              const yB = 1116;
              const cols = 14;
              const rows = 5;
              const gapX = 5;
              const gapY = 3;
              const colW = (xR - xL - gapX * (cols - 1)) / cols; // 58
              const rowH = (yB - yT - gapY * (rows - 1)) / rows; // 24

              const nodes: React.ReactNode[] = [];

              for (let r = 0; r < 4; r++) {
                // Rows 2 (r=1) & 3 (r=2): wider outer keys — suggested
                // modifier / spacebar variation for visual plausibility.
                const wideOuter = r === 1 || r === 2;
                const y = yT + r * (rowH + gapY);
                if (!wideOuter) {
                  for (let c = 0; c < cols; c++) {
                    const x = xL + c * (colW + gapX);
                    nodes.push(renderKey(`k-${r}-${c}`, x, y, colW, rowH));
                  }
                } else {
                  const wideMul = 1.35;
                  const wideW = colW * wideMul;
                  const interiorCount = cols - 2;
                  const availableInterior =
                    xR - xL - 2 * wideW - gapX * (cols - 1);
                  const iw = availableInterior / interiorCount;
                  let cursor = xL;
                  nodes.push(renderKey(`k-${r}-l`, cursor, y, wideW, rowH));
                  cursor += wideW + gapX;
                  for (let c = 0; c < interiorCount; c++) {
                    nodes.push(renderKey(`k-${r}-i${c}`, cursor, y, iw, rowH));
                    cursor += iw + gapX;
                  }
                  nodes.push(renderKey(`k-${r}-r`, cursor, y, wideW, rowH));
                }
              }

              // Row 5 — suggested modifier / spacebar variation.
              const r = 4;
              const y = yT + r * (rowH + gapY);
              const groups = [
                { span: 1 },
                { span: 1 },
                { span: 1.3 },
                { span: 6 }, // spacebar
                { span: 1.3 },
                { span: 1 },
                { span: 1 },
                { span: 1 },
                { span: 1 },
              ];
              const totalSpan = groups.reduce((s, g) => s + g.span, 0);
              const gapsSum = gapX * (groups.length - 1);
              const availableW = xR - xL - gapsSum;
              let cursor = xL;
              groups.forEach((g, gi) => {
                const w = (g.span / totalSpan) * availableW;
                nodes.push(renderKey(`k-r5-${gi}`, cursor, y, w, rowH));
                cursor += w + gapX;
              });

              return nodes;
            })()}
          </g>

          {/* ---- trackpad — centred in the palm-rest region ---- */}
          <g id="deck-trackpad">
            <rect
              x="540"
              y="1121"
              width="520"
              height="80"
              rx="8"
              fill="url(#trackpad)"
            />
            {/* Top inset shadow — reads as recessed glass. */}
            <rect
              x="542"
              y="1123"
              width="516"
              height="4"
              rx="2"
              fill="url(#trackpadInset)"
            />
            {/* Bottom hairline highlight. */}
            <line
              x1="546"
              y1="1200.5"
              x2="1054"
              y2="1200.5"
              stroke="rgba(255,255,255,0.06)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * A single key — a rounded face with a very restrained top highlight.
 */
function renderKey(
  key: string,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="url(#keyFace)" />
      <rect
        x={x + 1.4}
        y={y + 0.7}
        width={w - 2.8}
        height={1.8}
        rx={0.9}
        fill="rgba(255,255,255,0.07)"
      />
    </g>
  );
}
