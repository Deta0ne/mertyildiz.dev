'use client';

import { useCallback, useEffect, useState } from 'react';

export type FontId = 'font-geist' | 'font-inter' | 'font-playfair' | 'font-space';
export type StyleId = 'style-vega' | 'style-maia' | 'style-lyra';

export const FONT_OPTIONS = [
    { id: 'font-geist' as FontId, label: 'Geist', description: 'Modern, minimal' },
    { id: 'font-inter' as FontId, label: 'Inter', description: 'Clean, readable' },
    { id: 'font-playfair' as FontId, label: 'Playfair', description: 'Serif, elegant' },
    { id: 'font-space' as FontId, label: 'Space Grotesk', description: 'Geometric' },
] as const;

export const STYLE_OPTIONS = [
    { id: 'style-lyra' as StyleId, label: 'Lyra', description: 'Sharp, geometric.' },
    { id: 'style-vega' as StyleId, label: 'Vega', description: 'Classic, balanced.' },
    { id: 'style-maia' as StyleId, label: 'Maia', description: 'Soft, rounded.' },
] as const;

const STORAGE_FONT = 'theme-font';
const STORAGE_STYLE = 'theme-style';
const DEFAULT_FONT: FontId = 'font-geist';
const DEFAULT_STYLE: StyleId = 'style-vega';

const FONT_CSS_VAR: Record<FontId, string> = {
    'font-geist': '--font-geist',
    'font-inter': '--font-inter',
    'font-playfair': '--font-playfair',
    'font-space': '--font-space-grotesk',
};

const FONT_HEADING_CSS_VAR: Record<FontId, string> = {
    'font-geist': '--font-geist',
    'font-inter': '--font-inter',
    'font-playfair': '--font-playfair',
    'font-space': '--font-space-grotesk',
};

const FONT_BODY_CSS_VAR: Record<FontId, string> = {
    'font-geist': '--font-geist',
    'font-inter': '--font-inter',
    'font-playfair': '--font-geist',
    'font-space': '--font-space-grotesk',
};

const ALL_FONTS: FontId[] = FONT_OPTIONS.map(f => f.id);
const ALL_STYLES: StyleId[] = STYLE_OPTIONS.map(s => s.id);

function applyFont(id: FontId) {
    const el = document.documentElement;
    ALL_FONTS.forEach(f => el.classList.remove(f));
    el.classList.add(id);
    el.style.setProperty('--font-body', `var(${FONT_BODY_CSS_VAR[id]})`);
    el.style.setProperty('--font-heading', `var(${FONT_HEADING_CSS_VAR[id]})`);
}

function applyStyle(id: StyleId) {
    const el = document.documentElement;
    ALL_STYLES.forEach(s => el.classList.remove(s));
    el.classList.add(id);
}

export function useThemeExtras() {
    const [font, setFontState] = useState<FontId>(DEFAULT_FONT);
    const [style, setStyleState] = useState<StyleId>(DEFAULT_STYLE);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedFont = (localStorage.getItem(STORAGE_FONT) ?? DEFAULT_FONT) as FontId;
        const savedStyle = (localStorage.getItem(STORAGE_STYLE) ?? DEFAULT_STYLE) as StyleId;

        applyFont(savedFont);
        applyStyle(savedStyle);

        setFontState(savedFont);
        setStyleState(savedStyle);
        setMounted(true);
    }, []);

    const setFont = useCallback((id: FontId) => {
        applyFont(id);
        localStorage.setItem(STORAGE_FONT, id);
        setFontState(id);
    }, []);

    const setStyle = useCallback((id: StyleId) => {
        applyStyle(id);
        localStorage.setItem(STORAGE_STYLE, id);
        setStyleState(id);
    }, []);

    return { font, style, setFont, setStyle, mounted };
}
