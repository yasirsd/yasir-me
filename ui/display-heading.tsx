import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DisplayHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "xl" | "display" | "h1" | "h2" | "h3";
  id?: string;
};

const sizeClass = {
  xl: "type-display-xl",
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
} as const;

export function DisplayHeading({
  children,
  className,
  as,
  size = "display",
  id,
}: DisplayHeadingProps) {
  const Tag = (as ?? (size === "h2" || size === "h3" ? size : "h1")) as ElementType;

  return (
    <Tag id={id} className={cn(sizeClass[size], "text-balance", className)}>
      {children}
    </Tag>
  );
}
