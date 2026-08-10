# Milestone A.3 — Performance (A3-withCV)

Runner: **lighthouse@12.8.2** on **Node v22.13.1** (in-range).

## A · Gate benchmark — SIMULATED throttling (5 runs per route)

Standard Lighthouse mobile, default simulated throttling. This is the gate used for Performance ≥ 90.

### `/qa/baseline` — framework + hero markup only

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 86 | 2776 | 1078 | 0.000 | 395 | 137.9 |
| 2 | 94 | 2370 | 787 | 0.000 | 216 | 137.9 |
| 3 | 91 | 2424 | 785 | 0.000 | 295 | 137.9 |
| 4 | 76 | 2825 | 808 | 0.000 | 834 | 137.9 |
| 5 | 77 | 2793 | 820 | 0.000 | 762 | 137.9 |

**Median:** perf **86** · LCP **2776 ms** · FCP **808 ms** · CLS **0.000** · TBT **395 ms** · JS **137.9 KB**

### `/` — full home

| Run | Perf | LCP (ms) | FCP (ms) | CLS | TBT (ms) | JS (KB) |
| --- | ---- | -------- | -------- | --- | -------- | ------- |
| 1 | 79 | 2868 | 958 | 0.000 | 647 | 150.5 |
| 2 | 89 | 2793 | 1233 | 0.000 | 313 | 150.5 |
| 3 | 93 | 2530 | 1112 | 0.000 | 226 | 150.5 |
| 4 | 88 | 2597 | 1118 | 0.000 | 390 | 150.5 |
| 5 | 67 | 3052 | 962 | 0.000 | 1687 | 150.5 |

**Median:** perf **88** · LCP **2793 ms** · FCP **1112 ms** · CLS **0.000** · TBT **390 ms** · JS **150.5 KB**

---

## B · Diagnostic trace — DEVTOOLS throttling (3 runs per route)

LCP + phase breakdown come from the SAME trace. TBT here is browser-observed, not simulated.

### `/qa/baseline`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 2386 | 2315 | 712 | 137.9 |
| 2 | 2318 | 2318 | 625 | 137.9 |
| 3 | 2081 | 2043 | 409 | 137.9 |

**Median:** LCP **2318 ms** · FCP **2315 ms** · TBT **625 ms**

LCP element: `<img alt="Portrait of Yasir Syed" fetchpriority="high" loading="eager" width="560" height="653" decoding="async" data-nimg="1" class="h-auto w-full max-w-full object-contain" style`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 34.8 |
| Resource load delay    | 729.1 |
| Resource load duration | 758.3 |
| Element render delay   | 795.9 |
| **Sum**                | **2318.1** |
| Reported LCP (same trace) | 2318.1 |

### `/`

| Run | LCP (ms) | FCP (ms) | TBT (ms) | JS (KB) |
| --- | -------- | -------- | -------- | ------- |
| 1 | 6238 | 4947 | 1963 | 150.5 |
| 2 | 4044 | 3642 | 904 | 150.5 |
| 3 | 3423 | 3334 | 764 | 150.5 |

**Median:** LCP **4044 ms** · FCP **3642 ms** · TBT **904 ms**

LCP element: `<img alt="Portrait of Yasir Syed" draggable="false" fetchpriority="high" loading="eager" width="420" height="490" decoding="async" data-nimg="1" class="relative h-auto w-full max-w`

| Phase | Timing (ms) |
| ----- | ----------- |
| TTFB                   | 24.3 |
| Resource load delay    | 639.7 |
| Resource load duration | 992.2 |
| Element render delay   | 2387.8 |
| **Sum**                | **4044.1** |
| Reported LCP (same trace) | 4044.1 |

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
