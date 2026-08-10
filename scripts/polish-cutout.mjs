/**
 * Subtle matte decontamination on the cutout.
 *
 * The segmentation model leaves faint bright-halo pixels at very low
 * alpha around hair, shoulders and jacket edges. Against a pure black
 * hero background they read as a matte fringe. We fix this by
 * "premultiplying against black" — composite RGB over black using the
 * original alpha, then reattach the original alpha. On a dark
 * background the fringe now reads as dark, not white, while
 * fully-opaque interior pixels are untouched.
 *
 * Also mildly steepens the alpha so near-zero speckle drops out.
 */
import sharp from "sharp";
import { copyFile } from "node:fs/promises";

const SRC = "public/images/portrait/yasir-cutout.png";
const OUT = "public/images/portrait/yasir-cutout.png";
const BACKUP = "public/images/portrait/yasir-cutout.raw.png";

await copyFile(SRC, BACKUP);

// RGB composited over black using the source's own alpha (removeAlpha
// drops the alpha channel so we can rejoin our tuned one below).
const flatBuf = await sharp(SRC)
  .flatten({ background: "#000000" })
  .removeAlpha()
  .toBuffer();

// Alpha channel, tuned: slightly steepened contrast + tiny floor so
// near-zero speckle drops to 0.
const alphaBuf = await sharp(SRC)
  .extractChannel(3)
  .linear(1.05, -6) // small contrast + floor
  .png()
  .toBuffer();

await sharp(flatBuf)
  .joinChannel(alphaBuf)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(
  `Polished ${OUT} — ${meta.width}×${meta.height}. Halo darkened against black; hair silhouette preserved. Backup at ${BACKUP}.`,
);
