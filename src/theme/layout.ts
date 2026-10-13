/** 4-pt spacing scale. */
export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48 } as const;

export const radius = { sm: 8, md: 12, lg: 18, xl: 26, full: 999 } as const;

export const iconSize = { sm: 16, md: 20, lg: 24 } as const;
export const iconStroke = 1.75;

/** Minimum touch target (pt). */
export const hitTarget = 44;

export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
