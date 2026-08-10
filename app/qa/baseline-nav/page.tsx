/**
 * QA baseline + nav — /qa/baseline with the real optimized nav
 * (FloatingNav + MobileNav) added back. Everything else is identical.
 *
 * Purpose: measure the incremental JS + TBT cost of adding the nav
 * (LazyMotion(domMax) + shared-layout pill + scroll-direction reveal)
 * on top of the framework/fonts/hero baseline.
 *
 * The nav is already rendered by app/layout.tsx globally, so this page
 * is intentionally the same body as /qa/baseline — the difference is
 * that this route deliberately keeps the global nav; /qa/baseline
 * overrides it.
 */
import Image from "next/image";
import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { portraitBlurDataURL } from "@/components/hero/portraitBlur";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "QA baseline + nav",
};

export default function QaBaselineNav() {
  return (
    <div className="chapter-bg-deep min-h-[100svh]" data-tone="dark">
      <div className="container-shell pt-8">
        <p className="eyebrow text-[color:var(--text-muted)]">{profile.name}</p>
      </div>
      <div className="container-shell pt-12 md:pt-16">
        <div className="grid grid-cols-12 items-stretch gap-4 lg:gap-8">
          <div className="relative col-span-7 flex items-end justify-end">
            <figure
              className="relative w-[min(58vh,460px)]"
              style={{ aspectRatio: "6 / 7" }}
            >
              <Image
                src="/images/portrait/yasir-cutout.png"
                alt="Portrait of Yasir Syed"
                width={560}
                height={653}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1440px) 520px, 60vw"
                quality={82}
                placeholder="blur"
                blurDataURL={portraitBlurDataURL}
                className="h-auto w-full max-w-full object-contain"
              />
            </figure>
          </div>
          <div className="col-span-5 flex flex-col justify-center gap-6 py-8">
            <p className="eyebrow text-[color:var(--yellow)]">
              Senior Frontend Engineer
            </p>
            <p
              className="font-semibold leading-[0.98] tracking-[-0.025em] text-[color:var(--text)]"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
            >
              Building interfaces people <span className="text-[color:var(--red)]">feel</span>.
            </p>
            <p
              className="max-w-md text-[color:var(--text-muted)]"
              style={{ fontSize: "var(--fs-lead)", lineHeight: 1.45 }}
            >
              7.8 years building frontend products across enterprise web and
              mobile, with React, TypeScript and React Native at the core.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
