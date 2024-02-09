"use client";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { clientApi } from "./client-api";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    clientApi.createClient({
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    })
  );
  return (
    <clientApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </clientApi.Provider>
  );
}
