import { Button } from '@/components/ui/button';
import { ExternalLink, Film } from 'lucide-react';
import FilmCard from '@/components/film-card';
import { getLetterboxdData, type ProcessedFilmLog } from '@/lib/letterboxd-service';

interface LetterboxdGridProps {
    username?: string;
    limit?: number;
}

export default async function LetterboxdGrid({ username = 'Aithra', limit = 50 }: LetterboxdGridProps) {
    const { data: films = [], feedInfo, success, error } = await getLetterboxdData(username, limit);

    if (!success && error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <Film className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Error Loading Films</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {films.map((film: ProcessedFilmLog, index: number) => (
                    <FilmCard
                        key={`${film.link}-${index}`}
                        title={film.title}
                        year={parseInt(film.year) || 0}
                        rating={film.rating}
                        watchedDate={film.watchedDate || ''}
                        posterUrl={film.posterUrl}
                        letterboxdUrl={film.link}
                        isRewatch={film.isRewatch}
                        description={film.review}
                    />
                ))}
            </div>

            {films.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <Film className="w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Films Found</h2>
                    <p className="text-muted-foreground">No recent film activity found.</p>
                </div>
            )}
        </>
    );
}
