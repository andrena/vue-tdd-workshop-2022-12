import Router from "koa-router";
import { CustomerRepository } from "./repositories/CustomerRepository";
import { EmailService } from "./services/EmailService";

export function router(
  repository: CustomerRepository,
  emailService: EmailService
) {
  const router = new Router();

  repository.init();

  router.get("/", async (ctx) => {
    ctx.body = repository.getAll();
  });

  router.get("/:id", async (ctx) => {
    ctx.body = repository.getById(ctx.params.id);
  });

  router.post("/", async (ctx) => {
    ctx.body = repository.create(ctx.request.body);
    ctx.status = 201;
  });

  router.put("/", async (ctx) => {
    ctx.body = repository.update(ctx.request.body);
    ctx.status = 200;
  });

  router.delete("/:id", async (ctx) => {
    repository.delete(ctx.params.id);
    ctx.status = 204;
  });

  router.post("/send/:id", async (ctx) => {
    const customer = repository.getById(ctx.params.id);
    await emailService.sendEmail(
      customer.emailAddress,
      "Activate your account",
      `Hello ${customer.firstName} ${customer.lastName},\n\nplease open the following link to activate your account:\n\nhttp://localhost:8080/activate/${customer.id}`
    );
    ctx.body = await repository.update({ ...customer, status: "pending" });
    ctx.status = 200;
  });

  router.get("/activate/:id", async (ctx) => {
    const customer = repository.getById(ctx.params.id);
    ctx.body = await repository.update({ ...customer, status: "active" });
    ctx.status = 200;
  });

  return router;
}
