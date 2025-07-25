import { Skeleton } from '@/components/ui/skeleton';

export default function LetterboxdGridSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-36" />
                    <div className="flex-1 h-px bg-border"></div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-full max-w-sm">
                            <Skeleton className="aspect-[2/3] w-full rounded-lg mb-4" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-36" />
                    <div className="flex-1 h-px bg-border"></div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-full max-w-sm">
                            <Skeleton className="aspect-[2/3] w-full rounded-lg mb-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
