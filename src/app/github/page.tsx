import { Suspense } from 'react';
import { getGitHubProfile, type GitHubProfileData } from '@/lib/github-service';
import { ProfileHeader } from '@/components/github/profile-header';
import { RepositoryCard } from '@/components/github/repository-card';
import { ActivityItem } from '@/components/github/activity-item';
import { ErrorDisplay } from '@/components/github/error-display';
import { GitHubLoading } from '@/components/github/github-loading';
import { GitHubPageWrapper } from '@/components/github/github-page-wrapper';
import { createGitHubMetadata } from '@/lib/metadata-utils';

export const revalidate = 3600;
export const dynamic = 'force-static';

export const metadata = createGitHubMetadata();

async function GitHubContent() {
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
        <div className="max-w-6xl mx-auto pt-16">
            <ProfileHeader user={user} />

            <section className="space-y-6 p-4" data-section="pinned">
                <h2 className="text-2xl font-bold">Pinned Repositories 📌</h2>
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

            <section className="space-y-6 mt-6 p-4" data-section="activity">
                <h2 className="text-2xl font-bold">Recent Activity 🗓️</h2>
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

export default function GitHubPage() {
    return (
        <GitHubPageWrapper>
            <Suspense fallback={<GitHubLoading />}>
                <GitHubContent />
            </Suspense>
        </GitHubPageWrapper>
    );
}
