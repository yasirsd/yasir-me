/**
 * Featured project catalogue. Each entry maps to a résumé-verified product.
 * The `visualKind` tag is used by ProjectFrame to render the correct
 * NDA-safe abstract UI composition (data table, map + timeline, invoice OCR,
 * tablet + POS, booking grid).
 */

export type ProjectCategory =
  | "Enterprise SaaS"
  | "Construction / Logistics"
  | "AI / Inventory"
  | "Restaurant / POS"
  | "Consumer / Booking";

export type ProjectVisualKind =
  | "data-grid"
  | "route-timeline"
  | "invoice-ocr"
  | "pos-tablet"
  | "booking-grid";

export type Project = {
  slug: string;
  number: string;
  title: string;
  company: string;
  client?: string;
  category: ProjectCategory;
  role: string;
  years: string;
  tagline: string;
  summary: string;
  stack: string[];
  visualKind: ProjectVisualKind;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "pepsico-gsat",
    number: "01",
    title: "PepsiCo GSAT",
    company: "Turing Global",
    client: "PepsiCo",
    category: "Enterprise SaaS",
    role: "Senior Software Engineer — Frontend",
    years: "2025 → Present",
    tagline: "Enterprise agricultural supply chain, 14+ interconnected modules.",
    summary:
      "Global Seed Allocation Tool for PepsiCo — managing potato seed allocation, multi-tier pricing (monthly / flat rate), size-based splits, real-time validation and cascading filters across international programs. Built with React 18, Redux Toolkit, Material UI and PepsiCo's internal design system on Okta-secured role-based access.",
    stack: [
      "React 18",
      "Redux Toolkit",
      "Material UI",
      "TypeScript",
      "Axios",
      "Okta",
    ],
    visualKind: "data-grid",
    featured: true,
  },
  {
    slug: "chummy-funding",
    number: "02",
    title: "Chummy Funding",
    company: "Caprus IT",
    client: "ProArch",
    category: "Construction / Logistics",
    role: "Software Engineer — Web + Mobile",
    years: "2025",
    tagline: "Construction logistics — dispatch through delivery, cash flow.",
    summary:
      "A construction logistics platform connecting hauliers and drivers with job sites — dispatch, tracking, invoicing, and integrated CF Status financing. Web portal for site owners, project managers and administrators; React Native mobile app for drivers to accept assignments, navigate sites and record deliveries.",
    stack: ["React", "React Native", "Material UI", "Axios", "TypeScript"],
    visualKind: "route-timeline",
    featured: true,
  },
  {
    slug: "flow-ai",
    number: "03",
    title: "Flow.ai",
    company: "Slickbit Technologies",
    category: "AI / Inventory",
    role: "Software Engineer — Web + Mobile",
    years: "2022 → 2025",
    tagline: "AI-powered inventory: OCR invoices, image counting, insights.",
    summary:
      "An intelligent inventory management system that minimises manual input through AI-powered automation — invoice digitisation, image-based inventory counting, and actionable insight generation. Web UI built in React with Material UI; iOS/Android in React Native.",
    stack: [
      "React",
      "React Native",
      "Material UI",
      "Axios",
      "AI/ML Integration",
    ],
    visualKind: "invoice-ocr",
    featured: true,
  },
  {
    slug: "moneris-go-appetit",
    number: "04",
    title: "Moneris Go Appetit",
    company: "Slickbit Technologies",
    client: "Moneris (Canada)",
    category: "Restaurant / POS",
    role: "Software Engineer — React Native",
    years: "2022 → 2025",
    tagline: "Restaurant operations — Tablet, KDS, POS.",
    summary:
      "A cross-platform iOS/Android suite for restaurant operations. Contributed three key modules in React Native: Tablet (menu + orders), KDS (kitchen display, real-time order status) and POS (order placement + payment).",
    stack: ["React Native", "JavaScript", "Axios"],
    visualKind: "pos-tablet",
    featured: false,
  },
  {
    slug: "playat",
    number: "05",
    title: "PlayAt",
    company: "Trangla",
    client: "Turpy Mobile Apps",
    category: "Consumer / Booking",
    role: "Frontend Engineer",
    years: "2019 → 2022",
    tagline: "Sports facility discovery and slot booking, Hyderabad.",
    summary:
      "A sports ground booking app for enthusiasts in Hyderabad — discover nearby facilities, instantly book available slots, and receive notifications about upcoming events at sports arenas.",
    stack: ["React", "JavaScript", "HTML", "CSS"],
    visualKind: "booking-grid",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
