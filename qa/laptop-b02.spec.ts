import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "B0.2");

test.describe.serial("Milestone B0.2 — deck ergonomics pass", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  test("laptop at 1440", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/qa/laptop", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none !important;transition:none !important;}",
    });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: join(OUT, "laptop-1440.png"),
      fullPage: true,
    });
    await ctx.close();
  });

  test("small-size readability — 600 px", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/qa/laptop", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const containers = document.querySelectorAll("[style*='max-width']");
      if (containers[1]) (containers[1] as HTMLElement).style.maxWidth = "600px";
    });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none !important;transition:none !important;}",
    });
    await page.waitForTimeout(400);
    const svgs = await page.locator("svg").all();
    const small = svgs[1] ?? svgs[0];
    if (!small) throw new Error("no svg");
    await small.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const box = await small.boundingBox();
    if (!box) throw new Error("no box");
    await page.screenshot({
      path: join(OUT, "laptop-600.png"),
      clip: {
        x: Math.max(0, box.x - 60),
        y: Math.max(0, box.y - 60),
        width: box.width + 120,
        height: box.height + 120,
      },
    });
    await ctx.close();
  });

  test("close crop — keyboard + palm rest + trackpad", async () => {
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
    if (!box) throw new Error("no box");
    // Crop the bottom third of the SVG — deck contents.
    await page.screenshot({
      path: join(OUT, "close-deck-kb-palmrest-trackpad.png"),
      clip: {
        x: box.x,
        y: box.y + box.height * 0.7,
        width: box.width,
        height: box.height * 0.3,
      },
    });
    await ctx.close();
  });
});
