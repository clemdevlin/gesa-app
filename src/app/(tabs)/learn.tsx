import { EmptyState, Screen, Text } from '@/components/ui';

export default function LearnScreen() {
  return (
    <Screen>
      <Text variant="title">Learn</Text>
      <EmptyState icon="graduation" title="Coming soon" message="Course materials and past questions will live here." />
    </Screen>
  );
}
