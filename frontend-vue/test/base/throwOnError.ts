import { expect } from "@playwright/test";

export function throwOnError(error: unknown): void {
  // use expect to not cause an unhandled rejection (this always fails)
  expect(rethrow).not.toThrow();

  function rethrow() {
    throw error;
  }
}
