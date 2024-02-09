import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "./.server/appRouter";
import { env } from "./env";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""; // browser should use relative url
  }
  // Note: PORT is not defined in remix
  return `http://localhost:${env.PORT}`; // dev SSR should use localhost
};

export const trpcClient = createTRPCProxyClient<AppRouter>({
  //   transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        !!process.env.DEBUG ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      // fetch: (url, options) => fetch(url, { ...options, credentials: 'include' })
    }),
  ],
});
