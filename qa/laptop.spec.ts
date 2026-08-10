import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "B0");

test.describe.serial("Milestone B0 — static laptop", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  const VIEWPORTS = [1280, 1440, 1728, 1920] as const;

  for (const width of VIEWPORTS) {
    test(`laptop at ${width}`, async () => {
      const ctx = await browser.newContext({
        viewport: { width, height: Math.round((width * 900) / 1440) },
        deviceScaleFactor: 1,
        colorScheme: "dark",
      });
      const page = await ctx.newPage();
      await page.goto("/qa/laptop", { waitUntil: "networkidle" });
      await page.addStyleTag({
        content: "*,*::before,*::after{animation:none !important;transition:none !important;}",
      });
      await page.waitForTimeout(400);
      // Full-page screenshot at the viewport width — shows the object
      // filling the responsive slot and the second smaller slot below.
      await page.screenshot({
        path: join(OUT, `laptop-${width}.png`),
        fullPage: true,
      });
      await ctx.close();
    });
  }

  test("close crop — screen + bezel + hinge", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1728, height: 1080 },
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/qa/laptop", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none !important;transition:none !important;}",
    });
    await page.waitForTimeout(400);
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (!box) throw new Error("laptop svg not found");
    // Crop around the lid+bezel+hinge junction — bottom third of the SVG.
    await page.screenshot({
      path: join(OUT, "close-screen-bezel-hinge.png"),
      clip: {
        x: box.x + box.width * 0.05,
        y: box.y + box.height * 0.45,
        width: box.width * 0.9,
        height: box.height * 0.4,
      },
    });
    await ctx.close();
  });

  test("close crop — deck + keyboard + trackpad", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1728, height: 1080 },
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/qa/laptop", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none !important;transition:none !important;}",
    });
    await page.waitForTimeout(400);
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (!box) throw new Error("laptop svg not found");
    // Crop around the deck — bottom quarter of the SVG.
    await page.screenshot({
      path: join(OUT, "close-deck-keyboard-trackpad.png"),
      clip: {
        x: box.x,
        y: box.y + box.height * 0.78,
        width: box.width,
        height: box.height * 0.22,
      },
    });
    await ctx.close();
  });
});
