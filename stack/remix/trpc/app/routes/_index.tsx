import { Badge, Code, Container, DataList, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { LinksFunction } from "@remix-run/node";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import stylesheet from "~/index.css?url";
import { trpcClient } from "~/trpcClient";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function Page() {
  const { data: v } = useAtomValue(describeRegions);

  return (
    <Theme>
      <Container size="1">
        <h1 className={clsx("text-4xl", "font-extrabold")}>AWS regions</h1>
        {v?.map((r) => {
          return (
            <DataList.Root key={r.RegionName} className={clsx("mt-[4rem]")}>
              <DataList.Item>
                <DataList.Label>RegionName</DataList.Label>
                <DataList.Value>
                  <Badge color="jade" variant="soft" radius="full">
                    {r.RegionName}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Endpoint</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{r.Endpoint}</Code>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>OptInStatus</DataList.Label>
                <DataList.Value>
                  <Code variant="ghost">{r.OptInStatus}</Code>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          );
        })}
      </Container>
    </Theme>
  );
}

const describeRegions = atomWithSuspenseQuery(() => ({
  queryKey: ["ec2:describe-regions"],
  queryFn: async () => {
    return trpcClient.aws.describeRegions.query({});
  },
}));
