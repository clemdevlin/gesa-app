import { z } from 'zod';

/**
 * Server-only environment. Never import this (or anything in src/server, src/db)
 * from client code — ESLint blocks it. Only EXPO_PUBLIC_* values reach the app bundle.
 */
const databaseSchema = z.object({
  DATABASE_URL: z.url(),
});

const adminSchema = z.object({
  ADMIN_PASSCODE: z.string().min(10, 'ADMIN_PASSCODE must be at least 10 characters'),
  ADMIN_TOKEN_SECRET: z.string().min(32, 'ADMIN_TOKEN_SECRET must be at least 32 characters'),
  ADMIN_SESSION_HOURS: z.coerce.number().int().min(1).max(168).default(12),
});

export function databaseEnv() {
  return databaseSchema.parse(process.env);
}

export function adminEnv() {
  return adminSchema.parse(process.env);
}
