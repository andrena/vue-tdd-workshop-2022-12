import { fireEvent, render } from "@testing-library/vue";
import CustomerTable from "./CustomerTable.vue";
import { createTestCustomer, Customer } from "commons";
import { describe, expect, it } from "vitest";

function renderTable(customers: Customer[] = []) {
  return render(CustomerTable, {
    props: { customers },
  });
}

describe("CustomerTable", () => {
  const jane = createTestCustomer({
    firstName: "Jane",
    lastName: "Doe",
    emailAddress: "jane.doe@mail.de",
    phoneNumber: "+49122222222",
  });

  const ben = createTestCustomer({
    firstName: "Benjamin",
    lastName: "Utzer",
    emailAddress: "ben.utzer@mail.de",
    phoneNumber: "+49122222220",
  });

  it("should render a table with header", () => {
    const customerTable = renderTable();

    expect(customerTable.getByRole("table")).toBeInTheDocument();
    const columnHeaders = customerTable.getAllByRole("columnheader");
    expect(columnHeaders[0]).toHaveTextContent("Name");
    expect(columnHeaders[1]).toHaveTextContent("Email Adresse");
    expect(columnHeaders[2]).toHaveTextContent("Telefonnummer");
    expect(columnHeaders[3]).toHaveTextContent("Status");
  });

  it("should render a row for each customer", () => {
    const customers = [jane, ben];
    const table = renderTable(customers);

    const rows = table.getAllByRole("row");
    expect(rows.length).toBe(3);

    const [_header, janeRow, benRow] = rows;
    expect(janeRow).toHaveTextContent("Jane");
    expect(benRow).toHaveTextContent("Benjamin");
  });

  it.skip("should filter the rows when submitting a search", async () => {
    const customers = [jane, ben];
    const table = renderTable(customers);

    await fireEvent.update(table.getByRole("searchbox"), "Jane");
    await fireEvent.submit(table.getByRole("search"));

    const rows = table.getAllByRole("row");
    expect(rows.length).toBe(2);

    const [_header, janeRow] = rows;
    expect(janeRow).toHaveTextContent("Jane");
  });
});
