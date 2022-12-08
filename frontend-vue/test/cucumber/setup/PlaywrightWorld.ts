import type { Browser, Page } from "@playwright/test";
import { World } from "@cucumber/cucumber";
import type { BrowserContext } from "playwright";
import type { BasePage } from "../../pages/BasePage";
import crypto from "node:crypto";
import { throwError } from "../../../throwError";
import { ScenarioData } from "./ScenarioData";

type PageConstructor<
  TPage extends BasePage,
  TOpenArgs extends unknown[]
  // eslint-disable-next-line @typescript-eslint/ban-types -- `Function` is used because `new (...) => T` can't be used, because the constructors are private
> = Function & {
  open: (page: Page, ...args: TOpenArgs) => Promise<TPage>;
};

export class PlaywrightWorld extends World {
  private browser?: Browser;
  private context?: BrowserContext;
  private _playwrightPage?: Page;

  private currentPage?: BasePage;

  readonly testID = crypto.randomUUID();

  readonly data = new ScenarioData();

  async init(browser: Browser): Promise<void> {
    this.context = await browser.newContext({
      baseURL: "http://localhost:8080",
    });
    this._playwrightPage = await this.context.newPage();
  }

  async tearDown(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }

  get playwrightPage(): Page {
    return this._playwrightPage ?? throwError("init() not called");
  }

  get<TPage extends BasePage, TOpenArgs extends unknown[]>(
    pageConstructor: PageConstructor<TPage, TOpenArgs>
  ): TPage {
    if (!this.currentPage) {
      throw new Error("No page was ever opened!");
    }
    if (!(this.currentPage instanceof pageConstructor)) {
      throw new Error(
        `Unexpected page, ${this.currentPage.constructor.name} is currently open`
      );
    }
    return this.currentPage as TPage;
  }

  async open<TPage extends BasePage, TOpenArgs extends unknown[]>(
    pageConstructor: PageConstructor<TPage, TOpenArgs>,
    ...args: TOpenArgs
  ): Promise<TPage> {
    const page = await pageConstructor.open(this.playwrightPage, ...args);
    this.currentPage = page;
    return page;
  }

  replace(string: string): string {
    return string.replaceAll("#testid#", this.testID);
  }
}
