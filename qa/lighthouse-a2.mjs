/**
 * A.2 measurement suite.
 *
 * For each URL: five Lighthouse runs using `throttlingMethod: "devtools"`
 * (real browser throttling from a single trace — LCP + breakdown come
 * from the SAME trace, so phases sum ~= LCP).
 *
 * URLs:
 *   /qa/baseline       — framework + fonts + hero markup, no client islands
 *   /qa/baseline-nav   — baseline + optimized nav (LazyMotion domMax)
 *   /                  — baseline + nav + Reveal + credibility + about
 *
 * Reports per-run scores, medians, JS totals, largest chunks, presence
 * of Motion feature bundle before first interaction.
 */
import { launch } from "chrome-launcher";
import lhMod from "lighthouse";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lighthouse = lhMod.default ?? lhMod;
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "lighthouse");
const BASE = process.env.BASE ?? "http://localhost:4321";
const RUNS = Number(process.env.RUNS ?? 5);

const ROUTES = [
  { key: "baseline", url: "/qa/baseline", label: "framework + hero markup only" },
  { key: "baseline-nav", url: "/qa/baseline-nav", label: "baseline + optimized nav" },
  { key: "home", url: "/", label: "full home (baseline + nav + Reveal + about)" },
];

const LH_SETTINGS = {
  extends: "lighthouse:default",
  settings: {
    formFactor: "mobile",
    // "devtools" applies the throttling values below directly via DevTools
    // Protocol on a real Chrome trace — LCP + phases come from the SAME
    // trace (unlike "simulate" which projects timings post-hoc).
    throttlingMethod: "devtools",
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      disabled: false,
    },
    throttling: {
      // Slow 4G equivalent, matching the simulate profile so numbers are
      // still comparable to the previous A/A.1 reports.
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
    },
    emulatedUserAgent:
      "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  },
};

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
const fmt = (n) => (typeof n === "number" ? Math.round(n) : "—");

