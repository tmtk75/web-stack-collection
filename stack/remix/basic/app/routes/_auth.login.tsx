import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div>
        /login. <Link to="/callback">/callback</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
