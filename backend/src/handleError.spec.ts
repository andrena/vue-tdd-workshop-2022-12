import { handleError } from "./handleError";
import { ExtendableContext } from "koa";
import { NotFoundError } from "./errors/NotFoundError";
import { describe, expect, it, vi } from "vitest";

describe("handleError", () => {
  it("should call next", () => {
    const nextMock = vi.fn();
    handleError({} as ExtendableContext, nextMock);

    expect(nextMock).toHaveBeenCalled();
  });

  it("should set the status if the error has one", () => {
    const context = {} as ExtendableContext;
    const notFoundError = new NotFoundError();

    const nextMock = vi.fn().mockImplementation(() => {
      throw notFoundError;
    });

    handleError(context, nextMock);

    expect(context.status).toBe(notFoundError.status);
  });

  it("should set the status to 500 by default", () => {
    const context = {} as ExtendableContext;
    const genericError = new Error();

    const nextMock = vi.fn().mockImplementation(() => {
      throw genericError;
    });

    handleError(context, nextMock);

    expect(context.status).toBe(500);
  });
});
