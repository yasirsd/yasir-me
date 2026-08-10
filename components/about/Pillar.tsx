import { Reveal } from "@/components/motion/Reveal";
import type { Principle } from "@/data/principles";
import { pillarDiagrams } from "./PillarDiagrams";

interface PillarProps {
  principle: Principle;
  delay?: number;
}

export function Pillar({ principle, delay = 0 }: PillarProps) {
  const Diagram =
    pillarDiagrams[principle.number as keyof typeof pillarDiagrams];

  return (
    <Reveal delay={delay} distance={16} amount={0.5}>
      <article className="group relative flex h-full flex-col gap-3 border-t border-[color:var(--border)] pt-6">
        <header className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
            {principle.number}
          </span>
          <span
            aria-hidden
            className="h-1 w-6 origin-right scale-x-0 rounded-full bg-[color:var(--yellow)] transition-transform duration-500 group-hover:scale-x-100"
          />
        </header>
        <h3
          className="font-semibold tracking-[-0.02em] text-[color:var(--text)]"
          style={{ fontSize: "clamp(1.375rem, 1.6vw, 1.75rem)" }}
        >
          {principle.title}
        </h3>
        <p className="text-[color:var(--text-muted)]" style={{ lineHeight: 1.55 }}>
          {principle.body}
        </p>
        {Diagram ? <Diagram /> : null}
      </article>
    </Reveal>
  );
}
