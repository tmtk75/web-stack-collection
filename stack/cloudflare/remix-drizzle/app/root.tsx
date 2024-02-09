import { LoaderFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { JWTPayload, createRemoteJWKSet, jwtVerify } from "jose";

interface CFJWTPayload extends JWTPayload {
  email: string;
}

async function verifyToken(req: Request, env: Env) {
  const token = req.headers.get("cf-access-jwt-assertion");
  if (!token) {
    throw new Error("No token provided");
  }
  const publicKeyUrl = `https://${env.TEAM_NAME}.cloudflareaccess.com/cdn-cgi/access/certs`;
  const JWKS = createRemoteJWKSet(new URL(publicKeyUrl));

  try {
    const { payload } = await jwtVerify(token, JWKS);
    // console.log("JWT verified:", payload);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    throw new Error("Invalid token");
  }
}

export const loader: LoaderFunction = async ({ request, context }) => {
  // console.log(Array.from(request.headers.entries()));
  if (process.env.NODE_ENV === "development") {
    return [{ email: "dev@local.test" }];
  }

  const p = await verifyToken(request, context.cloudflare.env);
  return [p];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [p] = useLoaderData<[CFJWTPayload]>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        You're {p.email}.{children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
