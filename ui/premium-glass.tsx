import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassStrength = "soft" | "medium" | "strong";

type PremiumGlassProps = {
  children: ReactNode;
  className?: string;
  strength?: GlassStrength;
  as?: "div" | "section" | "aside";
};

/**
 * Liquid-glass material levels.
 * Soft = quiet editorial veil · Medium = interactive · Strong = nav / transient UI
 */
export function PremiumGlass({
  children,
  className,
  strength = "medium",
  as: Tag = "div",
}: PremiumGlassProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-[var(--radius-surface)] p-6 md:p-8",
        strength === "soft" && "glass-soft",
        strength === "medium" && "glass-medium",
        strength === "strong" && "glass-strong",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
