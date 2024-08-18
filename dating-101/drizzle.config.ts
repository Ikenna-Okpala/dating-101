import { Config } from "drizzle-kit/";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://Ikenna-Okpala:6AiXr7tswhdx@ep-plain-dawn-64743976.us-east-2.aws.neon.tech:5432/dating-101?sslmode=require'",
  },
  verbose: true,
  strict: true,
} satisfies Config;

//npx for executables over npm
