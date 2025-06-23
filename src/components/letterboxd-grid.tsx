import { Button } from '@/components/ui/button';
import { ExternalLink, Film } from 'lucide-react';
import FilmCard from '@/components/film-card';
import { getLetterboxdData, type ProcessedFilmLog } from '@/lib/letterboxd-service';

interface LetterboxdGridProps {
    username?: string;
    limit?: number;
}

interface MonthGroup {
    monthYear: string;
    displayName: string;
    films: ProcessedFilmLog[];
}

function groupFilmsByMonth(films: ProcessedFilmLog[]): MonthGroup[] {
    const groups = new Map<string, ProcessedFilmLog[]>();

    films.forEach((film) => {
        const dateStr = film.watchedDate || film.isoDate;
        if (!dateStr) return;

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return;

        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!groups.has(monthYear)) {
            groups.set(monthYear, []);
        }
        groups.get(monthYear)!.push(film);
    });

    const sortedGroups: MonthGroup[] = Array.from(groups.entries())
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([monthYear, films]) => {
            const [year, month] = monthYear.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            const displayName = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            });

            const sortedFilms = films.sort((a, b) => {
                const dateA = new Date(a.watchedDate || a.isoDate);
                const dateB = new Date(b.watchedDate || b.isoDate);
                return dateB.getTime() - dateA.getTime();
            });

            return {
                monthYear,
                displayName,
                films: sortedFilms,
            };
        });

    return sortedGroups;
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

    if (films.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <Film className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Films Found</h2>
                <p className="text-muted-foreground">No recent film activity found.</p>
            </div>
        );
    }

    const monthGroups = groupFilmsByMonth(films);

    return (
        <div className="space-y-8">
            {monthGroups.map((group) => (
                <div key={group.monthYear} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-foreground">{group.displayName}</h2>
                        <div className="flex-1 h-px bg-border"></div>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {group.films.length} film
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {group.films.map((film: ProcessedFilmLog, index: number) => (
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
                </div>
            ))}
        </div>
    );
}
