import { Section } from "@/components/layout/Section";
import { profile } from "@/data/profile";
import { HeroPortrait } from "./HeroPortrait";
import { HeroBackType } from "./HeroTypography";
import { HeroMeta } from "./HeroMeta";
import { HeroChips } from "./HeroChips";
import { MapPin } from "lucide-react";

/**
 * Hero — signature moment #1.
 *
 * DESKTOP:
 *   The composition fills one 100svh viewport. Nothing important sits
 *   below the fold at 1440 × ~800. Three z-planes plus a right-side
 *   meta rail:
 *     • back (z=0):  HeroBackType — FRONTEND / ENGINEER huge display
 *     • middle (z=10): the cutout portrait (transparent PNG, so the
 *                      subject literally interrupts the letters where
 *                      they overlap)
 *     • ambient (z=-10): the scene lighting inside HeroPortrait
 *     • right rail (z=30): eyebrow, big name, role, tagline, CTAs
 *
 * MOBILE (art-directed, not scaled):
 *   YASIR / SYED wordmark, an immediate positioning strip
 *   (Senior Frontend Engineer · 7.8 yrs · Hyderabad), portrait,
 *   chips, tagline, CTAs. Positioning is visible on the first fold.
 */
export function Hero() {
  return (
    <Section
      id="hero"
      as="section"
      tone="dark"
      background="deep"
      padding="sm"
      ariaLabel={`${profile.name} — ${profile.role}`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Single semantic H1 for screen readers. */}
      <h1 className="sr-only">
        {profile.name} — {profile.role}. {profile.snapshotBio}
      </h1>

      {/* Eyebrow strip — small identity label on the left. The right-column
          eyebrow already carries the role so no second string on the right. */}
      <div className="container-shell relative z-30 pt-6 md:pt-8">
        <p className="eyebrow text-[color:var(--text-muted)]">{profile.name}</p>
      </div>

      {/* ==================== DESKTOP ==================== */}
      <div className="container-shell relative hidden flex-1 md:flex">
        <div className="relative grid w-full grid-cols-12 items-stretch gap-4 lg:gap-8">
          {/* Left / centre column — layered composition */}
          <div className="relative col-span-7 flex items-center justify-center">
            <div className="relative w-full" style={{ minHeight: "min(72svh, 660px)" }}>
              <HeroBackType />
              {/* Portrait sits slightly right of centre so the display
                  text is legible on the left and the portrait pushes into
                  the ENGINEER line on the right. */}
              <div className="absolute inset-y-0 right-[6%] flex items-end justify-end lg:right-[10%]">
                <HeroPortrait
                  className="w-[min(58vh,460px)]"
                  size={560}
                  fadeBottom={false}
                />
              </div>
            </div>
          </div>

          {/* Right rail — the professional voice */}
          <div className="relative z-30 col-span-5 flex flex-col justify-center gap-6 py-8">
            {/* Status pill */}
            <div className="mat-b inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium text-[color:var(--text-muted)]">
              <MapPin className="h-3.5 w-3.5 text-[color:var(--yellow)]" aria-hidden />
              <span>{profile.location}</span>
              <span className="mx-1 h-3 w-px bg-[color:var(--border-strong)]" aria-hidden />
              <span className="font-mono uppercase tracking-[0.14em] text-[10px]">
                {profile.yearsExperience} yrs
              </span>
            </div>

            {/* Big role statement — the piece a recruiter reads first */}
            <div>
              <p className="eyebrow mb-3 text-[color:var(--yellow)]">
                Senior Frontend Engineer
              </p>
              <p
                className="font-semibold leading-[0.98] tracking-[-0.025em] text-[color:var(--text)]"
                style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
              >
                Building interfaces
                <br />
                people <span className="text-[color:var(--red)]">feel</span>.
              </p>
              <p
                className="mt-4 max-w-md text-[color:var(--text-muted)]"
                style={{ fontSize: "var(--fs-lead)", lineHeight: 1.45 }}
              >
                7.8 years building frontend products across enterprise web and
                mobile, with React, TypeScript and React Native at the core.
              </p>
            </div>

            <HeroChips />

            <HeroMeta />
          </div>
        </div>
      </div>

      {/* ==================== MOBILE ==================== */}
      <div className="container-shell relative flex flex-1 flex-col md:hidden">
        {/* Big stacked wordmark */}
        <div
          aria-hidden
          className="relative z-10 mt-4 text-left font-semibold leading-[0.86] tracking-[-0.03em] text-[color:var(--text)]"
          style={{ fontSize: "clamp(3.5rem, 22vw, 6.5rem)" }}
        >
          <div>YASIR</div>
          <div className="text-[color:var(--red)]">SYED</div>
        </div>

        {/* Immediate positioning line — visible on the first fold. */}
        <div className="relative z-10 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[color:var(--text-muted)]">
          <span className="eyebrow text-[color:var(--yellow)]">
            Senior Frontend Engineer
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
          >
            {profile.yearsExperience} yrs · Hyderabad
          </span>
        </div>

        {/* Portrait — subject-only, sits inside the scene */}
        <div className="relative mt-4">
          <HeroPortrait className="w-full max-w-[420px]" size={420} />
        </div>

        {/* Below the portrait: tagline + chips + CTAs */}
        <div className="relative z-10 mt-4 flex flex-col items-start gap-4">
          <p
            className="text-balance text-[color:var(--text-muted)]"
            style={{ fontSize: "var(--fs-lead)", lineHeight: "var(--lh-lead)" }}
          >
            Building interfaces people{" "}
            <span className="text-[color:var(--text)]">feel</span> — from
            PepsiCo pricing tables to construction dispatch to restaurant POS.
          </p>
          <HeroChips />
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-[color:var(--red-strong)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Explore my work
            </a>
            <a
              href={profile.resumeUrl}
              className="mat-b rounded-full px-5 py-2.5 text-sm font-semibold text-[color:var(--text)]"
              download
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
