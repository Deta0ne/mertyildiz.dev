import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/toggle-mode-button';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const geist = Geist({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-geist',
});

export const metadata: Metadata = {
    title: 'Mert Yıldız',
    description: 'Kişisel websitesi',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={geist.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <SidebarProvider>
                        <div className="hidden md:block">
                            <AppSidebar />
                        </div>

                        <main className="flex-1 bg-background" vaul-drawer-wrapper="">
                            {/* Desktop mode toggle - top right fixed */}
                            <div className="hidden md:block fixed top-4 right-4 z-50">
                                <ModeToggle />
                            </div>

                            {/* Content area */}
                            <div id="scroll-area" className="h-screen overflow-y-auto md:pt-16">
                                <div className="flex flex-1 flex-col gap-4 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
