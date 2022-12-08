import { devices } from "@playwright/test";
import { TestConfig } from "./test/TestConfig.cjs";

if (TestConfig.isDebug) {
  process.env.PWDEBUG = "console";
}

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 * @type import("@playwright/test").PlaywrightTestConfig
 */
const config = {
  // source root
  testDir: "./test/ui/",

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: "./build/ui-test-output-dir/",

  // Run tests withing a single files in parallel
  fullyParallel: true,

  // Maximum time one test can run for.
  timeout: 10 * 1000,

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: TestConfig.isCI,

  // Retry on CI only
  retries: TestConfig.isCI ? 2 : 0,

  maxFailures: TestConfig.isDebug ? 1 : undefined,

  // Opt out of parallel tests on CI and when debugging
  workers: TestConfig.isDebug ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    [
      "html",
      {
        open: TestConfig.isCI ? "never" : "on-failure",
        outputFolder: "build/ui-test-report",
      },
    ],
  ],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    baseURL: "http://localhost:8080",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  // Use only a single browser when debugging
  projects: TestConfig.isDebug
    ? [{ name: "chromium", use: devices["Desktop Chrome"] }]
    : [
        { name: "chromium", use: devices["Desktop Chrome"] },
        { name: "firefox", use: devices["Desktop Firefox"] },
        // { name: "webkit", use: devices["Desktop Safari"] },
      ],

  // Run your local dev server before starting the tests
  webServer: {
    // Use the dev server by default for faster feedback loop, but preview server on CI for more realistic testing.*
    command: TestConfig.isCI ? "vite preview --port 8080" : "vite dev",
    // Playwright will re-use the local server if there is already a dev-server running.
    port: 8080,
    reuseExistingServer: !TestConfig.isCI,
  },
};

export default config;
