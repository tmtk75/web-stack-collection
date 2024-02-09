import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div>
        /auth. <Link to="/login">/login</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
