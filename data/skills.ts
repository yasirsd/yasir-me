/**
 * Skill catalogue — grouped by category. All capabilities come from the
 * résumé's TECHNICAL EXPERTISE section. No proficiency percentages.
 */

export type SkillCategoryId =
  | "ui-engineering"
  | "mobile"
  | "state-data"
  | "design"
  | "architecture"
  | "quality"
  | "cloud";

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  summary: string;
  capabilities: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ui-engineering",
    label: "UI Engineering",
    summary: "Component systems, routing, rendering, integration.",
    capabilities: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Angular",
      "Vue",
      "HTML5",
      "CSS3",
      "SCSS",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    summary: "Cross-platform iOS/Android with a web-shaped mind.",
    capabilities: ["React Native"],
  },
  {
    id: "state-data",
    label: "State & Data",
    summary: "Predictable data flow and API integration.",
    capabilities: [
      "Redux",
      "Redux Toolkit",
      "REST API integration",
      "Axios (custom instances, interceptors)",
      "gRPC",
    ],
  },
  {
    id: "design",
    label: "Design",
    summary: "Type, colour, layout and the systems around them.",
    capabilities: [
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "SCSS",
      "Typography",
      "Colour theory",
      "Layout",
      "UI patterns",
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    summary: "How components, teams and services fit together.",
    capabilities: [
      "Micro Frontends",
      "Event-Driven Architecture",
      "MVP",
      "Microservices integration",
      "MVC",
    ],
  },
  {
    id: "quality",
    label: "Quality",
    summary: "Accessibility, performance and rendering discipline.",
    capabilities: [
      "WCAG",
      "Web Accessibility",
      "Profiling",
      "Rendering Optimisation",
      "Core Web Vitals",
      "Test-driven Development",
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    summary: "Where the frontend meets the platform.",
    capabilities: [
      "AWS",
      "Azure",
      "Vercel",
      "Adobe Experience Manager (basics)",
      "WordPress",
      "Prismic",
    ],
  },
];
