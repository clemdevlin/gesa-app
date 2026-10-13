import { View } from 'react-native';

import { useStyles } from '@/theme';

import { Icon } from './Icon';
import type { IconName } from './icons';
import { Text } from './Text';

type Props = { icon: IconName; title: string; message: string };

export function EmptyState({ icon, title, message }: Props) {
  const styles = useStyles((t) => ({
    wrap: { alignItems: 'center', paddingVertical: t.spacing[10], paddingHorizontal: t.spacing[6], gap: t.spacing[3] },
    badge: {
      width: 64,
      height: 64,
      borderRadius: t.radius.xl,
      backgroundColor: t.colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: { textAlign: 'center' },
  }));
  return (
    <View style={styles.wrap}>
      <View style={styles.badge}>
        <Icon name={icon} size="lg" tone="highlight" />
      </View>
      <Text variant="heading" style={styles.center}>
        {title}
      </Text>
      <Text tone="textMuted" style={styles.center}>
        {message}
      </Text>
    </View>
  );
}
