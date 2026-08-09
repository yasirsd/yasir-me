import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EditorialTextProps = {
  children: ReactNode;
  className?: string;
  size?: "large" | "body" | "small";
  tone?: "primary" | "secondary" | "tertiary";
  as?: "p" | "div" | "span";
};

const sizeClass = {
  large: "type-body-large",
  body: "type-body",
  small: "type-body-small",
} as const;

const toneClass = {
  primary: "text-foreground",
  secondary: "text-foreground-secondary",
  tertiary: "text-foreground-tertiary",
} as const;

export function EditorialText({
  children,
  className,
  size = "body",
  tone = "secondary",
  as: Tag = "p",
}: EditorialTextProps) {
  return (
    <Tag
      className={cn(
        sizeClass[size],
        toneClass[tone],
        "max-w-[var(--content-readable)] text-pretty",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
