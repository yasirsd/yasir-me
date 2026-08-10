import { defineConfig } from "@playwright/test";

/**
 * QA screenshot config for Milestone A (and later).
 *
 * Expects a production server already running at http://localhost:4321
 * (see `npm run start` after `npm run build`).
 */
export default defineConfig({
  testDir: ".",
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4321",
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    trace: "off",
    video: "off",
    colorScheme: "dark",
    deviceScaleFactor: 1,
  },
  outputDir: "screenshots/_test-output",
});
