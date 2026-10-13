import type { TextStyle } from 'react-native';

// Import weight-by-weight so only the fonts we use are bundled (the package index pulls in every weight).
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { SourceSerif4_600SemiBold } from '@expo-google-fonts/source-serif-4/600SemiBold';
import { SourceSerif4_700Bold } from '@expo-google-fonts/source-serif-4/700Bold';

/** Font families by role. Titles: Source Serif 4. UI text: Inter. */
export const fontFamily = {
  displayBold: 'SourceSerif4_700Bold',
  displaySemi: 'SourceSerif4_600SemiBold',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

/** Passed to `useFonts` at app start. */
export const fontAssets = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  SourceSerif4_600SemiBold,
  SourceSerif4_700Bold,
};

export const typography = {
  display: { fontFamily: fontFamily.displayBold, fontSize: 34, lineHeight: 40, letterSpacing: -0.3 },
  title: { fontFamily: fontFamily.displaySemi, fontSize: 24, lineHeight: 30, letterSpacing: -0.2 },
  heading: { fontFamily: fontFamily.displaySemi, fontSize: 18, lineHeight: 24 },
  bodyStrong: { fontFamily: fontFamily.semibold, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fontFamily.semibold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamily.medium, fontSize: 12.5, lineHeight: 18 },
  overline: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
