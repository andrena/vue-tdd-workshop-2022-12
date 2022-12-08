import { httpRequest } from "../services/httpRequest";
import { backendMock } from "./backendMock";
import { describe, expect, it, vi } from "vitest";

describe("backendMock", () => {
  it("should throw when making an unregistered request", async () => {
    vi.spyOn(console, "error").mockResolvedValue(undefined);
    await expect(httpRequest({ uri: "api/" })).rejects.toThrow();
  });

  it("should respond based on path", async function () {
    backendMock
      .intercept({ path: "/api/1", reply: { body: 1 } })
      .intercept({ path: "/api/2", reply: { body: 2 } });

    expect(await httpRequest({ uri: "api/1" })).toBe(1);
    expect(await httpRequest({ uri: "api/2" })).toBe(2);
  });

  it("should respond multiple times", async function () {
    backendMock.intercept({ path: "/api/1", reply: { body: 1 } });

    expect(await httpRequest({ uri: "api/1" })).toBe(1);
    expect(await httpRequest({ uri: "api/1" })).toBe(1);
  });

  it("should respond based on post body content", async function () {
    backendMock
      .intercept({
        path: "/api/post",
        body: { x: 1 },
        reply: { body: 1 },
      })
      .intercept({
        path: "/api/post",
        body: { x: 2 },
        reply: { body: 2 },
      });

    expect(
      await httpRequest({ method: "POST", uri: "api/post", json: { x: 1 } })
    ).toBe(1);
    expect(
      await httpRequest({ method: "POST", uri: "api/post", json: { x: 2 } })
    ).toBe(2);
  });
});
