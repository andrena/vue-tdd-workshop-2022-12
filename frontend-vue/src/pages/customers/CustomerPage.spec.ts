import { fireEvent, render } from "@testing-library/vue";
import CustomerPage from "./CustomerPage.vue";
import { flushPromises } from "../../test-utils/flushPromises";
import type { CustomerUnsaved } from "commons";
import { CustomerRepositoryKey } from "../../services/CustomerRepository";
import { CustomerRepositoryMock } from "../../test-utils/CustomerRepositoryMock";
import { describe, expect, it } from "vitest";

async function renderPageAndWaitForData() {
  const page = render(CustomerPage, {
    global: {
      provide: {
        [CustomerRepositoryKey as symbol]: new CustomerRepositoryMock(),
      },
    },
  });
  await flushPromises();
  return page;
}

describe("CustomerPage", () => {
  it("should contain the right title", async () => {
    const page = await renderPageAndWaitForData();

    const [mainHeading] = page.getAllByRole("heading");

    expect(mainHeading).toHaveTextContent("Customer List");
  });

  it("should load the customers from the backend", async () => {
    const page = await renderPageAndWaitForData();

    expect(page.getByText("Jane Doe")).toBeInTheDocument();
    expect(page.getByText("Benjamin Utzer")).toBeInTheDocument();
  });

  it("should create a new customer and add it to the table", async () => {
    const page = await renderPageAndWaitForData();

    const albert: CustomerUnsaved = {
      firstName: "Albert",
      lastName: "Zweistein",
      addresses: [
        {
          streetAndNumber: "Street 2",
          zipCode: "12345",
          city: "City",
          country: "Country",
        },
      ],
      emailAddress: "e2m2c4@mail.de",
      phoneNumber: "+4912345678",
    };

    await fireEvent.update(page.getByLabelText("First name"), albert.firstName);
    await fireEvent.update(page.getByLabelText("Last name"), albert.lastName);
    await fireEvent.update(
      page.getByLabelText("Email address"),
      albert.emailAddress
    );
    await fireEvent.update(
      page.getByLabelText("Phone number"),
      albert.phoneNumber
    );
    await fireEvent.update(
      page.getByLabelText("Street and number"),
      albert.addresses[0]!.streetAndNumber
    );
    await fireEvent.update(
      page.getByLabelText("Zip code"),
      albert.addresses[0]!.zipCode
    );
    await fireEvent.update(
      page.getByLabelText("City"),
      albert.addresses[0]!.city
    );
    await fireEvent.update(
      page.getByLabelText("Country"),
      albert.addresses[0]!.country
    );
    await fireEvent.click(page.getByText("Add customer"));

    await flushPromises();

    expect(page.getByText("Albert Zweistein")).toBeInTheDocument();
  });

  it("should delete a customer and remove it from the table", async () => {
    const page = await renderPageAndWaitForData();

    await fireEvent.click(page.getAllByText("Remove").at(0)!);
    await flushPromises();

    expect(page.queryByText("Benjamin Utzer")).not.toBeInTheDocument();
  });

  it("should start the activation of a customer and update it in the table", async () => {
    const page = await renderPageAndWaitForData();

    await fireEvent.click(page.getAllByText("Send activation").at(0)!);
    await flushPromises();

    expect(page.getByText("pending")).toBeInTheDocument();
  });
});
