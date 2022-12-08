import os from "node:os";
import { TestConfig } from "./test/TestConfig.cjs";

if (TestConfig.isDebug) {
  process.env.PWDEBUG = "console";
}

/** @type {Partial<import("@cucumber/cucumber/api").IConfiguration>} */
const config = {
  require: [
    "test/cucumber/setup/setup.ts",
    "test/cucumber/step_definitions/*.steps.ts",
  ],
  paths: ["test/cucumber/features/**/*.feature"],

  tags: TestConfig.isDebug ? "@Only" : undefined,
  format: [
    TestConfig.isDebug
      ? "@cucumber/pretty-formatter"
      : "html:build/cucumber-report.html",
  ],
  formatOptions: { colorsEnabled: false },
  parallel: TestConfig.isDebug ? undefined : os.cpus().length,
  publishQuiet: true,
};

export default config;
