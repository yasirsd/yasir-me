/**
 * Employment chronology from the résumé.
 * Caprus client line said "Present" while employment ended Aug 2025 —
 * we publish employment dates only until client dates are confirmed.
 */
export type CareerRole = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  product?: string;
  contribution: string;
  notes?: string;
};

export const careerTimeline: readonly CareerRole[] = [
  {
    id: "turing",
    company: "Turing",
    role: "Senior Software Engineer",
    start: "2025-09",
    end: "Present",
    location: "Hyderabad, India",
    product: "PepsiCo GSAT",
    contribution:
      "Enterprise agricultural supply-chain UI with complex pricing workflows across 14+ interconnected modules.",
  },
  {
    id: "caprus",
    company: "Caprus IT",
    role: "Software Engineer",
    start: "2025-05",
    end: "2025-08",
    location: "Hyderabad, India",
    product: "Chummy Funding (ProArch)",
    contribution:
      "Web and React Native interfaces for construction logistics spanning dispatch through delivery.",
    notes:
      "Résumé client line listed ProArch as Present; employment chronology used until confirmed.",
  },
  {
    id: "slickbit",
    company: "Slickbit Technologies",
    role: "Software Engineer",
    start: "2022-07",
    end: "2025-05",
    location: "Hyderabad, India",
    product: "Flow.ai / Moneris Go Appetit",
    contribution:
      "AI-assisted inventory interfaces and cross-platform restaurant operations apps.",
  },
  {
    id: "trangla",
    company: "Trangla",
    role: "Frontend Engineer",
    start: "2019-01",
    end: "2022-07",
    location: "Hyderabad, India",
    product: "PlayAt",
    contribution:
      "React web UI for sports-ground discovery, booking, and event notifications.",
  },
] as const;
