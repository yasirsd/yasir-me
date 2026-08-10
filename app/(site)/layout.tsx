/**
 * Site layout — wraps the marketing home (and later case-study routes)
 * with the persistent chrome (ScrollProgress + FloatingNav + MobileNav).
 * Everything else (fonts, metadata, skip link, main) lives on the root
 * layout so `/qa/baseline*` can opt out of the chrome for measurement.
 */
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { MobileNav } from "@/components/layout/MobileNav";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <FloatingNav />
      {children}
      <MobileNav />
    </>
  );
}
