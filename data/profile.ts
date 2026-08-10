/**
 * Canonical profile facts. Everything here comes verbatim from Yasir's
 * résumé. No invented metrics, no invented copy.
 */

export const profile = {
  name: "Yasir Syed",
  role: "Senior Frontend Engineer",
  roleLong: "Senior Software Engineer (Frontend) | Frontend UI",
  location: "Hyderabad, India",
  locationShort: "Hyderabad, IN",
  email: "syedyasir1450@gmail.com",
  phone: "+91-8885627274",
  linkedin: "https://www.linkedin.com/in/yasirsyed",
  resumeUrl: "/resume/yasir-syed-resume.pdf",

  yearsExperience: "7.8",

  snapshotBio:
    "Senior Frontend Engineer with 7.8 years of experience building high-performance, accessible, and scalable web applications. Proficient in JavaScript, React.js, TypeScript, Next.js, React Native, and modern UI frameworks, with a strong focus on performance optimisation, accessibility (WCAG), and intuitive user experiences.",

  shortBio:
    "I build frontend systems where product thinking, performance, accessibility and engineering meet.",

  microBio:
    "Frontend systems for enterprise UI, mobile and AI-assisted products.",

  /** Rotating specialist labels — decorative. Reserved layout box. */
  specialisms: [
    "React",
    "TypeScript",
    "React Native",
    "Product UI",
    "Performance",
    "Accessibility",
    "Motion",
  ] as const,

  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Angular",
    "Vue",
    "Tailwind CSS",
    "Material UI",
    "Web Accessibility",
    "Core Web Vitals",
    "Micro Frontends",
    "Event-Driven Architecture",
    "AI/ML Integration",
  ],
} as const;

export type Profile = typeof profile;
