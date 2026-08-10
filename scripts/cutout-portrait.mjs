/**
 * One-off: remove the background from the hero portrait using a local
 * ONNX segmentation model, then re-encode at 1440px transparent PNG.
 *
 * Not installed as a project dep — only used at asset-prep time via:
 *   npm install --no-save @imgly/background-removal-node
 *   node scripts/cutout-portrait.mjs
 *
 * Output: public/images/portrait/yasir-cutout.png
 */
import { removeBackground } from "@imgly/background-removal-node";
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SRC = "public/images/portrait/yasir-formal-rect.png";
const OUT = "public/images/portrait/yasir-cutout.png";

console.log("Loading source...");
const buf = await readFile(SRC);
// The package wants a Blob with a MIME type — raw Buffer trips its
// format sniffer and it throws "Unsupported format: ".
const inputBlob = new Blob([buf], { type: "image/png" });
console.log("Running segmentation (this downloads ~40 MB model on first run)...");
const blob = await removeBackground(inputBlob);
const arr = new Uint8Array(await blob.arrayBuffer());

console.log("Post-processing with sharp — trim to bounding box, resize to 1600px wide max, re-encode PNG...");
const processed = await sharp(arr)
  .trim({ threshold: 5 })
  .resize({ width: 1600, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: false })
  .toBuffer();

await writeFile(OUT, processed);

// Report file size
const meta = await sharp(processed).metadata();
console.log(`Wrote ${OUT}  ${(processed.length / 1024).toFixed(1)} KB  ${meta.width}×${meta.height}`);
