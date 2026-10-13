import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

/**
 * Frosted-glass pill: translucent tinted fill, a soft top-to-bottom sheen and a hairline edge.
 * Absolutely fills its parent (inset by `inset`), so drop it behind content as the first child.
 */
export function GlassPill({ inset = 0, style }: { inset?: number; style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return (
    <View
      pointerEvents="none"
      style={[
        styles.fill,
        {
          top: inset,
          bottom: inset,
          left: inset,
          right: inset,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.glassFill,
          borderColor: theme.colors.glassBorder,
        },
        style,
      ]}>
      <LinearGradient
        colors={theme.gradients.glass}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { position: 'absolute', borderWidth: 1, overflow: 'hidden' },
});
