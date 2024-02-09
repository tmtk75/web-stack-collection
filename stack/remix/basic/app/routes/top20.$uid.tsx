import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.uid;
  return id;
};

export default function Index() {
  const id = useLoaderData<typeof loader>();
  return (
    <>
      <div>
        top20.$uid. id: {id} (<Link to={"/top20/3456/profile"}>profile</Link>)
      </div>
      <Outlet />
    </>
  );
}
