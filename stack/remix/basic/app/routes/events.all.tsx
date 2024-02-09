import { useLoaderData } from "@remix-run/react";
import { getAll } from "~/lib/data";

export const loader = async () => {
  const all = getAll();
  console.log({ all });
  return all;
};

export default function Index() {
  const all = useLoaderData<typeof loader>();
  console.log({ all });
  return (
    <>
      <ul>
        {all.map((a, i) => (
          <li>
            {i}: {JSON.stringify(a)}
          </li>
        ))}
      </ul>
    </>
  );
}
