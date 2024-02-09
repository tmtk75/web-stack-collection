import { LoaderFunction } from "@remix-run/cloudflare";
import { client } from "~/db/client.server";
import { users } from "~/db/schema";

export const loader: LoaderFunction = async ({ context }) => {
  const env = context.cloudflare.env;
  const db = env["drizzle-sample"];
  const c = client(db);
  const v = await c.select().from(users);
  return { users: v };
};
