import { EmptyState, Screen, Text } from '@/components/ui';

export default function NoticesScreen() {
  return (
    <Screen>
      <Text variant="title">Notices</Text>
      <EmptyState icon="bell" title="Coming soon" message="Announcements from the executives will be posted here." />
    </Screen>
  );
}
