export const motionDurations = {
  micro: 0.15,
  interface: 0.42,
  cinematic: 0.85,
} as const;

/** Slightly damped curves — confident, not bouncy */
export const motionEasings = {
  standard: [0.22, 1, 0.36, 1] as const,
  emphasized: [0.2, 0.85, 0.25, 1] as const,
  soft: [0.33, 0.1, 0.2, 1] as const,
};

export type MotionDuration = keyof typeof motionDurations;
