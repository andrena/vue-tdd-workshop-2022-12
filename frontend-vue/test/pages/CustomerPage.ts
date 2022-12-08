import { expect, Locator, Page } from "@playwright/test";
import type { CustomerUnsaved } from "commons";
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

  get table(): Locator {
    return this.page.getByRole("table");
  }

  async addCustomer(customer: CustomerUnsaved): Promise<void> {
    const form = this.page.locator("form", { hasText: "Add a Customer" });

    await form.getByText("First name").fill(customer.firstName);
    await form.getByText("Last name").fill(customer.lastName);
    await form.getByText("Email address").fill(customer.emailAddress);
    await form.getByText("Phone number").fill(customer.phoneNumber);

    const [address, ...otherAdresses] = customer.addresses;
    if (!address || otherAdresses.length > 0) {
      throw new Error("Multiple or zero addresses are not supported yet");
    }
    await form.getByText("Street and number").fill(address.streetAndNumber);
    await form.getByText("Zip code").fill(address.zipCode);
    await form.getByText("City").fill(address.city);
    await form.getByText("Country").fill(address.country);

    await form.getByText("Add customer").click();
  }

  async filter(filter: string): Promise<void> {
    const searchbox = this.page.getByRole("searchbox");
    await searchbox.fill(filter);
    await searchbox.press("Enter");
  }
}
