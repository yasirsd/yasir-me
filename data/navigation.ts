export type NavItem = {
  id: string;
  label: string;
  href: string;
  /** If true, this item is a section anchor within the current page. */
  section?: boolean;
};

export const primaryNav: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero", section: true },
  { id: "work", label: "Work", href: "#work", section: true },
  { id: "experience", label: "Experience", href: "#experience", section: true },
  { id: "skills", label: "Skills", href: "#skills", section: true },
  { id: "chat", label: "Ask", href: "#chat", section: true },
  { id: "contact", label: "Contact", href: "#contact", section: true },
];

/** Bottom mobile bar — no more than 5. */
export const mobileNav: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero", section: true },
  { id: "work", label: "Work", href: "#work", section: true },
  { id: "skills", label: "Skills", href: "#skills", section: true },
  { id: "chat", label: "Ask", href: "#chat", section: true },
  { id: "contact", label: "Contact", href: "#contact", section: true },
];
