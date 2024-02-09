import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();

const common: Config = {
  schema: "./app/db",
  out: "./migrations",
  breakpoints: false,
};

const remoteConfig = {
  ...common,
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml", // not yet to check if this works.
    dbName: "drizzle-sample",
  },
} satisfies Config;

const localConfig = {
  ...common,
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};

export default process.env.NODE_ENV === "production" ? remoteConfig : localConfig;
