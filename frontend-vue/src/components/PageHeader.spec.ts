import PageHeader from "./PageHeader.vue";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";

describe("PageHeader", () => {
  it("should render the msg prop", () => {
    const pageHeader = render(PageHeader);

    expect(pageHeader.getByText("TDD Workshop")).toBeInTheDocument();
  });
});
