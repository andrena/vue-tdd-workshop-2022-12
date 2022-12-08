import { test as base } from "@playwright/test";
import { throwOnError } from "../base/throwOnError";

export const test = base.extend({
  async page({ page }, use) {
    page.on("pageerror", throwOnError);
    await use(page);
  },
});
