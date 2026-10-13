import * as SecureStore from 'expo-secure-store';

const KEY = 'gesa.adminSession';

type Stored = { token: string; expiresAt: number };

export async function saveAdminToken(session: Stored): Promise<void> {
  await SecureStore.setItemAsync(KEY, JSON.stringify(session));
}

/** Returns the saved admin token, or null if missing/expired. */
export async function getAdminToken(): Promise<string | null> {
  try {
    const raw = await SecureStore.getItemAsync(KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Stored;
    if (session.expiresAt <= Date.now()) {
      await clearAdminToken();
      return null;
    }
    return session.token;
  } catch {
    return null;
  }
}

export async function clearAdminToken(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY).catch(() => {});
}
