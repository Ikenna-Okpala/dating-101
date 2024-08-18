import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://Ikenna-Okpala:6AiXr7tswhdx@ep-plain-dawn-64743976.us-east-2.aws.neon.tech:5432/dating-101?sslmode=require'",
});

async function connectToDb() {
  await client.connect();
}

connectToDb();

const db = drizzle(client);

export default db;
