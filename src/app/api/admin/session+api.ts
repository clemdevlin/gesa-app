import { and, eq, gt, lt, sql } from 'drizzle-orm';
import { z } from 'zod';

import { adminLoginAttempts } from '@/db/schema';
import { hashIp, issueAdminToken, passcodeMatches, requireAdmin } from '@/server/admin-auth';
import { getDb } from '@/server/db';

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;

const body = z.object({ passcode: z.string().min(1).max(200) });

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/** Verify an existing admin token (used on app launch). */
export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  return denied ?? Response.json({ ok: true });
}

/** Exchange the admin passcode for a short-lived signed token. Throttled per IP. */
export async function POST(request: Request) {
  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'invalid_request' }, { status: 400 });

  const db = getDb();
  const ipHash = await hashIp(clientIp(request));
  const since = sql.raw(`now() - interval '${WINDOW_MINUTES} minutes'`);

  const [{ failures }] = await db
    .select({ failures: sql<number>`count(*)::int` })
    .from(adminLoginAttempts)
    .where(and(eq(adminLoginAttempts.ipHash, ipHash), eq(adminLoginAttempts.succeeded, false), gt(adminLoginAttempts.attemptedAt, since)));

  if (failures >= MAX_FAILURES) {
    return Response.json(
      { error: 'too_many_attempts' },
      { status: 429, headers: { 'Retry-After': String(WINDOW_MINUTES * 60) } },
    );
  }

  if (!(await passcodeMatches(parsed.data.passcode))) {
    await db.insert(adminLoginAttempts).values({ ipHash, succeeded: false });
    // Opportunistic cleanup so the table stays small.
    await db.delete(adminLoginAttempts).where(lt(adminLoginAttempts.attemptedAt, sql`now() - interval '1 day'`));
    return Response.json({ error: 'invalid_passcode' }, { status: 401 });
  }

  return Response.json(await issueAdminToken());
}
