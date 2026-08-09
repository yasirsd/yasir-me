"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionDurations, motionEasings } from "@/motion/tokens";
import { cn } from "@/lib/utils";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.07,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion
              ? motionDurations.micro
              : motionDurations.interface,
            ease: motionEasings.soft,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
