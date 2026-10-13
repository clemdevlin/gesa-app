import { ActivityIndicator, Pressable } from 'react-native';

import { useStyles, useTheme } from '@/theme';

import { Icon } from './Icon';
import type { IconName } from './icons';
import { Text } from './Text';

type Variant = 'primary' | 'accent' | 'ghost' | 'danger';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, fullWidth }: Props) {
  const theme = useTheme();
  const styles = useStyles((t) => ({
    base: {
      minHeight: t.hitTarget + 4,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing[5],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: t.spacing[2],
      borderWidth: 1,
      borderColor: 'transparent',
    },
    fullWidth: { alignSelf: 'stretch' },
    primary: { backgroundColor: t.colors.primary },
    primaryPressed: { backgroundColor: t.colors.primaryPressed },
    accent: { backgroundColor: t.colors.accent },
    accentPressed: { backgroundColor: t.colors.accentPressed },
    danger: { backgroundColor: t.colors.danger },
    dangerPressed: { opacity: 0.85 },
    ghost: { backgroundColor: t.colors.surfaceAlt, borderColor: t.colors.border },
    ghostPressed: { backgroundColor: t.colors.surfaceStrong },
    disabled: { opacity: 0.5 },
  }));

  const content = variant === 'accent' ? 'textOnAccent' : variant === 'ghost' ? 'text' : 'textOnPrimary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        styles[variant],
        pressed && styles[`${variant}Pressed`],
        isDisabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator color={theme.colors[content]} />
      ) : (
        <>
          {icon ? <Icon name={icon} size="sm" tone={content} /> : null}
          <Text variant="label" tone={content}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
