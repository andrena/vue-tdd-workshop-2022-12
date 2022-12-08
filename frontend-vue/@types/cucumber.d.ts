import "@cucumber/cucumber";
import type { PlaywrightWorld } from "../test/cucumber/setup/PlaywrightWorld";

// augments the default Cucumber world with the custom PlaywrightWorld,
// so `this` is mostly correctly typed automatically

declare module "@cucumber/cucumber" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- used for declaration merging
  export interface IWorld extends PlaywrightWorld {}
}
