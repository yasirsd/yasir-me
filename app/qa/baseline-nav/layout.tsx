/**
 * QA baseline+nav layout — same chrome as the (site) group, but scoped
 * to `/qa/baseline-nav` so it can be measured in isolation without
 * pulling in Reveal/pillar diagrams from the home page.
 */
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { MobileNav } from "@/components/layout/MobileNav";
import type { ReactNode } from "react";

export default function QaBaselineNavLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <FloatingNav />
      {children}
      <MobileNav />
    </>
  );
}
