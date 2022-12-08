import { createApp } from "vue";
import App from "./App.vue";
import ErrorPage from "./pages/error/ErrorPage.vue";
import { CustomerRepositoryImpl } from "./services/CustomerRepositoryImpl";
import { CustomerRepositoryKey } from "./services/CustomerRepository";
import "./assets/main.css";
import { router } from "./router";

const app = createApp(App);
app.config.errorHandler = errorHandler;
app.provide(CustomerRepositoryKey, new CustomerRepositoryImpl());

app.use(router);

app.mount(document.body);

function errorHandler(error: unknown) {
  // replace the whole application with the error page
  app.unmount();
  createApp(ErrorPage, { error }).mount(document.body);

  // rethrow the error, so it's considered an unhandled error
  throw error;
}
