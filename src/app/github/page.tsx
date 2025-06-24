import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitFork, Star, Eye, GitCommit, Calendar, ExternalLink } from 'lucide-react';

export default function GitHubPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-center space-x-4">
                    <a
                        href="https://github.com/mertyildizdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-20 h-20 bg-muted rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <span className="text-2xl font-bold text-muted-foreground">MT</span>
                    </a>
                    <div className="text-left">
                        <h1 className="text-3xl font-bold">Mert Yıldız</h1>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                                <GitCommit className="w-4 h-4" />
                                <span>XX commits this year</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined GitHub</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden space-y-4">
                    <a
                        href="https://github.com/mertyildizdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto hover:scale-105 transition-transform"
                    >
                        <span className="text-2xl font-bold text-muted-foreground">MT</span>
                    </a>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Mert Yıldız</h1>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center justify-center space-x-1">
                                <GitCommit className="w-4 h-4" />
                                <span>XX commits this year</span>
                            </span>
                            <span className="flex items-center justify-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined GitHub</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pinned Repositories Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Pinned Repositories 📌</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Repository Card Template */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        Repository Name {index + 1}
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-xs">
                                        Public
                                    </Badge>
                                </div>
                                <CardDescription className="text-sm line-clamp-2">
                                    Repository açıklaması buraya gelecek. Projenin ne yaptığı ve hangi teknolojileri
                                    kullandığı.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-3">
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1">
                                    <Badge variant="outline" className="text-xs">
                                        TypeScript
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        React
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        Next.js
                                    </Badge>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center space-x-1">
                                            <Star className="w-4 h-4" />
                                            <span>XX</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <GitFork className="w-4 h-4" />
                                            <span>XX</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>XX</span>
                                        </span>
                                    </div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full" title="Primary language"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Recent Activity Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Recent Activity 🗓️</h2>

                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <GitCommit className="w-4 h-4 text-primary" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <span className="font-medium">mertyildizdev</span>
                                            <span className="text-muted-foreground">pushed to</span>
                                            <span className="font-medium text-primary">repository-name</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            Commit mesajı veya aktivite açıklaması buraya gelecek.
                                        </p>

                                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                            <span>2 hours ago</span>
                                            <Badge variant="outline" className="text-xs">
                                                main
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="outline">Load More Activity</Button>
                </div>
            </section>
        </div>
    );
}
