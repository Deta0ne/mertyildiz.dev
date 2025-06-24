import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitFork, Star, Eye } from 'lucide-react';
import type { GitHubProfileData } from '@/lib/github-service';

interface RepositoryCardProps {
    repo: GitHubProfileData['pinnedRepositories'][0];
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
    return (
        <Card className="group hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">
                            {repo.name}
                        </CardTitle>
                    </a>
                    <Badge variant={repo.isPrivate ? 'destructive' : 'secondary'} className="text-xs shrink-0">
                        {repo.isPrivate ? 'Private' : 'Public'}
                    </Badge>
                </div>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <CardDescription className="text-sm line-clamp-2 hover:text-foreground transition-colors">
                        {repo.description || 'No description available'}
                    </CardDescription>
                </a>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
                {/* Languages */}
                <div className="flex flex-wrap gap-1">
                    {repo.primaryLanguage && (
                        <Badge variant="outline" className="text-xs">
                            {repo.primaryLanguage.name}
                        </Badge>
                    )}
                    {(repo.languages || [])
                        .filter((lang) => lang.name !== repo.primaryLanguage?.name)
                        .slice(0, 2)
                        .map((lang) => (
                            <Badge key={lang.name} variant="outline" className="text-xs">
                                {lang.name}
                            </Badge>
                        ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{repo.stargazerCount}</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            <span>{repo.forkCount}</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{repo.watchers.totalCount}</span>
                        </span>
                    </div>

                    {repo.homepageUrl && (
                        <a
                            href={repo.homepageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Live</span>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
