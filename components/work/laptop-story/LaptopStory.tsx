"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { LaptopFrame } from "./LaptopFrame";
import {
  DeckSVG,
  GroundingSVG,
  LidBackSVG,
  LidFrontSVG,
} from "./pieces/LaptopParts";

/**
 * Scroll-driven opening choreography for the approved B0.2 laptop.
 *
 * Architecture (chosen after weighing SVG-group 3D-transform risk in
 * Safari/Firefox against a pure HTML perspective wrapper):
 *
 *   #outer  (section, provides scroll height ~300vh)
 *     #sticky  (position: sticky, height 100svh — the fixed viewport)
 *       #stage  (aspect-ratio 1600/1300 container, centred, holds the scene)
 *         .perspective  (perspective: 1800px + perspective-origin)
 *           .rig  (translateY + scale driven by scroll — "arrival")
 *             GroundingSVG   [absolute inset:0, opacity driven by scroll]
 *             DeckSVG        [absolute inset:0, static]
 *             .lid-rig       [absolute inset:0, transform-origin at hinge,
 *                             rotateX(scrollAngle deg), preserve-3d]
 *               .lid-back    [backface-visibility: hidden, rotateY(180deg)]
 *               .lid-front   [backface-visibility: hidden]
 *                 LidFrontSVG (screen + bezel + shell)
 *                 screen-tint overlay (motion.rect opacity for the wake)
 *
 * Every animated value is a MotionValue produced by `useTransform` off
 * a single section-scoped `useScroll`. No React state updates per
 * frame. No spring on the primary lid angle. Reduced-motion falls
 * straight through to the final static laptop (B0.2 look).
 */

// ---------- Timeline mapping ----------
// Scroll progress → lid angle (deg). Sign convention explained below.
//
// CSS 3D right-hand rule: positive rotateX tilts the TOP of the element
// away from viewer; negative tilts it toward viewer. Our lid box is
// oriented "standing up" as default (rotateX 0 = vertical). To CLOSE
// (tip forward and down onto the deck) we go NEGATIVE. Working angle
// is a small positive rotateX past vertical.
// Keyframes tuned to keep the lid moving through the perspective-heavy
// "near-horizontal" range (angles between -90 and -55) as a single fluid
// motion, not a dwell. The perspective camera magnifies a nearly-flat
// panel dramatically — perceived as an oversized trapezoid — so we skip
// through it, then decelerate for the recognisable open arc.
const PROGRESS_ANGLE_INPUTS: number[] = [0, 0.1, 0.28, 0.48, 0.62, 1.0];
const PROGRESS_ANGLE_OUTPUTS: number[] = [-90, -90, -55, -15, 15, 15];

const PROGRESS_TRANSLATE_INPUTS: number[] = [0, 0.12, 1.0];
const PROGRESS_TRANSLATE_OUTPUTS: number[] = [56, 0, 0];

const PROGRESS_SCALE_INPUTS: number[] = [0, 0.12, 1.0];
const PROGRESS_SCALE_OUTPUTS: number[] = [0.96, 1.0, 1.0];

// Z-pullback: at "arrival" the whole scene sits ~350 CSS px further from
// camera, so the closed lid is not perspective-magnified into the frame.
// Comes forward to Z=0 by the time the lid is meaningfully open.
const PROGRESS_Z_INPUTS: number[] = [0, 0.28, 0.62, 1.0];
const PROGRESS_Z_OUTPUTS: number[] = [-350, -180, 0, 0];

const PROGRESS_GROUND_INPUTS: number[] = [0, 0.12, 0.62, 1.0];
const PROGRESS_GROUND_OUTPUTS: number[] = [0.35, 1.0, 1.0, 1.0];

// Screen wake segment: 0.68 → 0.88.
const PROGRESS_SCREEN_INPUTS: number[] = [0.68, 0.88, 1.0];
const PROGRESS_SCREEN_OUTPUTS: number[] = [0, 0.55, 0.6];

interface LaptopStoryProps {
  /** Container height. 300vh is the recommended prototype value. */
  sectionHeight?: string;
  /** Optional class for the outer section wrapper. */
  className?: string;
}

export function LaptopStory({
  sectionHeight = "300vh",
  className,
}: LaptopStoryProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return className !== undefined ? (
      <LaptopStoryReducedMotion className={className} />
    ) : (
      <LaptopStoryReducedMotion />
    );
  }

  return className !== undefined ? (
    <ScrollDriven sectionHeight={sectionHeight} className={className} />
  ) : (
    <ScrollDriven sectionHeight={sectionHeight} />
  );
}

// ---------------------------------------------------------------------------
// Full choreography — used when reduced-motion is OFF.
// ---------------------------------------------------------------------------

