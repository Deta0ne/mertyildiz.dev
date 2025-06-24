'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CommandIcon } from 'lucide-react';

import { MenuContent } from '@/components/menu-content';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

export function MobileDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const wrapper = document.querySelector('[vaul-drawer-wrapper]');
        if (!wrapper) return;

        if (isOpen) {
            wrapper.setAttribute('data-vaul-drawer-visible', 'true');
            document.body.classList.add('drawer-open');
        } else {
            wrapper.removeAttribute('data-vaul-drawer-visible');
            document.body.classList.remove('drawer-open');
        }

        return () => {
            wrapper.removeAttribute('data-vaul-drawer-visible');
            document.body.classList.remove('drawer-open');
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" title="Toggle drawer">
                    <CommandIcon size={16} />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-4/5 drawer-content">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>Mobile Menu</DrawerTitle>
                    <DrawerDescription>Mobile Menu</DrawerDescription>
                </DrawerHeader>

                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-4" />

                <div
                    className="overflow-y-auto p-4"
                    onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const link = target.closest('a');
                        if (link && link.href && !link.href.startsWith('#')) {
                            setTimeout(() => setIsOpen(false), 100);
                        }
                    }}
                >
                    <MenuContent />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
