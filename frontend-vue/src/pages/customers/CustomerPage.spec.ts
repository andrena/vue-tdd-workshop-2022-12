import { fireEvent, render } from "@testing-library/vue";
import CustomerPage from "./CustomerPage.vue";
import { flushPromises } from "../../test-utils/flushPromises";
import type { CustomerUnsaved } from "commons";
import { describe, expect, it } from "vitest";

describe("CustomerPage", () => {
  it("should contain the right title", () => {
    const page = render(CustomerPage);

    const [mainHeading] = page.getAllByRole("heading");

    expect(mainHeading).toHaveTextContent("Customer List");
  });

  it("should load the customers from the backend", () => {
    const page = render(CustomerPage);

    expect(page.getByText("John Doe")).toBeInTheDocument();
    expect(page.getByText("Max Mustermann")).toBeInTheDocument();
  });

  it("should create a new customer and add it to the table", async () => {
    const page = render(CustomerPage);

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
});
