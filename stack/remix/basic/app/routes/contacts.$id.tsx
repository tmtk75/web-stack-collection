import type { LoaderFunction } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { z } from "zod";

const ParamsS = z.object({
  id: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !isNaN(v)),
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = ParamsS.parse(params);
  return { id };
};

export default function Index() {
  const { id, request } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      Your id is {id}.
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
