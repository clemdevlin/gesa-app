import { Link } from 'expo-router';

import { EmptyState, Screen, Text } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <Screen underTabBar={false}>
      <EmptyState icon="compass" title="Page not found" message="That screen doesn’t exist." />
      <Link href="/">
        <Text tone="highlight" variant="label">
          Go to Home
        </Text>
      </Link>
    </Screen>
  );
}
