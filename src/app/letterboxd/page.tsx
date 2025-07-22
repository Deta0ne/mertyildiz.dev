import { Suspense } from 'react';
import LetterboxdGrid from '@/components/letterboxd/letterboxd-grid';
import LetterboxdGridSkeleton from '@/components/letterboxd/letterboxd-grid-skeleton';
import { FloatingHeader } from '@/components/floating-header';
import { createLetterboxdMetadata } from '@/lib/metadata-utils';
import { CinemaThemedBg } from '@/components/ui/background';

export const revalidate = 86400;
export const dynamic = 'force-dynamic';

export const metadata = createLetterboxdMetadata();

export default function LetterboxdPage() {
    return (
        <>
            <CinemaThemedBg />
            <FloatingHeader scrollTitle="Recent Watches" />
            <div className="mx-auto w-full lg:mb-0 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">Recent Watches 🍿</h1>
                        <p className="text-muted-foreground">
                            My latest film activity from{' '}
                            <a
                                href="https://letterboxd.com/Aithra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary transition-colors"
                            >
                                Letterboxd
                            </a>
                        </p>
                    </div>
                </div>

                <Suspense fallback={<LetterboxdGridSkeleton />}>
                    <LetterboxdGrid username="Aithra" limit={50} />
                </Suspense>
            </div>
        </>
    );
}
