import Image from "next/image";
import Client2 from "@/components/client-2";
import { Server2 } from "../components/server-2";
import Link from "next/link";

// It seems to need this if using force-dynamic server component.
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Client2 />
      <Server2 />
      <Link href={"/client"}>/client</Link>
    </main>
  );
}
