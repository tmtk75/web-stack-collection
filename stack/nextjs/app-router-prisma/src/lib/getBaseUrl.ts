import { env } from "../env/client.mjs";

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // browser should use relative url
    return "";
  }
  if (process.env.VERCEL_URL) {
    // SSR should use vercel url
    return `https://${process.env.VERCEL_URL}`;
  }
  // dev SSR should use localhost
  return `http://localhost:${env.NEXT_PUBLIC_PORT ?? 3000}`;
}
