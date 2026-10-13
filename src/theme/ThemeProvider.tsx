import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { Appearance, StyleSheet, useColorScheme } from 'react-native';

import { hitTarget, iconSize, iconStroke, radius, spacing } from './layout';
import { darkScheme, lightScheme, type SchemeTokens } from './tokens';
import { fontFamily, typography } from './typography';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Scheme = 'light' | 'dark';

const STORAGE_KEY = 'gesa.themeMode';
const DEFAULT_MODE: ThemeMode = 'dark';

export type Theme = SchemeTokens & {
  scheme: Scheme;
  isDark: boolean;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  fontFamily: typeof fontFamily;
  iconSize: typeof iconSize;
  iconStroke: number;
  hitTarget: number;
};

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** False until the saved preference has been read from the device. */
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isMode(value: unknown): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_MODE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!cancelled && isMode(saved)) setModeState(saved);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const scheme: Scheme = mode === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : mode;

  // Keep native chrome (alerts, keyboards, system bars) in step with the chosen mode.
  useEffect(() => {
    Appearance.setColorScheme(mode === 'system' ? 'unspecified' : mode);
  }, [mode]);

  const value = useMemo<ThemeContextValue>(() => {
    const tokens = scheme === 'dark' ? darkScheme : lightScheme;
    const theme: Theme = {
      ...tokens,
      scheme,
      isDark: scheme === 'dark',
      spacing,
      radius,
      typography,
      fontFamily,
      iconSize,
      iconStroke,
      hitTarget,
    };
    return { theme, mode, setMode, ready };
  }, [scheme, mode, setMode, ready]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(value.theme.colors.bg).catch(() => {});
  }, [value.theme.colors.bg]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** The resolved theme: colours, spacing, radius, typography. */
export function useTheme(): Theme {
  return useThemeContext().theme;
}

/** Appearance preference (system / light / dark), persisted on the device. */
export function useThemeMode() {
  const { mode, setMode, ready } = useThemeContext();
  return { mode, setMode, ready };
}

/**
 * Build a themed StyleSheet. The factory re-runs only when the theme changes.
 *
 *   const styles = useStyles((t) => ({ card: { backgroundColor: t.colors.surface } }));
 */
export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<unknown>>(
  factory: (theme: Theme) => T,
): T {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- factory is expected to be a stable inline function
  return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
}
