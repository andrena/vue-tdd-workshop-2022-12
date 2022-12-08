import Koa from "koa";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { router } from "./router";
import { handleError } from "./handleError";
import { EmailService } from "./services/EmailService";
import { CustomerRepository } from "./repositories/CustomerRepository";

export interface AppArguments {
  customerRepository: CustomerRepository;
  emailService: EmailService;
}

export function app(args: AppArguments) {
  const app = new Koa();

  const appRouter = router(args.customerRepository, args.emailService);

  app.use(bodyParser());
  app.use(json());
  app.use(appRouter.routes());
  app.use(appRouter.allowedMethods());
  app.use(handleError);

  return app;
}
