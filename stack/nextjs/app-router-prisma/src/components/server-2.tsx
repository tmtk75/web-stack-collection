import { serverApi } from "../app/_trpc/server-api";

//
// Route Segment Config : https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//     - https://zenn.dev/yumemi_inc/articles/next-13-app-overview
//
export const dynamic = "force-dynamic"; // This is very high cost!

export async function Server2() {
  const greeting2 = await serverApi.greeting2({ name: "Next" });
  return (
    <div className="border-2 border-red-300 bg-red-100 p-5">
      <div className="text-red-500 font-bold">server component</div>
      {JSON.stringify(greeting2)} from server.
    </div>
  );
}
