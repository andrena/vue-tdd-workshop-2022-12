import { render } from "@testing-library/vue";
import CustomerTableRow from "./CustomerTableRow.vue";
import type { Customer } from "commons";
import { createTestCustomer } from "commons";
import { describe, expect, it } from "vitest";

function renderRow(customer: Customer) {
  return render(CustomerTableRow, { props: { customer } });
}

describe("CustomerTableRow", () => {
  const jane = createTestCustomer({
    firstName: "Jane",
    lastName: "Doe",
    emailAddress: "jane.doe@mail.de",
    phoneNumber: "+49122222222",
  });

  it("should render a customer", () => {
    const row = renderRow(jane);

    const [name, email, phoneNumber, status] = row.getAllByRole("cell");
    expect(name).toHaveTextContent("Jane Doe");
    expect(email).toHaveTextContent("jane.doe@mail.de");
    expect(phoneNumber).toHaveTextContent("+49122222222");
    expect(status).toHaveTextContent("inactive");
  });
});
