import { fireEvent, render } from "@testing-library/vue";
import AddressInput from "./AddressInput.vue";
import type { Address } from "commons";
import { describe, expect, it } from "vitest";

describe("AddressInput", () => {
  const baseAddress: Address = {
    streetAndNumber: "Strasse 2",
    zipCode: "12345",
    city: "City",
    country: "Country",
  };

  it("should display a header", () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    expect(addressInput.getByRole("heading")).toHaveTextContent("Address");
  });

  it("should display the initial values in the corresponding input fields", () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    expect(addressInput.getByLabelText("Street and number")).toHaveValue(
      baseAddress.streetAndNumber
    );
    expect(addressInput.getByLabelText("Zip code")).toHaveValue(
      baseAddress.zipCode
    );
    expect(addressInput.getByLabelText("City")).toHaveValue(baseAddress.city);
    expect(addressInput.getByLabelText("Country")).toHaveValue(
      baseAddress.country
    );
  });

  it("should emit an update when changing the street and number", async () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    const streetAndNumber = "newStreet 4";

    await fireEvent.update(
      addressInput.getByLabelText("Street and number"),
      streetAndNumber
    );

    expect(addressInput.emitted("update:address")).toEqual([
      [{ ...baseAddress, streetAndNumber }],
    ]);
  });

  it("should emit an update when changing the zip code", async () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    const zipCode = "98765";

    await fireEvent.update(addressInput.getByLabelText("Zip code"), zipCode);

    expect(addressInput.emitted("update:address")).toEqual([
      [{ ...baseAddress, zipCode }],
    ]);
  });

  it("should emit an update when changing the city", async () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    const city = "Newcity";

    await fireEvent.update(addressInput.getByLabelText("City"), city);

    expect(addressInput.emitted("update:address")).toEqual([
      [{ ...baseAddress, city }],
    ]);
  });

  it("should emit an update when changing the country", async () => {
    const addressInput = render(AddressInput, {
      props: { address: baseAddress },
    });

    const country = "Newcountry";

    await fireEvent.update(addressInput.getByLabelText("Country"), country);

    expect(addressInput.emitted("update:address")).toEqual([
      [{ ...baseAddress, country }],
    ]);
  });
});
