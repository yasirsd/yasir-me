/**
 * Motion tokens — every animation in the site pulls from these values.
 * Never define ad-hoc durations or easings in components.
 */

import type { Transition } from "motion/react";

export const durations = {
  fast: 0.18,
  base: 0.32,
  slow: 0.65,
  cinematic: 1.0,
} as const;

/** Standard easing — Apple-flavoured ease-out. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Neutral spring for UI motion. */
export const spring = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 1,
} satisfies Transition;

/** Softer spring for elements entering the viewport. */
export const enterSpring = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 1,
} satisfies Transition;

/** Standard reveal transition (fade + rise). */
export const revealTransition: Transition = {
  duration: durations.slow,
  ease: [0.22, 1, 0.36, 1],
};

/** Standard hero-beat transition. */
export const heroBeat: Transition = {
  duration: durations.slow,
  ease: [0.22, 1, 0.36, 1],
};

/** Stagger children by this many seconds. */
export const stagger = {
  fast: 0.04,
  base: 0.07,
  slow: 0.12,
} as const;
