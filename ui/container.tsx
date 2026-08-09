import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  readable: "max-w-[var(--content-readable)]",
  standard: "max-w-[var(--content-standard)]",
  wide: "max-w-[var(--content-wide)]",
  cinematic: "max-w-[var(--content-cinematic)]",
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widths;
  as?: ElementType;
};

export function Container({
  children,
  className,
  width = "standard",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--page-gutter)]",
        widths[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
