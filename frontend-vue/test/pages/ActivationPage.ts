import { BasePage } from "./BasePage";
import type { Page } from "@playwright/test";

export class ActivationPage extends BasePage {
  static async open(page: Page, url: string): Promise<ActivationPage> {
    // passing a whole URL into the static open method is weird, but fitting for the ActivationPage
    if (!new URL(url).pathname.startsWith("/activate/")) {
      throw new Error("invalid activation url");
    }
    await page.goto(url);

    const instance = new ActivationPage(page);
    await instance.init();
    return instance;
  }

  async getActivationMessage(email: string): Promise<string> {
    const text = await this.page.getByText(email).textContent();
    return text ?? "";
  }
}
