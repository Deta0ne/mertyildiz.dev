import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FilmCardProps {
    title: string;
    year: number;
    rating: number;
    watchedDate: string;
    posterUrl: string;
    letterboxdUrl: string;
    isRewatch?: boolean;
    description?: string;
}

export default function FilmCard({
    title,
    year,
    rating,
    watchedDate,
    posterUrl,
    letterboxdUrl,
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

    return (
        <Link href={letterboxdUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <div className="relative">
                    <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                        <Image
                            src={posterUrl}
                            alt={`${title} (${year}) film poster`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                            priority={false}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5tkahihgUrQHDlqOCOmr4KlMRsaE1CG5aYlK14q9Mc3kP1lO7ue3rQXhKPb5WkRa7c4GBa6RFZbE"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300">
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 md:transition-transform md:duration-300 md:ease-out">
                                <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]">
                                    {title}
                                </h4>
                                {/* {description && (
                                    <p className="text-white/95 text-xs mt-1 mb-2 line-clamp-3 italic [text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)]">
                                        "{description}"
                                    </p>
                                )} */}

                                <div className="flex items-center justify-between mt-2">
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
                                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 border border-border/50 flex items-center justify-center">
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
