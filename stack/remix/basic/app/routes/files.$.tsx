import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async ({ params }) => {
  return params["*"];
};

export default function Index() {
  const path = useLoaderData<typeof loader>();
  return (
    <>
      <div>*: {path}</div>
    </>
  );
}
