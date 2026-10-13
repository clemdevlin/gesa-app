import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme, type ColorToken, type TypographyVariant } from '@/theme';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  /** Semantic colour token. Defaults to `text`. */
  tone?: ColorToken;
};

export function Text({ variant = 'body', tone = 'text', style, ...rest }: TextProps) {
  const theme = useTheme();
  return <RNText {...rest} style={[theme.typography[variant], { color: theme.colors[tone] }, style]} />;
}
