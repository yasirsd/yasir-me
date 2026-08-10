/**
 * One-off: measure /qa/laptop-motion for B1 report.
 * Reports JS transfer, top chunks, and whether Motion is in the initial bundle.
 */
import { launch } from "chrome-launcher";
import lhMod from "lighthouse";
const lighthouse = lhMod.default ?? lhMod;

const URL = "http://localhost:4321/qa/laptop-motion";
const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});
try {
  const { lhr } = await lighthouse(
    URL,
    { port: chrome.port, output: "json", logLevel: "error" },
    {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        throttlingMethod: "simulate",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
        },
      },
    },
  );

  const scripts = (lhr.audits["network-requests"]?.details?.items ?? [])
    .filter((r) => (r.resourceType ?? "").toLowerCase() === "script")
    .map((r) => ({
      url: r.url,
      transferSize: r.transferSize ?? 0,
      resourceSize: r.resourceSize ?? 0,
    }))
    .sort((a, b) => b.transferSize - a.transferSize);
  const total = scripts.reduce((s, r) => s + r.transferSize, 0);

  console.log(`\nRoute: ${URL}`);
  console.log(`Performance:  ${Math.round(lhr.categories.performance.score * 100)}`);
  console.log(`LCP:          ${Math.round(lhr.audits["largest-contentful-paint"].numericValue)} ms`);
  console.log(`TBT:          ${Math.round(lhr.audits["total-blocking-time"].numericValue)} ms`);
  console.log(`CLS:          ${lhr.audits["cumulative-layout-shift"].numericValue.toFixed(3)}`);
  console.log(`FCP:          ${Math.round(lhr.audits["first-contentful-paint"].numericValue)} ms`);
  console.log(`\nTotal JS transfer: ${(total / 1024).toFixed(1)} KB gzipped`);
  console.log(`\nTop chunks:`);
  for (const s of scripts.slice(0, 6)) {
    console.log(
      `  ${s.url.replace(URL, "").slice(-60)}   ${(s.transferSize / 1024).toFixed(1)} KB gz / ${(s.resourceSize / 1024).toFixed(1)} KB raw`,
    );
  }
} finally {
  await chrome.kill();
}
