import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/toggle-mode-button';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
                        <AppSidebar />
                        <main className="flex-1">
                            {/* Mobile header */}
                            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
                                <div className="flex justify-between items-center p-4">
                                    <SidebarTrigger />
                                    <ModeToggle />
                                </div>
                            </div>

                            {/* Desktop mode toggle - top right fixed */}
                            <div className="hidden md:block fixed top-4 right-4 z-50">
                                <ModeToggle />
                            </div>

                            {/* Content */}
                            <div className="pt-20 md:pt-16 flex flex-1 flex-col gap-4 p-4 transition-all duration-300 ease-in-out">
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
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
