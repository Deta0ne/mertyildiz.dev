'use client';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { navigationData } from '@/lib/navigation-data';

export function MenuContent() {
    return (
        <>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-0">
                            <a href="/" className="flex items-center gap-3 h-12">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/asset/me.avif" alt="Mert Yıldız" loading="lazy" />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                        MY
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <span className="text-base font-semibold">Mert Yıldız</span>
                                    <span className="text-xs text-muted-foreground">Software Engineer</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigationData.navMain} />
                <NavSecondary />
            </SidebarContent>
        </>
    );
}
