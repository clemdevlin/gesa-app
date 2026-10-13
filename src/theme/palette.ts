/**
 * RAW BRAND PALETTE — derived from the GESA UMaT logo.
 *
 * This is the ONLY file in the app that may contain colour literals.
 * Screens and components never import it: they read semantic tokens
 * from `useTheme().colors` (see tokens.ts). ESLint enforces this.
 */
export const palette = {
  navy: {
    950: '#0B0A22',
    900: '#12102E',
    800: '#1B1948',
    700: '#262363',
    600: '#322E80',
    300: '#9893CF',
    100: '#E4E2F5',
    50: '#F4F3FB',
  },
  maroon: {
    800: '#5E1238',
    700: '#7A1A48',
    600: '#92225A',
    500: '#AD2D6D',
    300: '#E08BB3',
    100: '#F8DDEA',
  },
  gold: {
    700: '#8F6A14',
    600: '#B58A1E',
    500: '#D4A93A',
    400: '#E4C262',
    300: '#F0DA93',
    100: '#FBF1D3',
  },
  violet: {
    700: '#4E2A9C',
    600: '#6537C4',
    500: '#7C4DDB',
    400: '#9B76EA',
    300: '#C0A9F4',
    100: '#EBE3FB',
  },
  // Light-theme neutrals (navy-tinted)
  ink: { 900: '#16143A', 600: '#5A5683', 400: '#8B87AE' },
  mist: { 50: '#F0EEF9', 200: '#DAD7EE', 300: '#BDB9DE' },
  // Dark-theme neutrals (navy-tinted)
  dusk: { 800: '#2A2766', 700: '#2E2A66', 500: '#443F8A', 400: '#7C77A8', 200: '#ABA6D0', 50: '#F3F1FC' },
  // Status
  green: { 500: '#2FA67A' },
  amber: { 500: '#E0A026' },
  red: { 500: '#DC4B5E' },
  sky: { 500: '#4B9BDC' },
  // Fixed
  white: '#FFFFFF',
  onGold: '#241A02',
} as const;

/** `#RRGGBB` + opacity → `rgba(...)`. Used to build soft tints from palette colours. */
export function alpha(hex: string, opacity: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`;
}
