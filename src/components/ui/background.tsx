export const MinimalGradientBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/50 dark:from-background dark:via-background dark:to-background/90" />

        <div
            className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
            }}
        />

        <div
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }}
        />

        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/8 dark:bg-purple-400/4 rounded-full blur-3xl" />
        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            }}
        />
    </div>
);

export const GitHubThemedBg = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full bg-[#fefcff] dark:bg-background relative">
        {/* Light Theme - Dreamy Sky Pink Glow */}
        <div
            className="absolute inset-0 z-0 dark:hidden"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                    radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
                `,
            }}
        />
        {/* Dark Theme - Subtle Glow */}
        <div
            className="absolute inset-0 z-0 hidden dark:block"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.1), transparent 60%),
                    radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.1), transparent 60%)
                `,
            }}
        />
        {/* Content */}
        <div className="relative z-10">{children}</div>
    </div>
);

export const TechStackBg = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-background relative">
        {/* Light Theme Grid Background */}
        <div
            className="absolute inset-0 z-0 dark:hidden"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                `,
                backgroundSize: '20px 30px',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
            }}
        />
        {/* Dark Theme Grid Background */}
        <div
            className="absolute inset-0 z-0 hidden dark:block"
            style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 30px',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
            }}
        />
        {/* Content */}
        <div className="relative z-10">{children}</div>
    </div>
);

export const CinemaThemedBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-orange-50/20 dark:bg-background" />
        <div className="absolute inset-0 bg-transparent dark:bg-orange-950/10" />
    </div>
);
