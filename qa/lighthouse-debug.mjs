/**
 * One-off debug run — dumps failing accessibility + performance audits
 * so I can see what's costing points.
 */
import { launch } from "chrome-launcher";
import lhMod from "lighthouse";
const lighthouse = lhMod.default ?? lhMod;

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});
try {
  const { lhr } = await lighthouse(
    "http://localhost:4321/",
    {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility"],
    },
    {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttlingMethod: "simulate",
      },
    },
  );

  console.log("\n=== ACCESSIBILITY failures / warnings ===");
  const a11yCat = lhr.categories.accessibility;
  for (const ref of a11yCat.auditRefs) {
    const a = lhr.audits[ref.id];
    if (a.score !== 1 && a.score !== null) {
      console.log(`- [${ref.weight ?? 0}w] ${ref.id}: score=${a.score}`);
      console.log(`    ${a.title}`);
      if (a.details?.items?.length) {
        for (const item of a.details.items.slice(0, 5)) {
          console.log(`    · ${item.node?.snippet ?? JSON.stringify(item).slice(0, 200)}`);
        }
      }
    }
  }

  console.log("\n=== LCP element ===");
  const lcp = lhr.audits["largest-contentful-paint-element"];
  console.log("  score:", lcp.score, "value:", lcp.displayValue);
  console.log("  ", JSON.stringify(lcp.details, null, 2).slice(0, 800));

  console.log("\n=== TOP PERF opportunities ===");
  const perfCat = lhr.categories.performance;
  const opps = perfCat.auditRefs
    .filter((r) => r.group === "diagnostics" || r.group === "load-opportunities")
    .map((r) => ({ id: r.id, ...lhr.audits[r.id] }))
    .filter((a) => a.score !== null && a.score < 0.9)
    .sort((a, b) => (a.numericValue ?? 0) < (b.numericValue ?? 0) ? 1 : -1)
    .slice(0, 10);
  for (const a of opps) {
    console.log(`- [${a.id}] score=${a.score?.toFixed(2)}  ${a.displayValue ?? ""}`);
    console.log(`    ${a.title}`);
  }
} finally {
  await chrome.kill();
}
