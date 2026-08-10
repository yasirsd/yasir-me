import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "A1");

test.describe.serial("Milestone A.1 — visual regression", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  test("desktop 1440 — hero + about", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation-duration:0s !important;transition-duration:0s !important;}",
    });
    await page.waitForTimeout(500);

    await page.screenshot({ path: join(OUT, "1440-fold.png"), fullPage: false });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator("#about").screenshot({
      path: join(OUT, "1440-about.png"),
    });
    await ctx.close();
  });

  test("mobile 390 — initial + scrolled", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation-duration:0s !important;transition-duration:0s !important;}",
    });
    await page.waitForTimeout(500);

    // Initial fold — mobile nav should NOT be visible yet.
    await page.screenshot({
      path: join(OUT, "390-initial-fold.png"),
      fullPage: false,
    });

    // Scroll ~500 px so the mobile bottom nav becomes visible and content
    // moves under the reveal.
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: "auto" }));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: join(OUT, "390-scrolled-hero.png"),
      fullPage: false,
    });

    await ctx.close();
  });
});
