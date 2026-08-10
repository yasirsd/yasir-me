import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";
type Background = "deep" | "raised" | "surface" | "elev";
type Padding = "sm" | "md" | "lg" | "xl";

interface SectionProps {
  id?: string;
  as?: "section" | "div" | "article";
  tone?: Tone;
  background?: Background;
  padding?: Padding;
  className?: string;
  children: ReactNode;
  /**
   * Semantic label announced to assistive tech — set on the sectioning
   * element via `aria-label`. Prefer this over duplicating headings.
   */
  ariaLabel?: string;
}

const PAD: Record<Padding, string> = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const BG: Record<Background, string> = {
  deep: "chapter-bg-deep",
  raised: "chapter-bg-raised",
  surface: "chapter-bg-surface",
  elev: "chapter-bg-elev",
};

/**
 * Server component. The chapter shell.
 *
 * - `tone` sets `data-tone` on the root, which cascades CSS variables:
 *   the palette flips (bg, text, borders) and the focus ring adapts
 *   (yellow on dark, red on light).
 * - `background` picks a chapter background tint within the current tone.
 * - `padding` controls vertical rhythm.
 */
export function Section({
  id,
  as: As = "section",
  tone = "dark",
  background = "deep",
  padding = "lg",
  className,
  ariaLabel,
  children,
}: SectionProps) {
  return (
    <As
      id={id}
      aria-label={ariaLabel}
      data-tone={tone}
      className={cn("relative isolate w-full", PAD[padding], BG[background], className)}
    >
      {children}
    </As>
  );
}