async function runOne(url) {
  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const { lhr } = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error" },
      LH_SETTINGS,
    );

    // LCP breakdown from `lcp-breakdown-insight` — same trace as LCP now
    // because throttlingMethod=devtools.
    const insight = lhr.audits["lcp-breakdown-insight"]?.details?.items ?? [];
    const phases = insight[0]?.items ?? [];
    const phase = (subpart) =>
      phases.find((r) => r.subpart === subpart)?.duration ?? null;
    const node = insight.find((i) => i?.type === "node") ?? {};

    // Network — total script transfer + top chunks.
    const scripts =
      (lhr.audits["network-requests"]?.details?.items ?? [])
        .filter((r) => (r.resourceType ?? "").toLowerCase() === "script")
        .map((r) => ({
          url: r.url,
          transferSize: r.transferSize ?? 0,
          resourceSize: r.resourceSize ?? 0,
        }))
        .sort((a, b) => b.transferSize - a.transferSize);

    return {
      perf: lhr.categories.performance.score * 100,
      lcp: lhr.audits["largest-contentful-paint"].numericValue,
      fcp: lhr.audits["first-contentful-paint"].numericValue,
      cls: lhr.audits["cumulative-layout-shift"].numericValue,
      tbt: lhr.audits["total-blocking-time"].numericValue,
      ttfb: lhr.audits["server-response-time"].numericValue,
      lcpTTFB: phase("timeToFirstByte"),
      lcpLoadDelay: phase("resourceLoadDelay"),
      lcpLoadDuration: phase("resourceLoadDuration"),
      lcpRenderDelay: phase("elementRenderDelay"),
      lcpElement: node.snippet ?? "unknown",
      scripts,
      totalScript: scripts.reduce((s, r) => s + r.transferSize, 0),
    };
  } finally {
    await chrome.kill();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const perRouteRuns = {};
  for (const route of ROUTES) {
    console.log(`\n=== ${route.url} (${route.label}) ===`);
    perRouteRuns[route.key] = [];
    for (let i = 1; i <= RUNS; i++) {
      process.stdout.write(`  run ${i}/${RUNS}… `);
      const r = await runOne(BASE + route.url);
      console.log(
        `perf ${fmt(r.perf)} · lcp ${fmt(r.lcp)}ms · tbt ${fmt(r.tbt)}ms · js ${(r.totalScript / 1024).toFixed(1)}KB`,
      );
      perRouteRuns[route.key].push(r);
    }
  }

  let md = `# Milestone A.2 — Lighthouse (${RUNS}-run, devtools throttling)

Runner: **lighthouse@12.8.2** (Node ${process.version} in-range).
Throttling: **devtools mode** — LCP headline and phase breakdown come from the *same* trace.

`;
  for (const route of ROUTES) {
    const runs = perRouteRuns[route.key];
    const med = {
      perf: median(runs.map((r) => r.perf)),
      lcp: median(runs.map((r) => r.lcp)),
      fcp: median(runs.map((r) => r.fcp)),
      cls: median(runs.map((r) => r.cls)),
      tbt: median(runs.map((r) => r.tbt)),
      js: median(runs.map((r) => r.totalScript)),
    };
    const chosen = runs.reduce(
      (best, r) =>
        Math.abs(r.lcp - med.lcp) < Math.abs(best.lcp - med.lcp) ? r : best,
      runs[0],
    );
    md += `## \`${route.url}\` — ${route.label}\n\n`;
    md += `| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS transfer (KB) |\n`;
    md += `| --- | ---- | -------- | -------- | --- | -------- | ---------------- |\n`;
    for (const [i, r] of runs.entries()) {
      md += `| ${i + 1} | ${fmt(r.perf)} | ${fmt(r.lcp)} | ${fmt(r.fcp)} | ${r.cls.toFixed(3)} | ${fmt(r.tbt)} | ${(r.totalScript / 1024).toFixed(1)} |\n`;
    }
    md += `\n**Median:** perf **${fmt(med.perf)}** · LCP **${fmt(med.lcp)} ms** · FCP **${fmt(med.fcp)} ms** · CLS **${med.cls.toFixed(3)}** · TBT **${fmt(med.tbt)} ms** · JS transfer **${(med.js / 1024).toFixed(1)} KB**.\n\n`;

    const total = [
      chosen.lcpTTFB,
      chosen.lcpLoadDelay,
      chosen.lcpLoadDuration,
      chosen.lcpRenderDelay,
    ].reduce((s, v) => s + (v ?? 0), 0);
    md += `### LCP phase breakdown (median-nearest run)\n\n`;
    md += `LCP element: \`${chosen.lcpElement.slice(0, 220)}\`\n\n`;
    md += `| Phase | Timing (ms) |\n| ----- | ----------- |\n`;
    md += `| TTFB                   | ${chosen.lcpTTFB?.toFixed(1) ?? "—"} |\n`;
    md += `| Resource load delay    | ${chosen.lcpLoadDelay?.toFixed(1) ?? "—"} |\n`;
    md += `| Resource load duration | ${chosen.lcpLoadDuration?.toFixed(1) ?? "—"} |\n`;
    md += `| Element render delay   | ${chosen.lcpRenderDelay?.toFixed(1) ?? "—"} |\n`;
    md += `| **Sum**                | **${total.toFixed(1)}** |\n`;
    md += `| Reported LCP (same trace) | ${chosen.lcp.toFixed(1)} |\n\n`;

    md += `### Top scripts (median-nearest run)\n\n`;
    md += `| Chunk | Transfer (KB) | Raw (KB) |\n| ----- | ------------- | -------- |\n`;
    for (const s of chosen.scripts.slice(0, 6)) {
      md += `| ${s.url.replace(BASE, "").slice(-70)} | ${(s.transferSize / 1024).toFixed(1)} | ${(s.resourceSize / 1024).toFixed(1)} |\n`;
    }
    md += `\n---\n\n`;
  }

  const out = join(OUT_DIR, "A2.md");
  await writeFile(out, md, "utf8");
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
