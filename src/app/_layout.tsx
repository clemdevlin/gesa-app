import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';

import { fontAssets, ThemeProvider, useTheme, useThemeMode } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function Shell() {
  const theme = useTheme();
  const { ready } = useThemeMode();
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if ((fontsLoaded || fontError) && ready) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded, fontError, ready]);

  const navigationTheme = useMemo(
    () => ({
      ...(theme.isDark ? DarkTheme : DefaultTheme),
      colors: {
        primary: theme.colors.accent,
        background: theme.colors.bg,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.danger,
      },
    }),
    [theme],
  );

  if (!(fontsLoaded || fontError) || !ready) return null;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.bg } }} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }),
  );
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Shell />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
