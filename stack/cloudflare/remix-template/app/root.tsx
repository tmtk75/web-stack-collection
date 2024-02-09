import { LoaderFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const loader: LoaderFunction = async ({ context }) => {
  try {
    // const key = "data-109.202.99.46";
    // const cacheData = (await STORE_KV.get("todos", "json"));
    console.log("context:", context.cloudflare.env);
    const kv = context.cloudflare.env.STORE_KV;
    // const b = await kv.put("hello", "1234");
    const a = await kv.get("hello");
    // const a = 1;
    console.log(a);
    return [a];
  } catch (err) {
    console.error(err);
    return err;
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const a = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {JSON.stringify(a)}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
