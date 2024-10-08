import pages from "@hono/vite-cloudflare-pages";
// import devServer from "@hono/vite-dev-server";
// import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  } else {
    return {
      plugins: [honox(), pages()],
    };
  }
});
