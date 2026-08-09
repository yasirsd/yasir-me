import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "signal" | "gold";
};

const tones = {
  neutral: "border-border bg-surface text-foreground-secondary",
  signal: "border-[rgb(239_35_60_/_0.35)] bg-signal-soft text-foreground",
  gold: "border-[rgb(253_197_0_/_0.35)] bg-gold-soft text-foreground",
} as const;

export function Tag({ children, className, tone = "neutral" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-12)] border px-2.5 py-1 type-technical",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
