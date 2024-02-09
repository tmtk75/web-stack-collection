import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string({ required_error: "Please give a port number that remix will listen at using PORT environment variable." })
    .regex(/^\d{1,5}$/, { message: "PORT must be a number" })
    .transform(Number)
    .refine((x) => 1024 <= Number(x) && Number(x) < 65536, {
      message: "PORT must be 1024 <= x < 65536",
    }),
});

export const env = envSchema.parse(process.env);
