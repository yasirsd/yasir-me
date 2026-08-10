# Milestone A.3 — Performance (A3-preCV)

Runner: **lighthouse@12.8.2** on **Node v22.13.1** (in-range).

## A · Gate benchmark — SIMULATED throttling (5 runs per route)

Standard Lighthouse mobile, default simulated throttling. This is the gate used for Performance ≥ 90.

### `/qa/baseline` — framework + hero markup only

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 83 | 2166 | 1157 | 0.000 | 626 | 137.9 |
| 2 | 95 | 2408 | 808 | 0.000 | 171 | 137.9 |
| 3 | 96 | 2305 | 781 | 0.000 | 157 | 137.9 |
| 4 | 96 | 2367 | 779 | 0.000 | 155 | 137.9 |
| 5 | 89 | 2432 | 829 | 0.000 | 364 | 137.9 |

**Median:** perf **95** · LCP **2367 ms** · FCP **808 ms** · CLS **0.000** · TBT **171 ms** · JS **137.9 KB**

### `/` — full home

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 90 | 2595 | 1224 | 0.003 | 321 | 150.5 |
| 2 | 78 | 2253 | 1599 | 0.000 | 892 | 150.5 |
| 3 | 95 | 2576 | 1118 | 0.000 | 171 | 150.5 |
| 4 | 88 | 2536 | 1082 | 0.000 | 391 | 150.5 |
| 5 | 90 | 2726 | 1089 | 0.000 | 305 | 150.5 |

**Median:** perf **90** · LCP **2576 ms** · FCP **1118 ms** · CLS **0.000** · TBT **321 ms** · JS **150.5 KB**

---

## B · Diagnostic trace — DEVTOOLS throttling (3 runs per route)

LCP + phase breakdown come from the SAME trace. TBT here is browser-observed, not simulated.

### `/qa/baseline`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 2468 | 2265 | 906 | 137.9 |
| 2 | 2206 | 2152 | 833 | 137.9 |
| 3 | 2056 | 2027 | 493 | 137.9 |

**Median:** LCP **2206 ms** · FCP **2152 ms** · TBT **833 ms**

LCP element: `<img alt="Portrait of Yasir Syed" fetchpriority="high" loading="eager" width="560" height="653" decoding="async" data-nimg="1" class="h-auto w-full max-w-full object-contain" style`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 17.1 |
| Resource load delay    | 621.0 |
| Resource load duration | 911.9 |
| Element render delay   | 656.1 |
| **Sum**                | **2206.1** |
| Reported LCP (same trace) | 2206.1 |

### `/`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 3245 | 2951 | 498 | 150.5 |
| 2 | 3284 | 3035 | 614 | 150.5 |
| 3 | 3106 | 2840 | 638 | 150.5 |

**Median:** LCP **3245 ms** · FCP **2951 ms** · TBT **614 ms**

LCP element: `<img alt="Portrait of Yasir Syed" draggable="false" fetchpriority="high" loading="eager" width="420" height="490" decoding="async" data-nimg="1" class="relative h-auto w-full max-w`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 12.2 |
| Resource load delay    | 752.6 |
| Resource load duration | 958.6 |
| Element render delay   | 1522.0 |
| **Sum**                | **3245.3** |
| Reported LCP (same trace) | 3245.3 |

---

## Script transfer detail — median-nearest DevTools run for `/`

Total: **150.5 KB gzipped**

| Chunk | Transfer (KB) | Raw (KB) |
| ----- | ------------- | -------- |
| /_next/static/chunks/4561u0v7ysn3r.js | 70.3 | 223.5 |
| /_next/static/chunks/02todjvrl6y9h.js | 45.9 | 172.4 |
| /_next/static/chunks/0_l0g280ag_25.js | 8.2 | 22.0 |
| /_next/static/chunks/12aruqaur5huj.js | 7.6 | 21.6 |
| /_next/static/chunks/22lmzoe4i8-g5.js | 6.9 | 17.5 |
| /_next/static/chunks/turbopack-08yw7_a4n5u-s.js | 4.1 | 9.4 |
