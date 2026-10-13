import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStyles } from '@/theme';

type Props = PropsWithChildren<{ scroll?: boolean }>;

/** Themed, safe-area-aware screen container for tab screens (headers are hidden). */
export function Screen({ children, scroll = true }: Props) {
  const insets = useSafeAreaInsets();
  const styles = useStyles((t) => ({
    root: { flex: 1, backgroundColor: t.colors.bg },
    content: { paddingHorizontal: t.spacing[4], paddingBottom: t.spacing[8], gap: t.spacing[4] },
  }));

  if (!scroll) {
    return <View style={[styles.root, styles.content, { paddingTop: insets.top + 16 }]}>{children}</View>;
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
