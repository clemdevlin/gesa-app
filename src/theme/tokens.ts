import type { ViewStyle } from 'react-native';

import { alpha, palette } from './palette';

/** Semantic colour tokens — the only colours screens and components may use. */
export type ColorTokens = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  surfaceStrong: string;
  border: string;
  borderStrong: string;

  text: string;
  textMuted: string;
  textFaint: string;
  textOnPrimary: string;
  textOnAccent: string;
  textOnBrand: string;

  primary: string;
  primaryPressed: string;
  primarySoft: string;
  secondary: string;
  secondarySoft: string;
  accent: string;
  accentPressed: string;
  accentSoft: string;
  accentText: string;
  highlight: string;
  highlightSoft: string;

  success: string;
  warning: string;
  danger: string;
  info: string;
  focus: string;

  overlay: string;
  tabBar: string;
  /** Frosted-glass surface (translucent fill + hairline edge) for highlighted chips and the active tab. */
  glassFill: string;
  glassBorder: string;
};

export type ColorToken = keyof ColorTokens;
export type Gradient = readonly [string, string, ...string[]];
export type Shadow = Pick<ViewStyle, 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'>;

export type SchemeTokens = {
  colors: ColorTokens;
  gradients: { brand: Gradient; glass: Gradient };
  shadows: { card: Shadow };
};

const brandGradient: Gradient = [palette.navy[800], palette.violet[600], palette.maroon[600]];

export const darkScheme: SchemeTokens = {
  colors: {
    bg: palette.navy[950],
    surface: palette.navy[900],
    surfaceAlt: palette.navy[800],
    surfaceStrong: palette.dusk[800],
    border: palette.dusk[700],
    borderStrong: palette.dusk[500],

    text: palette.dusk[50],
    textMuted: palette.dusk[200],
    textFaint: palette.dusk[400],
    textOnPrimary: palette.white,
    textOnAccent: palette.onGold,
    textOnBrand: palette.white,

    primary: palette.violet[500],
    primaryPressed: palette.violet[600],
    primarySoft: alpha(palette.violet[500], 0.18),
    secondary: palette.maroon[500],
    secondarySoft: alpha(palette.maroon[500], 0.2),
    accent: palette.gold[400],
    accentPressed: palette.gold[500],
    accentSoft: alpha(palette.gold[500], 0.16),
    accentText: palette.gold[300],
    highlight: palette.violet[400],
    highlightSoft: alpha(palette.violet[400], 0.16),

    success: palette.green[500],
    warning: palette.amber[500],
    danger: palette.red[500],
    info: palette.sky[500],
    focus: palette.violet[300],

    overlay: alpha(palette.navy[950], 0.7),
    tabBar: palette.navy[900],
    glassFill: alpha(palette.gold[400], 0.12),
    glassBorder: alpha(palette.white, 0.2),
  },
  gradients: { brand: brandGradient, glass: [alpha(palette.white, 0.22), alpha(palette.white, 0.02)] },
  shadows: {
    card: {
      shadowColor: palette.navy[950],
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.35,
      shadowRadius: 30,
      elevation: 6,
    },
  },
};

export const lightScheme: SchemeTokens = {
  colors: {
    bg: palette.navy[50],
    surface: palette.white,
    surfaceAlt: palette.mist[50],
    surfaceStrong: palette.navy[100],
    border: palette.mist[200],
    borderStrong: palette.mist[300],

    text: palette.ink[900],
    textMuted: palette.ink[600],
    textFaint: palette.ink[400],
    textOnPrimary: palette.white,
    textOnAccent: palette.onGold,
    textOnBrand: palette.white,

    primary: palette.navy[700],
    primaryPressed: palette.navy[800],
    primarySoft: palette.navy[100],
    secondary: palette.maroon[600],
    secondarySoft: palette.maroon[100],
    accent: palette.gold[500],
    accentPressed: palette.gold[600],
    accentSoft: palette.gold[100],
    accentText: palette.gold[700],
    highlight: palette.violet[600],
    highlightSoft: palette.violet[100],

    success: palette.green[500],
    warning: palette.amber[500],
    danger: palette.red[500],
    info: palette.sky[500],
    focus: palette.violet[500],

    overlay: alpha(palette.navy[950], 0.55),
    tabBar: palette.white,
    glassFill: alpha(palette.navy[700], 0.07),
    glassBorder: alpha(palette.navy[700], 0.14),
  },
  gradients: { brand: brandGradient, glass: [alpha(palette.white, 0.95), alpha(palette.white, 0.1)] },
  shadows: {
    card: {
      shadowColor: palette.ink[900],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 3,
    },
  },
};
