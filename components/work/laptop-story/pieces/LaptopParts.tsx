/**
 * Shared JSX fragments for the approved B0.2 laptop.
 *
 * The four physical assemblies (grounding, deck, lid-front, lid-back)
 * are exported as JSX so that:
 *
 *   • LaptopFrame — the static composition used at /qa/laptop —
 *     renders them together inside ONE SVG.
 *
 *   • LaptopStory — the animated composition used at /qa/laptop-motion —
 *     renders each in its OWN SVG stacked inside a CSS-3D perspective
 *     wrapper, so the lid can rotate as a rigid body without SVG-group
 *     3D-transform inconsistencies between browsers.
 *
 * Nothing about the approved geometry changes. Every coordinate is
 * identical to the B0.2 LaptopFrame source. Only the arrangement of
 * <g> containers is split across multiple SVGs.
 */

import type { ReactNode, SVGProps } from "react";

// ---------------------------------------------------------------------------
// Shared <defs> — split by which assembly needs them so each piece SVG can
// carry only what it renders (keeps every piece self-contained and hoistable).
// ---------------------------------------------------------------------------

export function GroundingDefs() {
  return (
    <defs>
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
    </defs>
  );
}

export function DeckDefs() {
  return (
    <defs>
      <linearGradient id="hinge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a0a0c" />
        <stop offset="50%" stopColor="#1c1c22" />
        <stop offset="100%" stopColor="#0a0a0c" />
      </linearGradient>
      <linearGradient id="hingeShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
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
      <linearGradient id="kbWell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
        <stop offset="45%" stopColor="rgba(0,0,0,0.12)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
      </linearGradient>
      <linearGradient id="keyFace" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e1e24" />
        <stop offset="55%" stopColor="#17171c" />
        <stop offset="100%" stopColor="#101015" />
      </linearGradient>
      <linearGradient id="trackpad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#33333a" />
        <stop offset="100%" stopColor="#25252c" />
      </linearGradient>
      <linearGradient id="trackpadInset" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,0,0,0.65)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
    </defs>
  );
}

export function LidDefs() {
  return (
    <defs>
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
      <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#08080a" />
        <stop offset="100%" stopColor="#040405" />
      </linearGradient>
      <linearGradient id="screen" x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="#0d0d12" />
        <stop offset="50%" stopColor="#08080c" />
        <stop offset="100%" stopColor="#05050a" />
      </linearGradient>
      <linearGradient id="gloss" x1="0" y1="0" x2="0.55" y2="1.1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
        <stop offset="35%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <clipPath id="screenClip">
        <rect x="120" y="76" width="1360" height="816" rx="4" />
      </clipPath>
    </defs>
  );
}

// ---------------------------------------------------------------------------
// Assembly bodies. Each is a JSX fragment of shapes at the approved B0.2
// coordinates. Nothing here changed from B0.2.
// ---------------------------------------------------------------------------

export function GroundingBody() {
  return (
    <g id="grounding">
      <ellipse cx="260" cy="1240" rx="560" ry="180" fill="url(#ambientRed)" />
      <ellipse cx="1340" cy="1240" rx="560" ry="180" fill="url(#ambientYellow)" />
      <ellipse cx="800" cy="1270" rx="820" ry="32" fill="url(#contact)" />
    </g>
  );
}

export function DeckBody() {
  return (
    <g id="deck">
      <g id="deck-shell">
        <polygon points="90,952  1510,952  1595,1212  5,1212" fill="url(#deck)" />
        <polygon points="90,952  1510,952  1595,1212  5,1212" fill="url(#deckSheen)" />
        <polygon points="5,1212  1595,1212  1568,1236  32,1236" fill="url(#deckFront)" />
        <line x1="94" y1="952" x2="1506" y2="952" stroke="rgba(255,255,255,0.12)" />
        <line x1="8" y1="1212.5" x2="1592" y2="1212.5" stroke="rgba(255,255,255,0.06)" />
      </g>
      <g id="hinge">
        <rect x="82" y="944" width="1436" height="8" fill="url(#hinge)" />
        <rect x="90" y="952" width="1420" height="16" fill="url(#hingeShadow)" />
      </g>
      <g id="deck-keyboard">
        <polygon
          points="316,974  1284,974  1310,1120  290,1120"
          fill="url(#kbWell)"
        />
        {renderKeyboardKeys()}
      </g>
      <g id="deck-trackpad">
        <rect x="540" y="1121" width="520" height="80" rx="8" fill="url(#trackpad)" />
        <rect x="542" y="1123" width="516" height="4" rx="2" fill="url(#trackpadInset)" />
        <line x1="546" y1="1200.5" x2="1054" y2="1200.5" stroke="rgba(255,255,255,0.06)" />
      </g>
    </g>
  );
}

