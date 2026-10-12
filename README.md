# GESA UMaT

Mobile app for the Geomatic Engineering Students Association, University of Mines & Technology (UMaT), Tarkwa.

## Stack

| Concern | Choice |
|---|---|
| App | Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript |
| Routing | Expo Router (file-based, typed routes) |
| Database | Neon Postgres |
| ORM | Drizzle ORM + drizzle-kit migrations |
| Files | Neon Object Storage (S3-compatible, beta) — arrives with the uploads feature |
| API | Expo Router API routes (`src/app/api/**/+api.ts`), server-side only |
| Data fetching | TanStack Query |
| Design system | Custom theme in `src/theme` (tokens, light/dark), Lucide icons, Source Serif 4 + Inter |

The app never talks to the database directly. Screens call the API routes, and only the API routes
(`src/server`, `src/db`) hold credentials.

## Getting started

Requires Node.js 22+ and the **Expo Go SDK 57** app (https://expo.dev/go).

```bash
npm install
cp .env.example .env      # then fill it in (see below)
npm run db:migrate        # apply migrations to your Neon database
npx expo start
```

Scan the QR code with Expo Go. API routes run inside the dev server, so the app reaches them at the
same address as the bundle — no extra setup in development.

### Environment

| Variable | Where | Purpose |
|---|---|---|
| `DATABASE_URL` | server | Neon connection string |
| `ADMIN_PASSCODE` | server | Passcode that unlocks admin features (checked on the server only) |
| `ADMIN_TOKEN_SECRET` | server | Signs admin session tokens (≥ 32 chars, `openssl rand -base64 48`) |
| `ADMIN_SESSION_HOURS` | server | Admin session length (default 12) |
| `EXPO_PUBLIC_API_URL` | client | API origin for release builds (empty in development) |

Only `EXPO_PUBLIC_*` values are bundled into the app. Everything else stays on the server.

## Design system

All styling goes through the theme (`src/theme`):

- `palette.ts` holds the raw brand colours (from the logo) — the **only** file allowed to contain colour literals.
- `tokens.ts` maps the palette to semantic tokens for dark and light (`colors.surface`, `colors.accent`, …).
- Screens and components use `useTheme()` / `useStyles()` and the primitives in `src/components/ui`.
- Icons are Lucide, registered by name in `src/components/ui/icons.ts`.

ESLint fails the build on colour literals outside the palette and on client imports of server code.

## Admin security

The admin passcode is never in the app. `POST /api/admin/session` checks it on the server
(constant-time, throttled to 5 failures per IP per 15 minutes) and returns a short-lived signed token,
which the app keeps in secure storage and sends as a Bearer token. Admin-only API routes must start with:

```ts
const denied = await requireAdmin(request);
if (denied) return denied;
```

## Scripts

| Script | |
|---|---|
| `npm start` | Start the dev server |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (includes the colour and server-import rules) |
| `npm run db:generate` | Generate a migration from `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |
| `npm run db:studio` | Browse the database |

## Workflow

`main` holds the scaffold and design system. Every feature lands on its own branch via pull request.
