import { expect } from "@playwright/test";
import { test } from "./test";
import { createTestCustomer } from "commons/dist/helpers/createTestCustomer";
import { CustomerPage } from "../pages/CustomerPage";

const john = createTestCustomer({
  id: "1",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+491000000000",
  emailAddress: "john.doe@mail.de",
  addresses: [
    {
      city: "Berlin",
      zipCode: "10000",
      streetAndNumber: "Teststrasse 1",
      country: "Deutschland",
    },
  ],
});

const ben = createTestCustomer({
  id: "2",
  firstName: "Benjamin",
  lastName: "Utzer",
  phoneNumber: "+491111110011",
  emailAddress: "ben.utzer@mail.de",
  addresses: [
    {
      city: "Berlin",
      zipCode: "10000",
      streetAndNumber: "Teststrasse 2",
      country: "Deutschland",
    },
  ],
});

test("should open and render the table", async ({ page, backendMock }) => {
  backendMock.intercept({
    method: "GET",
    path: "/api/",
    reply: { body: [john] },
  });

  const customerPage = await CustomerPage.open(page);
  await expect(customerPage.table).toContainText("John");
  await expect(customerPage.table).toContainText("Doe");
});

test("should display a newly added customer", async ({ page, backendMock }) => {
  backendMock
    .intercept({ method: "GET", path: "/api/", reply: { body: [john] } })
    .intercept({
      method: "POST",
      path: "/api/",
      reply: { body: ben },
    });

  const customerPage = await CustomerPage.open(page);
  await expect(customerPage.table).toContainText("John");

  await customerPage.addCustomer(ben);
  await expect(customerPage.table).toContainText("Benjamin");
  await expect(customerPage.table).toContainText("Utzer");
});
