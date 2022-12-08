import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setWorldConstructor,
} from "@cucumber/cucumber";
import { TestStepResultStatus } from "@cucumber/messages";
import { Browser, chromium } from "@playwright/test";
import { PlaywrightWorld } from "./PlaywrightWorld";
import { TestConfig } from "../../TestConfig.cjs";

setWorldConstructor(PlaywrightWorld);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: !TestConfig.isDebug });
});

Before(async function () {
  await this.init(browser);
});

After(async function ({ result }) {
  if (result?.status === TestStepResultStatus.FAILED) {
    // eslint-disable-next-line no-debugger -- automatically stop execution before the browser is closed
    debugger;
    await this.attach(await this.playwrightPage.screenshot(), "image/png");
  }
  await this.tearDown();
});

AfterAll(async function () {
  await browser.close();
});
