import { awsRouter } from "./awsRouter";
import { t } from "./initTRPC";

export const appRouter = t.router({
  aws: awsRouter,
});

export type AppRouter = typeof appRouter;
