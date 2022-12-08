import type { CustomerRepository } from "../services/CustomerRepository";
import { createTestCustomer, type Customer } from "commons";

export const jane = createTestCustomer({
  id: "id1",
  firstName: "Jane",
  lastName: "Doe",
});

export const ben = createTestCustomer({
  id: "id2",
  firstName: "Benjamin",
  lastName: "Utzer",
  emailAddress: "ben.utzer@mail.de",
});

export class CustomerRepositoryMock implements CustomerRepository {
  constructor(readonly customers: Customer[] = []) {}

  // eslint-disable-next-line @typescript-eslint/require-await -- the method in the interface is async
  async add(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- the method in the interface is async
  async delete(customer: Customer): Promise<void> {
    this.customers.splice(
      this.customers.findIndex((item) => item.id === customer.id),
      1
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- the method in the interface is async
  async init(): Promise<void> {
    this.customers.push(ben, jane);
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- the method in the interface is async
  async startActivation(customer: Customer): Promise<void> {
    this.customers[
      this.customers.findIndex((item) => item.id === customer.id)
    ] = {
      ...customer,
      status: "pending",
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- the method in the interface is async
  async completeActivation(id: string): Promise<Customer> {
    return createTestCustomer({
      ...ben,
      id,
      status: "active",
    });
  }
}
