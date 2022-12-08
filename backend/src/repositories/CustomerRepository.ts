import { Customer } from "commons";

export interface CustomerRepository {
  init(): void;

  getAll(): Customer[];

  getById(id: string): Customer | undefined;

  create(customer: Customer): Customer;

  update(customer: Customer): Customer;

  delete(id: string): void;
}
