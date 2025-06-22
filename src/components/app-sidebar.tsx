'use client';

import * as React from 'react';
import { Home, User, Briefcase, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';

const data = {
    navMain: [
        {
            title: 'Home',
            url: '/',
            icon: Home,
            shortcut: '1',
        },
        {
            title: 'Github',
            url: '/github',
            icon: User,
            shortcut: '2',
        },
        {
            title: 'Stack',
            url: '/stack',
            icon: Briefcase,
            shortcut: '3',
        },
    ],
    navSecondary: [
        {
            title: 'GitHub',
            url: 'https://github.com/Deta0ne',
            icon: Github,
        },
        {
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/mert-yildiz-60b519227',
            icon: Linkedin,
        },
        {
            title: 'Twitter',
            url: '#',
            icon: Twitter,
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/merty.s/',
            icon: Instagram,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-0">
                            <a href="#" className="flex items-center gap-3 h-12">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/avatar.jpg" alt="Mert Yıldız" />
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
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} />
            </SidebarContent>
        </Sidebar>
    );
}
