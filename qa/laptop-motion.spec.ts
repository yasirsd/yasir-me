import { test, chromium, firefox, webkit, type Browser, type BrowserType } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "screenshots", "B1");

/**
 * Given a scroll progress P (0..1), compute the window.scrollY needed
 * to place the LaptopStory section at that progress under
 * `useScroll({ offset: ["start start", "end end"] })`.
 *
 * Sections in that mode:
 *   - Progress 0 when section's TOP aligns with viewport's TOP
 *   - Progress 1 when section's BOTTOM aligns with viewport's BOTTOM
 *   - Delta = section.height - viewport.height (for a sticky 300vh
 *     on a 100vh viewport, that's 200vh)
 */
async function scrollToProgress(page: import("@playwright/test").Page, p: number) {
  await page.evaluate((progress) => {
    // First non-header <section> on the page = LaptopStory outer.
    const sections = Array.from(document.querySelectorAll("section"));
    const story = sections.find(
      (s) => s.style.height === "300vh" || s.getBoundingClientRect().height > window.innerHeight * 2,
    ) ?? sections[0];
    if (!story) return;
    const rect = story.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const delta = sectionHeight - viewportHeight;
    const target = sectionTop + Math.max(0, delta) * progress;
    window.scrollTo({ top: target, behavior: "auto" });
  }, p);
  // Two rAFs so the transform update flushes.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  await page.waitForTimeout(80);
}

const CHECKPOINTS = [
  0.0, 0.12, 0.24, 0.36, 0.48, 0.62, 0.72, 0.88, 1.0,
] as const;

async function screenshotEngine(
  engine: BrowserType,
  engineName: string,
  variant: "primary" | "cross-browser",
) {
  const browser: Browser = await engine.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/qa/laptop-motion", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    if (variant === "primary") {
      // Contact sheet — small individual crops of just the sticky
      // stage at each checkpoint, plus larger key-milestone shots.
      for (const p of CHECKPOINTS) {
        await scrollToProgress(page, p);
        await page.screenshot({
          path: join(OUT, `checkpoint-${(p * 100).toFixed(0).padStart(3, "0")}.png`),
          fullPage: false,
        });
      }
    } else {
      // Cross-browser: capture 3 representative frames per engine.
      for (const p of [0.0, 0.48, 1.0]) {
        await scrollToProgress(page, p);
        await page.screenshot({
          path: join(
            OUT,
            `xbrowser-${engineName}-${(p * 100).toFixed(0).padStart(3, "0")}.png`,
          ),
          fullPage: false,
        });
      }
    }

    await ctx.close();
  } finally {
    await browser.close();
  }
}

test.describe.serial("Milestone B1 — scroll-driven laptop opening", () => {
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
  });

  test("primary contact sheet (Chromium)", async () => {
    await screenshotEngine(chromium, "chromium", "primary");
  });

  test("cross-browser — WebKit (Safari engine)", async () => {
    await screenshotEngine(webkit, "webkit", "cross-browser");
  });

  test("cross-browser — Firefox", async () => {
    await screenshotEngine(firefox, "firefox", "cross-browser");
  });

  test("reduced-motion", async () => {
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
        colorScheme: "dark",
      });
      const page = await ctx.newPage();
      await page.goto("/qa/laptop-motion", { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: join(OUT, "reduced-motion.png"),
        fullPage: true,
      });
      await ctx.close();
    } finally {
      await browser.close();
    }
  });

  test("fast-scroll / trackpad-flick QA", async () => {
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "dark",
      });
      const page = await ctx.newPage();
      await page.goto("/qa/laptop-motion", { waitUntil: "networkidle" });
      // Rapid jumps — the object must resolve to the correct physical
      // state each time. If we captured mid-transition instead of the
      // resolved frame it would show as blur/wrong angle.
      const sequence = [0.2, 0.6, 0.05, 0.85, 0.35, 0.95, 0.0];
      for (const p of sequence) {
        await scrollToProgress(page, p);
        await page.screenshot({
          path: join(OUT, `fastscroll-${(p * 100).toFixed(0).padStart(3, "0")}.png`),
        });
      }
      await ctx.close();
    } finally {
      await browser.close();
    }
  });
});
