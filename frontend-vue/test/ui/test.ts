import { test as base } from "@playwright/test";
import { setupPlaywrightNetworkInterceptor } from "../base/setupPlaywrightNetworkInterceptor";
import { throwOnError } from "../base/throwOnError";
import type { HTTPMockConfig } from "../base/HTTPMockConfig";

export const test = base.extend<{ backendMock: HTTPMockConfig }>({
  async page({ page }, use) {
    page.on("pageerror", throwOnError);
    await use(page);
  },
  async backendMock({ page }, use) {
    await use(await setupPlaywrightNetworkInterceptor(page));
  },
});
