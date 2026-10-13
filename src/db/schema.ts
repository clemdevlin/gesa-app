import { boolean, index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Failed/successful admin sign-in attempts, keyed by a keyed hash of the caller's IP
 * (never the raw address). Used to throttle passcode guessing across serverless instances.
 */
export const adminLoginAttempts = pgTable(
  'admin_login_attempts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    ipHash: text('ip_hash').notNull(),
    succeeded: boolean('succeeded').notNull().default(false),
    attemptedAt: timestamp('attempted_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('admin_login_attempts_ip_time_idx').on(t.ipHash, t.attemptedAt)],
);

export type AdminLoginAttempt = typeof adminLoginAttempts.$inferSelect;
