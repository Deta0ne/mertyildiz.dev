import { Skeleton } from '@/components/ui/skeleton';

export default function LetterboxdGridSkeleton() {
    return (
        <div className="space-y-8">
            {/* İlk ay grubu */}
            <div className="space-y-4">
                {/* Ay başlığı skeleton */}
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="flex-1 h-px bg-border"></div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Filmler grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-full max-w-sm">
                            <Skeleton className="aspect-[2/3] w-full rounded-lg mb-4" />

                            <div className="space-y-3 p-4">
                                <div>
                                    <Skeleton className="h-5 w-full mb-2" />
                                    <Skeleton className="h-4 w-16" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <Skeleton key={starIndex} className="w-4 h-4 rounded-sm" />
                                        ))}
                                    </div>
                                    <Skeleton className="h-4 w-8" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* İkinci ay grubu */}
            <div className="space-y-4">
                {/* Ay başlığı skeleton */}
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-36" />
                    <div className="flex-1 h-px bg-border"></div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Filmler grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-full max-w-sm">
                            <Skeleton className="aspect-[2/3] w-full rounded-lg mb-4" />

                            <div className="space-y-3 p-4">
                                <div>
                                    <Skeleton className="h-5 w-full mb-2" />
                                    <Skeleton className="h-4 w-16" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <Skeleton key={starIndex} className="w-4 h-4 rounded-sm" />
                                        ))}
                                    </div>
                                    <Skeleton className="h-4 w-8" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
