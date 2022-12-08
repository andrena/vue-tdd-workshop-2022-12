import type { Page } from "@playwright/test";
import {
  findConfig,
  HTTPMockConfig,
  HTTPMockConfigEntry,
} from "./HTTPMockConfig";

export async function setupPlaywrightNetworkInterceptor(
  page: Page
): Promise<HTTPMockConfig> {
  const routeConfigs: HTTPMockConfigEntry[] = [];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- it's apparently allowed return a promise from the handler, the official docs have an example doing that (see https://playwright.dev/docs/api/class-route#route-fulfill)
  await page.route("/api/*", async (route, request) => {
    const routeConfig = findConfig(
      routeConfigs,
      request.method(),
      new URL(request.url()).pathname,
      request.postDataBuffer() ?? undefined
    );

    return route.fulfill({
      status: routeConfig.reply.statusCode,
      contentType: "application/json",
      body: JSON.stringify(routeConfig.reply.body),
    });
  });

  return new HTTPMockConfig(routeConfigs);
}
