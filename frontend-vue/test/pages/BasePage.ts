import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /**
   * Waits for the page to have been loaded (constructors can't be async)
   * and asserts it is actually the correct page.
   */
  protected async init(): Promise<void> {
    await this.waitUntilLoaded();
    await expect(this.getApplicationHeader()).toHaveText("TDD Workshop");
  }

  protected async waitUntilLoaded(): Promise<void> {
    await this.page.waitForSelector("role=progressbar", { state: "hidden" });
    // Workaround to avoid vue-router has not duplicated the header for some reason (strict mode violation: getByRole('heading', { level: 1 }) resolved to 2 elements).
    // Things that did not work: eagerly loaded routes, nextTick, requestAnimationFrame, requestIdleCallback, router.isReady().
    // Waiting for network idle does not work, either, because the dev server uses a persistent web socket.
    await this.page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    );
  }

  getApplicationHeader(): Locator {
    return this.page.getByRole("heading", { level: 1 });
  }

  getPageHeader(): Locator {
    return this.page.getByRole("heading", { level: 2 });
  }
}
