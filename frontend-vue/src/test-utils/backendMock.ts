import { Headers, MockAgent, setGlobalDispatcher } from "undici";
import { backendOriginForTests } from "./backendOriginForTests";
import {
  findConfig,
  HTTPMockConfig,
  HTTPMockConfigEntry,
} from "../../test/base/HTTPMockConfig";

export let backendMock: HTTPMockConfig;

backendMockReset();

export function backendMockReset(): void {
  const routeConfigs: HTTPMockConfigEntry[] = [];
  const mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  mockAgent
    .get(backendOriginForTests)
    .intercept({ path: matchAll, method: matchAll })
    .reply((opts) => {
      if (opts.headers instanceof Headers) {
        throw new Error("Headers not yet implemented");
      }
      if (opts.body !== null && typeof opts.body !== "string") {
        throw new Error(`body type ${String(opts.body)} not yet implemented`);
      }

      const routeConfig = findConfig(
        routeConfigs,
        opts.method,
        opts.path,
        opts.body ?? undefined
      );
      return {
        statusCode: routeConfig.reply.statusCode ?? 200,
        data: routeConfig.reply.body as object,
      };
    })
    .persist();

  backendMock = new HTTPMockConfig(routeConfigs);
  setGlobalDispatcher(mockAgent);
}

function matchAll() {
  return true;
}
