import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});
