import { render } from "@testing-library/vue";
import AddCustomerForm from "./AddCustomerForm.vue";
import { describe, expect, it } from "vitest";

describe("AddCustomerForm", () => {
  it.skip("should render a form with the expected inputs", () => {
    const form = render(AddCustomerForm);

    expect(form.getByTitle("Add a Customer")).toBeInTheDocument();
    expect(form.getByLabelText("First name")).toBeInTheDocument();
    expect(form.getByLabelText("Last name")).toBeInTheDocument();
    expect(form.getByLabelText("Email address")).toBeInTheDocument();
    expect(form.getByLabelText("Phone number")).toBeInTheDocument();
    expect(form.getByLabelText("Street and number")).toBeInTheDocument();
    expect(form.getByLabelText("Zip code")).toBeInTheDocument();
    expect(form.getByLabelText("City")).toBeInTheDocument();
    expect(form.getByLabelText("Country")).toBeInTheDocument();
  });
});
