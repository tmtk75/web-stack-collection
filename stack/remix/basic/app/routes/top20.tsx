import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div>
        I'm /top20. <Link to="/top20/1234">/top20.$uid</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
