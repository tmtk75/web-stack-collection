import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { prisma } from "./prisma-client";
import { ListBucketsCommand, S3, S3Client } from "@aws-sdk/client-s3";

export const appRouter = router({
  greeting1: publicProcedure.query((opts) => {
    return { msg: "Hello World" };
  }),
  greeting2: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      const v = await prisma.user.findFirst();
      return { msg: `Hello ${opts.input.name ?? "World"}, ${v?.name}` };
    }),
  findUser: publicProcedure.query(async () => {
    const user = await prisma.user.findFirst();
    return user;
  }),
  listBuckets: publicProcedure.query(async () => {
    const res = await new S3Client().send(new ListBucketsCommand({}));
    return res;
  }),
});

export type AppRouter = typeof appRouter;
