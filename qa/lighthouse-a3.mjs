/**
 * A.3 measurement suite — two-benchmark system.
 *
 *  A) GATE: standard Lighthouse mobile with SIMULATED throttling (5 runs
 *     per route, all reported, median used). This is the >= 90 gate.
 *
 *  B) DIAGNOSTIC: DevTools throttling on baseline vs home to attribute
 *     application cost above the framework floor. Not scored, not gated;
 *     phase timings from the SAME trace as LCP.
 *
 * Numbers from mode A and mode B are NOT compared to each other.
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
const LABEL = process.env.LABEL ?? "A3";

const ROUTES = [
  { key: "baseline", url: "/qa/baseline", label: "framework + hero markup only" },
  { key: "home", url: "/", label: "full home" },
];

const COMMON = {
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
  emulatedUserAgent:
    "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
};

const SIMULATED = {
  extends: "lighthouse:default",
  settings: { formFactor: "mobile", throttlingMethod: "simulate", ...COMMON },
};
const DEVTOOLS = {
  extends: "lighthouse:default",
  settings: { formFactor: "mobile", throttlingMethod: "devtools", ...COMMON },
};

const median = (nums) => {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const fmt = (n) => (typeof n === "number" ? Math.round(n) : "—");

async function runOne(url, cfg) {
  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  try {
    const { lhr } = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error" },
      cfg,
    );
    const insight = lhr.audits["lcp-breakdown-insight"]?.details?.items ?? [];
    const phases = insight[0]?.items ?? [];
    const phase = (s) => phases.find((r) => r.subpart === s)?.duration ?? null;
    const node = insight.find((i) => i?.type === "node") ?? {};

    const scripts = (lhr.audits["network-requests"]?.details?.items ?? [])
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
  const sim = {};
  const dev = {};

  for (const route of ROUTES) {
    console.log(`\n=== SIMULATED gate — ${route.url} ===`);
    sim[route.key] = [];
    for (let i = 1; i <= RUNS; i++) {
      process.stdout.write(`  run ${i}/${RUNS}… `);
      const r = await runOne(BASE + route.url, SIMULATED);
      console.log(
        `perf ${fmt(r.perf)} · lcp ${fmt(r.lcp)}ms · tbt ${fmt(r.tbt)}ms · js ${(r.totalScript / 1024).toFixed(1)}KB`,
      );
      sim[route.key].push(r);
    }
    console.log(`\n=== DEVTOOLS diagnostic — ${route.url} ===`);
    dev[route.key] = [];
    for (let i = 1; i <= 3; i++) {
      process.stdout.write(`  run ${i}/3… `);
      const r = await runOne(BASE + route.url, DEVTOOLS);
      console.log(
        `lcp ${fmt(r.lcp)}ms · tbt ${fmt(r.tbt)}ms · phase-sum ${(
          (r.lcpTTFB ?? 0) +
          (r.lcpLoadDelay ?? 0) +
          (r.lcpLoadDuration ?? 0) +
          (r.lcpRenderDelay ?? 0)
        ).toFixed(0)}ms`,
      );
      dev[route.key].push(r);
    }
  }

  let md = `# Milestone A.3 — Performance (${LABEL})

Runner: **lighthouse@12.8.2** on **Node ${process.version}** (in-range).

## A · Gate benchmark — SIMULATED throttling (5 runs per route)

Standard Lighthouse mobile, default simulated throttling. This is the gate used for Performance ≥ 90.
`;
  for (const route of ROUTES) {
    const runs = sim[route.key];
    const med = {
      perf: median(runs.map((r) => r.perf)),
      lcp: median(runs.map((r) => r.lcp)),
      fcp: median(runs.map((r) => r.fcp)),
      cls: median(runs.map((r) => r.cls)),
      tbt: median(runs.map((r) => r.tbt)),
      js: median(runs.map((r) => r.totalScript)),
    };
    md += `\n### \`${route.url}\` — ${route.label}\n\n`;
    md += `| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |\n`;
    md += `| --- | ---- | -------- | -------- | --- | -------- | ------- |\n`;
    for (const [i, r] of runs.entries()) {
      md += `| ${i + 1} | ${fmt(r.perf)} | ${fmt(r.lcp)} | ${fmt(r.fcp)} | ${r.cls.toFixed(3)} | ${fmt(r.tbt)} | ${(r.totalScript / 1024).toFixed(1)} |\n`;
    }
    md += `\n**Median:** perf **${fmt(med.perf)}** · LCP **${fmt(med.lcp)} ms** · FCP **${fmt(med.fcp)} ms** · CLS **${med.cls.toFixed(3)}** · TBT **${fmt(med.tbt)} ms** · JS **${(med.js / 1024).toFixed(1)} KB**\n`;
  }

  md += `\n---\n\n## B · Diagnostic trace — DEVTOOLS throttling (3 runs per route)\n\nLCP + phase breakdown come from the SAME trace. TBT here is browser-observed, not simulated.\n`;
  for (const route of ROUTES) {
    const runs = dev[route.key];
    const med = {
      lcp: median(runs.map((r) => r.lcp)),
      tbt: median(runs.map((r) => r.tbt)),
      fcp: median(runs.map((r) => r.fcp)),
    };
    const chosen = runs.reduce(
      (best, r) =>
        Math.abs(r.lcp - med.lcp) < Math.abs(best.lcp - med.lcp) ? r : best,
      runs[0],
    );
    md += `\n### \`${route.url}\`\n\n`;
    md += `| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |\n| --- | -------- | -------- | -------- | ------- |\n`;
    for (const [i, r] of runs.entries()) {
      md += `| ${i + 1} | ${fmt(r.lcp)} | ${fmt(r.fcp)} | ${fmt(r.tbt)} | ${(r.totalScript / 1024).toFixed(1)} |\n`;
    }
    md += `\n**Median:** LCP **${fmt(med.lcp)} ms** · FCP **${fmt(med.fcp)} ms** · TBT **${fmt(med.tbt)} ms**\n\n`;
    const total = [
      chosen.lcpTTFB,
      chosen.lcpLoadDelay,
      chosen.lcpLoadDuration,
      chosen.lcpRenderDelay,
    ].reduce((s, v) => s + (v ?? 0), 0);
    md += `LCP element: \`${chosen.lcpElement.slice(0, 180)}\`\n\n`;
    md += `| Phase | Timing (ms) |\n| ----- | ----------- |\n`;
    md += `| TTFB                   | ${chosen.lcpTTFB?.toFixed(1) ?? "—"} |\n`;
    md += `| Resource load delay    | ${chosen.lcpLoadDelay?.toFixed(1) ?? "—"} |\n`;
    md += `| Resource load duration | ${chosen.lcpLoadDuration?.toFixed(1) ?? "—"} |\n`;
    md += `| Element render delay   | ${chosen.lcpRenderDelay?.toFixed(1) ?? "—"} |\n`;
    md += `| **Sum**                | **${total.toFixed(1)}** |\n`;
    md += `| Reported LCP (same trace) | ${chosen.lcp.toFixed(1)} |\n`;
  }

  md += `\n---\n\n## Script transfer detail — median-nearest DevTools run for \`/\`\n\n`;
  const chosenHome = dev.home.reduce(
    (best, r) =>
      Math.abs(r.lcp - median(dev.home.map((x) => x.lcp))) <
      Math.abs(best.lcp - median(dev.home.map((x) => x.lcp)))
        ? r
        : best,
    dev.home[0],
  );
  md += `Total: **${(chosenHome.totalScript / 1024).toFixed(1)} KB gzipped**\n\n`;
  md += `| Chunk | Transfer (KB) | Raw (KB) |\n| ----- | ------------- | -------- |\n`;
  for (const s of chosenHome.scripts.slice(0, 6)) {
    md += `| ${s.url.replace(BASE, "").slice(-70)} | ${(s.transferSize / 1024).toFixed(1)} | ${(s.resourceSize / 1024).toFixed(1)} |\n`;
  }

  const out = join(OUT_DIR, `${LABEL}.md`);
  await writeFile(out, md, "utf8");
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
