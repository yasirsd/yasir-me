/**
 * Milestone A Lighthouse runner.
 * Runs Lighthouse 3× against http://localhost:4321 with the mobile preset,
 * emits per-run scores + median to qa/lighthouse/A.md.
 */

import { launch } from "chrome-launcher";
import lighthouseMod from "lighthouse";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lighthouse = lighthouseMod.default ?? lighthouseMod;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "lighthouse");
const URL = process.env.URL ?? "http://localhost:4321/";
const RUNS = Number(process.env.RUNS ?? 3);
const MILESTONE = process.env.MILESTONE ?? "A";

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function fmt(n) {
  return typeof n === "number" ? Math.round(n) : "—";
}

async function runOnce() {
  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const result = await lighthouse(
      URL,
      {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
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
      },
    );

    const lhr = result.lhr;
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
      lcpElement:
        lhr.audits["largest-contentful-paint-element"]?.details?.items?.[0]
          ?.node?.snippet ?? "unknown",
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
    console.log(`perf ${fmt(r.perf)} · a11y ${fmt(r.a11y)} · bp ${fmt(r.bp)} · seo ${fmt(r.seo)} · lcp ${fmt(r.lcp)}ms · cls ${r.cls.toFixed(3)}`);
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
    si: median(runs.map((r) => r.si)),
  };

  const md = `# Milestone ${MILESTONE} — Lighthouse

URL: \`${URL}\`
Runs: **${RUNS}**  (mobile preset · simulated Slow 4G · 4× CPU slowdown)

## Per-run scores

| Run | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) | FCP (ms) | SI (ms) |
| --- | ---- | ---- | -- | --- | -------- | --- | -------- | -------- | ------- |
${runs
  .map(
    (r, i) =>
      `| ${i + 1} | ${fmt(r.perf)} | ${fmt(r.a11y)} | ${fmt(r.bp)} | ${fmt(r.seo)} | ${fmt(r.lcp)} | ${r.cls.toFixed(3)} | ${fmt(r.tbt)} | ${fmt(r.fcp)} | ${fmt(r.si)} |`,
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
| TBT           | ${fmt(med.tbt)} ms | — | — |
| FCP           | ${fmt(med.fcp)} ms | — | — |
| Speed Index   | ${fmt(med.si)} ms | — | — |

## LCP element (first run)

\`\`\`
${runs[0]?.lcpElement ?? "unknown"}
\`\`\`

## Trend note

Initial Milestone A baseline. To be compared against Milestone B/C/D as
sections are added.
`;

  const out = join(OUT_DIR, `${MILESTONE}.md`);
  await writeFile(out, md, "utf8");
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
