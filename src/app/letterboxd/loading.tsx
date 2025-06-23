import { Skeleton } from '@/components/ui/skeleton';
import { Film } from 'lucide-react';

export default function LetterboxdLoading() {
    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Film className="w-10 h-10 text-primary" />
                        <Skeleton className="h-10 w-60" />
                    </div>
                    <Skeleton className="h-5 w-80" />
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Films Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-full max-w-sm">
                        {/* Poster Skeleton */}
                        <Skeleton className="aspect-[2/3] w-full rounded-lg mb-4" />

                        {/* Content Skeleton */}
                        <div className="space-y-3 p-4">
                            {/* Title */}
                            <div>
                                <Skeleton className="h-5 w-full mb-2" />
                                <Skeleton className="h-4 w-16" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                        <Skeleton key={starIndex} className="w-4 h-4 rounded-sm" />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-8" />
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
