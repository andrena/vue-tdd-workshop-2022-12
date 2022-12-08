import type { Address, Customer } from "commons";

export function searchCustomer(search: string, people: Customer[]): Customer[] {
  const keywords = search.split(" ");
  return people.filter((customer) =>
    keywords.some((keyword) => customerContainsKeyword(customer, keyword))
  );
}

function stringContainsKeyword(value: string, keyword: string): boolean {
  return value.toLowerCase().includes(keyword.toLowerCase());
}

function addressContainsKeyword(address: Address, keyword: string) {
  return (
    stringContainsKeyword(address.city, keyword) ||
    stringContainsKeyword(address.streetAndNumber, keyword) ||
    stringContainsKeyword(address.zipCode, keyword) ||
    stringContainsKeyword(address.country, keyword)
  );
}

function customerContainsKeyword(customer: Customer, keyword: string) {
  return (
    stringContainsKeyword(customer.firstName, keyword) ||
    stringContainsKeyword(customer.lastName, keyword) ||
    customer.addresses.some((address) =>
      addressContainsKeyword(address, keyword)
    ) ||
    stringContainsKeyword(customer.phoneNumber, keyword) ||
    stringContainsKeyword(customer.emailAddress, keyword)
  );
}
