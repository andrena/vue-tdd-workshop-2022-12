import { fireEvent, render, type RenderResult } from "@testing-library/vue";
import AddCustomerForm from "./AddCustomerForm.vue";
import type { CustomerUnsaved } from "commons";
import { describe, expect, it } from "vitest";

describe("AddCustomerForm", () => {
  const firstName = "Max";
  const lastName = "Mustermann";
  const emailAddress = "m.m@mail.de";
  const phoneNumber = "+49100000";
  const streetAndNumber = "Straße 1";
  const zipCode = "12345";
  const city = "Berlin";
  const country = "Deutschland";

  const unsavedCustomer: CustomerUnsaved = {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    addresses: [{ streetAndNumber, zipCode, city, country }],
  };

  async function fillInValidValues(form: RenderResult) {
    await fireEvent.update(form.getByLabelText("First name"), firstName);
    await fireEvent.update(form.getByLabelText("Last name"), lastName);
    await fireEvent.update(form.getByLabelText("Email address"), emailAddress);
    await fireEvent.update(form.getByLabelText("Phone number"), phoneNumber);
    await fireEvent.update(
      form.getByLabelText("Street and number"),
      streetAndNumber
    );
    await fireEvent.update(form.getByLabelText("Zip code"), zipCode);
    await fireEvent.update(form.getByLabelText("City"), city);
    await fireEvent.update(form.getByLabelText("Country"), country);
  }

  it("should render a form with the expected inputs", () => {
    const form = render(AddCustomerForm);

    expect(form.getByTitle("Add a Customer")).toBeInTheDocument();
    expect(form.getByLabelText("First name")).toBeInTheDocument();
    expect(form.getByLabelText("Last name")).toBeInTheDocument();
    expect(form.getByLabelText("Email address")).toBeInTheDocument();
    expect(form.getByLabelText("Phone number")).toBeInTheDocument();
  });

  it("should add a customer when filling the form and submitting it", async () => {
    const form = render(AddCustomerForm);

    await fillInValidValues(form);
    await fireEvent.click(form.getByText("Add customer"));

    expect(form.emitted("newCustomer")).toEqual([[unsavedCustomer]]);
  });

  it("should reset the formular after submitting", async () => {
    const form = render(AddCustomerForm);

    await fillInValidValues(form);
    await fireEvent.click(form.getByText("Add customer"));

    expect(form.getByLabelText("First name")).toHaveValue("");
    expect(form.getByLabelText("Last name")).toHaveValue("");
    expect(form.getByLabelText("Email address")).toHaveValue("");
    expect(form.getByLabelText("Phone number")).toHaveValue("");
    expect(form.getByLabelText("Street and number")).toHaveValue("");
    expect(form.getByLabelText("Zip code")).toHaveValue("");
    expect(form.getByLabelText("City")).toHaveValue("");
    expect(form.getByLabelText("Country")).toHaveValue("");
  });

  it("should not save a customer when submitting without inputs", async () => {
    const form = render(AddCustomerForm);

    await fireEvent.click(form.getByText("Add customer"));

    expect(form.emitted("newCustomer")).toBeUndefined();
  });

  it("should not save a customer when submitting with an invalid email", async () => {
    const form = render(AddCustomerForm);

    await fillInValidValues(form);
    await fireEvent.update(form.getByLabelText("Email address"), "invalid");
    await fireEvent.click(form.getByText("Add customer"));

    expect(form.emitted("newCustomer")).toBeUndefined();
  });

  describe("multiple addresses", () => {
    it("should add an address input when clicking on 'Add new address'", async () => {
      // ...
    });
  });
});
