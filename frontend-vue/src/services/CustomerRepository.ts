import type { Customer, CustomerUnsaved } from "commons";
import type { InjectionKey } from "vue";

export const CustomerRepositoryKey: InjectionKey<CustomerRepository> =
  Symbol("CustomerRepository");

export interface CustomerRepository {
  readonly customers: Customer[];

  init(): Promise<void>;

  add(customer: CustomerUnsaved): Promise<void>;

  delete(customer: Customer): Promise<void>;
}
