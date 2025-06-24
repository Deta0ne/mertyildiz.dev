'use client';

import { Badge } from '@/components/ui/badge';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: any;
        shortcut?: string;
    }[];
}) {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setActivePath(pathname);
    }, [pathname]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key >= '1' && event.key <= '9') {
                const item = items.find((item) => item.shortcut === event.key);
                if (item) {
                    event.preventDefault();
                    window.location.href = item.url;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [items]);

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = isClient && activePath === item.url;
                        return (
                            <SidebarMenuItem key={item.title}>
                                {isActive ? (
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                        asChild
                                    >
                                        <Link href={item.url} scroll={false}>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    {item.icon && <item.icon className="h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </div>
                                                {item.shortcut && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-auto text-xs px-1.5 py-0.5 bg-primary-foreground/20 text-primary-foreground hidden md:flex"
                                                    >
                                                        {item.shortcut}
                                                    </Badge>
                                                )}
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link href={item.url} scroll={false}>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    {item.icon && <item.icon className="h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </div>
                                                {item.shortcut && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-auto text-xs px-1.5 py-0.5 hidden md:flex"
                                                    >
                                                        {item.shortcut}
                                                    </Badge>
                                                )}
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
