import { Suspense } from 'react';
import LetterboxdHeader from '@/components/letterboxd-header';
import LetterboxdGrid from '@/components/letterboxd-grid';
import LetterboxdGridSkeleton from '@/components/letterboxd-grid-skeleton';

export default function LetterboxdPage() {
    return (
        <div className="container mx-auto px-6 py-8">
            <LetterboxdHeader />

            <Suspense fallback={<LetterboxdGridSkeleton />}>
                <LetterboxdGrid username="Aithra" limit={50} />
            </Suspense>
        </div>
    );
}
