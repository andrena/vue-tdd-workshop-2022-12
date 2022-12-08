import { test } from "./test";
import { CustomerPage } from "../pages/CustomerPage";
import { expect } from "@playwright/test";

test("minimal e2e test", async ({ page }) => {
  const customerPage = await CustomerPage.open(page);
  expect(customerPage).toBeDefined();
});

test("creates and activates a customer", async () => {
  // ...
});
