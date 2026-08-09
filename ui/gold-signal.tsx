import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Electric Gold signal language — micro highlights only.
 * Not for large fills, CTAs, or body text.
 */

export function GoldDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("gold-dot", className)}
      title="Gold signal"
    />
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("gold-rule", className)} />;
}

export function GoldMarker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("gold-marker type-technical", className)}>
      {children}
    </span>
  );
}

export function GoldHighlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-gold", className)}>{children}</span>
  );
}
