import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
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
                stars.push(<Star key={i} className="w-4 h-4 fill-primary text-primary" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-muted absolute" />
                        <div className="overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                        </div>
                    </div>,
                );
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-muted" />);
            }
        }
        return stars;
    };

    return (
        <Link href={letterboxdUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <div className="relative">
                    <div className="aspect-[2/3] overflow-hidden bg-muted">
                        <img
                            src={posterUrl || '/placeholder.svg'}
                            alt={`${title} poster`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Annotations overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
                                    {title}
                                </h4>
                                {description && (
                                    <p className="text-white/95 text-xs mt-1 mb-2 line-clamp-3 italic [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">
                                        "{description}"
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 border border-border/50">
                                            <Star className="w-2.5 h-2.5 fill-primary text-primary" />
                                            <span className="text-foreground text-xs font-medium">
                                                {rating.toFixed(1)}
                                            </span>
                                        </div>
                                        {isRewatch && (
                                            <div className="bg-accent/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 border border-border/50">
                                                <span className="text-accent-foreground text-xs font-medium">
                                                    Rewatch
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 border border-border/50">
                                        <span className="text-foreground text-xs font-medium">
                                            {formatDate(watchedDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