function ScrollDriven({
  sectionHeight,
  className,
}: {
  sectionHeight: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const lidAngle = useTransform(
    scrollYProgress,
    PROGRESS_ANGLE_INPUTS,
    PROGRESS_ANGLE_OUTPUTS,
  );
  const translateY = useTransform(
    scrollYProgress,
    PROGRESS_TRANSLATE_INPUTS,
    PROGRESS_TRANSLATE_OUTPUTS,
  );
  const scale = useTransform(
    scrollYProgress,
    PROGRESS_SCALE_INPUTS,
    PROGRESS_SCALE_OUTPUTS,
  );
  const groundOpacity = useTransform(
    scrollYProgress,
    PROGRESS_GROUND_INPUTS,
    PROGRESS_GROUND_OUTPUTS,
  );
  const screenWake = useTransform(
    scrollYProgress,
    PROGRESS_SCREEN_INPUTS,
    PROGRESS_SCREEN_OUTPUTS,
  );
  const rigZ = useTransform(
    scrollYProgress,
    PROGRESS_Z_INPUTS,
    PROGRESS_Z_OUTPUTS,
  );
  // Lid front/back visibility — driven by angle (not backface-visibility)
  // because at exactly -90° both faces are edge-on and CSS backface hides
  // them regardless of the camera's actual angle. Angle-driven opacity
  // gives us predictable, cross-browser visibility.
  //
  //   angle ≤ -60  →  back visible, front hidden (mostly closed)
  //   angle ≈ -55  →  crossfade
  //   angle ≥ -50  →  front visible, back hidden (opening / open)
  const frontOpacity = useTransform(lidAngle, [-100, -60, -50, 20], [0, 0, 1, 1]);
  const backOpacity = useTransform(lidAngle, [-100, -60, -50, 20], [1, 1, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: sectionHeight,
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stage
          lidAngle={lidAngle}
          translateY={translateY}
          scale={scale}
          groundOpacity={groundOpacity}
          screenWake={screenWake}
          frontOpacity={frontOpacity}
          backOpacity={backOpacity}
          rigZ={rigZ}
        />
      </div>
    </section>
  );
}

function Stage({
  lidAngle,
  translateY,
  scale,
  groundOpacity,
  screenWake,
  frontOpacity,
  backOpacity,
  rigZ,
}: {
  lidAngle: MotionValue<number>;
  translateY: MotionValue<number>;
  scale: MotionValue<number>;
  groundOpacity: MotionValue<number>;
  screenWake: MotionValue<number>;
  frontOpacity: MotionValue<number>;
  backOpacity: MotionValue<number>;
  rigZ: MotionValue<number>;
}) {
  return (
    <div
      style={{
        // The stage sizes to the shorter viewport dimension, keeping
        // aspect 1600:1300. Never wider than 1200 CSS px so the object
        // reads at "hero size", not "billboard size".
        width: "min(88vw, 1200px, calc(100svh * 1.231))",
        aspectRatio: "1600 / 1300",
        perspective: "2400px",
        perspectiveOrigin: "50% 42%",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          y: translateY,
          z: rigZ,
          scale,
        }}
      >
        {/* GROUNDING — its opacity fades from arrival state to full weight. */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: groundOpacity,
          }}
        >
          <GroundingSVG />
        </motion.div>

        {/* DECK — static; the deck never rotates. */}
        <div style={{ position: "absolute", inset: 0 }}>
          <DeckSVG />
        </div>

        {/* LID RIG — this is the whole hinged assembly. Its rotateX is
            driven directly by scroll progress; the front/back are stacked
            children whose visibility flips via backface-visibility as the
            container passes through 90°. */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            // Hinge line sits at y=944 in the 1300-tall viewBox → 72.6%
            // from the top of the stage.
            transformOrigin: "50% 72.6%",
            transformStyle: "preserve-3d",
            rotateX: lidAngle,
          }}
        >
          {/* LID BACK — the exterior aluminium seen when the laptop is
              closed. Opacity is angle-driven (see comment on the
              opacity motion values above). */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              opacity: backOpacity,
            }}
          >
            <LidBackSVG />
          </motion.div>

          {/* LID FRONT — the approved screen face. Opacity is
              angle-driven; crossfades with back around -55°. */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              opacity: frontOpacity,
            }}
          >
            <LidFrontSVG />
            {/* Screen wake — a warm dark overlay that fades in during the
                screen-wake segment. Rendered as a motion.svg so its
                opacity is a MotionValue (no per-frame React state). */}
            <svg
              viewBox="0 0 1600 1300"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <motion.rect
                x="120"
                y="76"
                width="1360"
                height="816"
                rx="4"
                fill="#1a1a24"
                style={{ opacity: screenWake }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reduced-motion — collapses the sticky 300vh scene to a normal-height
// section that just shows the final open laptop. No sticky, no rotation.
// ---------------------------------------------------------------------------

function LaptopStoryReducedMotion({ className }: { className?: string }) {
  return (
    <section
      className={className}
      style={{
        position: "relative",
        padding: "6rem 0",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <LaptopFrame maxWidth={1200} />
      </div>
    </section>
  );
}
