# Milestone A.3 — Performance (B1-motion)

Runner: **lighthouse@12.8.2** on **Node v22.13.1** (in-range).

## A · Gate benchmark — SIMULATED throttling (5 runs per route)

Standard Lighthouse mobile, default simulated throttling. This is the gate used for Performance ≥ 90.

### `/qa/baseline` — framework + hero markup only

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 90 | 2630 | 929 | 0.000 | 293 | 137.9 |

**Median:** perf **90** · LCP **2630 ms** · FCP **929 ms** · CLS **0.000** · TBT **293 ms** · JS **137.9 KB**

### `/` — full home

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 89 | 2634 | 1226 | 0.000 | 332 | 150.5 |

**Median:** perf **89** · LCP **2634 ms** · FCP **1226 ms** · CLS **0.000** · TBT **332 ms** · JS **150.5 KB**

---

## B · Diagnostic trace — DEVTOOLS throttling (3 runs per route)

LCP + phase breakdown come from the SAME trace. TBT here is browser-observed, not simulated.

### `/qa/baseline`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 2187 | 2118 | 765 | 137.9 |
| 2 | 1975 | 1975 | 459 | 137.9 |
| 3 | 2445 | 2338 | 314 | 137.9 |

**Median:** LCP **2187 ms** · FCP **2118 ms** · TBT **459 ms**

LCP element: `<img alt="Portrait of Yasir Syed" fetchpriority="high" loading="eager" width="560" height="653" decoding="async" data-nimg="1" class="h-auto w-full max-w-full object-contain" style`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 19.1 |
| Resource load delay    | 709.6 |
| Resource load duration | 885.8 |
| Element render delay   | 572.6 |
| **Sum**                | **2187.1** |
| Reported LCP (same trace) | 2187.1 |

### `/`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 3764 | 3471 | 828 | 150.5 |
| 2 | 2864 | 2864 | 946 | 150.5 |
| 3 | 4022 | 3606 | 808 | 150.5 |

**Median:** LCP **3764 ms** · FCP **3471 ms** · TBT **828 ms**

LCP element: `<img alt="Portrait of Yasir Syed" draggable="false" fetchpriority="high" loading="eager" width="420" height="490" decoding="async" data-nimg="1" class="relative h-auto w-full max-w`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 25.5 |
| Resource load delay    | 628.5 |
| Resource load duration | 1001.4 |
| Element render delay   | 2108.4 |
| **Sum**                | **3763.7** |
| Reported LCP (same trace) | 3763.7 |

---

## Script transfer detail — median-nearest DevTools run for `/`

Total: **150.5 KB gzipped**

| Chunk | Transfer (KB) | Raw (KB) |
| ----- | ------------- | -------- |
| /_next/static/chunks/4561u0v7ysn3r.js | 70.3 | 223.5 |
| /_next/static/chunks/02todjvrl6y9h.js | 45.9 | 172.4 |
| /_next/static/chunks/0_l0g280ag_25.js | 8.2 | 22.0 |
| /_next/static/chunks/12aruqaur5huj.js | 7.6 | 21.6 |
| /_next/static/chunks/20p1jzah15tj7.js | 6.9 | 17.5 |
| /_next/static/chunks/turbopack-08yw7_a4n5u-s.js | 4.1 | 9.4 |
