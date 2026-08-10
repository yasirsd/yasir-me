import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";

/**
 * Hero CTA pair. Server component — CSS-only entrance so no Motion
 * runtime is required on the critical path.
 */
export function HeroMeta() {
  return (
    <div
      className="hero-enter flex flex-wrap items-center gap-3"
      style={{ "--delay": "450ms" } as React.CSSProperties}
    >
      <a
        href="#work"
        className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--red-strong)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(239,35,60,0.35)] transition-transform hover:-translate-y-[1px]"
      >
        Explore my work
        <ArrowDown
          className="h-4 w-4 transition-transform group-hover:translate-y-[2px]"
          aria-hidden
        />
      </a>
      <a
        href={profile.resumeUrl}
        className="mat-b inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[color:var(--text)]"
        download
      >
        Download résumé
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
