import { EmptyState, Screen, Text } from '@/components/ui';

export default function EventsScreen() {
  return (
    <Screen>
      <Text variant="title">Events</Text>
      <EmptyState icon="calendar" title="Coming soon" message="Upcoming association events will show up here." />
    </Screen>
  );
}
