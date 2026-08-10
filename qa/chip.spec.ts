import { test, chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "A3");

test("specialism chip — longest value fully visible (whole hero)", async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
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
    // Freeze the rotator on "Accessibility" by rewriting the visible span.
    await page.evaluate(() => {
      document.querySelectorAll(".chip-swap").forEach((el) => {
        (el as HTMLElement).textContent = "Accessibility";
      });
    });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(OUT, "chip-longest.png"),
      fullPage: true,
    });
    await ctx.close();
  } finally {
    await browser.close();
  }
});
