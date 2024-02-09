import { env } from "./src/env/server.mjs";
//console.debug({ env });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
