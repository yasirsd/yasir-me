import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SURFACE ≠ CARD
 * Surfaces communicate grouping / elevation when needed.
 * Prefer typography + whitespace when a container adds nothing.
 */
type SurfaceProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "strong" | "quiet";
  edge?: "none" | "hairline" | "specular";
};

const tones = {
  quiet: "bg-transparent",
  default: "bg-surface/80",
  elevated: "bg-background-elevated",
  strong: "bg-surface-strong",
} as const;

const edges = {
  none: "edge-none",
  hairline: "edge-hairline border",
  specular: "edge-specular border border-transparent",
} as const;

export function Surface({
  children,
  className,
  tone = "elevated",
  edge = "specular",
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-surface)] p-6 md:p-8",
        tones[tone],
        edges[edge],
        className,
      )}
    >
      {children}
    </div>
  );
}
