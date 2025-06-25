import { FloatingHeader } from '@/components/floating-header';
import { Badge } from '@/components/ui/badge';
import { Code2, Database, Palette, Wrench, Star, BookOpen, Monitor } from 'lucide-react';

interface TechItem {
    name: string;
    category: string;
    description?: string;
    isLearning?: boolean;
    isFavorite?: boolean;
}

const techStack: TechItem[] = [
    // Frontend
    { name: 'React', category: 'Frontend', description: 'Main framework for building UIs', isFavorite: true },
    { name: 'Next.js', category: 'Frontend', description: 'Full-stack React framework', isFavorite: true },
    { name: 'TypeScript', category: 'Frontend', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework', isFavorite: true },
    { name: 'Shadcn UI', category: 'Frontend', description: 'Component library for building UIs' },
    { name: 'Material UI', category: 'Frontend', description: 'Material Design components for React' },
    { name: 'JavaScript', category: 'Frontend', description: 'Core programming language' },
    { name: 'HTML/CSS', category: 'Frontend', description: 'Web fundamentals' },

    // Backend
    { name: 'Node.js', category: 'Backend', description: 'Server-side JavaScript runtime', isLearning: true },
    {
        name: 'Express.js',
        category: 'Backend',
        description: 'Web application framework',
        isLearning: true,
        isFavorite: true,
    },
    {
        name: 'Supabase',
        category: 'Backend',
        description: 'Backend-as-a-Service platform with database and auth',
        isFavorite: true,
    },

    // Tools & DevOps
    { name: 'Git', category: 'Tools', description: 'Version control system', isFavorite: true },
    { name: 'Vercel', category: 'Tools', description: 'Deployment platform' },

    // Design
    { name: 'Figma', category: 'Design', description: 'UI/UX design tool', isFavorite: true },

    // Desktop & Productivity
    { name: 'Raycast', category: 'Desktop', description: 'Spotlight alternative with powerful extensions' },
    { name: 'AlDente', category: 'Desktop', description: 'Battery management for MacBooks' },
    { name: 'Arc Browser', category: 'Desktop', description: 'Modern browser with workspaces' },
    { name: 'Obsidian', category: 'Desktop', description: 'Note-taking and knowledge base' },
    { name: 'Cloudflare', category: 'Desktop', description: 'DNS and CDN service' },
    { name: 'IINA', category: 'Desktop', description: 'Video player for macOS' },
];

const categories = [
    { name: 'Frontend', icon: Code2, color: 'text-blue-500' },
    { name: 'Backend', icon: Database, color: 'text-green-500' },
    { name: 'Database', icon: Database, color: 'text-purple-500' },
    { name: 'Tools', icon: Wrench, color: 'text-orange-500' },
    { name: 'Design', icon: Palette, color: 'text-pink-500' },
    { name: 'Desktop', icon: Monitor, color: 'text-purple-500' },
];

function getTechsByCategory(category: string) {
    return techStack.filter((tech) => tech.category === category);
}

export default function StackPage() {
    return (
        <>
            <FloatingHeader scrollTitle="Stack & Tools" />
            <div className="mx-auto w-full max-w-4xl p-4 space-y-4">
                {/* Header */}
                <div className=" space-y-2">
                    <h1 className="text-4xl font-bold">Tech Stack & Tools 🛠️</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Technologies, frameworks, and tools I use to build amazing software experiences.
                    </p>
                </div>

                {/* Technology List */}
                <div className="space-y-4">
                    {categories.map((category) => {
                        const techs = getTechsByCategory(category.name);
                        if (techs.length === 0) return null;

                        const CategoryIcon = category.icon;

                        return (
                            <div key={category.name} className="space-y-2">
                                <div className="flex items-center gap-3 border-b border-border pb-1">
                                    <CategoryIcon className={`h-5 w-5 ${category.color}`} />
                                    <h2 className="text-xl font-semibold">{category.name}</h2>
                                </div>

                                <div className="space-y-0">
                                    {techs.map((tech) => {
                                        return (
                                            <div
                                                key={tech.name}
                                                className="flex items-center justify-between py-1 px-2"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="font-medium">{tech.name}</span>
                                                    {tech.isFavorite && (
                                                        <Star className="h-3 w-3 text-primary fill-current" />
                                                    )}
                                                    {tech.isLearning && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs px-1 py-0 h-4 border-green-500 text-green-600"
                                                        >
                                                            Learning
                                                        </Badge>
                                                    )}
                                                    <span className="text-sm text-muted-foreground">
                                                        — {tech.description}
                                                    </span>
                                                </div>
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
