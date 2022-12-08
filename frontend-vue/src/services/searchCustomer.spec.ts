import { createTestCustomer } from "commons";
import { searchCustomer } from "./searchCustomer";
import { describe, expect, it } from "vitest";

const ben = createTestCustomer({
  firstName: "Benjamin",
  lastName: "Utzer",
  addresses: [
    {
      city: "Berlin",
      country: "Deutschland",
      zipCode: "24680",
      streetAndNumber: "Strasse 1",
    },
    {
      city: "Nassau",
      country: "Bahamas",
      zipCode: "00000",
      streetAndNumber: "Steuerfluchtstrasse 99",
    },
  ],
  phoneNumber: "+49123456789",
  emailAddress: "bu@mail.de",
});
const jane = createTestCustomer({
  firstName: "Jane",
  lastName: "Doe",
  addresses: [
    {
      city: "Frankfurt",
      country: "Deutschland",
      zipCode: "13579",
      streetAndNumber: "Allee 2",
    },
  ],
  phoneNumber: "+49987654321",
  emailAddress: "jd@mail.de",
});

describe("with only one word in the search", () => {
  it("has an empty dummy test, so the suite does not fail", () => {
    // you can start with deleting this test
  });

  it.skip("should return every item for an empty search", () => {
    const result = searchCustomer("", [ben, jane]);

    expect(result).toContain(ben);
    expect(result).toContain(jane);
  });

  it.skip("should return a customer whose first name is the search string", () => {
    const result = searchCustomer("Benjamin", [ben, jane]);

    expect(result).toEqual([ben]);
  });

  it.skip("should not change the original array", () => {
    const original = [ben, jane];
    const originalCopy = [...original];
    searchCustomer("Benjamin", original);

    expect(original).toEqual(originalCopy);
  });

  it.skip("should return a new  array", () => {
    const original = [ben, jane];
    const result = searchCustomer("", original);

    expect(result).toEqual(original);
    expect(result).not.toBe(original);
  });

  it.skip("should return a customer whose first name contains the search string", () => {
    const result = searchCustomer("Ben", [ben, jane]);

    expect(result).toEqual([ben]);
  });

  it.skip("should return a customer whose last name contains the search string", () => {
    const result = searchCustomer("Utz", [ben, jane]);

    expect(result).toEqual([ben]);
  });

  it.skip("should return a customer whose phoneNumber contains the search string", () => {
    const result = searchCustomer("123456", [ben, jane]);

    expect(result).toEqual([ben]);
  });

  it.skip("should return a customer whose emailAddress contains the search string", () => {
    const result = searchCustomer("bu@", [ben, jane]);

    expect(result).toEqual([ben]);
  });

  describe("addresses", () => {
    it.skip("should return a customer whose first address has a city containing the search string", () => {
      const result = searchCustomer("Ber", [ben, jane]);

      expect(result).toEqual([ben]);
    });

    it.skip("should return a customer whose first address has a street containing the search string", () => {
      const result = searchCustomer("Stra", [ben, jane]);

      expect(result).toEqual([ben]);
    });

    it.skip("should return a customer whose first address has a zipCode containing the search string", () => {
      const result = searchCustomer("246", [ben, jane]);

      expect(result).toEqual([ben]);
    });

    it.skip("should return a customer whose first address has a country containing the search string", () => {
      const result = searchCustomer("eutsch", [ben, jane]);

      expect(result).toEqual([ben, jane]);
    });

    it.skip("should return a customer whose second address has a city containing the search string", () => {
      const result = searchCustomer("sau", [ben, jane]);

      expect(result).toEqual([ben]);
    });
  });
});

// TODO enable this describe block
describe.skip("with multiple words in the search", () => {
  // ...
});

// TODO enable this describe block
describe.skip("ignoring case", () => {
  // ...
});
