import type { Metadata, Viewport } from 'next';
import { Geist, Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import { ALL_THEME_IDS } from '@/lib/themes';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Analytics } from '@vercel/analytics/next';
import { createMetadata } from '@/lib/metadata-utils';
import { siteConfig } from '@/lib/site-config';
import { SOCIAL_LINKS_QUERY, SocialLink } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';
import { SiteDataProvider } from '@/context/site-data-context'; //

const geist = Geist({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-geist',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-playfair',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-space-grotesk',
});

export const metadata: Metadata = createMetadata({
    title: siteConfig.title.default,
    description: siteConfig.description,
    canonicalUrl: siteConfig.url,
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const socialLinks: SocialLink[] = await client.fetch(SOCIAL_LINKS_QUERY);

    return (
        <html lang="tr" suppressHydrationWarning className={`${geist.variable} ${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{
  var fontMap={'font-geist':'--font-geist','font-inter':'--font-inter','font-playfair':'--font-playfair','font-space':'--font-space-grotesk'};
  var fontBodyMap={'font-geist':'--font-geist','font-inter':'--font-inter','font-playfair':'--font-geist','font-space':'--font-space-grotesk'};
  var f=localStorage.getItem('theme-font')||'font-geist';
  var s=localStorage.getItem('theme-style')||'style-vega';
  var el=document.documentElement;
  ['font-geist','font-inter','font-playfair','font-space'].forEach(function(c){el.classList.remove(c);});
  ['style-vega','style-maia','style-lyra'].forEach(function(c){el.classList.remove(c);});
  el.classList.add(f,s);
  var headingVar=fontMap[f]||'--font-geist';
  var bodyVar=fontBodyMap[f]||'--font-geist';
  el.style.setProperty('--font-heading','var('+headingVar+')');
  el.style.setProperty('--font-body','var('+bodyVar+')');
}catch(e){}})();`,
                    }}
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="amber-light"
                    themes={ALL_THEME_IDS}
                    disableTransitionOnChange
                >
                    <SiteDataProvider data={{ socialLinks }}>
                        <SidebarProvider>
                            <div className="hidden md:block">
                                <AppSidebar />
                            </div>
                            <main className="flex-1 bg-background" vaul-drawer-wrapper="">
                                <div className="hidden md:block fixed top-4 right-4 z-50">
                                    <ThemeSwitcher />
                                </div>

                                <div id="scroll-area" className="h-screen overflow-y-auto ">
                                    <div className="flex flex-1 flex-col gap-4 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2">
                                        {children}
                                    </div>
                                </div>
                            </main>
                        </SidebarProvider>
                    </SiteDataProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
