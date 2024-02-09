import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  return params.uid;
};

export default function Index() {
  const a = useLoaderData();
  // console.log({ a });
  return <>$uid.profile. $uid: {a}</>;
}
