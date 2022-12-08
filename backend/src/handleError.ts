import { ExtendableContext, Next } from "koa";

export async function handleError(ctx: ExtendableContext, next: Next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status ?? 500;
  }
}
