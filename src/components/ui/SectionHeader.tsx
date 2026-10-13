import { Pressable, View } from 'react-native';

import { useStyles } from '@/theme';

import { Text } from './Text';

type Props = { title: string; actionLabel?: string; onAction?: () => void };

export function SectionHeader({ title, actionLabel, onAction }: Props) {
  const styles = useStyles((t) => ({
    row: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: t.spacing[2] },
  }));
  return (
    <View style={styles.row}>
      <Text variant="heading">{title}</Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="link" onPress={onAction} hitSlop={12}>
          <Text variant="label" tone="highlight">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
