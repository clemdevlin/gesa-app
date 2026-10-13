import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Card, Chip, GradientCard, Icon, Screen, SectionHeader, Text, type IconName } from '@/components/ui';
import { useStyles } from '@/theme';

type Shortcut = { label: string; icon: IconName; href: '/learn' | '/events' | '/notices' | '/more' };

const shortcuts: Shortcut[] = [
  { label: 'Learn', icon: 'book', href: '/learn' },
  { label: 'Events', icon: 'calendar', href: '/events' },
  { label: 'Notices', icon: 'megaphone', href: '/notices' },
  { label: 'More', icon: 'more', href: '/more' },
];

export default function HomeScreen() {
  const router = useRouter();
  const styles = useStyles((t) => ({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: t.radius.full,
      backgroundColor: t.colors.surfaceAlt,
      borderColor: t.colors.border,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroLabel: { flexDirection: 'row', alignItems: 'center', gap: t.spacing[2] },
    heroWord: { marginTop: t.spacing[2] },
    heroBody: { marginTop: t.spacing[2], opacity: 0.92 },
    shortcuts: { flexDirection: 'row', justifyContent: 'space-between' },
    shortcut: { alignItems: 'center', gap: t.spacing[2], width: 72 },
    shortcutIcon: {
      width: 56,
      height: 56,
      borderRadius: t.radius.lg,
      backgroundColor: t.colors.surface,
      borderColor: t.colors.border,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notice: { flexDirection: 'row', alignItems: 'center', gap: t.spacing[3] },
    noticeIcon: {
      width: 40,
      height: 40,
      borderRadius: t.radius.md,
      backgroundColor: t.colors.highlightSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noticeText: { flex: 1, gap: 2 },
  }));

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text variant="caption" tone="textMuted">
            Welcome to
          </Text>
          <Text variant="title">GESA UMaT</Text>
        </View>
        <View style={styles.avatar}>
          <Icon name="user" tone="textMuted" />
        </View>
      </View>

      <GradientCard>
        <View style={styles.heroLabel}>
          <Icon name="sparkles" size="sm" tone="textOnBrand" />
          <Text variant="overline" tone="textOnBrand">
            Word of the day
          </Text>
        </View>
        <Text variant="display" tone="textOnBrand" style={styles.heroWord}>
          Triangulation
        </Text>
        <Text variant="caption" tone="textOnBrand">
          noun · Geomatics
        </Text>
        <Text tone="textOnBrand" style={styles.heroBody}>
          Fixing a point’s position by measuring angles to it from the two ends of a known baseline.
        </Text>
      </GradientCard>

      <View style={styles.shortcuts}>
        {shortcuts.map((s) => (
          <Pressable
            key={s.label}
            accessibilityRole="button"
            accessibilityLabel={s.label}
            onPress={() => router.push(s.href)}
            style={styles.shortcut}>
            <View style={styles.shortcutIcon}>
              <Icon name={s.icon} size="lg" tone="primary" />
            </View>
            <Text variant="caption" tone="textMuted">
              {s.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View>
        <SectionHeader title="Latest notices" actionLabel="See all" onAction={() => router.push('/notices')} />
        <Card>
          <View style={styles.notice}>
            <View style={styles.noticeIcon}>
              <Icon name="megaphone" tone="highlight" />
            </View>
            <View style={styles.noticeText}>
              <Text variant="bodyStrong">Notices will appear here</Text>
              <Text variant="caption" tone="textMuted">
                Sample content — live data arrives with the database feature.
              </Text>
            </View>
            <Chip label="Preview" tone="accent" />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
