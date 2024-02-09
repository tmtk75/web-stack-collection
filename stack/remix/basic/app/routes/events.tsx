import { Form, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <Form action="edit" method="post">
        <input name="title" type="text" />
        <input name="description" type="text" />
        <button type="submit">Submit</button>
      </Form>

      <hr />
      <Outlet />
    </>
  );
}
