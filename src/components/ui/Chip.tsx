import { View } from 'react-native';

import { useStyles, type ColorToken } from '@/theme';

import { Text } from './Text';

type Tone = 'primary' | 'accent' | 'secondary' | 'highlight';

const map: Record<Tone, { bg: ColorToken; fg: ColorToken }> = {
  primary: { bg: 'primarySoft', fg: 'highlight' },
  accent: { bg: 'accentSoft', fg: 'accentText' },
  secondary: { bg: 'secondarySoft', fg: 'secondary' },
  highlight: { bg: 'highlightSoft', fg: 'highlight' },
};

export function Chip({ label, tone = 'primary' }: { label: string; tone?: Tone }) {
  const { bg, fg } = map[tone];
  const styles = useStyles((t) => ({
    chip: {
      alignSelf: 'flex-start',
      backgroundColor: t.colors[bg],
      borderRadius: t.radius.full,
      paddingHorizontal: t.spacing[3],
      paddingVertical: t.spacing[1],
    },
  }));
  return (
    <View style={styles.chip}>
      <Text variant="caption" tone={fg}>
        {label}
      </Text>
    </View>
  );
}
