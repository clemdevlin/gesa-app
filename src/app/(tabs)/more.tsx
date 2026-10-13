import Constants from 'expo-constants';
import { View } from 'react-native';

import { Card, Icon, Screen, SectionHeader, SegmentedControl, Text } from '@/components/ui';
import { useStyles, useThemeMode, type ThemeMode } from '@/theme';

const modes: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

export default function MoreScreen() {
  const { mode, setMode } = useThemeMode();
  const styles = useStyles((t) => ({
    row: { flexDirection: 'row', alignItems: 'center', gap: t.spacing[2], marginBottom: t.spacing[3] },
  }));

  return (
    <Screen>
      <Text variant="title">More</Text>

      <View>
        <SectionHeader title="Appearance" />
        <Card>
          <View style={styles.row}>
            <Icon name="appearance" tone="highlight" />
            <Text variant="bodyStrong">Theme</Text>
          </View>
          <SegmentedControl options={modes} value={mode} onChange={setMode} />
        </Card>
      </View>

      <Text variant="caption" tone="textFaint">
        GESA UMaT · v{Constants.expoConfig?.version ?? '1.0.0'}
      </Text>
    </Screen>
  );
}
