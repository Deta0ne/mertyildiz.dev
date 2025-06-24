import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GitHubLoading() {
    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* Profile Header Skeleton */}
            <div className="text-center space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Skeleton className="w-20 h-20 rounded-full" />
                    <div className="text-center sm:text-left space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64" />
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Repositories Section */}
            <section className="space-y-6">
                <Skeleton className="h-8 w-56" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="h-full">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardHeader>
                            <CardContent className="pt-0 space-y-4">
                                <div className="flex flex-wrap gap-1">
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-14" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Activity Section */}
            <section className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
