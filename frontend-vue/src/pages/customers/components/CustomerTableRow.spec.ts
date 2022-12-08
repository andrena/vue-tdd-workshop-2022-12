import { fireEvent, render } from "@testing-library/vue";
import CustomerTableRow from "./CustomerTableRow.vue";
import type { Customer, CustomerStatus } from "commons";
import { createTestCustomer } from "commons";
import { CustomerRepositoryKey } from "../../../services/CustomerRepository";
import { CustomerRepositoryMock } from "../../../test-utils/CustomerRepositoryMock";
import { describe, expect, it } from "vitest";

function renderRow(customer: Customer) {
  const repository = new CustomerRepositoryMock([customer]);
  return {
    repository,
    row: render(CustomerTableRow, {
      props: { customer },
      global: {
        provide: {
          [CustomerRepositoryKey as symbol]: repository,
        },
      },
    }),
  };
}

describe("CustomerTableRow", () => {
  const jane = createTestCustomer({
    firstName: "Jane",
    lastName: "Doe",
    emailAddress: "jane.doe@mail.de",
    phoneNumber: "+49122222222",
  });

  it("should render a customer", () => {
    const { row } = renderRow(jane);

    const [name, email, phoneNumber, status] = row.getAllByRole("cell");
    expect(name).toHaveTextContent("Jane Doe");
    expect(email).toHaveTextContent("jane.doe@mail.de");
    expect(phoneNumber).toHaveTextContent("+49122222222");
    expect(status).toHaveTextContent("inactive");
  });

  describe("remove Button", () => {
    it("should render a 'Remove' button", () => {
      const { row } = renderRow(jane);

      expect(row.getByText("Remove")).toBeInTheDocument();
    });

    it("should remove the customer when clicking on the Remove button", async () => {
      const { row, repository } = renderRow(jane);

      await fireEvent.click(row.getByText("Remove"));

      expect(repository.customers).toEqual([]);
    });
  });

  describe("Send activation Button", () => {
    it("should render an 'Send activation' button if the user is inactive", () => {
      const { row } = renderRow(jane);

      expect(row.getByText("Send activation")).toBeInTheDocument();
    });

    it.each<CustomerStatus>(["pending", "active"])(
      "should not render an 'Send activation' button if the user is %s",
      (status: CustomerStatus) => {
        const { row } = renderRow({ ...jane, status });

        expect(row.queryByText("Send activation")).not.toBeInTheDocument();
      }
    );

    it("should emit sendActivation when clicking on the 'Send activation' button", async () => {
      const { row, repository } = renderRow(jane);

      await fireEvent.click(row.getByText("Send activation"));
      expect(repository.customers).toEqual([{ ...jane, status: "pending" }]);
    });
  });
});
