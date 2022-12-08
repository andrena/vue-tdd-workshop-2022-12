import { test } from "./test";
import { CustomerPage } from "../pages/CustomerPage";
import { getActivationLinkFromMailhog } from "../base/getActivationLinkFromMailhog";
import { expect } from "@playwright/test";
import crypto from "node:crypto";
import type { CustomerUnsaved } from "commons";
import { ActivationPage } from "../pages/ActivationPage";

const newCustomer: CustomerUnsaved = {
  firstName: "Test",
  lastName: "Test",
  emailAddress: "test@test.de",
  phoneNumber: "+49151231545",
  addresses: [
    {
      city: "Berlin",
      zipCode: "10000",
      streetAndNumber: "Strasse 1",
      country: "Germany",
    },
  ],
};

test("minimal e2e test", async ({ page }) => {
  const customerPage = await CustomerPage.open(page);
  await expect(customerPage.table).toBeVisible();
});

test("creates and activates a customer", async ({ page }) => {
  const emailAddress = `foo+${crypto.randomUUID()}@bar.de`;

  const customerPage = await CustomerPage.open(page);
  await customerPage.addCustomer({ ...newCustomer, emailAddress });
  expect(await customerPage.getStatusForCustomer(emailAddress)).toBe(
    "inactive"
  );

  await customerPage.sendActivation(emailAddress);
  expect(await customerPage.getStatusForCustomer(emailAddress)).toBe("pending");

  const activationLink = await getActivationLinkFromMailhog(emailAddress);
  expect(activationLink).toBeDefined();

  const activationPage = await ActivationPage.open(page, activationLink);
  expect(await activationPage.getActivationMessage(emailAddress)).toContain(
    "active"
  );

  await CustomerPage.open(page);
  expect(await customerPage.getStatusForCustomer(emailAddress)).toBe("active");
});
