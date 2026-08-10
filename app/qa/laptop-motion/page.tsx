import type { Metadata } from "next";
import { LaptopStory } from "@/components/work/laptop-story/LaptopStory";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "QA · Laptop motion",
};

/**
 * B1 approval route — the scroll-driven opening choreography in
 * isolation. Not linked from anywhere; not in production nav.
 *
 * The page provides a small orientation header, then a scroll spacer
 * before the 300vh sticky choreography section so reviewers can start
 * scrolling and observe the arrival. A trailing spacer after allows
 * scrolling past to verify the hold state stabilises.
 *
 * Motion loads immediately on this route — animation is the whole
 * purpose of the QA page. When B1 is approved and LaptopStory is
 * later integrated into the real Work chapter on /, its client boundary
 * will be gated by InViewMount so its Motion cost stays off the home
 * initial route.
 */
export default function QaLaptopMotionPage() {
  return (
    <>
      <header
        style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem 1.5rem 8rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <p className="eyebrow text-[color:var(--text-muted)]">
          B1 · Scroll-driven opening — visual approval
        </p>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          Scroll to open the laptop.
        </p>
        <p
          style={{
            marginTop: "1rem",
            color: "var(--text-muted)",
            maxWidth: 520,
          }}
        >
          Native scroll drives every physical value. No wheel intercept.
          Reduced-motion collapses to the approved open-state laptop.
        </p>
      </header>

      {/* The choreography */}
      <LaptopStory sectionHeight="300vh" />

      {/* Trailing spacer so the "hold" state can breathe past the sticky
          section end. */}
      <div style={{ height: "60vh", background: "var(--bg)" }} />
    </>
  );
}
