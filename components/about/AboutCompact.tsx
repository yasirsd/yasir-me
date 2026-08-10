import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { principles } from "@/data/principles";
import { Pillar } from "./Pillar";

/**
 * "I don't just build screens." — the compact editorial about section
 * that sits between the credibility strip and the project system.
 * Establishes senior positioning before any project shows up.
 *
 * Desktop: asymmetric two-column with the pillars stretching wider than
 * the intro column. Mobile: intro then 2×2 pillar grid.
 */
export function AboutCompact() {
  return (
    <Section
      id="about"
      tone="dark"
      background="raised"
      padding="lg"
      ariaLabel="About"
    >
      {/* subtle single ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 30% 0%, rgba(239,35,60,0.10), transparent 70%)",
        }}
      />

      <div className="container-shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">About</p>
              <h2
                className="font-semibold leading-[0.98] tracking-[-0.025em] text-[color:var(--text)]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
              >
                I don&rsquo;t just build
                <br />
                <span className="text-[color:var(--text)]">screens.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="mt-6 max-w-md text-[color:var(--text-muted)]"
                style={{ fontSize: "var(--fs-lead)", lineHeight: 1.5 }}
              >
                I build frontend systems where product thinking, performance,
                accessibility and engineering meet — the parts users feel and
                the parts they never should.
              </p>
            </Reveal>
          </div>

          {/* Pillars column — 2×2 on desktop, 2×2 on mobile */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Pillar key={p.number} principle={p} delay={0.06 * i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
