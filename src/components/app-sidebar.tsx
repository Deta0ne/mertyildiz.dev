'use client';

import * as React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { MenuContent } from '@/components/menu-content';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <MenuContent />
        </Sidebar>
    );
}
