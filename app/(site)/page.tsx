import { Hero } from "@/components/hero/Hero";
import { CredibilityStrip } from "@/components/signal/CredibilityStrip";
import { AboutCompact } from "@/components/about/AboutCompact";

/**
 * Homepage — real, production content only.
 *
 * `#work`, `#experience`, `#skills`, `#chat`, `#contact` land as zero-DOM
 * anchor sentinels for now so nav hrefs stay valid; each turns into a
 * full chapter when its milestone (B / C / D) ships. No placeholder
 * DOM is rendered — this keeps the initial-route work honest for
 * benchmarking.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <AboutCompact />

      <span id="work" aria-hidden />
      <span id="experience" aria-hidden />
      <span id="skills" aria-hidden />
      <span id="chat" aria-hidden />
      <span id="contact" aria-hidden />
    </>
  );
}
