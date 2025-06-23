import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

interface FilmCardProps {
    title?: string;
    year?: number;
    rating?: number;
    watchedDate?: string;
    posterUrl?: string;
    letterboxdUrl?: string;
    isRewatch?: boolean;
    description?: string;
}

export default function FilmCard({
    title = '28 Weeks Later',
    year = 2007,
    rating = 3.0,
    watchedDate = '2025-06-20',
    posterUrl = 'https://a.ltrbxd.com/resized/film-poster/5/0/9/7/2/50972-28-weeks-later-0-600-0-900-crop.jpg?v=811010e540',
    letterboxdUrl = 'https://letterboxd.com/aithra/film/28-weeks-later/',
    isRewatch = false,
    description,
}: FilmCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-gray-300 absolute" />
                        <div className="overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>,
                );
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative">
                <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                    <img
                        src={posterUrl || '/placeholder.svg'}
                        alt={`${title} poster`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {isRewatch && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Rewatch</Badge>
                )}
                <Link
                    href={letterboxdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 left-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                >
                    <ExternalLink className="w-4 h-4 text-white" />
                </Link>
            </div>

            <CardContent className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{year}</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">{renderStars(rating)}</div>
                    <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Watched {formatDate(watchedDate)}</span>
                </div>

                {description && (
                    <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-3 italic">"{description}"</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
