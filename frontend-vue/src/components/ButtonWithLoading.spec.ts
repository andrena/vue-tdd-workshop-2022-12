import { fireEvent, render } from "@testing-library/vue";
import ButtonWithLoading from "./ButtonWithLoading.vue";
import { flushPromises } from "../test-utils/flushPromises";
import { describe, expect, it, vi } from "vitest";

describe("ButtonWithLoading", () => {
  it("should show an enabled button", () => {
    const button = render(ButtonWithLoading, {
      props: { handler: () => undefined },
    });

    expect(button.getByRole("button")).toBeEnabled();
  });

  it("should execute the provided function on click", async () => {
    const handler = vi.fn();

    const button = render(ButtonWithLoading, { props: { handler } });
    await fireEvent.click(button.getByRole("button"));

    expect(handler).toHaveBeenCalled();
  });

  it("should show a progressbar and disable the button until the handler is done", async () => {
    let resolver!: () => void;
    const handler = () =>
      new Promise<void>((resolve) => {
        resolver = resolve;
      });
    const button = render(ButtonWithLoading, { props: { handler } });
    await fireEvent.click(button.getByRole("button"));

    expect(button.getByRole("progressbar")).toBeInTheDocument();
    expect(button.getByRole("button")).toBeDisabled();

    resolver();
    await flushPromises();

    expect(button.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(button.getByRole("button")).toBeEnabled();
  });
});
