import Image from "next/image";
import { cn } from "@/lib/cn";
import { portraitBlurDataURL } from "./portraitBlur";

interface HeroPortraitProps {
  className?: string;
  /** Rendered display width hint used for Next Image `width` prop. */
  size?: number;
  /** Optional overrides so the mobile stack can drop the bottom fade. */
  fadeBottom?: boolean;
}

/**
 * The hero portrait.
 *
 * Uses a transparent cutout of Yasir (background segmented out with a
 * local ONNX model — see scripts/cutout-portrait.mjs). The scene around
 * him is composed here: warm rim from the yellow side, restrained red
 * bounce from the opposite side, a soft dark disk anchor, and an
 * optional fade of the lower torso into the chapter tone.
 *
 * SOLE OWNER of the LCP image strategy. Uses `loading="eager"` +
 * `fetchPriority="high"` per the Next 16 Image docs — no `priority`
 * (deprecated), no `preload`, no hand-rolled `<link rel="preload">`.
 */
export function HeroPortrait({
  className,
  size = 720,
  fadeBottom = true,
}: HeroPortraitProps) {
  return (
    <figure
      className={cn(
        "relative isolate mx-auto flex items-end justify-center",
        className,
      )}
      style={{ aspectRatio: "6 / 7" }}
    >
      {/* ---------- Scene lighting (all decorative, aria-hidden) ---------- */}
      {/* Restrained red bounce on the left of the subject — reads as a
          cool source spilling around the shoulder line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[6%] inset-y-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 42% 55% at 22% 58%, rgba(239,35,60,0.22), transparent 62%)",
          filter: "blur(28px)",
        }}
      />
      {/* Warm yellow rim from the opposite side — the light source in the
          original photograph came from that direction, so we mirror it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[6%] inset-y-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 38% 48% at 78% 38%, rgba(253,197,0,0.20), transparent 62%)",
          filter: "blur(26px)",
        }}
      />
      {/* Anchor vignette — a very soft dark disk under the figure so the
          light pooling isn't flat and the subject reads as standing in a
          designed scene. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[9]"
        style={{
          background:
            "radial-gradient(ellipse 58% 66% at 50% 58%, rgba(7,7,8,0.55), transparent 78%)",
        }}
      />

      {/* ---------- The subject ---------- */}
      <Image
        src="/images/portrait/yasir-cutout.png"
        alt="Portrait of Yasir Syed"
        width={size}
        height={Math.round(size * (7 / 6))}
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1440px) 520px, (min-width: 1024px) 42vw, (min-width: 768px) 48vw, 82vw"
        quality={82}
        placeholder="blur"
        blurDataURL={portraitBlurDataURL}
        className="relative h-auto w-full max-w-full select-none object-contain"
        style={
          fadeBottom
            ? {
                // Only fade the lower torso — the cutout already has clean
                // edges everywhere else, so no ellipse mask needed.
                maskImage:
                  "linear-gradient(180deg, #000 0%, #000 78%, rgba(0,0,0,0.6) 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, #000 0%, #000 78%, rgba(0,0,0,0.6) 92%, transparent 100%)",
              }
            : undefined
        }
        draggable={false}
      />

      {/* Subtle contact-shadow disk beneath the figure so the fade doesn't
          feel like the person is levitating. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] bottom-[-2%] h-[8%] -z-[11]"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(0,0,0,0.55), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </figure>
  );
}
