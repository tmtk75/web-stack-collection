import { Client1 } from "@/components/client-1";
import { Server1 } from "@/components/server-1";

/**
 * Sample page to use fetch.
 */
export default async function Home() {
  return (
    <div className="min-h-screen">
      <Server1 />
      <Client1 />
    </div>
  );
}
