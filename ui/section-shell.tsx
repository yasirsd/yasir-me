import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/ui/container";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  width?: "readable" | "standard" | "wide" | "cinematic";
  ariaLabelledBy?: string;
};

export function SectionShell({
  id,
  children,
  className,
  containerClassName,
  width = "standard",
  ariaLabelledBy,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-[var(--section-space)]", className)}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
