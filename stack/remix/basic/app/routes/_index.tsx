import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ul>
        <li>
          <Link to={"/contacts/1"}>contacts/1</Link>
        </li>
        <li>
          <Link to={"/top20"}>top20</Link>
        </li>
        <li>
          <Link to={"/login"}>/login</Link>
        </li>
      </ul>
    </div>
  );
}
