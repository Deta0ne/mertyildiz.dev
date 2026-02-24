export type ThemeColor = (typeof THEMES)[number]['id'];
export type ThemeMode = 'light' | 'dark';
export type ThemeId = `${ThemeColor}-${ThemeMode}`;

export const THEMES = [
    {
        id: 'amber',
        label: 'Amber',
        swatchLight: 'oklch(0.4341 0.0392 41.9938)',
        swatchDark: 'oklch(0.9247 0.0524 66.1732)',
    },
    {
        id: 'sky',
        label: 'Sky',
        swatchLight: 'oklch(0.48 0.18 215)',
        swatchDark: 'oklch(0.72 0.18 215)',
    },
    {
        id: 'red',
        label: 'Red',
        swatchLight: 'oklch(0.52 0.24 22)',
        swatchDark: 'oklch(0.70 0.22 22)',
    },
    {
        id: 'teal',
        label: 'Teal',
        swatchLight: 'oklch(0.45 0.14 180)',
        swatchDark: 'oklch(0.66 0.18 180)',
    },
    {
        id: 'orange',
        label: 'Orange',
        swatchLight: 'oklch(0.60 0.20 55)',
        swatchDark: 'oklch(0.78 0.18 55)',
    },
    {
        id: 'lime',
        label: 'Lime',
        swatchLight: 'oklch(0.48 0.22 135)',
        swatchDark: 'oklch(0.70 0.20 135)',
    },
] as const;

export const ALL_THEME_IDS: ThemeId[] = THEMES.flatMap((t) => [
    `${t.id}-light` as ThemeId,
    `${t.id}-dark` as ThemeId,
]);
export function parseThemeId(theme: string | undefined): { color: ThemeColor; mode: ThemeMode } {
    const parts = (theme ?? 'amber-light').split('-');
    return {
        color: (parts[0] as ThemeColor) ?? 'amber',
        mode: (parts[1] as ThemeMode) ?? 'light',
    };
}

export function getThemeConfig(color: ThemeColor) {
    return THEMES.find((t) => t.id === color) ?? THEMES[0];
}
