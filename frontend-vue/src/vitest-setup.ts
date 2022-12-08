import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/vue";
import { afterEach, beforeEach, expect } from "vitest";
import { webcrypto } from "node:crypto";
import { backendMockReset } from "./test-utils/backendMock";

expect.extend(matchers);

globalThis.crypto = webcrypto as unknown as typeof globalThis.crypto;

beforeEach(() => {
  backendMockReset();
});

afterEach(() => {
  cleanup();
});
