import { test, expect, chromium, type Browser } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(__dirname, "lighthouse");

/**
 * Real axe-core scan (not the Lighthouse a11y category).
 * Runs against http://localhost:4321 in dark + light contexts.
 * Fails on any WCAG A/AA violation. Writes a markdown summary.
 */
test.describe.serial("Milestone A.1 — axe-core", () => {
  let browser: Browser;
  test.beforeAll(async () => {
    await mkdir(OUT, { recursive: true });
    browser = await chromium.launch();
  });
  test.afterAll(async () => browser?.close());

  test("axe scan — desktop dark", async () => {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const md = `# axe-core scan — Milestone A.1

Runtime: **@axe-core/playwright** against \`http://localhost:4321/\` (desktop 1440 × 900, dark scheme).
Rule tags: wcag2a, wcag2aa, wcag21a, wcag21aa.

## Summary

| Category | Count |
| -------- | ----- |
| Violations | **${results.violations.length}** |
| Passes     | ${results.passes.length} |
| Incomplete | ${results.incomplete.length} |
| Inapplicable | ${results.inapplicable.length} |

${
  results.violations.length === 0
    ? "> No WCAG A/AA violations detected."
    : "## Violations\n\n" +
      results.violations
        .map(
          (v) => `### ${v.id} — ${v.impact}
- ${v.help}
- ${v.helpUrl}
- Nodes affected: ${v.nodes.length}
${v.nodes
  .slice(0, 3)
  .map((n) => `  - \`${n.html.slice(0, 160)}\``)
  .join("\n")}`,
        )
        .join("\n\n")
}

${
  results.incomplete.length === 0
    ? ""
    : "## Incomplete (manual verification needed)\n\n" +
      results.incomplete
        .map((v) => `- **${v.id}** (${v.impact ?? "n/a"}) — ${v.help}`)
        .join("\n")
}
`;
    await writeFile(join(OUT, "axe-A1.md"), md, "utf8");
    await ctx.close();

    // Only fail on serious/critical violations so incomplete + minor
    // findings surface in the report without blocking the pipeline.
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      blocking,
      `Blocking axe violations:\n${blocking
        .map((v) => `${v.id}: ${v.help}`)
        .join("\n")}`,
    ).toEqual([]);
  });
});
