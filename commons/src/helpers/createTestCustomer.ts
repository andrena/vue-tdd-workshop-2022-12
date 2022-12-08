import { Customer } from "../model/Customer";

export function createTestCustomer(overrides?: Partial<Customer>): Customer {
  return {
    id: "",
    firstName: "",
    lastName: "",
    addresses: [],
    phoneNumber: "",
    emailAddress: "",
    status: "inactive",
    ...overrides,
  };
}
