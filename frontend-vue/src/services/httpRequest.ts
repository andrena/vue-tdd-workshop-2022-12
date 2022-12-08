import ky from "ky";
import { backendOriginForTests } from "../test-utils/backendOriginForTests";
import urlcat from "urlcat";

export interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  uri: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  json?: unknown;
}

// automatically use absolute URL with host for unit tests
const prefixUrl =
  process.env.NODE_ENV === "test" ? backendOriginForTests : undefined;

export async function httpRequest<T>({
  uri,
  params = {},
  method = "GET",
  headers = {},
  json,
}: HttpRequestOptions): Promise<T> {
  try {
    return await ky(urlcat(uri, params), {
      prefixUrl: prefixUrl,
      method,
      headers,
      json,
      hooks: {
        beforeRequest: [
          (request: Request) => {
            // Workaround to force ky to not clone the request, to avoid https://github.com/microsoft/playwright/issues/6479.
            // Otherwise, Playwright can't see the POST body.
            request.clone = () => request;
            return request;
          },
        ],
      },
    }).json();
  } catch (error) {
    // Hack to print the whole error (including cause) in unit-tests
    if (process.env.NODE_ENV === "test") {
      console.error(error);
    }
    throw error;
  }
}
