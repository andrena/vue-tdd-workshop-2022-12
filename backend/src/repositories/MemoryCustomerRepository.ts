import { Customer } from "commons";
import customers from "../fixtures/customers.json";
import { randomUUID } from "crypto";
import { NotFoundError } from "../errors/NotFoundError";
import { CustomerRepository } from "./CustomerRepository";

export class MemoryCustomerRepository implements CustomerRepository {
  private readonly customers: Customer[] = [];

  init() {
    this.customers.push(...(customers as Customer[]));
  }

  getAll(): Customer[] {
    return this.customers;
  }

  getById(id: string): Customer | undefined {
    return this.findByIdOrThrow(id);
  }

  create(customer: Customer): Customer {
    const newCustomer: Customer = {
      ...customer,
      id: randomUUID(),
      status: "inactive",
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(customer: Customer): Customer {
    const customerToUpdate = this.findByIdOrThrow(customer.id);
    const index = this.customers.indexOf(customerToUpdate);
    this.customers[index] = customer;
    return customer;
  }

  delete(id: string) {
    const customerToDelete = this.findByIdOrThrow(id);
    this.customers.splice(this.customers.indexOf(customerToDelete), 1);
  }

  private findByIdOrThrow(id: string): Customer {
    return (
      this.customers.find((customer) => customer.id === id) ??
      this.throwNotFound()
    );
  }

  private throwNotFound(): never {
    throw new NotFoundError();
  }
}
