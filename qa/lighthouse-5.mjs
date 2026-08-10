/**
 * 5-run controlled production Lighthouse.
 *  · Same environment per run: fresh Chrome, no reuse.
 *  · Reports every run — no filtering.
 *  · Extracts an LCP phase breakdown from `lcp-lazy-loading` /
 *    `largest-contentful-paint-element` audits.
 *  · Lists top JS chunks contributing to TBT / main-thread work.
 */

import { launch } from "chrome-launcher";
import lhMod from "lighthouse";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lighthouse = lhMod.default ?? lhMod;
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "lighthouse");
const URL = process.env.URL ?? "http://localhost:4321/";
const RUNS = Number(process.env.RUNS ?? 5);
const MILESTONE = process.env.MILESTONE ?? "A1";

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
function fmt(n) { return typeof n === "number" ? Math.round(n) : "—"; }

const LH_SETTINGS = {
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
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    emulatedUserAgent:
      "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  },
};

async function runOnce() {
  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const result = await lighthouse(
      URL,
      { port: chrome.port, output: "json", logLevel: "error" },
      LH_SETTINGS,
    );
    const lhr = result.lhr;

    // Lighthouse 13 splits this into `lcp-breakdown-insight`:
    //   items[0] = { type:"table", items: [ {subpart, label, duration}, ... ] }
    //   items[1] = { type:"node", snippet, boundingRect, ... }
    const lcpInsight = lhr.audits["lcp-breakdown-insight"];
    const insightItems = lcpInsight?.details?.items ?? [];
    const phasesTable = insightItems[0]?.items ?? [];
    const lcpNode = insightItems.find((i) => i?.type === "node") ?? {};
    const phase = (subpart) =>
      phasesTable.find((r) => r.subpart === subpart)?.duration ?? null;

    // Bundle work — total transfer + top scripts
    const netAudit = lhr.audits["network-requests"];
    const scriptRequests = (netAudit?.details?.items ?? [])
      .filter((r) => (r.resourceType ?? "").toLowerCase() === "script")
      .map((r) => ({
        url: r.url,
        transferSize: r.transferSize ?? 0,
        resourceSize: r.resourceSize ?? 0,
      }))
      .sort((a, b) => b.transferSize - a.transferSize);
    const totalScriptTransfer = scriptRequests.reduce(
      (s, r) => s + r.transferSize,
      0,
    );

    // Long tasks / TBT contributors
    const bootup = lhr.audits["bootup-time"]?.details?.items ?? [];

    return {
      perf: lhr.categories.performance.score * 100,
      a11y: lhr.categories.accessibility.score * 100,
      bp: lhr.categories["best-practices"].score * 100,
      seo: lhr.categories.seo.score * 100,
      lcp: lhr.audits["largest-contentful-paint"].numericValue,
      cls: lhr.audits["cumulative-layout-shift"].numericValue,
      tbt: lhr.audits["total-blocking-time"].numericValue,
      fcp: lhr.audits["first-contentful-paint"].numericValue,
      si: lhr.audits["speed-index"].numericValue,
      ttfb: lhr.audits["server-response-time"].numericValue,
      lcpElement: lcpNode.snippet ?? lcpNode.nodeLabel ?? "unknown",
      lcpTTFB: phase("timeToFirstByte"),
      lcpLoadDelay: phase("resourceLoadDelay"),
      lcpLoadDuration: phase("resourceLoadDuration"),
      lcpRenderDelay: phase("elementRenderDelay"),
      totalScriptTransfer,
      topScripts: scriptRequests.slice(0, 6),
      bootup: bootup.slice(0, 5),
    };
  } finally {
    await chrome.kill();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const runs = [];
  for (let i = 1; i <= RUNS; i++) {
    process.stdout.write(`Run ${i}/${RUNS}… `);
    const r = await runOnce();
    console.log(
      `perf ${fmt(r.perf)} · lcp ${fmt(r.lcp)}ms · tbt ${fmt(r.tbt)}ms · cls ${r.cls.toFixed(3)}`,
    );
    runs.push(r);
  }
  const med = {
    perf: median(runs.map((r) => r.perf)),
    a11y: median(runs.map((r) => r.a11y)),
    bp: median(runs.map((r) => r.bp)),
    seo: median(runs.map((r) => r.seo)),
    lcp: median(runs.map((r) => r.lcp)),
    cls: median(runs.map((r) => r.cls)),
    tbt: median(runs.map((r) => r.tbt)),
    fcp: median(runs.map((r) => r.fcp)),
    ttfb: median(runs.map((r) => r.ttfb)),
  };
  // Prefer the run whose LCP is nearest the median for phase reporting.
  const chosen = runs.reduce((best, r) =>
    Math.abs(r.lcp - med.lcp) < Math.abs(best.lcp - med.lcp) ? r : best,
    runs[0],
  );

  const md = `# Milestone ${MILESTONE} — Lighthouse (5-run controlled)

URL: \`${URL}\`
Runs: **${RUNS}**  · mobile preset · simulated Slow 4G · 4× CPU slowdown · fresh Chrome per run.

## Per-run scores (all runs reported — none removed)

| Run | Perf | A11y | BP | SEO | LCP (ms) | FCP (ms) | CLS | TBT (ms) | SI (ms) | TTFB (ms) |
| --- | ---- | ---- | -- | --- | -------- | -------- | --- | -------- | ------- | --------- |
${runs
  .map(
    (r, i) =>
      `| ${i + 1} | ${fmt(r.perf)} | ${fmt(r.a11y)} | ${fmt(r.bp)} | ${fmt(r.seo)} | ${fmt(r.lcp)} | ${fmt(r.fcp)} | ${r.cls.toFixed(3)} | ${fmt(r.tbt)} | ${fmt(r.si)} | ${fmt(r.ttfb)} |`,
  )
  .join("\n")}

## Median

| Metric | Median | Target | OK? |
| ------ | ------ | ------ | --- |
| Performance   | **${fmt(med.perf)}** | ≥ 90     | ${med.perf >= 90 ? "✅" : "❌"} |
| Accessibility | **${fmt(med.a11y)}** | ≥ 95     | ${med.a11y >= 95 ? "✅" : "❌"} |
| Best practices| **${fmt(med.bp)}**   | ≥ 95     | ${med.bp >= 95 ? "✅" : "❌"} |
| SEO           | **${fmt(med.seo)}**  | ≥ 95     | ${med.seo >= 95 ? "✅" : "❌"} |
| LCP           | **${fmt(med.lcp)} ms** | ≤ 2500 ms | ${med.lcp <= 2500 ? "✅" : "❌"} |
| CLS           | **${med.cls.toFixed(3)}** | ≤ 0.10   | ${med.cls <= 0.1 ? "✅" : "❌"} |
| TBT           | **${fmt(med.tbt)} ms** | (advisory ≤ 200 ms) | ${med.tbt <= 200 ? "✅" : "⚠️"} |
| FCP           | ${fmt(med.fcp)} ms | — | — |
| TTFB          | ${fmt(med.ttfb)} ms | — | — |

## LCP element (from median-nearest run)

\`\`\`
${chosen.lcpElement}
\`\`\`

## LCP phase breakdown (median-nearest run)

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB (server response)             | ${chosen.lcpTTFB ?? "—"} |
| Resource load delay (discover→req) | ${chosen.lcpLoadDelay ?? "—"} |
| Resource load duration (req→done)  | ${chosen.lcpLoadDuration ?? "—"} |
| Element render delay (done→paint)  | ${chosen.lcpRenderDelay ?? "—"} |

## Script transfer (median-nearest run)

Total script transfer size: **${(chosen.totalScriptTransfer / 1024).toFixed(1)} KB gzipped**  (budget: < 180 KB).

| Chunk | Transfer (KB) | Raw (KB) |
| ----- | ------------- | -------- |
${chosen.topScripts
  .map(
    (s) =>
      `| ${s.url.replace(URL, "")} | ${(s.transferSize / 1024).toFixed(1)} | ${(s.resourceSize / 1024).toFixed(1)} |`,
  )
  .join("\n")}

## Main-thread work — top bootup entries (median-nearest run)

| Script | Total CPU (ms) | Scripting (ms) |
| ------ | -------------- | -------------- |
${chosen.bootup
  .map(
    (b) =>
      `| ${(b.url ?? "").replace(URL, "").slice(-80)} | ${fmt(b.total ?? 0)} | ${fmt(b.scripting ?? 0)} |`,
  )
  .join("\n")}
`;

  const out = join(OUT_DIR, `${MILESTONE}.md`);
  await writeFile(out, md, "utf8");
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
