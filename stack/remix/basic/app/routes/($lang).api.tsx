import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async ({ params }) => {
  return { lang: params.lang };
};

export default function Index() {
  const { lang } = useLoaderData<typeof loader>();
  return (
    <>
      <div>lang: {lang ?? "undefined"}</div>
    </>
  );
}
