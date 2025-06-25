import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GitCommit, Star, GitFork } from 'lucide-react';
import type { GitHubProfileData } from '@/lib/github-service';

interface ActivityItemProps {
    event: GitHubProfileData['recentActivity'][0];
}

export function ActivityItem({ event }: ActivityItemProps) {
    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent':
                return <GitCommit className="w-4 h-4 text-primary" />;
            case 'CreateEvent':
                return <Star className="w-4 h-4 text-green-500" />;
            case 'PullRequestEvent':
                return <GitFork className="w-4 h-4 text-blue-500" />;
            default:
                return <GitCommit className="w-4 h-4 text-primary" />;
        }
    };

    const getEventDescription = () => {
        switch (event.type) {
            case 'PushEvent':
                const commitCount = event.payload.commits?.length || 0;
                const message = event.payload.commits?.[0]?.message || 'No commit message';
                return `pushed ${commitCount} commit${commitCount > 1 ? 's' : ''}: ${message}`;
            case 'CreateEvent':
                return `created ${event.payload.ref_type || 'repository'}`;
            case 'PullRequestEvent':
                return `${event.payload.action} pull request`;
            default:
                return 'activity';
        }
    };

    const timeAgo = () => {
        const now = new Date();
        const eventDate = new Date(event.created_at);
        const diffInMinutes = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return `${Math.floor(diffInMinutes / 1440)} days ago`;
    };

    return (
        <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                            {getEventIcon(event.type)}
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
                                <span className="font-medium">{event.actor.login}</span>
                                <span className="text-muted-foreground">{getEventDescription()}</span>
                                <span className="font-medium text-primary truncate">
                                    {event.repo.name.split('/')[1]}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{timeAgo()}</span>
                                {event.payload.ref && (
                                    <Badge variant="outline" className="text-xs">
                                        {event.payload.ref.replace('refs/heads/', '')}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}
