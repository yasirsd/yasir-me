/**
 * Career timeline — dates, companies, clients, products, and highlights
 * all taken verbatim from the résumé. Nothing invented.
 */

export type ExperienceEntry = {
  slug: string;
  company: string;
  location: string;
  role: string;
  dateStart: string;
  dateEnd: string; // "Present" allowed
  client?: string;
  product?: {
    name: string;
    tagline: string;
    description: string;
  };
  highlights: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    slug: "turing-global",
    company: "Turing Global Pvt Ltd",
    location: "Hyderabad, India",
    role: "Senior Software Engineer",
    dateStart: "Sept 2025",
    dateEnd: "Present",
    client: "PepsiCo",
    product: {
      name: "GSAT (Global Seed Allocation Tool)",
      tagline: "Enterprise agricultural supply chain platform",
      description:
        "Enterprise agricultural supply chain platform for PepsiCo managing global potato seed allocation, multi-tier pricing strategies, and demand forecasting across international programs. Built with React 18, Redux Toolkit, Material UI and PepsiCo's internal design system, featuring complex data-driven tables, real-time validation, and Okta-secured role-based access.",
    },
    highlights: [
      "Developed dynamic and data-intensive UI components using React.js, Material UI, and the PepsiCo Design System for a global agricultural supply chain platform.",
      "Implemented complex pricing workflows with multi-tier rate calculations (Monthly/Flat Rate), size-based splits, real-time validation, and copy/distribute functionality across 14+ interconnected modules.",
      "Collaborated with the ProArch (UK) team to investigate and resolve production issues, ensuring seamless operations.",
      "Integrated RESTful APIs using Axios with custom hooks (useApiRequest), error handling interceptors, and data transformation pipelines to manage cascading filters and dynamic form submissions.",
    ],
    stack: [
      "React 18",
      "Redux Toolkit",
      "Material UI",
      "TypeScript",
      "Axios",
      "Okta",
      "PepsiCo Design System",
    ],
  },
  {
    slug: "caprus-it",
    company: "Caprus IT Pvt Ltd",
    location: "Hyderabad, India",
    role: "Software Engineer",
    dateStart: "May 2025",
    dateEnd: "Aug 2025",
    client: "ProArch",
    product: {
      name: "Chummy Funding",
      tagline: "Construction logistics platform (web + mobile)",
      description:
        "Chummy Funding is a comprehensive construction logistics platform that connects hauliers and drivers with job sites, managing the entire workflow from dispatch through delivery completion. It features a web portal for site owners, project managers and administrators to create jobs, track progress and oversee invoicing, and a mobile app for drivers to accept assignments, navigate sites and record deliveries. Integrated financial services — automated invoice generation, payment processing, and Chummy Funding's proprietary CF Status financing — streamline cash flow for construction projects.",
    },
    highlights: [
      "Developed interactive and responsive UI components using React.js and Material UI.",
      "Built cross-platform mobile applications for iOS and Android using React Native.",
      "Collaborated with the ProArch (UK) team to investigate and resolve production issues.",
      "Actively participated in sprint planning and bug prioritisation to align with business requirements.",
      "Integrated external APIs using Axios with custom instances and interceptors for optimised data handling.",
    ],
    stack: ["React", "React Native", "Material UI", "Axios", "TypeScript"],
  },
  {
    slug: "slickbit",
    company: "Slickbit Technologies",
    location: "Hyderabad, India",
    role: "Software Engineer",
    dateStart: "July 2022",
    dateEnd: "May 2025",
    product: {
      name: "Flow.ai + Moneris Go Appetit",
      tagline: "AI-powered inventory & restaurant operations",
      description:
        "Flow.ai is an intelligent inventory management system that minimises manual input through AI-powered automation — invoice digitisation, image-based inventory counting, and actionable insight generation. Moneris Go Appetit (MGA) is a cross-platform iOS/Android suite for restaurant operations spanning Tablet (menu + orders), KDS (kitchen display) and POS (order placement + payment).",
    },
    highlights: [
      "Developed interactive UI components using React.js; enhanced UX with Material UI.",
      "Built cross-platform mobile applications for iOS and Android using React Native.",
      "Integrated AI-powered invoice digitisation and inventory recognition for automated data processing.",
      "Implemented custom API handling with Axios, leveraging interceptors for optimised data retrieval.",
      "Contributed three key MGA modules (Tablet, KDS, POS) in React Native.",
      "Collaborated with the Moneris team (Canada) to resolve production issues.",
    ],
    stack: [
      "React",
      "React Native",
      "Material UI",
      "JavaScript",
      "Axios",
      "AI/ML Integration",
    ],
  },
  {
    slug: "trangla",
    company: "Trangla",
    location: "Hyderabad, India",
    role: "Frontend Engineer",
    dateStart: "Jan 2019",
    dateEnd: "July 2022",
    client: "Turpy Mobile Apps",
    product: {
      name: "PlayAt",
      tagline: "Sports facility booking (Hyderabad)",
      description:
        "PlayAt is a sports ground booking app designed for sports enthusiasts in Hyderabad. It lets users discover nearby sports facilities, instantly book available slots, and receive notifications about upcoming events at sports arenas.",
    },
    highlights: [
      "Developed and integrated the web UI into the React.js application.",
      "Collaborated with the team to design, build and maintain reusable front-end components using HTML, CSS, JavaScript and React.js.",
      "Worked closely with back-end developers to implement seamless UI integration.",
      "Assisted the design team in creating promotional banners for clients.",
      "Collaborated with WordPress developers to build websites using Beaver Builder and Elementor.",
    ],
    stack: ["React", "JavaScript", "HTML", "CSS", "WordPress"],
  },
];
