import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div>top20.$uid.$pid</div>
      <Outlet />
    </>
  );
}
