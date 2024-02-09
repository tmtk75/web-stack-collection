import { drizzle } from "drizzle-orm/d1";

export const client = (db: Env["drizzle-sample"]) => {
  return drizzle(db);
};
