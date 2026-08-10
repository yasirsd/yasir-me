import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "A2");

test.describe.serial("Milestone A.2 — visual regression", () => {
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

  test("mobile 390 — initial + three scroll positions showing nav behavior", async () => {
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

    // 1) Initial — nav should NOT be visible.
    await page.screenshot({
      path: join(OUT, "390-initial-fold.png"),
      fullPage: false,
    });

    // 2) Scrolled quickly downward — nav should be retreating / hidden.
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "auto" }));
    // Trigger a fresh scroll movement so the direction detector sees "down".
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: "auto" }));
    await page.waitForTimeout(80);
    await page.screenshot({
      path: join(OUT, "390-scroll-down-900.png"),
      fullPage: false,
    });

    // 3) Scroll upward — nav should reveal with the fade shim.
    await page.evaluate(() => window.scrollTo({ top: 750, behavior: "auto" }));
    await page.waitForTimeout(350);
    await page.screenshot({
      path: join(OUT, "390-scroll-up-750.png"),
      fullPage: false,
    });

    // 4) Idle at 1400 — after brief idle the nav should reveal.
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "auto" }));
    await page.waitForTimeout(600);
    await page.screenshot({
      path: join(OUT, "390-idle-1400.png"),
      fullPage: false,
    });

    await ctx.close();
  });
});
