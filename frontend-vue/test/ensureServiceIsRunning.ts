import type { FullConfig } from "@playwright/test";

export default async function ensureServiceIsRunning(
  config: FullConfig
): Promise<void> {
  const baseURL = config.projects[0]?.use.baseURL;
  if (!baseURL) {
    throw new Error("base url is not set");
  }
  const response = await fetch(baseURL).catch(() => undefined);
  if (!response?.ok) {
    throw new Error(
      `Could not reach ${baseURL}, please make sure that the application is actually running`
    );
  }
}
