'use client';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { Home, User, Briefcase, Github, Linkedin, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuData = {
    navMain: [
        {
            title: 'Ana Sayfa',
            url: '/',
            icon: Home,
            shortcut: '1',
        },
        {
            title: 'Hakkımda',
            url: '/about',
            icon: User,
            shortcut: '2',
        },
        {
            title: 'Projeler',
            url: '/projects',
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
            url: 'www.linkedin.com/in/mert-yildiz-60b519227',
            icon: Linkedin,
        },
        {
            title: 'Twitter',
            url: 'https://twitter.com/ConstMert',
            icon: Twitter,
        },
    ],
};

export function MenuContent() {
    return (
        <div className="flex flex-col h-full">
            {/* Profile Section */}
            <div className="mb-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar.jpg" alt="Mert Yıldız" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">MY</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <span className="text-base font-semibold">Mert Yıldız</span>
                        <span className="text-xs text-muted-foreground">Software Engineer</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-6">
                <NavMain items={menuData.navMain} />
                <NavSecondary items={menuData.navSecondary} />
            </div>
        </div>
    );
}
