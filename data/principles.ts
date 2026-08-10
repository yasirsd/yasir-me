/**
 * "I don't just build screens." — four editorial pillars anchoring the
 * About section. Wording is my own; the substance is grounded in the
 * résumé (performance = 30% load-time reduction; accessibility = WCAG;
 * architecture = micro-frontends + event-driven; product UI = enterprise
 * data-dense workflows).
 */

export type Principle = {
  number: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Product UI",
    body: "Ship interfaces that hold up under real data, real people and real workflows — from PepsiCo pricing tables to construction dispatch to restaurant POS.",
  },
  {
    number: "02",
    title: "Architecture",
    body: "Micro frontends, event-driven boundaries and API layers that keep a UI honest as it grows. Componentised for reuse, not for its own sake.",
  },
  {
    number: "03",
    title: "Performance",
    body: "Profile before optimising, then optimise where it matters — rendering, network, hydration. One measurable win: 30% reduction in load time.",
  },
  {
    number: "04",
    title: "Accessibility",
    body: "WCAG-conformant patterns, keyboard-first interaction, focus that stays visible on glass and in light. Accessibility as engineering, not decoration.",
  },
];
