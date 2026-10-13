import { useTheme, type ColorToken } from '@/theme';

import { icons, type IconName } from './icons';

type Props = {
  name: IconName;
  size?: keyof ReturnType<typeof useTheme>['iconSize'] | number;
  /** Semantic colour token. Defaults to `text`. */
  tone?: ColorToken;
};

export function Icon({ name, size = 'md', tone = 'text' }: Props) {
  const theme = useTheme();
  const Glyph = icons[name];
  const px = typeof size === 'number' ? size : theme.iconSize[size];
  return <Glyph size={px} color={theme.colors[tone]} strokeWidth={theme.iconStroke} />;
}
