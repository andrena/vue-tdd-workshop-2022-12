import { devices } from "@playwright/test";
import baseConfig from "./playwright.config.mjs";
import { TestConfig } from "./test/TestConfig.cjs";

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 * @type import("@playwright/test").PlaywrightTestConfig
 */
const config = {
  ...baseConfig,
  testDir: "./test/e2e/",
  outputDir: "./build/e2e-test-output-dir/",
  timeout: 30 * 1000,
  reporter: [
    [
      "html",
      {
        open: TestConfig.isCI ? "never" : "on-failure",
        outputFolder: "build/e2e-test-report",
      },
    ],
  ],
  projects: [{ name: "e2e-chromium", use: devices["Desktop Chrome"] }],
  use: {
    ...baseConfig.use,
    trace: "retain-on-failure",
  },
  webServer: undefined,
  globalSetup: "./test/ensureServiceIsRunning.ts",
};

export default config;
