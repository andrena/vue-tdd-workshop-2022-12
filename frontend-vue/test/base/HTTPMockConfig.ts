import assert from "node:assert/strict";

type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export interface HTTPMockConfigEntry {
  readonly method?: HTTPMethod;
  readonly path: string;
  readonly body?: unknown;
  readonly reply: { readonly statusCode?: number; readonly body?: unknown };
}

export class HTTPMockConfig {
  constructor(private readonly routeConfigs: HTTPMockConfigEntry[]) {}

  intercept(routeConfig: HTTPMockConfigEntry): this {
    this.routeConfigs.push(routeConfig);
    return this;
  }
}

function parseRequestBody(requestBody: string | Buffer | undefined): unknown {
  if (requestBody === undefined) {
    return undefined;
  }
  if (requestBody instanceof Buffer) {
    requestBody = requestBody.toString("utf-8");
  }
  return JSON.parse(requestBody);
}

export function findConfig(
  routeConfigs: HTTPMockConfigEntry[],
  requestMethod: string,
  requestPath: string,
  requestBody: string | Buffer | undefined
): HTTPMockConfigEntry {
  const parsedBody = parseRequestBody(requestBody);

  const routeConfig = routeConfigs.find((config) => {
    if (config.method && config.method !== requestMethod) return false;
    if (config.path && config.path !== requestPath) return false;

    if (config.body && requestBody && !deepEqual(config.body, parsedBody))
      return false;

    return true;
  });

  if (!routeConfig) {
    const parsedBodyString = parsedBody ? JSON.stringify(parsedBody) : '';
    throw new Error(
      `No mock response defined for ${requestMethod} ${requestPath} ${parsedBodyString}`
    );
  }
  return routeConfig;
}

function deepEqual(o1: unknown, o2: unknown) {
  try {
    assert.deepEqual(o1, o2);
    return true;
  } catch {
    return false;
  }
}
