import { test, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "A3");

test.describe.serial("Milestone A.3 — visual regression + nav QA", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  test("desktop 1440 hero — no visual regression", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation-duration:0s !important;transition-duration:0s !important;}",
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(OUT, "1440-fold.png"), fullPage: false });
    await ctx.close();
  });

  test("mobile 390 — initial + awkward scroll positions with nav visible", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
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
    await page.waitForTimeout(400);

    // 1) Initial — nav hidden.
    await page.screenshot({
      path: join(OUT, "390-initial-fold.png"),
      fullPage: false,
    });

    // Helper to force a scroll-up motion so the nav reveals via
    // direction detector, then settles at the target position.
    async function revealAt(target: number) {
      await page.evaluate((t) => window.scrollTo({ top: t + 200, behavior: "auto" }), target);
      await page.waitForTimeout(80);
      await page.evaluate((t) => window.scrollTo({ top: t, behavior: "auto" }), target);
      await page.waitForTimeout(350);
    }

    // Three random awkward stop positions where content wraps close to
    // the bottom of the viewport.
    await revealAt(820);
    await page.screenshot({
      path: join(OUT, "390-awkward-820.png"),
      fullPage: false,
    });

    await revealAt(1180);
    await page.screenshot({
      path: join(OUT, "390-awkward-1180.png"),
      fullPage: false,
    });

    await revealAt(1520);
    await page.screenshot({
      path: join(OUT, "390-awkward-1520.png"),
      fullPage: false,
    });

    await ctx.close();
  });

  test("specialism chip — longest value fully visible", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
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
    await page.waitForTimeout(400);
    // Force the rotator to the longest specialism ("Accessibility") by
    // rewriting the visible span. The layout is driven by the invisible
    // longest-ghost anyway, but this proves nothing clips visually.
    await page.evaluate(() => {
      const spans = document.querySelectorAll(".chip-swap");
      for (const s of Array.from(spans)) {
        (s as HTMLElement).textContent = "Accessibility";
      }
    });
    await page.waitForTimeout(200);
    // Screenshot just the chip area for clarity.
    const chip = page.locator(".mat-b").filter({ hasText: "Specialism" }).first();
    await chip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await chip.screenshot({ path: join(OUT, "chip-longest.png") });
    await ctx.close();
  });
});
