import { httpRequest } from "./httpRequest";
import { backendMock } from "../test-utils/backendMock";
import { describe, expect, it } from "vitest";

const response = { test: "somestring" };

describe("httpRequest", () => {
  it("should send a GET http request with the provided options", async () => {
    backendMock.intercept({ path: "/api/test", reply: { body: response } });

    const actual = await httpRequest({
      uri: "api/test",
      method: "GET",
      headers: {},
    });
    expect(actual).toEqual(response);
  });

  it("should send a POST http request with the provided options", async () => {
    const json = {
      oneLastKey: "lastValue",
      key: "Value",
      anotherKey: "anotherValue",
    };
    backendMock.intercept({
      method: "POST",
      path: "/api/test",
      body: json,
      reply: { statusCode: 201, body: response },
    });

    const actual = await httpRequest({
      uri: "api/test",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      json,
    });
    expect(actual).toEqual(response);
  });

  it("should format URLs with placeholders", async () => {
    backendMock.intercept({
      path: "/api/test/evil%26value%23with%3Fspecial%2Fchars?q=1",
      reply: {},
    });
    await httpRequest({
      uri: "api/test/:id",
      params: { id: "evil&value#with?special/chars", q: "1" },
    });
  });
});
