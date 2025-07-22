'use client';

import { useState, useEffect } from 'react';
import { FloatingHeader } from '@/components/floating-header';
import { GitHubThemedBg } from '@/components/ui/background';

interface GitHubPageWrapperProps {
    children: React.ReactNode;
}

export function GitHubPageWrapper({ children }: GitHubPageWrapperProps) {
    const [currentSection, setCurrentSection] = useState('Pinned Repositories');

    useEffect(() => {
        const scrollArea = document.querySelector('#scroll-area');
        if (!scrollArea) return;

        const onScroll = () => {
            const pinnedSection = document.querySelector('[data-section="pinned"]') as HTMLElement;
            const activitySection = document.querySelector('[data-section="activity"]') as HTMLElement;

            if (!pinnedSection || !activitySection) return;

            const scrollTop = scrollArea.scrollTop;
            const pinnedTop = pinnedSection.offsetTop;
            const activityTop = activitySection.offsetTop;

            if (scrollTop + 100 >= activityTop) {
                setCurrentSection('Recent Activity');
            } else if (scrollTop + 100 >= pinnedTop) {
                setCurrentSection('Pinned Repositories');
            } else {
                setCurrentSection('Deta0ne');
            }
        };

        scrollArea.addEventListener('scroll', onScroll, { passive: true });
        return () => scrollArea.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <GitHubThemedBg />
            <FloatingHeader scrollTitle={currentSection} />
            {children}
        </>
    );
}
