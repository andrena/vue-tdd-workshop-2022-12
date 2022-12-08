import type { CustomerRepository } from "./CustomerRepository";
import type { Customer, CustomerUnsaved } from "commons";
import { httpRequest } from "./httpRequest";

export class CustomerRepositoryImpl implements CustomerRepository {
  readonly customers: Customer[] = [];

  async init(): Promise<void> {
    this.customers.splice(0, this.customers.length);
    const customers = await httpRequest<Customer[]>({ uri: "api/" });
    this.customers.push(...customers);
  }

  async add(customer: CustomerUnsaved): Promise<void> {
    this.customers.push(
      await httpRequest<Customer>({
        method: "POST",
        uri: "api/",
        json: customer,
      })
    );
  }

  async delete(customer: Customer): Promise<void> {
    if (!this.customers.find((item) => item.id === customer.id)) {
      return;
    }
    await httpRequest({
      method: "DELETE",
      uri: "api/:id",
      params: { id: customer.id },
    });

    // search again after deleting, because the list might have changed meanwhile
    // (when multiple users are deleted at the same time)
    const index = this.customers.findIndex((item) => item.id === customer.id);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  async startActivation(customer: Customer): Promise<void> {
    const index = this.customers.findIndex((item) => item.id === customer.id);
    if (index > -1) {
      this.customers[index] = await httpRequest({
        method: "POST",
        uri: "api/send/:id",
        params: { id: customer.id },
      });
    }
  }

  async completeActivation(id: string): Promise<Customer> {
    const activatedCustomer: Customer = await httpRequest<Customer>({
      uri: "api/activate/:id",
      params: { id },
    });
    const index = this.customers.findIndex((item) => item.id === id);
    if (index > -1) {
      this.customers[index] = activatedCustomer;
    } else {
      this.customers.push(activatedCustomer);
    }
    return activatedCustomer;
  }
}
