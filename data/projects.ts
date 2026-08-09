/**
 * Lightweight project seeds for later editorial case studies.
 * No confidential/NDA details. Screenshots deferred.
 */
export type ProjectStatus = "featured" | "supporting";

export type Project = {
  id: string;
  slug: string;
  title: string;
  clientOrCompany: string;
  status: ProjectStatus;
  summary: string;
  stack: readonly string[];
};

export const projects: readonly Project[] = [
  {
    id: "gsat",
    slug: "pepsico-gsat",
    title: "PepsiCo GSAT",
    clientOrCompany: "Turing / PepsiCo",
    status: "featured",
    summary:
      "Global seed allocation platform with multi-tier pricing, validation, and interconnected enterprise workflows.",
    stack: ["React", "TypeScript", "Redux Toolkit", "Material UI"],
  },
  {
    id: "chummy",
    slug: "chummy-funding",
    title: "Chummy Funding",
    clientOrCompany: "Caprus / ProArch",
    status: "featured",
    summary:
      "Construction logistics experience connecting site owners, admins, and drivers across web and mobile.",
    stack: ["React", "React Native", "Material UI"],
  },
  {
    id: "flow-ai",
    slug: "flow-ai",
    title: "Flow.ai",
    clientOrCompany: "Slickbit Technologies",
    status: "featured",
    summary:
      "AI-assisted inventory product focused on invoice digitization and image-driven counting workflows.",
    stack: ["React", "React Native", "Material UI"],
  },
  {
    id: "moneris",
    slug: "moneris-go-appetit",
    title: "Moneris Go Appetit",
    clientOrCompany: "Slickbit Technologies / Moneris",
    status: "supporting",
    summary:
      "Cross-platform restaurant operations suite spanning tablet ordering, KDS, and POS modules.",
    stack: ["React Native", "JavaScript"],
  },
] as const;
