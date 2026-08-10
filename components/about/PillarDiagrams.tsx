/**
 * Tiny editorial diagrams anchored to each About pillar. Deliberately
 * quiet — engineering annotations in the margin of an essay, not
 * dashboard widgets. All decorative, marked aria-hidden; the pillar
 * heading/body carries the actual meaning.
 */

const RAIL = "rgb(255 255 255 / 0.18)";
const NODE = "rgb(255 255 255 / 0.55)";
const NODE_FILL = "rgb(255 255 255 / 0.06)";
const RED = "#EF233C";
const YELLOW = "#FDC500";

// Enlarged ~1.75× from the A.1 baseline — SVG scales its viewBox to
// the container height, so every glyph/text within the diagram grows
// proportionally without touching per-diagram code.
const commonProps = {
  "aria-hidden": true as const,
  className: "mt-5 h-14 w-full text-[color:var(--text-muted)]",
};

/** Product UI  →  interaction · state · interface */
export function ProductUIDiagram() {
  const labels = ["INTERACTION", "STATE", "INTERFACE"];
  const xs = [22, 132, 240];
  return (
    <svg viewBox="0 0 280 44" {...commonProps} role="img">
      <title>Flow: interaction, state, interface.</title>
      {/* Rail */}
      <line x1={26} y1={22} x2={244} y2={22} stroke={RAIL} strokeWidth={1} />
      {/* Yellow signal moving along the rail (static, positional) */}
      <circle cx={80} cy={22} r={2.5} fill={YELLOW} />
      {/* Nodes */}
      {xs.map((x, i) => (
        <g key={labels[i]}>
          <circle cx={x} cy={22} r={5.5} fill={NODE_FILL} stroke={NODE} strokeWidth={1} />
          {i === 2 ? <circle cx={x} cy={22} r={2.5} fill={RED} /> : null}
        </g>
      ))}
      {/* Labels */}
      {xs.map((x, i) => (
        <text
          key={`t-${labels[i]}`}
          x={x}
          y={40}
          fontSize={6}
          fontFamily="var(--font-mono)"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="1.4"
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}

/** Architecture  →  UI · state · API · domain */
export function ArchitectureDiagram() {
  const labels = ["UI", "STATE", "API", "DOMAIN"];
  const xs = [24, 100, 176, 252];
  return (
    <svg viewBox="0 0 280 44" {...commonProps} role="img">
      <title>Flow: UI, state, API, domain.</title>
      {/* Rail sections with tiny arrow chevrons in between */}
      {xs.slice(0, -1).map((x, i) => (
        <g key={`seg-${i}`}>
          <line
            x1={x + 8}
            y1={22}
            x2={(xs[i + 1] ?? 0) - 8}
            y2={22}
            stroke={RAIL}
            strokeWidth={1}
          />
          <path
            d={`M ${(xs[i + 1] ?? 0) - 10} 19 L ${(xs[i + 1] ?? 0) - 8} 22 L ${(xs[i + 1] ?? 0) - 10} 25`}
            fill="none"
            stroke={NODE}
            strokeWidth={1}
            strokeLinecap="round"
          />
        </g>
      ))}
      {xs.map((x, i) => (
        <rect
          key={`n-${labels[i]}`}
          x={x - 6}
          y={16}
          width={12}
          height={12}
          rx={2}
          fill={NODE_FILL}
          stroke={NODE}
          strokeWidth={1}
        />
      ))}
      {xs.map((x, i) => (
        <text
          key={`t-${labels[i]}`}
          x={x}
          y={40}
          fontSize={6}
          fontFamily="var(--font-mono)"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="1.4"
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}

/**
 * Performance  →  before / after bar comparison — the résumé's 30% load
 * time reduction, shown at the annotation scale.
 */
export function PerformanceDiagram() {
  return (
    <svg viewBox="0 0 280 44" {...commonProps} role="img">
      <title>Before and after: 30% reduction in load time.</title>
      {/* Before — full-length subdued rail */}
      <rect x={30} y={12} width={220} height={5} rx={2.5} fill={RAIL} />
      <text
        x={0}
        y={16}
        fontSize={6}
        fontFamily="var(--font-mono)"
        fill="currentColor"
        letterSpacing="1.4"
      >
        BEFORE
      </text>

      {/* After — 70% length, yellow (positive signal) */}
      <rect x={30} y={26} width={154} height={5} rx={2.5} fill={YELLOW} />
      <text
        x={0}
        y={30}
        fontSize={6}
        fontFamily="var(--font-mono)"
        fill="currentColor"
        letterSpacing="1.4"
      >
        AFTER
      </text>

      {/* -30% callout */}
      <text
        x={196}
        y={30}
        fontSize={7}
        fontWeight={700}
        fontFamily="var(--font-mono)"
        fill={RED}
        letterSpacing="1.2"
      >
        −30%
      </text>
    </svg>
  );
}

/** Accessibility  →  keyboard · focus · WCAG signals */
export function AccessibilityDiagram() {
  const labels = ["KEYBOARD", "FOCUS", "WCAG"];
  const xs = [40, 140, 232];
  return (
    <svg viewBox="0 0 280 44" {...commonProps} role="img">
      <title>Keyboard, focus, WCAG.</title>
      {/* Keyboard key glyph */}
      <g transform="translate(28 16)">
        <rect x={0} y={0} width={16} height={12} rx={2} fill={NODE_FILL} stroke={NODE} />
        <line x1={4} y1={6} x2={12} y2={6} stroke={NODE} strokeWidth={1} />
      </g>
      {/* Focus ring glyph */}
      <g transform="translate(132 16)">
        <rect x={0} y={0} width={16} height={12} rx={3} fill="none" stroke={YELLOW} strokeWidth={1.4} />
        <rect x={3} y={3} width={10} height={6} rx={1.5} fill={NODE_FILL} stroke={NODE} strokeWidth={0.6} />
      </g>
      {/* WCAG contrast glyph — half fill */}
      <g transform="translate(224 16)">
        <circle cx={8} cy={6} r={6} fill="none" stroke={NODE} strokeWidth={1} />
        <path d="M 8 0 A 6 6 0 0 1 8 12 Z" fill={NODE} />
      </g>
      {/* Labels */}
      {xs.map((x, i) => (
        <text
          key={labels[i]}
          x={x}
          y={40}
          fontSize={6}
          fontFamily="var(--font-mono)"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="1.4"
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}

export const pillarDiagrams = {
  "01": ProductUIDiagram,
  "02": ArchitectureDiagram,
  "03": PerformanceDiagram,
  "04": AccessibilityDiagram,
} as const;
