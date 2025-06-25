import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date: string;
    icon?: React.ReactNode;
    isActive?: boolean;
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
    return (
        <div className={cn('relative', className)}>
            <div className="space-y-8">
                {items.map((item, index) => (
                    <div key={item.id} className="relative flex items-start gap-6">
                        {index < items.length - 1 && <div className="absolute left-8 top-16 w-px h-full bg-border" />}

                        <div
                            className={cn(
                                'relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4',
                                item.isActive
                                    ? 'bg-primary border-primary text-primary-foreground'
                                    : 'bg-background border-border text-muted-foreground',
                            )}
                        >
                            {item.icon || (
                                <div
                                    className={cn(
                                        'h-3 w-3 rounded-full',
                                        item.isActive ? 'bg-primary-foreground' : 'bg-muted-foreground',
                                    )}
                                />
                            )}
                        </div>

                        <div className={cn('flex-1 pb-8', item.isActive ? 'opacity-100' : 'opacity-90')}>
                            <div
                                className={cn(
                                    'rounded-lg border p-6',
                                    item.isActive ? 'bg-primary/5 border-primary/20' : 'bg-card border-border',
                                )}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h3
                                        className={cn(
                                            'text-lg font-semibold',
                                            item.isActive ? 'text-primary' : 'text-foreground',
                                        )}
                                    >
                                        {item.title}
                                    </h3>
                                    <span
                                        className={cn(
                                            'text-sm font-medium',
                                            item.isActive ? 'text-primary' : 'text-muted-foreground',
                                        )}
                                    >
                                        {item.date}
                                    </span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export type { TimelineItem, TimelineProps };
