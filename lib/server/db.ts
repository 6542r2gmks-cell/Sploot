import "server-only";
import { Pool, type QueryResultRow } from "pg";

declare global {
  var splootPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  return new Pool({
    connectionString,
    ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
  });
}

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!globalThis.splootPool) {
    globalThis.splootPool = createPool();
  }

  return globalThis.splootPool;
}

export async function queryRows<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const pool = getPool();
  const result = await pool.query<T>(text, params);
  return result.rows;
}
