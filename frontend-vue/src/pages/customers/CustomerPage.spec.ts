import { render } from "@testing-library/vue";
import CustomerPage from "./CustomerPage.vue";
import { describe, expect, it } from "vitest";

describe("CustomerPage", () => {
  it("should contain the right title", () => {
    const page = render(CustomerPage);

    const [mainHeading] = page.getAllByRole("heading");

    expect(mainHeading).toHaveTextContent("Customer List");
  });

  it("should load the customers from the backend", () => {
    const page = render(CustomerPage);

    expect(page.getByText("John Doe")).toBeInTheDocument();
    expect(page.getByText("Max Mustermann")).toBeInTheDocument();
  });
});
