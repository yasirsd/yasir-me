import { Section } from "@/components/layout/Section";
import { profile } from "@/data/profile";

type Signal = {
  value: string;
  unit?: string;
  label: string;
  hint?: string;
};

/**
 * Résumé-only signal strip. No invented metrics.
 *
 *  - 7.8    Years experience         → résumé snapshot profile
 *  - 30%    Load-time improvement    → résumé Work & Key Strengths
 *  - React+TS  Core frontend         → résumé Technical Expertise
 *  - Web + Mobile  Platforms         → résumé Frameworks and Libraries
 *  - WCAG   Accessibility discipline → résumé Accessibility
 *  - Enterprise  Experience surface  → résumé Career Timeline
 */
const signals: Signal[] = [
  { value: profile.yearsExperience, unit: "yrs", label: "Frontend experience" },
  { value: "30%", label: "Load-time reduction", hint: "Load-time optimisation" },
  { value: "React + TS", label: "Core stack" },
  { value: "Web + Mobile", label: "React & React Native" },
  { value: "WCAG", label: "Accessibility conformance" },
  { value: "Enterprise", label: "PepsiCo · ProArch · Moneris" },
];

export function CredibilityStrip() {
  return (
    <Section
      id="signal"
      tone="dark"
      background="deep"
      padding="sm"
      ariaLabel="At a glance"
      className="border-t border-[color:var(--border-soft)]"
    >
      <div className="container-shell">
        <p className="eyebrow mb-6">At a glance</p>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {signals.map((s, i) => {
            // Give one metric each a subtle brand tint; the rest stay
            // neutral so the accents read as *signal*, not decoration.
            const accent =
              i === 1
                ? "text-[color:var(--yellow)]"
                : i === 0
                  ? "text-[color:var(--text)]"
                  : "text-[color:var(--text)]";
            return (
              <li key={s.label} className="flex flex-col gap-1.5">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-semibold leading-none tracking-[-0.02em] ${accent}`}
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                  >
                    {s.value}
                  </span>
                  {s.unit ? (
                    <span
                      aria-hidden
                      className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text-muted)]"
                    >
                      {s.unit}
                    </span>
                  ) : null}
                </div>
                <p className="text-[13px] leading-[1.4] text-[color:var(--text-muted)]">
                  {s.label}
                </p>
                {s.hint ? (
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                    {s.hint}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
