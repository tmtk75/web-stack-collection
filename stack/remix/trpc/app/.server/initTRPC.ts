import { initTRPC } from "@trpc/server";

export const t = initTRPC.context().create({
    // transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});
