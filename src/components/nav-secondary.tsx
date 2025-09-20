'use client';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSiteData } from '@/context/site-data-context';

export function NavSecondary() {
    const { socialLinks } = useSiteData();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Social</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {socialLinks.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a
                                    href={item.title === 'Mail' ? `mailto:cmertyldz@gmail.com` : item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1"
                                >
                                    {item.iconSvg && (
                                        <div
                                            className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
