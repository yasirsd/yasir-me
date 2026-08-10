import { test, expect, chromium, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "A");

test.describe.serial("Milestone A — a11y + reduced motion", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  test("reduced-motion snapshot", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: join(OUT, "1440-fold-reduced-motion.png"),
      fullPage: false,
    });
    await ctx.close();
  });

  test("keyboard navigation sequence", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });

    // Skip link must be the first Tab stop.
    await page.keyboard.press("Tab");
    const skipLinkFocused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return el?.textContent?.trim();
    });
    expect(skipLinkFocused).toBe("Skip to content");

    // Screenshot the visible skip link.
    await page.screenshot({
      path: join(OUT, "keyboard-1-skip-link.png"),
      fullPage: false,
    });

    // Activate skip link → focus should land on main.
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const mainFocused = await page.evaluate(
      () => document.activeElement?.id === "main",
    );
    expect(mainFocused).toBe(true);

    // Tab into nav — YS monogram, Home, Work, Experience, Skills, Ask, Contact, Resume, Explore CTA.
    // Capture the "Home" pill focus state.
    for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
    await page.waitForTimeout(150);
    await page.screenshot({
      path: join(OUT, "keyboard-2-nav-focus.png"),
      fullPage: false,
    });

    // Continue tabbing to the primary CTA on hero.
    for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
    await page.waitForTimeout(150);
    await page.screenshot({
      path: join(OUT, "keyboard-3-cta-focus.png"),
      fullPage: false,
    });

    await ctx.close();
  });

  test("no console errors on load", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    expect(errors, `Console errors:\n${errors.join("\n")}`).toEqual([]);
    await ctx.close();
  });
});
