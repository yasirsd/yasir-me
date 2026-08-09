/**
 * Verified résumé metrics only — do not invent additional claims.
 */
export type Metric = {
  id: string;
  value: string;
  label: string;
};

export const proofMetrics: readonly Metric[] = [
  {
    id: "years",
    value: "7.8",
    label: "Years Building Products",
  },
  {
    id: "workflows",
    value: "14+",
    label: "Connected Enterprise Workflows",
  },
  {
    id: "load",
    value: "30%",
    label: "Load-Time Improvement",
  },
  {
    id: "platforms",
    value: "Web + Mobile",
    label: "React / React Native",
  },
] as const;
