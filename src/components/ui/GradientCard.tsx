import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

/** Hero surface filled with the brand gradient (navy → violet → maroon). Content should use `textOnBrand`. */
export function GradientCard({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={theme.gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius: theme.radius.xl, padding: theme.spacing[5], overflow: 'hidden' }, styles.fill, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ fill: { alignSelf: 'stretch' } });
