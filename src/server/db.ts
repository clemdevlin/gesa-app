import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@/db/schema';

import { databaseEnv } from './env';

let cached: ReturnType<typeof create> | undefined;

function create() {
  return drizzle(neon(databaseEnv().DATABASE_URL), { schema });
}

/** Lazily-created Drizzle client over Neon's serverless HTTP driver. */
export function getDb() {
  return (cached ??= create());
}
