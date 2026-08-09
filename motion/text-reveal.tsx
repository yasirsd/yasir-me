"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionDurations, motionEasings } from "@/motion/tokens";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "div";
  delay?: number;
};

export function TextReveal({
  children,
  className,
  as = "p",
  delay = 0,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = m[as];

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: reduceMotion
          ? motionDurations.micro
          : motionDurations.interface,
        ease: motionEasings.soft,
        delay,
      }}
    >
      {children}
    </Component>
  );
}
