import { Address } from "./Address";

export type CustomerStatus = "inactive" | "pending" | "active";

export interface CustomerUnsaved {
  firstName: string;
  lastName: string;
  addresses: Address[];
  phoneNumber: string;
  emailAddress: string;
}

export interface Customer extends CustomerUnsaved {
  id: string;
  status: CustomerStatus;
}
