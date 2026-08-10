import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const MILESTONE = "A";
const OUT_DIR = join(__dirname, "screenshots", MILESTONE);

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
] as const;

const SECTIONS = [
  { id: "hero", label: "hero" },
  { id: "signal", label: "credibility" },
  { id: "about", label: "about" },
] as const;

/**
 * Captures three PNGs per viewport per section:
 *   qa/screenshots/A/<viewport>-<section>.png    (element)
 *   qa/screenshots/A/<viewport>-full.png         (full-page single shot)
 *   qa/screenshots/A/<viewport>-fold.png         (first fold)
 */
test.describe.serial("Milestone A visual QA", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    await mkdir(OUT_DIR, { recursive: true });
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser?.close();
  });

  for (const vp of VIEWPORTS) {
    test(`viewport ${vp.name}`, async () => {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: vp.mobile,
        hasTouch: vp.mobile,
        colorScheme: "dark",
        reducedMotion: "no-preference",
      });
      const page = await ctx.newPage();
      await page.goto("/", { waitUntil: "networkidle" });

      // Freeze motion for stable snapshots.
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }`,
      });
      await page.waitForTimeout(500);

      // First fold
      await page.screenshot({
        path: join(OUT_DIR, `${vp.name}-fold.png`),
        fullPage: false,
      });

      // Sections
      for (const s of SECTIONS) {
        const loc = page.locator(`#${s.id}`);
        await loc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await loc.screenshot({
          path: join(OUT_DIR, `${vp.name}-${s.label}.png`),
        });
      }

      // Full page (dark tone chapters only)
      await page.screenshot({
        path: join(OUT_DIR, `${vp.name}-full.png`),
        fullPage: true,
      });

      await ctx.close();
    });
  }
});
