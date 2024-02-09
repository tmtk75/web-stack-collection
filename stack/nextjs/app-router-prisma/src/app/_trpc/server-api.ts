import { getBaseUrl } from "@/lib/getBaseUrl";
import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const serverApi = appRouter.createCaller({
  links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
});
