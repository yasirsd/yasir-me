# Milestone A — Lighthouse

URL: `http://localhost:4321/`
Runs: **3**  (mobile preset · simulated Slow 4G · 4× CPU slowdown)

## Per-run scores

| Run | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) | FCP (ms) | SI (ms) |
| --- | ---- | ---- | -- | --- | -------- | --- | -------- | -------- | ------- |
| 1 | 71 | 100 | 96 | 100 | 3070 | 0.000 | 1148 | 1018 | 1574 |
| 2 | 93 | 100 | 96 | 100 | 2831 | 0.000 | 194 | 875 | 875 |
| 3 | 92 | 100 | 96 | 100 | 2714 | 0.000 | 223 | 906 | 906 |

## Median

| Metric | Median | Target | OK? |
| ------ | ------ | ------ | --- |
| Performance   | **92** | ≥ 90     | ✅ |
| Accessibility | **100** | ≥ 95     | ✅ |
| Best practices| **96**   | ≥ 95     | ✅ |
| SEO           | **100**  | ≥ 95     | ✅ |
| LCP           | **2831 ms** | ≤ 2500 ms | ❌ |
| CLS           | **0.000** | ≤ 0.10   | ✅ |
| TBT           | 223 ms | — | — |
| FCP           | 906 ms | — | — |
| Speed Index   | 906 ms | — | — |

## LCP element (first run)

```
unknown
```

## Trend note

Initial Milestone A baseline. To be compared against Milestone B/C/D as
sections are added.
