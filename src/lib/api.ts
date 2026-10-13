import Constants from 'expo-constants';

import { getAdminToken } from './admin-token';

/**
 * Base URL of the API (Expo Router API routes).
 * - Production / EAS Hosting: set EXPO_PUBLIC_API_URL.
 * - Development: falls back to the Expo dev server the phone is connected to.
 */
export function apiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL;
  if (configured) return configured.replace(/\/+$/, '');
  const hostUri = Constants.expoConfig?.hostUri;
  if (__DEV__ && hostUri) return `http://${hostUri}`;
  throw new Error('EXPO_PUBLIC_API_URL is not set');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(code);
  }
}

type Options = Omit<RequestInit, 'body'> & { body?: unknown; admin?: boolean };

export async function apiFetch<T>(path: string, { body, admin, headers, ...init }: Options = {}): Promise<T> {
  const token = admin ? await getAdminToken() : null;
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : null),
      ...(token ? { Authorization: `Bearer ${token}` } : null),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, (data as { error?: string } | null)?.error ?? 'request_failed');
  return data as T;
}
