import { render } from "@testing-library/vue";
import { CustomerRepositoryKey } from "../../services/CustomerRepository";
import { CustomerRepositoryMock } from "../../test-utils/CustomerRepositoryMock";
import { flushPromises } from "../../test-utils/flushPromises";
import ActivationPage from "./ActivationPage.vue";
import { router } from "../../router";
import { describe, expect, it } from "vitest";

async function renderPageAndWaitForData() {
  const page = render(ActivationPage, {
    global: {
      provide: {
        [CustomerRepositoryKey as symbol]: new CustomerRepositoryMock(),
      },
      plugins: [router],
    },
    props: { id: "123" },
  });
  await flushPromises();
  return page;
}

describe("ActivationPage", () => {
  it("should display an activation confirmation", async () => {
    const page = await renderPageAndWaitForData();

    expect(page.getByText("Benjamin Utzer <ben.utzer@mail.de> is now active!"));
  });
});
