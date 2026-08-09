import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionLabel({ children, className, id }: SectionLabelProps) {
  return (
    <p
      id={id}
      className={cn(
        "type-technical text-foreground-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}
