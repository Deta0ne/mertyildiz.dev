import { Suspense } from 'react';
import LetterboxdGrid from '@/components/letterboxd/letterboxd-grid';
import LetterboxdGridSkeleton from '@/components/letterboxd/letterboxd-grid-skeleton';
import { Film } from 'lucide-react';

export default function LetterboxdPage() {
    return (
        <div className="mx-auto w-full lg:mb-0 ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Film className="w-10 h-10 text-primary" />
                        Recent Watches
                    </h1>
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
    );
}
