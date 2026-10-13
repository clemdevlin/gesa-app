import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Geometry of the floating tab bar, shared by the bar itself and by screens that scroll beneath it. */
export const TAB_BAR_HEIGHT = 68;
/** Gap between the bar and the bottom safe-area edge / the side edges of the screen. */
export const TAB_BAR_MARGIN = 12;
/** Breathing room kept between scrolling content and the top of the bar. */
const CONTENT_GAP = 16;

/** Bottom padding a screen needs so its content can scroll fully above the floating bar. */
export function useTabBarInset(): number {
  const { bottom } = useSafeAreaInsets();
  return bottom + TAB_BAR_MARGIN + TAB_BAR_HEIGHT + CONTENT_GAP;
}
