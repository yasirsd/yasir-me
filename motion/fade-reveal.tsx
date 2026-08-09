"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionDurations, motionEasings } from "@/motion/tokens";
import { cn } from "@/lib/utils";

type FadeRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeReveal({
  children,
  className,
  delay = 0,
}: FadeRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reduceMotion
          ? motionDurations.micro
          : motionDurations.interface,
        ease: motionEasings.soft,
        delay,
      }}
    >
      {children}
    </m.div>
  );
}
