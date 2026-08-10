import type { Metadata } from "next";
import { LaptopFrame } from "@/components/work/laptop-story/LaptopFrame";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "QA · Static Laptop",
};

/**
 * B0 approval page — displays the static laptop against the chapter's
 * deep-black background at the max-width it will use on the real
 * LaptopStory section. No animation, no scroll behavior, no project
 * content inside the screen (neutral placeholder gradient shows the
 * screen surface as it will render before B2 slots in project frames).
 *
 * Deliberately renders TWO scales stacked so a reviewer can compare
 * the object's presence at typical desktop widths on a single page.
 */
export default function QaLaptopPage() {
  return (
    <div className="min-h-[100svh] bg-[color:var(--bg)] pb-32 pt-24">
      <div className="container-shell mb-16 flex items-baseline justify-between">
        <p className="eyebrow text-[color:var(--text-muted)]">
          B0 · Static laptop — visual approval
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
          no animation · no scroll · pure SVG/CSS
        </p>
      </div>

      {/* Scale 1: comfortable desktop presentation size */}
      <div className="mb-24 px-6">
        <LaptopFrame maxWidth={1200} />
      </div>

      {/* Scale 2: intimate portrait-companion size */}
      <div className="px-6">
        <div className="mx-auto max-w-[900px]">
          <LaptopFrame maxWidth={900} />
        </div>
      </div>
    </div>
  );
}
