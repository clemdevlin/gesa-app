import { adminEnv } from './env';

/**
 * Admin auth: the passcode never leaves the server. A correct passcode is exchanged for a
 * short-lived, HMAC-signed bearer token. Uses Web Crypto only, so it runs on any Expo API runtime.
 */

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function hmac(secret: string, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
}

/** Constant-time comparison of two equal-purpose digests. */
function digestsEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Compares passcodes by their keyed digests, so length and content don't leak through timing. */
export async function passcodeMatches(input: string): Promise<boolean> {
  const { ADMIN_PASSCODE, ADMIN_TOKEN_SECRET } = adminEnv();
  const [a, b] = await Promise.all([
    hmac(ADMIN_TOKEN_SECRET, `passcode:${input}`),
    hmac(ADMIN_TOKEN_SECRET, `passcode:${ADMIN_PASSCODE}`),
  ]);
  return digestsEqual(a, b);
}

/** Keyed hash of an IP address for throttling — the raw address is never stored. */
export async function hashIp(ip: string): Promise<string> {
  const digest = await hmac(adminEnv().ADMIN_TOKEN_SECRET, `ip:${ip}`);
  return toBase64Url(digest);
}

export async function issueAdminToken(): Promise<{ token: string; expiresAt: number }> {
  const { ADMIN_TOKEN_SECRET, ADMIN_SESSION_HOURS } = adminEnv();
  const expiresAt = Date.now() + ADMIN_SESSION_HOURS * 60 * 60 * 1000;
  const body = toBase64Url(encoder.encode(JSON.stringify({ v: 1, exp: expiresAt })));
  const signature = toBase64Url(await hmac(ADMIN_TOKEN_SECRET, `token:${body}`));
  return { token: `${body}.${signature}`, expiresAt };
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const [body, signature, extra] = token.split('.');
  if (!body || !signature || extra !== undefined) return false;
  try {
    const expected = await hmac(adminEnv().ADMIN_TOKEN_SECRET, `token:${body}`);
    if (!digestsEqual(expected, fromBase64Url(signature))) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as { v?: number; exp?: number };
    return payload.v === 1 && typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/**
 * Guard for every admin-only API route:
 *
 *   const denied = await requireAdmin(request);
 *   if (denied) return denied;
 */
export async function requireAdmin(request: Request): Promise<Response | null> {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (token && (await verifyAdminToken(token))) return null;
  return Response.json({ error: 'unauthorized' }, { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } });
}
