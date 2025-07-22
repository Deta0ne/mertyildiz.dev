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

export const GitHubThemedBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50/40 dark:from-background dark:via-background dark:to-orange-950/20" />

        <div
            className="absolute inset-0 opacity-20 dark:opacity-5"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(245, 101, 41, 0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(245, 101, 41, 0.04) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
            }}
        />

        <div
            className="absolute inset-0 opacity-15 dark:opacity-8"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 101, 41, 0.2) 1px, transparent 0)`,
                backgroundSize: '60px 60px',
            }}
        />

        <div className="absolute top-20 right-20 w-80 h-80 bg-orange-400/8 dark:bg-orange-400/4 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-blue-500/6 dark:bg-blue-500/3 rounded-full blur-3xl" />

        <div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
                background: 'radial-gradient(circle, rgba(245, 101, 41, 0.03) 0%, transparent 60%)',
            }}
        />
    </div>
);

export const TechStackBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 dark:from-background dark:via-blue-950/20 dark:to-purple-950/30" />

        <div
            className="absolute inset-0 opacity-25 dark:opacity-8"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                    linear-gradient(rgba(147, 51, 234, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(147, 51, 234, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px',
            }}
        />

        <div className="absolute top-16 left-1/4 w-64 h-64 bg-blue-400/8 dark:bg-blue-400/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-20 w-72 h-72 bg-purple-400/6 dark:bg-purple-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400/5 dark:bg-green-400/2 rounded-full blur-3xl" />

        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
            style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
            }}
        />
    </div>
);

export const CinemaThemedBg = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-orange-50/20 dark:bg-background" />
        <div className="absolute inset-0 bg-transparent dark:bg-orange-950/10" />
    </div>
);
