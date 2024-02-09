import { DescribeRegionsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { z } from "zod";
import { t } from "./initTRPC";

export const awsRouter = t.router({
  describeRegions: t.procedure.input(z.object({})).query(async () => {
    try {
      const client = new EC2Client();
      const res = await client.send(new DescribeRegionsCommand({}));
      return res.Regions;
    } catch (err) {
      console.error("describeRegions:", err);
      return [];
    }
  }),
});
