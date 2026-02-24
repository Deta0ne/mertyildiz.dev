import React from 'react';

export const MinimalGradientBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
            className="absolute inset-0"
            style={{
                background: `linear-gradient(135deg,
                    color-mix(in oklch, var(--background) 100%, transparent) 0%,
                    color-mix(in oklch, var(--primary) 4%, var(--background)) 50%,
                    color-mix(in oklch, var(--secondary) 8%, var(--background)) 100%
                )`,
            }}
        />

        <div
            className="absolute inset-0 opacity-25 dark:opacity-10"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--primary) 30%, transparent) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }}
        />

        <div
            className="absolute top-10 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 dark:opacity-10"
            style={{ background: `color-mix(in oklch, var(--primary) 40%, transparent)` }}
        />
        <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 dark:opacity-8"
            style={{ background: `color-mix(in oklch, var(--secondary) 50%, transparent)` }}
        />

        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
                background: `radial-gradient(circle, color-mix(in oklch, var(--primary) 6%, transparent) 0%, transparent 70%)`,
            }}
        />
    </div>
);

export const GitHubThemedBg = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: 'var(--background)' }}>
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 30% 70%,
                        color-mix(in oklch, var(--secondary) 35%, transparent),
                        transparent 60%
                    ),
                    radial-gradient(circle at 70% 30%,
                        color-mix(in oklch, var(--primary) 15%, transparent),
                        transparent 60%
                    )
                `,
            }}
        />
        <div className="relative z-10">{children}</div>
    </div>
);

export const TechStackBg = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: 'var(--background)' }}>
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: `
                    linear-gradient(to right, color-mix(in oklch, var(--border) 80%, transparent) 1px, transparent 1px),
                    linear-gradient(to bottom, color-mix(in oklch, var(--border) 80%, transparent) 1px, transparent 1px)
                `,
                backgroundSize: '20px 30px',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
            }}
        />
        <div className="relative z-10">{children}</div>
    </div>
);

export const CinemaThemedBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: 'var(--background)' }}
        />
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 20% 80%,
                        color-mix(in oklch, var(--secondary) 30%, transparent) 0%,
                        transparent 50%
                    ),
                    radial-gradient(circle at 80% 20%,
                        color-mix(in oklch, var(--primary) 12%, transparent) 0%,
                        transparent 50%
                    ),
                    radial-gradient(circle at 40% 40%,
                        color-mix(in oklch, var(--muted) 40%, transparent) 0%,
                        transparent 50%
                    )
                `,
            }}
        />
    </div>
);
