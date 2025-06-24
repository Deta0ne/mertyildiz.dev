import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitFork, Star, Eye, GitCommit, Calendar, ExternalLink } from 'lucide-react';
import { getGitHubProfile, type GitHubProfileData } from '@/lib/github-service';
import type { Metadata } from 'next';

// Next.js optimization
export const revalidate = 600; // 10 minutes
export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: 'GitHub Profile - Mert Yıldız',
    description:
        'Explore my GitHub repositories, contributions, and recent activity. Full stack developer with focus on modern web technologies.',
    keywords: ['GitHub', 'repositories', 'open source', 'development', 'programming'],
    openGraph: {
        title: 'GitHub Profile - Mert Yıldız',
        description: 'Explore my GitHub repositories, contributions, and recent activity.',
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GitHub Profile - Mert Yıldız',
        description: 'Explore my GitHub repositories, contributions, and recent activity.',
    },
};

// Profile Header Component
function ProfileHeader({ user }: { user: GitHubProfileData['user'] }) {
    const joinedDate = new Date(user.createdAt).getFullYear();

    return (
        <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform"
                >
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                        priority
                    />
                </a>

                <div className="text-center sm:text-left space-y-0">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground text-lg">{user.bio || 'Frontend Developer'}</p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <GitCommit className="w-4 h-4" />
                            <span>{user.contributionsCollection.totalCommitContributions} commits this year</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {joinedDate}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Repository Card Component
function RepositoryCard({ repo }: { repo: GitHubProfileData['pinnedRepositories'][0] }) {
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

// Activity Item Component
function ActivityItem({ event }: { event: GitHubProfileData['recentActivity'][0] }) {
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

// Error Component
function ErrorDisplay({ error }: { error: string }) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-destructive">Error Loading GitHub Data</h1>
                <p className="text-muted-foreground">{error}</p>
                <Button asChild>
                    <a href="/github">Try Again</a>
                </Button>
            </div>
        </div>
    );
}

// Main Page Component
export default async function GitHubPage() {
    let profileData: GitHubProfileData | null = null;
    let error: string | null = null;

    try {
        profileData = await getGitHubProfile();
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to load GitHub data';
        console.error('GitHub data fetch error:', err);
    }

    if (error) return <ErrorDisplay error={error} />;
    if (!profileData) return <div className="text-center p-6">Loading GitHub data...</div>;

    const { user, pinnedRepositories, recentActivity } = profileData;

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <ProfileHeader user={user} />

            {/* Pinned Repositories */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Pinned Repositories 📌</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pinnedRepositories.length > 0 ? (
                        pinnedRepositories.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-muted-foreground">No pinned repositories found</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Activity */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Recent Activity 🗓️</h2>
                <div className="space-y-3">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((event) => <ActivityItem key={event.id} event={event} />)
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No recent activity found</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
