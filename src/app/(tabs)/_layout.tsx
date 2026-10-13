import { Tabs } from 'expo-router';

import { Icon, type IconName } from '@/components/ui';
import { useTheme } from '@/theme';

const tab = (name: IconName) =>
  function TabIcon({ focused }: { focused: boolean }) {
    return <Icon name={name} size="lg" tone={focused ? 'accent' : 'textFaint'} />;
  };

export default function TabsLayout() {
  const { colors, fontFamily } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: fontFamily.semibold, fontSize: 10 },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tab('home') }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn', tabBarIcon: tab('graduation') }} />
      <Tabs.Screen name="events" options={{ title: 'Events', tabBarIcon: tab('calendar') }} />
      <Tabs.Screen name="notices" options={{ title: 'Notices', tabBarIcon: tab('bell') }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: tab('more') }} />
    </Tabs>
  );
}
