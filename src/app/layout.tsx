import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/toggle-mode-button';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="flex-1">
                            <div className="fixed top-4 left-4 z-50">
                                <SidebarTrigger className="md:hidden" />
                            </div>
                            <div className="fixed top-4 right-4 z-50">
                                <ModeToggle />
                            </div>
                            <div className="flex flex-1 flex-col gap-4 p-4 transition-all duration-300 ease-in-out">
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
