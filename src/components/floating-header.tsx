'use client';

import { ArrowLeftIcon, Film, Github, Home, Layers } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useMemo, useState } from 'react';

import { MobileDrawer } from '@/components/mobile-drawer';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/toggle-mode-button';

interface FloatingHeaderProps {
    scrollTitle?: string;
    title?: string;
    goBackLink?: string;
    children?: React.ReactNode;
}

export const FloatingHeader = memo(({ scrollTitle, title, goBackLink, children }: FloatingHeaderProps) => {
    const [transformValues, setTransformValues] = useState({ translateY: 0, opacity: scrollTitle ? 0 : 1 });
    const pathname = usePathname();

    const memoizedMobileDrawer = useMemo(() => <MobileDrawer />, []);

    useEffect(() => {
        const scrollAreaElem = document.querySelector('#scroll-area');

        const onScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            const scrollY = target.scrollTop;

            const translateY = Math.max(100 - scrollY, 0);
            const opacity = Math.min(Math.max((scrollY - 20 * (20 / (scrollY ** 2 / 100))) / 100, 0), 1);

            setTransformValues({ translateY, opacity });
        };

        if (scrollTitle) {
            scrollAreaElem?.addEventListener('scroll', onScroll, {
                passive: true,
            });
        }
        return () => scrollAreaElem?.removeEventListener('scroll', onScroll);
    }, [scrollTitle]);

    const getPageContent = () => {
        if (title) return { icon: null, displayTitle: title };

        switch (pathname) {
            case '/':
                return { icon: <Home size={16} />, displayTitle: 'Mert Yıldız' };
            case '/github':
                return { icon: <Github size={16} />, displayTitle: 'GitHub' };
            case '/letterboxd':
                return { icon: <Film size={16} />, displayTitle: 'Letterboxd' };
            case '/stack':
                return { icon: <Layers size={16} />, displayTitle: 'Stack' };
            default:
                return { icon: <Home size={16} />, displayTitle: 'Mert Yıldız' };
        }
    };

    const { icon, displayTitle } = getPageContent();

    return (
        <header className="sticky inset-x-0 top-0 z-50 mx-auto flex h-14 w-full shrink-0 items-center overflow-hidden border-b bg-background/80 backdrop-blur-sm text-sm font-medium md:hidden">
            <div className="flex size-full items-center px-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-3">
                        {goBackLink ? (
                            <Button variant="ghost" size="icon" className="shrink-0" asChild>
                                <Link href={goBackLink} title="Go back" scroll={false}>
                                    <ArrowLeftIcon size={16} />
                                </Link>
                            </Button>
                        ) : (
                            memoizedMobileDrawer
                        )}

                        <div className="flex flex-1 items-center justify-between">
                            {scrollTitle && (
                                <div
                                    className="flex items-center gap-2"
                                    style={{
                                        transform: `translateY(${transformValues.translateY}%)`,
                                        opacity: transformValues.opacity,
                                    }}
                                >
                                    {icon}
                                    <span className="line-clamp-1 font-semibold tracking-tight">{scrollTitle}</span>
                                </div>
                            )}

                            {!scrollTitle && (
                                <div className="flex items-center gap-2">
                                    {icon}
                                    <span className="line-clamp-1 font-semibold tracking-tight">{displayTitle}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {children}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
});

FloatingHeader.displayName = 'FloatingHeader';