/**
 * The lid FRONT — screen + bezel + shell. Rendered as-is when the lid is
 * open; hidden by backface-visibility when the container's rotateX crosses
 * ~90° toward closed. Accepts optional `screenContent` slotted into the
 * screen aperture (B2 will use this).
 */
export function LidFrontBody({
  screenContent,
  screenTint,
  screenLightOpacity = 0,
}: {
  screenContent?: ReactNode;
  /** Optional overlay above the screen surface to imply a powered-on
   *  state during the screen-wake segment. Kept restrained. */
  screenTint?: string;
  /** Opacity for the screen tint. Driven by scroll progress in the
   *  animated composition; ignored (0) in the static composition. */
  screenLightOpacity?: number;
}) {
  return (
    <g id="lid-front">
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
        {screenTint ? (
          <rect
            x="120"
            y="76"
            width="1360"
            height="816"
            rx="4"
            fill={screenTint}
            opacity={screenLightOpacity}
          />
        ) : null}
        {screenContent ? (
          <g id="screen-content" clipPath="url(#screenClip)">
            {screenContent}
          </g>
        ) : null}
      </g>
    </g>
  );
}

/**
 * The lid BACK — the exterior aluminium face seen when the laptop is
 * mostly closed. Deliberately minimal: shell material + subtle edge
 * highlight, no logo, no brand marks. Sized/rounded identically to the
 * lid-shell so the silhouette matches from any angle.
 */
export function LidBackBody() {
  return (
    <g id="lid-back">
      <rect x="80" y="40" width="1440" height="900" rx="22" fill="url(#alu)" />
      <rect x="80" y="40" width="1440" height="900" rx="22" fill="url(#aluSheen)" />
      {/* The lid back gets the same specular top edge as the front so
          when it's face-up (laptop closed) the top edge still catches light. */}
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
  );
}

// ---------------------------------------------------------------------------
// Full piece SVGs — used by LaptopStory to stack the assemblies in a
// perspective wrapper.
// ---------------------------------------------------------------------------

const VIEWBOX = "0 0 1600 1300";
const SVG_STYLE = {
  display: "block",
  width: "100%",
  height: "100%",
  position: "absolute" as const,
  inset: 0,
  overflow: "visible" as const,
};

export function GroundingSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={VIEWBOX} style={SVG_STYLE} aria-hidden {...props}>
      <GroundingDefs />
      <GroundingBody />
    </svg>
  );
}

export function DeckSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={VIEWBOX} style={SVG_STYLE} aria-hidden {...props}>
      <DeckDefs />
      <DeckBody />
    </svg>
  );
}

export function LidFrontSVG({
  screenContent,
  screenTint,
  screenLightOpacity,
  ...props
}: SVGProps<SVGSVGElement> & {
  screenContent?: ReactNode;
  screenTint?: string;
  screenLightOpacity?: number;
}) {
  return (
    <svg viewBox={VIEWBOX} style={SVG_STYLE} aria-hidden {...props}>
      <LidDefs />
      <LidFrontBody
        {...(screenContent !== undefined ? { screenContent } : {})}
        {...(screenTint !== undefined ? { screenTint } : {})}
        {...(screenLightOpacity !== undefined ? { screenLightOpacity } : {})}
      />
    </svg>
  );
}

export function LidBackSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={VIEWBOX} style={SVG_STYLE} aria-hidden {...props}>
      <LidDefs />
      <LidBackBody />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Keyboard renderer — extracted from B0.2 without modification.
// ---------------------------------------------------------------------------

function renderKeyboardKeys(): ReactNode[] {
  const xL = 358;
  const xR = 1242;
  const yT = 984;
  const yB = 1116;
  const cols = 14;
  const rows = 5;
  const gapX = 5;
  const gapY = 3;
  const colW = (xR - xL - gapX * (cols - 1)) / cols;
  const rowH = (yB - yT - gapY * (rows - 1)) / rows;

  const nodes: ReactNode[] = [];

  for (let r = 0; r < 4; r++) {
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
      const availableInterior = xR - xL - 2 * wideW - gapX * (cols - 1);
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

  const r = 4;
  const y = yT + r * (rowH + gapY);
  const groups = [
    { span: 1 },
    { span: 1 },
    { span: 1.3 },
    { span: 6 },
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
}

function renderKey(
  key: string,
  x: number,
  y: number,
  w: number,
  h: number,
): ReactNode {
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
