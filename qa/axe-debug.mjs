/**
 * One-off: dump the full details of any axe "incomplete" so I can
 * manually verify what the checker couldn't determine automatically.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  console.log(
    `Violations: ${results.violations.length}  Incomplete: ${results.incomplete.length}`,
  );
  console.log("\n=== INCOMPLETE ITEMS (manual review) ===");
  for (const inc of results.incomplete) {
    console.log(`\n### ${inc.id} — ${inc.impact ?? "n/a"}`);
    console.log(`  ${inc.help}`);
    console.log(`  ${inc.helpUrl}`);
    for (const [i, node] of inc.nodes.entries()) {
      if (i > 4) break;
      console.log(`  node[${i}]:`);
      console.log(`    html:    ${node.html.slice(0, 200)}`);
      console.log(`    target:  ${JSON.stringify(node.target)}`);
      if (node.any?.length)
        console.log(
          `    checks:  ${node.any
            .map((c) => `${c.id}: ${c.message}`)
            .join(" | ")}`,
        );
      if (node.all?.length)
        console.log(
          `    all:     ${node.all
            .map((c) => `${c.id}: ${c.message}`)
            .join(" | ")}`,
        );
      if (node.none?.length)
        console.log(
          `    none:    ${node.none
            .map((c) => `${c.id}: ${c.message}`)
            .join(" | ")}`,
        );
    }
  }
} finally {
  await browser.close();
}
