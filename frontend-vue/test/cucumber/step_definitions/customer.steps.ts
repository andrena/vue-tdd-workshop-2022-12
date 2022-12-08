import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomerStatus, CustomerUnsaved } from "commons";
import { CustomerPage } from "../../pages/CustomerPage";
import { getActivationLinkFromMailhog } from "../../base/getActivationLinkFromMailhog";
import { ActivationPage } from "../../pages/ActivationPage";

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

Given(/^the starting page is loaded$/, async function () {
  await this.open(CustomerPage);
});

Given(/^the current user is "([^"]+)"$/, function (user: string) {
  this.data.currentUser = this.replace(user);
});

When(/^the current user fills out the form and submits it$/, async function () {
  const page = this.get(CustomerPage);
  await page.addCustomer({
    ...newCustomer,
    emailAddress: this.data.currentUser,
  });
});

When(
  /^the current user searches for their email in the table$/,
  async function () {
    const page = this.get(CustomerPage);
    await page.filter(this.data.currentUser);
  }
);

Then(
  /^the current user appears (inactive|pending|active) in the table$/,
  async function (status: CustomerStatus) {
    const page = this.get(CustomerPage);
    expect(await page.getStatusForCustomer(this.data.currentUser)).toBe(status);
  }
);

When(/^the current user clicks on "Send activation"$/, async function () {
  const page = this.get(CustomerPage);
  await page.sendActivation(this.data.currentUser);
});

When(
  /^the current user clicks on the activation link in the e-mail$/,
  async function () {
    const activationLink = await getActivationLinkFromMailhog(
      this.data.currentUser
    );
    expect(activationLink).toBeDefined();
    await this.attach("Activation link: " + activationLink);

    await this.open(ActivationPage, activationLink);
  }
);

Then(
  /^the confirmation page shows that the current user is active$/,
  async function () {
    const page = this.get(ActivationPage);
    const text = await page.getActivationMessage(this.data.currentUser);
    expect(text).toContain("active");
  }
);
