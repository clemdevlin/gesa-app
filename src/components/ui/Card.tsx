import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import type { PropsWithChildren } from 'react';

import { useStyles } from '@/theme';

type Props = PropsWithChildren<{
  onPress?: () => void;
  elevated?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}>;

export function Card({ children, onPress, elevated = false, padded = true, style, accessibilityLabel }: Props) {
  const styles = useStyles((t) => ({
    base: {
      backgroundColor: t.colors.surface,
      borderColor: t.colors.border,
      borderWidth: 1,
      borderRadius: t.radius.lg,
    },
    padded: { padding: t.spacing[4] },
    elevated: t.shadows.card,
    pressed: { backgroundColor: t.colors.surfaceAlt },
  }));

  const composed = [styles.base, padded && styles.padded, elevated && styles.elevated, style];

  if (!onPress) return <View style={composed}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [composed, pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
}
