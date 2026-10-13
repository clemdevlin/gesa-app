import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTabBarInset } from '@/components/navigation/tabBarMetrics';
import { useStyles } from '@/theme';

type Props = PropsWithChildren<{
  scroll?: boolean;
  /** Reserve room for the floating tab bar. Turn off for screens shown outside the tabs. */
  underTabBar?: boolean;
}>;

/** Themed, safe-area-aware screen container for tab screens (headers are hidden). */
export function Screen({ children, scroll = true, underTabBar = true }: Props) {
  const insets = useSafeAreaInsets();
  const tabInset = useTabBarInset();
  const styles = useStyles((t) => ({
    root: { flex: 1, backgroundColor: t.colors.bg },
    content: { paddingHorizontal: t.spacing[4], gap: t.spacing[4] },
  }));

  const spacing = { paddingTop: insets.top + 16, paddingBottom: underTabBar ? tabInset : insets.bottom + 32 };

  if (!scroll) {
    return <View style={[styles.root, styles.content, spacing]}>{children}</View>;
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, spacing]}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
