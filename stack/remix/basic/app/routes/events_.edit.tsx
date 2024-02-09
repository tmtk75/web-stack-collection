import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { getAll, insertData } from "~/lib/data";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const a = Object.fromEntries(formData);
  insertData(a);
  return redirect(`/events/all`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return getAll();
};

export default function Index() {
  const adata = useActionData<typeof action>();
  const all = useLoaderData<typeof getAll>();

  return (
    <>
      <div>new data: {JSON.stringify(adata)}</div>
      <div>size: {all.length}</div>
    </>
  );
}
