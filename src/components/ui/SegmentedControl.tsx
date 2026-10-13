import { Pressable, View } from 'react-native';

import { useStyles } from '@/theme';

import { Text } from './Text';

type Option<T extends string> = { value: T; label: string };
type Props<T extends string> = { options: Option<T>[]; value: T; onChange: (value: T) => void };

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  const styles = useStyles((t) => ({
    track: {
      flexDirection: 'row',
      backgroundColor: t.colors.surfaceAlt,
      borderColor: t.colors.border,
      borderWidth: 1,
      borderRadius: t.radius.full,
      padding: 3,
    },
    item: {
      flex: 1,
      minHeight: t.hitTarget - 6,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: t.radius.full,
    },
    itemOn: { backgroundColor: t.colors.primary },
  }));
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            style={[styles.item, on && styles.itemOn]}>
            <Text variant="label" tone={on ? 'textOnPrimary' : 'textMuted'}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
