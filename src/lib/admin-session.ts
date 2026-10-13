import { apiFetch } from './api';
import { clearAdminToken, getAdminToken, saveAdminToken } from './admin-token';

/** Exchange the admin passcode (checked on the server) for a signed session token kept in secure storage. */
export async function signInAsAdmin(passcode: string): Promise<void> {
  const session = await apiFetch<{ token: string; expiresAt: number }>('/api/admin/session', {
    method: 'POST',
    body: { passcode },
  });
  await saveAdminToken(session);
}

export async function signOutAdmin(): Promise<void> {
  await clearAdminToken();
}

/** True when a stored token exists and the server still accepts it. */
export async function hasValidAdminSession(): Promise<boolean> {
  if (!(await getAdminToken())) return false;
  try {
    await apiFetch('/api/admin/session', { admin: true });
    return true;
  } catch {
    await clearAdminToken();
    return false;
  }
}
