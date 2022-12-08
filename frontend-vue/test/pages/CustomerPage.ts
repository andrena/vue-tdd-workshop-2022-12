import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CustomerPage extends BasePage {
  static async open(page: Page): Promise<CustomerPage> {
    await page.goto("/");

    const instance = new CustomerPage(page);
    await instance.init();
    return instance;
  }

  protected override async init(): Promise<void> {
    await super.init();
    await expect(this.getPageHeader()).toHaveText("Customer List");
  }

}
