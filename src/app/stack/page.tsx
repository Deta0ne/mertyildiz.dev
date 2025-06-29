import { FloatingHeader } from '@/components/floating-header';
import { Badge } from '@/components/ui/badge';
import { Code2, Database, Palette, Wrench, Star, BookOpen, Monitor } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { TECH_STACK_QUERY } from '@/lib/sanity/queries';

export const revalidate = 600;

interface TechItem {
    _id: string;
    name: string;
    category: string;
    description: string;
    isLearning?: boolean;
    isFavorite?: boolean;
    order?: number;
    slug?: string;
}

const categories = [
    { name: 'Frontend', icon: Code2, color: 'text-blue-500' },
    { name: 'Backend', icon: Database, color: 'text-green-500' },
    { name: 'Database', icon: Database, color: 'text-purple-500' },
    { name: 'Tools', icon: Wrench, color: 'text-orange-500' },
    { name: 'Design', icon: Palette, color: 'text-pink-500' },
    { name: 'Desktop', icon: Monitor, color: 'text-purple-500' },
];

function getTechsByCategory(techStack: TechItem[], category: string) {
    return techStack.filter((tech) => tech.category === category);
}

export default async function StackPage() {
    const techStack: TechItem[] = await client.fetch(TECH_STACK_QUERY);

    return (
        <>
            <FloatingHeader scrollTitle="Stack & Tools" />
            <div className="mx-auto w-full max-w-4xl p-4 pr-0 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold break-words">Tech Stack & Tools 🛠️</h1>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Technologies, frameworks, and tools I use to build amazing software experiences.
                    </p>
                </div>

                {/* Technology List */}
                <div className="space-y-4">
                    {categories.map((category) => {
                        const techs = getTechsByCategory(techStack, category.name);
                        if (techs.length === 0) return null;

                        const CategoryIcon = category.icon;

                        return (
                            <div key={category.name} className="space-y-2">
                                <div className="flex items-center gap-2 sm:gap-3 border-b border-border pb-1">
                                    <CategoryIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${category.color} flex-shrink-0`} />
                                    <h2 className="text-lg sm:text-xl font-semibold break-words">{category.name}</h2>
                                </div>

                                <div className="space-y-0">
                                    {techs.map((tech) => {
                                        return (
                                            <div
                                                key={tech._id}
                                                className="mb-2 leading-[1.75] last:mb-0 px-1 sm:px-2 break-words"
                                            >
                                                <span className="font-medium text-sm sm:text-base">{tech.name}</span>
                                                {tech.isFavorite && (
                                                    <Star className="inline h-3 w-3 text-primary fill-current ml-1" />
                                                )}
                                                {tech.isLearning && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs px-1 py-0 h-4 border-green-500 text-green-600 ml-1 inline-block"
                                                    >
                                                        Learning
                                                    </Badge>
                                                )}
                                                {' — '}
                                                <span className="text-xs sm:text-sm text-muted-foreground">
                                                    {tech.description}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
