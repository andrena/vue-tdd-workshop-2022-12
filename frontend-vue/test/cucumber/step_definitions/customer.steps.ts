import { Given } from "@cucumber/cucumber";
import { CustomerPage } from "../../pages/CustomerPage";

Given(/^the starting page is loaded$/, async function () {
  await this.open(CustomerPage);
});
