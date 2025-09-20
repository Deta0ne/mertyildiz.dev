'use client';

import { SocialLink } from '@/lib/sanity/queries';
import React, { createContext, useContext, ReactNode } from 'react';

type SiteData = {
    socialLinks: SocialLink[];
};

const SiteDataContext = createContext<SiteData | undefined>(undefined);

interface SiteDataProviderProps {
    children: ReactNode;
    data: SiteData;
}

export function SiteDataProvider({ children, data }: SiteDataProviderProps) {
    return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
    const context = useContext(SiteDataContext);
    if (context === undefined) {
        throw new Error('useSiteData must be used within a SiteDataProvider');
    }
    return context;
}
