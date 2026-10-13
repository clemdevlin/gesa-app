import { Tabs } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { useStyles } from '@/theme';

import { TAB_BAR_HEIGHT, TAB_BAR_MARGIN } from './tabBarMetrics';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/**
 * Floating, pill-shaped bottom tab bar. Plug into <Tabs tabBar={(props) => <FloatingTabBar {...props} />} />.
 * Icons come from each screen's `tabBarIcon` option; the active tab is tinted with the accent colour.
 */
export function FloatingTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const styles = useStyles((t) => ({
    wrap: {
      position: 'absolute',
      left: TAB_BAR_MARGIN + insets.left,
      right: TAB_BAR_MARGIN + insets.right,
      bottom: TAB_BAR_MARGIN + insets.bottom,
      pointerEvents: 'box-none',
    },
    bar: {
      height: TAB_BAR_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: t.spacing[2],
      borderRadius: t.radius.full,
      backgroundColor: t.colors.tabBar,
      borderColor: t.colors.border,
      borderWidth: 1,
      ...t.shadows.card,
    },
    item: { flex: 1, height: TAB_BAR_HEIGHT - t.spacing[3], alignItems: 'center', justifyContent: 'center', gap: 2 },
    itemPressed: { backgroundColor: t.colors.surfaceStrong, borderRadius: t.radius.full },
    iconWrap: { alignItems: 'center', justifyContent: 'center' },
    badge: {
      position: 'absolute',
      top: -6,
      right: -12,
      minWidth: 18,
      height: 18,
      paddingHorizontal: 5,
      borderRadius: t.radius.full,
      backgroundColor: t.colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  if (keyboardVisible) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.bar} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]!;
          const focused = state.index === index;
          const label = typeof options.title === 'string' ? options.title : route.name;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
          };
          const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              accessibilityState={{ selected: focused }}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
              <View style={styles.iconWrap}>
                {/* Our icons take their colour from theme tokens, so the navigator's tint is unused. */}
                {options.tabBarIcon?.({ focused, color: 'transparent', size: 24 })}
                {options.tabBarBadge !== undefined ? (
                  <View style={styles.badge}>
                    <Text variant="overline" tone="textOnPrimary" style={{ letterSpacing: 0, fontSize: 10 }}>
                      {String(options.tabBarBadge)}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text variant="caption" tone={focused ? 'accent' : 'textFaint'} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
