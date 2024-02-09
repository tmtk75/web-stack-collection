"use client";
import { clientApi } from "@/app/_trpc/client-api";
import { FC } from "react";

const Client2: FC = () => {
  const greeting1 = clientApi.greeting1.useQuery();
  const user = clientApi.findUser.useQuery();
  const bucket = clientApi.listBuckets.useQuery();

  return (
    <div className="bg-blue-100 p-5 border-2 border-blue-300">
      <div className="text-blue-500 font-bold">Client Component</div>
      <div>{JSON.stringify(greeting1.data)}</div>
      <div>{JSON.stringify(user.data)}</div>
      <div>{JSON.stringify(bucket.data?.Buckets)}</div>
    </div>
  );
};

export default Client2;
