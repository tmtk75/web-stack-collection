import type { LoaderFunction } from "@remix-run/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/.server/appRouter";

export const loader: LoaderFunction = ({ request: req }) => {
  // console.log("api.trpc.ts handler", req);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};

// export { handler as loader, handler as action };
// https://stackoverflow.com/questions/76747437/how-to-setup-trpc-with-remix-zod-and-prisma
