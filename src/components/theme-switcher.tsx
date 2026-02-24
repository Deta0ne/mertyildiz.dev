'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { THEMES, parseThemeId, getThemeConfig, type ThemeColor, type ThemeMode } from '@/lib/themes';
import {
    useThemeExtras,
    FONT_OPTIONS,
    STYLE_OPTIONS,
    type FontId,
    type StyleId,
} from '@/hooks/use-theme-extras';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const { font, style, setFont, setStyle, mounted } = useThemeExtras();
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon">
                <Palette className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        );
    }

    const { color: activeColor, mode: activeMode } = parseThemeId(theme);

    const toggleMode = () => {
        const newMode: ThemeMode = activeMode === 'dark' ? 'light' : 'dark';
        setTheme(`${activeColor}-${newMode}`);
    };

    const selectColor = (color: ThemeColor) => {
        setTheme(`${color}-${activeMode}`);
    };

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                variant="outline"
                size="icon"
                onClick={() => setOpen((v) => !v)}
                aria-label="Change theme"
            >
                <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>

            {open && (
                <div
                    ref={panelRef}
                    className="fixed right-3 top-[60px] z-[9999] w-64 rounded-xl border border-border bg-popover p-4 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 space-y-4"
                >
                    <section>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Color</p>
                            <button
                                onClick={toggleMode}
                                className="flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent transition-colors"
                            >
                                {activeMode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {THEMES.map((t) => {
                                const swatch = activeMode === 'dark' ? t.swatchDark : t.swatchLight;
                                const isActive = activeColor === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        title={t.label}
                                        onClick={() => selectColor(t.id)}
                                        className={`h-7 w-7 rounded-full transition-transform hover:scale-110 focus:outline-none ${isActive ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : ''
                                            }`}
                                        style={{ backgroundColor: swatch }}
                                    />
                                );
                            })}
                        </div>
                    </section>

                    <div className="border-t border-border" />

                    <section>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Font</p>
                        <div className="grid grid-cols-2 gap-1.5">
                            {FONT_OPTIONS.map((f) => {
                                const isActive = font === f.id;
                                const fontVarMap: Record<FontId, string> = {
                                    'font-geist': 'var(--font-geist)',
                                    'font-inter': 'var(--font-inter)',
                                    'font-playfair': 'var(--font-playfair)',
                                    'font-space': 'var(--font-space-grotesk)',
                                };
                                return (
                                    <button
                                        key={f.id}
                                        onClick={() => setFont(f.id)}
                                        className={`rounded-md border px-2.5 py-2 text-left transition-colors hover:bg-accent ${isActive
                                            ? 'border-foreground/40 bg-accent'
                                            : 'border-border bg-background'
                                            }`}
                                    >
                                        <span
                                            className="block text-[12px] font-semibold leading-tight"
                                            style={{ fontFamily: fontVarMap[f.id] }}
                                        >
                                            {f.label}
                                        </span>
                                        <span className="block text-[9px] text-muted-foreground mt-0.5">
                                            {f.description}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <div className="border-t border-border" />

                    <section>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Style</p>
                        <div className="grid grid-cols-3 gap-1.5">
                            {STYLE_OPTIONS.map((s) => {
                                const isActive = style === s.id;
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => setStyle(s.id)}
                                        className={`rounded-md border px-2 py-1.5 text-left transition-colors hover:bg-accent ${isActive
                                            ? 'border-foreground/40 bg-accent'
                                            : 'border-border bg-background'
                                            }`}
                                    >
                                        <span className="block text-[11px] font-semibold">{s.label}</span>
                                        <span className="block text-[9px] text-muted-foreground mt-0.5 leading-tight">
                                            {s.description}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
